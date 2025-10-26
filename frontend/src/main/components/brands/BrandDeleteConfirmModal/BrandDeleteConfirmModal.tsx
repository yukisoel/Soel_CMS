import styles from './BrandDeleteConfirmModal.module.scss'
import Modal from '@/main/common/Modal/Modal.tsx'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'

type Props = {
  isOpen: boolean
  brandName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function BrandDeleteConfirmModal({ isOpen, brandName, onConfirm, onCancel }: Props) {
  const renderContent = () => (
    <>
      <Wrapper direction="col" className={styles.message_container}>
        <Typography content="本当に" size="medium" color="primary" />
        <Typography content={`「${brandName}」`} size="medium" color="primary" />
        <Typography content="を削除しますか？" size="medium" color="primary" />
      </Wrapper>

      <Wrapper direction="col" gap="1.5rem" align="align-center" className={styles.button_container}>
        <Button
          bgColor="secondary"
          padding="2.5rem 0"
          className={styles.cancel_button}
          onClick={onCancel}
        >
          <Typography content="キャンセル" size="medium" color="primary" />
        </Button>
        <Button
          bgColor="primary"
          padding="0.7rem 0"
          className={styles.delete_button}
          onClick={onConfirm}
        >
          <Typography content="削除する" size="medium" color="primary" />
        </Button>
      </Wrapper>
    </>
  )

  return (
    <Modal
      headerContent="【警告】"
      contentRender={renderContent}
      isOpen={isOpen}
      onClose={onCancel}
    />
  )
}
