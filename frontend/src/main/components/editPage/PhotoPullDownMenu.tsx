import styles from '@/main/components/editPage/PhotoPullDownMenu.module.scss'
import {useState} from "react";
import classNames from "classnames";
import TriangleIcon from "@/main/assets/PullDownMenuTriangle.svg";

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
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div data-testid={'pull_down_menu'} className={styles.pull_down_menu_container}
           onClick={() => {
             toggleIsOpen()
           }}
      >
        <div className={styles.triangle}>
          <img src={TriangleIcon} alt={'triangle_icon'}/>
        </div>
        {!isOpen && (
          <>
            <div className={classNames(styles.pull_down_menu_content, {
              [styles.pull_down_menu_placeholder]: selectedContent.length === 0,
              [styles.pull_down_menu_option]: selectedContent.length !== 0
            })}>
              {selectedContent.length === 0 ? effectivePlaceholder : selectedContent}
            </div>
          </>
        )}
        {isOpen && (
          <>
            <div
              className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_placeholder} ${styles.pull_down_menu_border}`}>
              {effectivePlaceholder}
            </div>
            {options.map((value, index) => {
              return (
                <div key={index}
                     className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_option} ${styles.pull_down_menu_border}`}
                     onClick={() => {
                       setSelectedContent(value)
                     }}
                >
                  {value}
                </div>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}