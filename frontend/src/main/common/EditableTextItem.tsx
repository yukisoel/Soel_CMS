import { useState } from 'react'
import styles from '@/main/common/EditableTextItem.module.scss'
import ButtonEditBack from '@/main/assets/ButtonEditBack.svg'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'

type Props = {
  label: string;
  text: string;
  width?: string;
  handleSaveClick: (text: string) => void;
};

export default function EditableTextItem({ label, text, width, handleSaveClick }: Props)  {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(text)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setInputValue(text)
  }

  const onSubmit = () => {
    handleSaveClick(inputValue)
    setIsEditing(false)
  }

  return (
    <Wrapper>
      {isEditing ? (
        <>
          <Wrapper padding="1.7rem 6rem 2.6rem 0">
            <button className={styles.cancel_button} onClick={handleCancelClick}>
              <img src={ButtonEditBack} alt="キャンセル" />
            </button>
          </Wrapper>
          <Wrapper direction="col" gap="1.6rem">
            <Typography content={label} size="medium" color="secondary" />
            <div className={styles.wrapper} style={{ width: width }}>
              <input
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button bgColor="primary" padding="1rem 2.1rem 1rem 2.1rem" className={styles.edit_button} onClick={onSubmit}>
                <Typography content="保存" size="small" color="primary" />
              </Button>
            </div>
          </Wrapper>
        </>
      ) : (
        <>
          <Wrapper padding="1.7rem 3rem 2.6rem 0">
            <Button bgColor="primary" padding="1rem 2.1rem 1rem 2.1rem" className={styles.edit_button} onClick={handleEditClick}>
              <Typography content="編集" size="small" color="primary" />
            </Button>
          </Wrapper>
          <Wrapper direction="col" gap="1.6rem">
            <Typography content={label} size="medium" color="secondary" />
            <Typography content={text} size="large" color="primary" />
          </Wrapper>
        </>
      )}
    </Wrapper>
  )
}
