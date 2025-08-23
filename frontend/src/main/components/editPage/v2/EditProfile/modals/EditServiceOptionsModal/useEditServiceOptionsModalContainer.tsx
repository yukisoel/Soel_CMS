import { useState, useEffect } from 'react'
import EditServiceOptionsModalPresenter from './EditServiceOptionsModalPresenter'
import { useModal } from '@/main/common/Modal/useModal'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'
import { GoogleLocationAttributesModel, SERVICE_OPTION_ATTRIBUTE_MAPPING, GoogleLocationAttributeServiceOptionType, GoogleAttributeMetadata } from '@/types/apiModel'
import { GoogleLocationAttributeServiceOptionType as ApiServiceOptionType } from '@/types/api'

type ServiceOption = {
  id: string;
  name: string;
  isAvailable: boolean | null;
};


export const useEditServiceOptionsModalContainer = (
  locationId: string | undefined,
  attributes: GoogleLocationAttributesModel | null,
  fetchAttributes: () => Promise<void>
) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [availableAttributes, setAvailableAttributes] = useState<GoogleAttributeMetadata[]>([])
  const [serviceOptionList, setServiceOptionList] = useState<ServiceOption[]>([])
  const googleRepository = useGoogleRepository()

  // availableAttributesを取得
  useEffect(() => {
    const fetchAvailableAttributes = async () => {
      if (!locationId) return

      try {
        const availableAttrs = await googleRepository.getAvailableAttributes(locationId)
        setAvailableAttributes(availableAttrs)
      } catch (error) {
        console.error('Failed to fetch available attributes:', error)
      }
    }

    fetchAvailableAttributes()
  }, [locationId, googleRepository])

  // availableAttributesとattributes更新時のserviceOptionList更新
  useEffect(() => {
    if (availableAttributes.length === 0) return

    // 利用可能な属性名をセットとして作成
    const availableAttributeNames = new Set(
      availableAttributes.map(attr => attr.parent || '')
    )

    // SERVICE_OPTION_ATTRIBUTE_MAPPINGとavailableAttributesの交差を取得
    const serviceOptionList = Object.entries(SERVICE_OPTION_ATTRIBUTE_MAPPING)
      .filter(([_, attributeName]) => availableAttributeNames.has(attributeName))
      .map(([key, attributeName]) => {
        // attributesから実際の値を取得
        const attribute = attributes?.attributes?.find(attr =>
          attr.name === attributeName
        )
        // デフォルトはnull、attributeに値がある場合のみその値を使用
        const isAvailable = attribute?.values && attribute.values.length > 0
          ? Boolean(attribute.values[0])
          : null

        return {
          id: key,
          name: GoogleLocationAttributeServiceOptionType[key as keyof typeof GoogleLocationAttributeServiceOptionType] || attributeName,
          isAvailable
        }
      })

    setServiceOptionList(serviceOptionList)
  }, [attributes, availableAttributes])

  const handleToggleServiceOption = (id: string, value: string) => {
    setServiceOptionList(prev =>
      prev.map(serviceOption =>
        serviceOption.id === id
          ? {
            ...serviceOption,
            isAvailable: value === 'yes' ? true : value === 'no' ? false : null
          }
          : serviceOption
      )
    )
  }

  const handleSave = async (): Promise<void> => {
    if (!locationId) return

    try {
      const attributeServiceOptions = serviceOptionList
        .filter(serviceOption => serviceOption.isAvailable !== null) // null値は除外
        .map(serviceOption => {
          const attributeName = SERVICE_OPTION_ATTRIBUTE_MAPPING[serviceOption.id]
          if (!attributeName) {
            console.warn(`Unknown service option id: ${serviceOption.id}`)
            return null
          }

          // 利用可能な属性かどうかを確認
          const isAvailable = availableAttributes.some(attr =>
            attr.parent === attributeName
          )

          if (!isAvailable) {
            console.warn(`Attribute ${attributeName} is not available for this location`)
            return null
          }

          return {
            type: attributeName as ApiServiceOptionType,
            value: serviceOption.isAvailable as boolean
          }
        }).filter((item): item is { type: ApiServiceOptionType; value: boolean } => item !== null)

      await googleRepository.updateLocationAttributesServiceOptions(locationId, attributeServiceOptions)

      // 親コンポーネントのattributesを更新
      await fetchAttributes()

      closeModal()
    } catch (error) {
      console.error('Failed to save service options:', error)
    }
  }

  const renderContent = () => {

    return (
      <EditServiceOptionsModalPresenter
        isOpen={isOpen}
        onClose={closeModal}
        serviceOptions={serviceOptionList}
        onToggleServiceOption={handleToggleServiceOption}
        onSave={handleSave}
      />
    )
  }

  return {
    openModal,
    renderContent
  }
}
