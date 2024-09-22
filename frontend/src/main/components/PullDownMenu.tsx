import styles from '@/main/components/PullDownMenu.module.scss'
import {useState} from "react";
import classNames from "classnames";
import TriangleIcon from "@/main/assets/PullDownMenuTriangle.svg";

export type Props = {
  title: string
  placeholder?: string
  selectedContent: string
  setSelectedContent: (content: string) => void
  selectedPullDownMenu: string
  setSelectedPullDownMenu: (content: string) => void
  options: string[]
}

export default function PullDownMenu({
                                       title,
                                       placeholder,
                                       selectedContent,
                                       setSelectedContent,
                                       selectedPullDownMenu,
                                       setSelectedPullDownMenu,
                                       options
                                     }: Props) {
  const effectivePlaceholder = placeholder ? placeholder : '入力して検索'

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
    if (selectedPullDownMenu === title) {
      setSelectedPullDownMenu("none")
    } else {
      setSelectedPullDownMenu(title)
    }

  }

  return (
    <>
      <div data-testid={'pull_down_menu_wrapper'}>
        <div className={classNames({
          [styles.title]: selectedPullDownMenu !== title,
          [styles.selected_title]: selectedPullDownMenu === title
        })}>
          {title}
        </div>
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
                [styles.pull_down_menu_placeholder]: selectedContent === effectivePlaceholder,
                [styles.pull_down_menu_option]: selectedContent !== effectivePlaceholder
              })}>
                {selectedContent}
              </div>
            </>
          )}
          {isOpen && (
            <>
              <div className={styles.opened_pull_down_menu_container}>
                <div
                  className={`${styles.pull_down_menu_content} ${styles.pull_down_menu_placeholder} ${styles.pull_down_menu_border}`}>
                  {effectivePlaceholder}
                </div>
                <div className={styles.pull_down_menu_option_container}>
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
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}