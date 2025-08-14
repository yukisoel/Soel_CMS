import { useState, useEffect, useCallback } from 'react';
import EditServicesModalPresenter from './EditServicesModalPresenter';
import { useModal } from '@/main/common/Modal/useModal';
import { GoogleServiceImpl } from '@/main/service/GoogleService';
import { GoogleRepositoryImpl } from '@/main/repositories/GoogleRepository';
import { GoogleLocationAttributesModel, SERVICE_ATTRIBUTE_MAPPING, GoogleLocationAttributeServiceType, GoogleAttributeMetadata } from '@/types/apiModel';
import { GoogleLocationAttributeServiceType as ApiServiceType } from '@/types/api';

type Service = {
  id: string;
  name: string;
  isAvailable: boolean | null;
};


type UseEditServicesModalContainerParams = {
  locationId: string | undefined;
  attributes: GoogleLocationAttributesModel | null;
  fetchAttributes: () => Promise<void>;
};

export const useEditServicesModalContainer = (
  locationId: string | undefined,
  attributes: GoogleLocationAttributesModel | null,
  fetchAttributes: () => Promise<void>
) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [availableAttributes, setAvailableAttributes] = useState<GoogleAttributeMetadata[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [googleService] = useState(() => new GoogleServiceImpl({ googleRepository: new GoogleRepositoryImpl() }));

  // availableAttributesを取得
  useEffect(() => {
    const fetchAvailableAttributes = async () => {
      if (!locationId) return;
      
      try {
        const availableAttrs = await googleService.getAvailableAttributes(locationId);
        setAvailableAttributes(availableAttrs);
      } catch (error) {
        console.error('Failed to fetch available attributes:', error);
      }
    };

    fetchAvailableAttributes();
  }, [locationId, googleService]);

  // availableAttributesとattributes更新時のserviceList更新
  useEffect(() => {
    if (availableAttributes.length === 0) return;

    // 利用可能な属性名をセットとして作成
    const availableAttributeNames = new Set(
      availableAttributes.map(attr => attr.parent || '')
    );

    // SERVICE_ATTRIBUTE_MAPPINGとavailableAttributesの交差を取得
    const serviceList = Object.entries(SERVICE_ATTRIBUTE_MAPPING)
      .filter(([_, attributeName]) => availableAttributeNames.has(attributeName))
      .map(([key, attributeName]) => {
        // attributesから実際の値を取得
        const attribute = attributes?.attributes?.find(attr => 
          attr.name === attributeName
        );
        // デフォルトはnull、attributeに値がある場合のみその値を使用
        const isAvailable = attribute?.values && attribute.values.length > 0 
          ? Boolean(attribute.values[0]) 
          : null;
        
        return {
          id: key,
          name: GoogleLocationAttributeServiceType[key as keyof typeof GoogleLocationAttributeServiceType] || attributeName,
          isAvailable
        };
      });

    setServiceList(serviceList);
  }, [attributes, availableAttributes]);

  const handleToggleService = (id: string, value: string) => {
    setServiceList(prev =>
      prev.map(service =>
        service.id === id
          ? { 
              ...service, 
              isAvailable: value === 'yes' ? true : value === 'no' ? false : null 
            }
          : service
      )
    );
  };

  const handleSave = async (): Promise<void> => {
    if (!locationId) return;
    
    try {
      const attributeServices = serviceList
        .filter(service => service.isAvailable !== null) // null値は除外
        .map(service => {
          const attributeName = SERVICE_ATTRIBUTE_MAPPING[service.id];
          if (!attributeName) {
            console.warn(`Unknown service id: ${service.id}`);
            return null;
          }
          
          // 利用可能な属性かどうかを確認
          const isAvailable = availableAttributes.some(attr => 
            attr.parent === attributeName
          );
          
          if (!isAvailable) {
            console.warn(`Attribute ${attributeName} is not available for this location`);
            return null;
          }
          
          return {
            type: attributeName as ApiServiceType,
            value: service.isAvailable as boolean
          };
        }).filter((item): item is { type: ApiServiceType; value: boolean } => item !== null);
      
      await googleService.updateLocationAttributesServices(locationId, attributeServices);
      
      // 親コンポーネントのattributesを更新
      await fetchAttributes();
      
      closeModal();
    } catch (error) {
      console.error('Failed to save services:', error);
    }
  };

  const renderContent = () => {
    if (isLoading) return null;
    
    return (
      <EditServicesModalPresenter
        isOpen={isOpen}
        onClose={closeModal}
        services={serviceList}
        onToggleService={handleToggleService}
        onSave={handleSave}
      />
    );
  };

  return {
    openModal,
    renderContent
  };
};