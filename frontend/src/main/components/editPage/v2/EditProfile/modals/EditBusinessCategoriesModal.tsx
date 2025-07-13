import { useState } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import SearchBox from '@/main/common/SearchBox';
import Scroll from '@/main/common/Scroll';
import styles from '../EditProfileLayoutV2.module.scss';
import CloseSymbolYellow from '@/main/assets/CloseSymbolYellow.svg';
import { GoogleService } from '@/main/service/GoogleService';
import { GoogleLocationCategory } from '@/types/apiModel';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories: GoogleLocationCategory[];
  onSave: (categories: GoogleLocationCategory[]) => Promise<void>;
  googleService: GoogleService;
  isSingleSelect?: boolean;
};

export default function EditBusinessCategoriesModal({
  isOpen,
  onClose,
  categories,
  onSave,
  googleService,
  isSingleSelect = false,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<GoogleLocationCategory[]>(categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCategories, setAvailableCategories] = useState<GoogleLocationCategory[]>([]);

  useEffect(() => {
    googleService.getCategories().then(categories => {
      setAvailableCategories(categories)
    })
  }, [googleService])

  useEffect(() => {
    setSelectedCategories(categories)
  }, [categories])

  const handleAddCategory = (category: GoogleLocationCategory) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (category: GoogleLocationCategory) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleSave = () => {
    onSave(selectedCategories);
    onClose();
  };

  const filteredCategories = availableCategories
    .filter(category => !selectedCategories.some(s => s.name === category.name))
    .filter(category =>
      (category?.displayName || '').toLowerCase().includes(searchQuery.toLowerCase())
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
                <Typography content={`# ${category?.displayName || ''}`} color="primary" size="normal" />
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
                  content={category?.displayName || ''}
                  color="primary"
                  size="normal"
                />
              </Button>
            ))}
          </Wrapper>
        </Scroll>
      </Wrapper>

      {/* エラーメッセージ */}
      {isSingleSelect && selectedCategories.length === 0 && (
        <Typography content="※ビジネスカテゴリを1つ選択してください" color="error" size="small" />
      )}
      {isSingleSelect && selectedCategories.length > 1 && (
        <Typography content="※ビジネスカテゴリは1つのみ選択可能です" color="error" size="small" />
      )}

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
          disabled={isSingleSelect && selectedCategories.length !== 1}
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
