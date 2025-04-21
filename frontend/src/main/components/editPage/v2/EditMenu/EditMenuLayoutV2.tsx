import React from 'react';
import Wrapper from '@/main/common/Wrapper';
import Button from '@/main/common/Button';
import SearchBox from '@/main/common/SearchBox';
import Typography from '@/main/common/Typography';
import Separator from '@/main/common/Separator';
import styles from './EditMenuLayoutV2.module.scss';
import AddIcon from '@/main/assets/AddIcon.svg';

type MenuItem = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

type Section = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const EditMenuLayoutV2: React.FC = () => {
  // モックデータ
  const sections: Section[] = [
    {
      id: '1',
      title: 'セクション1',
      items: [
        {
          id: '1-1',
          title: '料理の名前が入ります。料理の名前が入ります。',
          description: '料理の説明が入ります。料理の説明が入ります。料理の説明が入ります。',
          imageUrl: '/mock/image1.jpg'
        },
        {
          id: '1-2',
          title: '料理の名前が入ります。料理の名前が入ります。',
          description: '料理の説明が入ります。料理の説明が入ります。料理の説明が入ります。'
        }
      ]
    },
    {
      id: '2',
      title: 'セクション2',
      items: [
        {
          id: '2-1',
          title: '料理の名前が入ります。料理の名前が入ります。',
          description: '料理の説明が入ります。料理の説明が入ります。料理の説明が入ります。',
          imageUrl: '/mock/image2.jpg'
        }
      ]
    }
  ];

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleAddSection = () => {
    console.log('Add section');
  };

  const handleEditSection = (sectionId: string) => {
    console.log('Edit section:', sectionId);
  };

  const handleAddMenuItem = (sectionId: string) => {
    console.log('Add menu item to section:', sectionId);
  };

  const handleEditMenuItem = (sectionId: string, menuItemId: string) => {
    console.log('Edit menu item:', menuItemId, 'in section:', sectionId);
  };

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

      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <Wrapper direction="col" gap="2rem">
            <Wrapper justify="justify-between">
              <Typography content={section.title} size="medium" color="primary" />
              <Wrapper gap="8px">
                <Button
                  bgColor="primary"
                  padding="0 1rem"
                  className={styles.button}
                  onClick={() => handleEditSection(section.id)}
                >
                  <Typography content="編集" size="xsmall" color="primary" />
                </Button>
                <Button
                  bgColor="primary"
                  padding="0 1rem"
                  className={styles.button}
                  onClick={() => handleAddMenuItem(section.id)}
                >
                  <Typography content="追加" size="xsmall" color="primary" />
                </Button>
              </Wrapper>
            </Wrapper>
            <Separator />

            {section.items.map((item) => (
              <React.Fragment key={item.id}>
                <Wrapper gap="16px" padding="16px 0" align="align-start" className={styles.menuItem}>
                  <Wrapper direction="col" className={styles.menuItemContent}>
                    <Typography
                      content={item.title}
                      size="xsmall"
                      color="primary"
                    />
                    <Typography
                      content={item.description}
                      size="xsmall"
                      color="secondary"
                    />
                  </Wrapper>
                  <Wrapper align="align-center" gap="2rem">
                    {item.imageUrl ? (
                        <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={styles.menuItemImage}
                        />
                    ) : (
                        <Wrapper className={styles.menuItemImage} />
                    )}
                    <Button
                        bgColor="primary"
                        padding="0 1rem"
                        className={styles.button}
                        onClick={() => handleEditMenuItem(section.id, item.id)}
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
    </Wrapper>
  );
};
