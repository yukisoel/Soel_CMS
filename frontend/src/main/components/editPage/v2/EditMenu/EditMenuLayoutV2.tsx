import React from 'react';
import Wrapper from '@/main/common/Wrapper';
import Button from '@/main/common/Button';
import SearchBox from '@/main/common/SearchBox';
import Typography from '@/main/common/Typography';
import Separator from '@/main/common/Separator';
import Loading from '@/main/common/Loading';
import styles from './EditMenuLayoutV2.module.scss';
import AddIcon from '@/main/assets/AddIcon.svg';
import { EditMenuModal } from './modals/EditMenuModal';
import { EditSectionModal } from './modals/EditSectionModal';
import { useModal } from '@/main/common/Modal/useModal';
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext';
import { GoogleLocationFoodMenuSection, GoogleLocationFoodMenusModel, GoogleLocationFoodMenuItem, GoogleLocationPhotoModel } from '@/main/model/LocationModel';
import { useParams } from 'react-router-dom';
import { useMenuFood } from '@/main/hooks/EditMenu/useFoodMenu';

type FilteredMenuItem = Omit<GoogleLocationFoodMenuItem, 'items'> & {
  originalSectionIndex: number;
  originalItemIndex: number;
};

type FilteredSection = Omit<GoogleLocationFoodMenuSection, 'items'> & {
  originalIndex: number;
  items: FilteredMenuItem[];
};

export const EditMenuLayoutV2: React.FC = () => {
  const { isOpen: isMenuModalOpen, openModal: openMenuModal, closeModal: closeMenuModalBase } = useModal();
  const { isOpen: isSectionModalOpen, openModal: openSectionModal, closeModal: closeSectionModalBase } = useModal();
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const googleRepository = useGoogleRepository();
  const { accountId, locationId } = useParams();
  const { foodMenu, updateFoodMenus, isLoading } = useMenuFood(googleRepository, accountId ?? '', locationId ?? '');
  const [menuInitialValues, setMenuInitialValues] = React.useState<{
    title: string;
    price: string;
    description: string;
    selectedPhoto?: GoogleLocationPhotoModel;
  } | undefined>(undefined);
  const [sectionInitialValues, setSectionInitialValues] = React.useState<{
    title: string;
  } | undefined>(undefined);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredSections: FilteredSection[] = React.useMemo(() => {
    if (!foodMenu) return [];
    if (!searchQuery) return foodMenu.menus[0].sections.map((section, index) => ({
      ...section,
      originalIndex: index,
      items: section.items.map((item, itemIndex) => ({
        ...item,
        originalSectionIndex: index,
        originalItemIndex: itemIndex
      } as FilteredMenuItem))
    }));

    return foodMenu.menus[0].sections.map((section, originalIndex) => {
      const sectionName = section.labels[0]?.displayName?.toLowerCase() || '';
      const matchingItems = section.items.map((item, originalItemIndex) => {
        const filteredItem: FilteredMenuItem = {
          ...item,
          originalSectionIndex: originalIndex,
          originalItemIndex
        };
        return filteredItem;
      }).filter(item => {
        const itemName = item.labels[0]?.displayName?.toLowerCase() || '';
        const itemDescription = item.labels[0]?.description?.toLowerCase() || '';
        return itemName.includes(searchQuery) || itemDescription.includes(searchQuery);
      });

      // セクション名が一致するか、セクション内に一致するアイテムがある場合のみ表示
      if (sectionName.includes(searchQuery) || matchingItems.length > 0) {
        const filteredSection: FilteredSection = {
          ...section,
          items: matchingItems,
          originalIndex
        };
        return filteredSection;
      }
      return null;
    }).filter((section): section is FilteredSection => section !== null);
  }, [foodMenu, searchQuery]);

  const handleAddSection = () => {
    setSelectedSection(null);
    setSectionInitialValues(undefined);
    openSectionModal();
  };

  const handleEditSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    const section = foodMenu?.menus[0].sections[parseInt(sectionId)];
    if (section) {
      setSectionInitialValues({
        title: section.labels[0]?.displayName || '',
      });
    }
    openSectionModal();
  };

  const handleAddMenuItem = (sectionId: string) => {
    setSelectedSection(sectionId);
    setSelectedMenuItem(null);
    setMenuInitialValues(undefined);
    openMenuModal();
  };

  const handleEditMenuItem = (sectionId: string, menuItemId: string) => {
    setSelectedSection(sectionId);
    setSelectedMenuItem(menuItemId);
    const section = foodMenu?.menus[0].sections[parseInt(sectionId)];
    const menuItem = section?.items[parseInt(menuItemId)];
    if (menuItem) {
      // Create a dummy photo object if mediaKeys exist
      let selectedPhoto: GoogleLocationPhotoModel | undefined;
      if (menuItem.attributes.mediaKeys && menuItem.attributes.mediaKeys.length > 0) {
        selectedPhoto = {
          name: `media/${menuItem.attributes.mediaKeys[0]}`,
          googleUrl: undefined,
          thumbnailUrl: undefined
        };
      }
      
      setMenuInitialValues({
        title: menuItem.labels[0]?.displayName || '',
        price: menuItem.attributes.price?.units || '',
        description: menuItem.labels[0]?.description || '',
        selectedPhoto
      });
    }
    openMenuModal();
  };

  const handleSaveSection = async (data: { title: string }) => {
    try {
      if (!foodMenu) return;

      const defaultMenuItem: GoogleLocationFoodMenuItem = {
        labels: [{
          displayName: 'メニュー項目',
          description: null,
          languageCode: null
        }],
        attributes: {
          price: {
            units: '0',
            currencyCode: 'JPY',
            nanos: null
          },
          spiciness: null,
          allergen: null,
          dietaryRestriction: null,
          nutritionFacts: null,
          ingredients: null,
          servesNumPeople: null,
          preparationMethods: null,
          portionSize: null,
          mediaKeys: null
        },
        options: null
      };

      const newSection: GoogleLocationFoodMenuSection = {
        labels: [{
          displayName: data.title,
          description: null,
          languageCode: null
        }],
        items: [defaultMenuItem]
      };

      const updatedSections = selectedSection
        ? foodMenu.menus[0].sections.map((section, index) =>
            index.toString() === selectedSection
              ? {
                  ...section,
                  labels: [{
                    displayName: data.title,
                    description: null,
                    languageCode: null
                  }]
                }
              : section
          )
        : [...foodMenu.menus[0].sections, newSection];

      const updatedFoodMenu: GoogleLocationFoodMenusModel = {
        ...foodMenu,
        menus: [{
          ...foodMenu.menus[0],
          sections: updatedSections
        }]
      };

      await updateFoodMenus(updatedFoodMenu);
      closeSectionModal();
    } catch (error) {
      console.error('Failed to save section:', error);
    }
  };

  const handleSaveMenuItem = async (data: { title: string; price: string; description: string; selectedPhoto?: GoogleLocationPhotoModel }) => {
    try {
      if (!foodMenu) return;

      const sectionIndex = foodMenu.menus[0].sections.findIndex((_, index) => index.toString() === selectedSection);
      if (sectionIndex === -1) return;

      // Get the existing menu item if editing
      let existingMenuItem: GoogleLocationFoodMenuItem | undefined;
      if (selectedMenuItem) {
        const section = foodMenu.menus[0].sections[sectionIndex];
        existingMenuItem = section.items[parseInt(selectedMenuItem)];
      }

      // Extract media key from photo name
      let mediaKeys: string[] | null = null;
      if (data.selectedPhoto?.name) {
        const mediaPrefix = 'media/';
        const mediaIndex = data.selectedPhoto.name.indexOf(mediaPrefix);
        if (mediaIndex !== -1) {
          const mediaKey = data.selectedPhoto.name.substring(mediaIndex + mediaPrefix.length);
          mediaKeys = [mediaKey];
        }
      } else if (existingMenuItem?.attributes.mediaKeys) {
        // Preserve existing mediaKeys if no new photo selected
        mediaKeys = existingMenuItem.attributes.mediaKeys;
      }

      const newMenuItem: GoogleLocationFoodMenuItem = {
        labels: [{
          displayName: data.title,
          description: data.description,
          languageCode: existingMenuItem?.labels[0]?.languageCode || null
        }],
        attributes: {
          price: {
            units: data.price,
            currencyCode: existingMenuItem?.attributes.price?.currencyCode || 'JPY',
            nanos: existingMenuItem?.attributes.price?.nanos || null
          },
          spiciness: existingMenuItem?.attributes.spiciness || null,
          allergen: existingMenuItem?.attributes.allergen || null,
          dietaryRestriction: existingMenuItem?.attributes.dietaryRestriction || null,
          nutritionFacts: existingMenuItem?.attributes.nutritionFacts || null,
          ingredients: existingMenuItem?.attributes.ingredients || null,
          servesNumPeople: existingMenuItem?.attributes.servesNumPeople || null,
          preparationMethods: existingMenuItem?.attributes.preparationMethods || null,
          portionSize: existingMenuItem?.attributes.portionSize || null,
          mediaKeys: mediaKeys
        },
        options: existingMenuItem?.options || null
      };

      const updatedSections = foodMenu.menus[0].sections.map((section, index) => {
        if (index === sectionIndex) {
          const updatedItems = selectedMenuItem
            ? section.items.map((item, itemIndex) =>
                itemIndex.toString() === selectedMenuItem ? newMenuItem : item
              )
            : [...section.items, newMenuItem];
          return { ...section, items: updatedItems };
        }
        return section;
      });

      const updatedFoodMenu: GoogleLocationFoodMenusModel = {
        ...foodMenu,
        menus: [{
          ...foodMenu.menus[0],
          sections: updatedSections
        }]
      };

      await updateFoodMenus(updatedFoodMenu);
      closeMenuModal();
    } catch (error) {
      console.error('Failed to save menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (sectionId: string, menuItemId: string) => {
    try {
      if (!foodMenu) return;

      const sectionIndex = parseInt(sectionId);
      const menuItemIndex = parseInt(menuItemId);

      const updatedSections = foodMenu.menus[0].sections.map((section, index) => {
        if (index === sectionIndex) {
          return {
            ...section,
            items: section.items.filter((_, itemIndex) => itemIndex !== menuItemIndex)
          };
        }
        return section;
      });

      const updatedFoodMenu: GoogleLocationFoodMenusModel = {
        ...foodMenu,
        menus: [{
          ...foodMenu.menus[0],
          sections: updatedSections
        }]
      };

      await updateFoodMenus(updatedFoodMenu);
      closeMenuModal();
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      if (!foodMenu) return;

      const sectionIndex = parseInt(sectionId);
      const updatedSections = foodMenu.menus[0].sections.filter((_, index) => index !== sectionIndex);

      const updatedFoodMenu: GoogleLocationFoodMenusModel = {
        ...foodMenu,
        menus: [{
          ...foodMenu.menus[0],
          sections: updatedSections
        }]
      };

      await updateFoodMenus(updatedFoodMenu);
      closeSectionModal();
    } catch (error) {
      console.error('Failed to delete section:', error);
    }
  };

  const closeMenuModal = () => {
    setSelectedMenuItem(null);
    setMenuInitialValues(undefined);
    closeMenuModalBase();
  };

  const closeSectionModal = () => {
    setSelectedSection(null);
    setSectionInitialValues(undefined);
    closeSectionModalBase();
  };

  if (isLoading) {
    return <Loading message="メニューを読み込み中..." />;
  }

  if (!foodMenu) return null;

  return (
    <Wrapper direction="col" padding="5rem" gap="4rem">
      <Wrapper direction="col" gap="2rem">
        <Typography content="編集メニュー" size="medium" color="primary" />
        <Wrapper gap="4rem" align="align-center">
          <SearchBox
            width="427px"
            placeholder="メニューかセクション名で検索"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
          />
          <Button
            bgColor="primary"
            padding="0 1rem"
            onClick={handleAddSection}
            className={styles.add_section_button}
          >
            <img src={AddIcon} alt="add" />
            <Typography content="セクションを追加" size="normal" color="primary" />
          </Button>
        </Wrapper>
        <Separator borderWidth="2px" />
      </Wrapper>

      {filteredSections.map((section) => (
        <React.Fragment key={section.originalIndex}>
          <Wrapper direction="col" gap="2rem">
            <Wrapper className={styles.sectionHeader}>
              <Wrapper className={styles.sectionTitle}>
                <Typography content={section.labels[0]?.displayName || ''} size="medium" color="primary" className={styles.ellipsis} />
              </Wrapper>
              <Wrapper className={styles.sectionButtons}>
                <Button
                  bgColor="primary"
                  padding="0 1rem"
                  className={styles.button}
                  onClick={() => handleEditSection(section.originalIndex.toString())}
                >
                  <Typography content="編集" size="xsmall" color="primary" />
                </Button>
                <Button
                  bgColor="primary"
                  padding="0 1rem"
                  className={styles.button}
                  onClick={() => handleAddMenuItem(section.originalIndex.toString())}
                >
                  <Typography content="追加" size="xsmall" color="primary" />
                </Button>
              </Wrapper>
            </Wrapper>
            <Separator />

            {section.items.map((item) => (
              <React.Fragment key={`${item.originalSectionIndex}-${item.originalItemIndex}`}>
                <Wrapper gap="16px" padding="16px 0" align="align-start" className={styles.menuItem}>
                  <Wrapper direction="col" className={styles.menuItemContent}>
                    <Wrapper gap="8px" align="align-center" justify='justify-between'>
                      <Typography
                        content={item.labels[0]?.displayName || ''}
                        size="xsmall"
                        color="primary"
                        className={styles.menuItemName}
                      />
                      <Typography
                        content={item.attributes.price?.units ? `${item.attributes.price.units}円` : ''}
                        size="xsmall"
                        color="secondary"
                        className={styles.menuItemPrice}
                      />
                    </Wrapper>
                    {item.labels[0]?.description && (
                      <Typography
                        content={item.labels[0].description}
                        size="xsmall"
                        color="secondary"
                        className={styles.menuItemDescription}
                      />
                    )}
                  </Wrapper>
                  <Wrapper align="align-center" gap="2rem">
                    {item.attributes.mediaKeys && item.attributes.mediaKeys.length > 0 && (
                      <Wrapper className={styles.menuItemImage}>
                        <img 
                          src={`https://lh3.googleusercontent.com/p/${item.attributes.mediaKeys[0]}=s0`}
                          alt={item.labels[0]?.displayName || ''}
                        />
                      </Wrapper>
                    )}
                    <Button
                      bgColor="primary"
                      padding="0 1rem"
                      className={styles.button}
                      onClick={() => handleEditMenuItem(item.originalSectionIndex.toString(), item.originalItemIndex.toString())}
                    >
                      <Typography content="編集" size="xsmall" color="primary" />
                    </Button>
                  </Wrapper>
                </Wrapper>
                <Separator />
              </React.Fragment>
            ))}
          </Wrapper>
        </React.Fragment>
      ))}
      <EditMenuModal
        isOpen={isMenuModalOpen}
        onClose={closeMenuModal}
        title={selectedMenuItem ? 'メニュー項目の編集' : 'メニュー項目の追加'}
        onSubmit={handleSaveMenuItem}
        onDelete={selectedMenuItem && selectedSection ? () => handleDeleteMenuItem(selectedSection, selectedMenuItem) : undefined}
        initialValues={menuInitialValues}
      />
      <EditSectionModal
        isOpen={isSectionModalOpen}
        onClose={closeSectionModal}
        title={selectedSection ? 'セクションの編集' : 'セクションの追加'}
        onSubmit={handleSaveSection}
        onDelete={selectedSection ? () => handleDeleteSection(selectedSection) : undefined}
        initialValues={sectionInitialValues}
      />
    </Wrapper>
  );
};
