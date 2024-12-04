import styles from "@/main/components/editPage/LocalPostButtonPullDownMenu.module.scss";
import TriangleIcon from "@/main/assets/PullDownMenuTriangle.svg";
import classNames from "classnames";
import {ChangeEvent, useState} from "react";

export type Props = {
  placeholder?: string
  selectedContent: string
  setSelectedContent: (content: string) => void
  options: string[]
}

export default function LocalPostButtonPullDownMenu({
                                                      placeholder,
                                                      selectedContent,
                                                      setSelectedContent,
                                                      options
                                                    }: Props) {
  const effectivePlaceholder = placeholder ? placeholder : 'ボタンの追加（省略可）'
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchWord, setSearchWord] = useState<string>('')
  const toggleIsOpen = () => {
    setSearchWord('')
    setIsOpen(!isOpen)
  }

  const handleShowSearchOptions = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }
  return (
    <>
      <div data-testid={'pull_down_menu'} className={styles.pull_down_menu_container}
      >
        <div
          className={styles.triangle}
          onClick={() => {
            toggleIsOpen()
          }}
        >
          <img src={TriangleIcon} alt={'triangle_icon'}/>
        </div>
        {!isOpen && (
          <>
            <div
              className={classNames(styles.pull_down_menu_content, {
                [styles.pull_down_menu_placeholder]: selectedContent.length === 0,
                [styles.pull_down_menu_option]: selectedContent.length !== 0
              })}
              onClick={() => {
                toggleIsOpen()
              }}
            >
              {selectedContent.length === 0 ? effectivePlaceholder : selectedContent}
            </div>
          </>
        )}
        {isOpen && (
          <>
            <input
              className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_input} ${styles.pull_down_menu_border}`}
              placeholder={"ボタンの追加（省略可）"}
              onChange={handleShowSearchOptions}
            />
            {options.map((value, index) => {
              if (searchWord.length === 0 || value.includes(searchWord)) {
                return (
                  <div key={index}
                       className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_option} ${styles.pull_down_menu_border}`}
                       onClick={() => {
                         toggleIsOpen()
                         setSelectedContent(value)
                       }}
                  >
                    {value}
                  </div>
                )
              } else {
                return (<></>)
              }
            })}
          </>
        )}
      </div>
    </>
  )
}