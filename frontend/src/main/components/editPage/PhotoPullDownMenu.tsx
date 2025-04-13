import styles from '@/main/components/editPage/PhotoPullDownMenu.module.scss'
import {ChangeEvent, useState} from "react";
import classNames from "classnames";
import ArrowIcon from "@/main/assets/ArrowIcon.svg";

export type Props = {
  placeholder?: string
  selectedContent: string
  setSelectedContent: (content: string) => void
  options: string[]
}

export default function PhotoPullDownMenu({
  placeholder,
  selectedContent,
  setSelectedContent,
  options
}: Props) {
  const effectivePlaceholder = placeholder ? placeholder : '入力して検索'

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchWord, setSearchWord] = useState<string>('')
  const toggleIsOpen = () => {
    setSearchWord('')
    setIsOpen(!isOpen)
  }

  const handleShowSearchOptions = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const handleClearSelection = () => {
    setSelectedContent('')
    toggleIsOpen()
  }

  const filteredOptions = options.filter(value =>
    searchWord.length === 0 || value.toLowerCase().includes(searchWord.toLowerCase())
  )

  return (
    <div data-testid={'pull_down_menu'} className={styles.pull_down_menu_container}>
      <div
        className={styles.arrow}
        onClick={toggleIsOpen}
      >
        <img src={ArrowIcon} alt={'arrow_icon'}/>
      </div>
      <div
        className={classNames(styles.pull_down_menu_content, {
          [styles.pull_down_menu_placeholder]: selectedContent.length === 0,
          [styles.pull_down_menu_option]: selectedContent.length !== 0
        })}
        onClick={toggleIsOpen}
      >
        {selectedContent.length === 0 ? effectivePlaceholder : selectedContent}
      </div>
      {isOpen && (
        <div className={styles.dropdown_options}>
          <input
            className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_input} ${styles.pull_down_menu_border}`}
            placeholder={effectivePlaceholder}
            onChange={handleShowSearchOptions}
            value={searchWord}
          />
          {selectedContent && (
            <div
              className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_option} ${styles.pull_down_menu_border} ${styles.clear_option}`}
              onClick={handleClearSelection}
            >
              選択解除
            </div>
          )}
          {filteredOptions.map((value, index) => (
            <div
              key={index}
              className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_option} ${styles.pull_down_menu_border}`}
              onClick={() => {
                toggleIsOpen()
                setSelectedContent(value)
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
