import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './TagTemplateSelect.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'
import CloseSymbolYellow from '@/main/assets/CloseSymbolYellow.svg'

type Props = {
    tabsRender: () => React.ReactNode;
    subTabsRender: () => React.ReactNode;
    tags: string[];
    onCreateClick: () => void;
};

export default function TagTemplateSelect({ tags, tabsRender, subTabsRender, onCreateClick }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  return (
    <Wrapper direction="col" gap="4rem">
      <Wrapper align="align-start">
        {tabsRender()}
      </Wrapper>
      <Wrapper gap="3rem">
        {subTabsRender()}
        <Button bgColor="primary" onClick={onCreateClick}>
          <Typography content="新規作成" color="primary" size="normal" weight="normal" />
        </Button>
      </Wrapper>
      <Wrapper gap="2rem">
        {tags.map((tag, index) => (
          <Wrapper
            key={index}
            gap="2rem"
            className={styles.tag_container}
            onClick={() => handleTagClick(tag)}
          >
            <Typography content={tag} color="primary" size="normal" weight="normal" className={classNames(styles.tag, selectedTags.includes(tag) ? styles.selected : '')} />
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper direction="col" gap="2rem">
        <Typography content="選択中のタグ" color="primary" size="normal" />
        <Wrapper padding="2rem" gap="2rem" className={styles.selected_tag_container} align="align-start">
          {selectedTags.map((tag, index) => (
            <Wrapper key={index} direction="row" gap="1rem" className={styles.selected_tag}>
              <Typography content={tag} color="primary" size="normal" />
              <img src={CloseSymbolYellow} alt="close" onClick={() => handleRemoveTag(tag)} />
            </Wrapper>
          ))}
        </Wrapper>
      </Wrapper>
      <Wrapper justify="justify-end" gap="4rem">
        <Button bgColor="secondary" padding="7px 10px" onClick={() => {}}>
          <Typography content="戻る" color="primary" size="normal" weight="normal" />
        </Button>
        <Button bgColor="primary" padding="7px 10px" onClick={() => {}}>
          <Typography content="追加する" color="primary" size="normal" weight="normal" />
        </Button>
      </Wrapper>
    </Wrapper>
  )
}
