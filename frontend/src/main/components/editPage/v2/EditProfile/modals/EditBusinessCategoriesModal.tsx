import { useState } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import SearchBox from '@/main/common/SearchBox';
import Scroll from '@/main/common/Scroll';
import styles from '../EditProfileLayoutV2.module.scss';
import CloseSymbolYellow from '@/main/assets/CloseSymbolYellow.svg';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onSave: (categories: string[]) => void;
};

export default function EditBusinessCategoriesModal({
  isOpen,
  onClose,
  categories,
  onSave,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCategories] = useState([
    '寿司店',
    '回転寿司店',
    'テイクアウト寿司店',
    'シーフード・海鮮料理店',
    '和食店',
    'レストラン',
    'カフェ',
    'バー',
    '居酒屋',
  ]);

  const handleAddCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleSave = () => {
    onSave(selectedCategories);
    onClose();
  };

  const filteredCategories = availableCategories
    .filter(category => !selectedCategories.includes(category))
    .filter(category =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      {/* 追加済みのカテゴリ */}
      <Wrapper direction="col" gap="1rem">
        <Typography content="追加済みのカテゴリ" color="primary" size="normal" />
        <Scroll height="186px">
          <div className={styles.categories_container}>
            {selectedCategories.map((category, index) => (
              <Wrapper
                key={index}
                className={styles.category_tag}
                padding="0.5rem 1rem"
                gap="2rem"
                align="align-center"
              >
                <Typography content={`# ${category}`} color="primary" size="normal" />
                <img
                  src={CloseSymbolYellow}
                  alt="削除"
                  onClick={() => handleRemoveCategory(category)}
                  style={{ cursor: 'pointer' }}
                />
              </Wrapper>
            ))}
          </div>
        </Scroll>
      </Wrapper>

      {/* カテゴリを追加 */}
      <Wrapper direction="col" gap="1rem">
        <Typography content="カテゴリを追加" color="primary" size="normal" />
        <Wrapper gap="1rem" align="align-center" justify="justify-start">
          <SearchBox
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="店舗名を検索"
            width="430px"
          />
        </Wrapper>
        <Scroll height="186px" width="480px">
          <Wrapper direction="col" align="align-start">
            {filteredCategories.map((category, index) => (
              <Button
                key={index}
                bgColor="secondary"
                padding="0.5rem 1rem"
                onClick={() => handleAddCategory(category)}
              >
                <Typography
                  content={category}
                  color="primary"
                  size="normal"
                />
              </Button>
            ))}
          </Wrapper>
        </Scroll>
      </Wrapper>

      {/* アクションボタン */}
      <Wrapper gap="1rem" justify="justify-end">
        <Button
          bgColor="secondary"
          padding="0.5rem 1.8rem"
          onClick={onClose}
        >
          <Typography content="戻る" color="primary" size="normal" />
        </Button>
        <Button
          bgColor="primary"
          padding="0.5rem 1.8rem"
          onClick={handleSave}
        >
          <Typography content="保存する" color="primary" size="normal" />
        </Button>
      </Wrapper>
    </Wrapper>
  );

  return (
    <Modal
      headerContent="ビジネスカテゴリを編集"
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  );
}
