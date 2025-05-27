import { useState } from 'react';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import styles from '../EditReservationV2.module.scss';
import { EditLinkModal } from '../modals/EditLinkModal';

type LinkItem = {
  id: string;
  label: string;
  url: string;
};

type Props = {
  onTryButtonClick: () => void;
};

export const OnlineToolTab = ({ onTryButtonClick }: Props) => {
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', label: '食べログ', url: 'https://tabelog.com' },
    { id: '2', label: 'ぐるなび', url: 'https://gnavi.co.jp' },
    { id: '3', label: 'ホットペッパーグルメ', url: 'https://www.hotpepper.jp' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);

  const handleEditClick = (link: LinkItem) => {
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedLink(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLink(null);
  };

  const handleModalSubmit = async (data: { label: string; url: string }) => {
    if (selectedLink) {
      // 編集
      setLinks(links.map(link =>
        link.id === selectedLink.id ? { ...link, ...data } : link
      ));
    } else {
      // 新規追加
      const newId = (links.length + 1).toString();
      setLinks([...links, { id: newId, ...data }]);
    }
    handleModalClose();
  };

  const handleDeleteLink = async () => {
    if (selectedLink) {
      setLinks(links.filter(link => link.id !== selectedLink.id));
      handleModalClose();
    }
  };

  return (
    <Wrapper direction="col" align="align-start" gap="5rem" padding="0 3rem">
      <Wrapper direction="col" align="align-start" gap="1.1rem">
        <Typography content="オンライン予約ツールへのリンク" size="normal" color="primary" />
        <Wrapper direction="col" align="align-start">
          <Typography
            content="オンライン予約ページへのカスタムリンクを追加して、ユーザーが直接予約できるようにしましょう。"
            size="xsmall"
            color="gray"
            weight="normal"
          />
        </Wrapper>
        <Button
          bgColor="primary"
          padding="0.5rem 3rem"
          onClick={handleAddClick}
          className={styles.add_button}
        >
          <Typography content="リンクを追加" size="normal" color="primary" />
        </Button>
      </Wrapper>

      <Wrapper direction="col" gap="3rem" className={styles.link_section}>
        {links.map((link) => (
          <Wrapper key={link.id} direction="col" gap="1rem">
            <Typography content={link.label} size="normal" color="primary" />
            <Wrapper gap="1rem" align="align-center">
              <Input
                value={link.url}
                readOnly
                placeholder="URLを入力"
                className={styles.link_input}
              />
              <Button
                bgColor="primary"
                padding="0.5rem 2rem"
                onClick={() => handleEditClick(link)}
                className={styles.edit_button}
              >
                <Typography content="編集" size="xsmall" color="primary" />
              </Button>
            </Wrapper>
          </Wrapper>
        ))}
      </Wrapper>

      <EditLinkModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        onDelete={selectedLink ? handleDeleteLink : undefined}
        initialValues={selectedLink || undefined}
      />
    </Wrapper>
  );
};
