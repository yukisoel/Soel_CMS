import styles from '@/main/components/editPage/SearchPullDownMenu.module.scss'
import {ChangeEvent, useState, useEffect} from "react";
import classNames from "classnames";
import ArrowIcon from "@/main/assets/ArrowIcon.svg";

export type Props = {
  placeholder?: string
  selectedContent: string
  setSelectedContent: (content: string) => void
  options: string[]
  width?: string
  onSearch?: (query: string) => Promise<void>
  searchDelay?: number
}

export default function PhotoPullDownMenu({
  placeholder,
  selectedContent,
  setSelectedContent,
  options,
  width = '430px',
  onSearch,
  searchDelay = 300
}: Props) {
  const effectivePlaceholder = placeholder ? placeholder : '入力して検索'

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchWord, setSearchWord] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  const toggleIsOpen = () => {
    setSearchWord('')
    setIsOpen(!isOpen)
  }

  const handleShowSearchOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchWord(value)

    if (onSearch) {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
      const timeout = setTimeout(() => {
        onSearch(value)
      }, searchDelay)
      setSearchTimeout(timeout)
    }
  }

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  const handleClearSelection = () => {
    setSelectedContent('')
    toggleIsOpen()
  }

  return (
    <div
      data-testid={'pull_down_menu'}
      className={[
        styles.pull_down_menu_container,
        isOpen ? styles.opened : ''
      ].filter(Boolean).join(' ')}
      style={{ width }}
    >
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
          {options.map((value, index) => (
            <div
              key={index}
              className={
                [
                  styles.pull_down_menu_content,
                  styles.pull_down_menu_option,
                  index !== options.length - 1 ? styles.pull_down_menu_border : undefined
                ].filter(Boolean).join(' ')
              }
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
