import styles from '@/main/components/PullDownMenu.module.scss'
import {useState} from "react";
import classNames from "classnames";
import TriangleIcon from "@/main/assets/PullDownMenuTriangle.svg";

export type Props = {
  title: string
  placeholder?: string
  selectedContent: string
  setSelectedContent: (content: string) => void
  options: string[]
}

export default function PullDownMenu({title,placeholder, selectedContent, setSelectedContent, options}: Props) {
  const effectivePlaceholder = placeholder ? placeholder : '入力して検索'

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return(
    <>
      <div data-testid={'pull_down_menu_wrapper'}>
        <div className={styles.title}>
          {title}
        </div>
        <div data-testid={'pull_down_menu'} onClick={toggleIsOpen} className={styles.pull_down_menu_container}>
          <div className={styles.triangle}>
            <img src={TriangleIcon} alt={'triangle_icon'}/>
          </div>
          {!isOpen && (
            <>
              <div className={classNames(styles.pull_down_menu_content, {
                  [styles.pull_down_menu_placeholder]: selectedContent === effectivePlaceholder,
                  [styles.pull_down_menu_option]: selectedContent !== effectivePlaceholder
                })}>
                {selectedContent}
              </div>
            </>
          )}
          {isOpen && (
            <>
              <div className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_placeholder}`}>
                {effectivePlaceholder}
              </div>
              {options.map((value,index) => {
                return (
                  <div key={index} className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_option}`} onClick={() => {
                    toggleIsOpen()
                    setSelectedContent(value)
                  }}>
                    {value}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}