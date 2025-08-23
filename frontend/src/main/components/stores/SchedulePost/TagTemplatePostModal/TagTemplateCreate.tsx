import React from 'react'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'
import Input from '@/main/common/Input'
import Textarea from '@/main/common/Textarea'
import CloseSymbol from '@/main/assets/CloseSymbol.svg'

type Props = {
    tabsRender: () => React.ReactNode;
    setSelectedTab: (tabKey: string) => void;
    onBack: () => void;
};

export default function TagTemplateCreate({ tabsRender, setSelectedTab, onBack }: Props) {
  return (
    <Wrapper direction="col" gap="4rem">
      <Typography content="タググループを作成" color="primary" size="large" />
      <Wrapper gap="1.5rem">
        {tabsRender()}
        <img src={CloseSymbol} alt="close" onClick={() => setSelectedTab('')} />
      </Wrapper>
      <Wrapper direction="col" gap="1.6rem">
        <Typography content="またはグループのタイトル" color="primary" size="normal" />
        <Input placeholder="グループのタイトルを入力" width="100%" padding="0.7rem 1.5rem" />
      </Wrapper>
      <Wrapper direction="col" gap="1.6rem">
        <Typography content="内容（,コンマ入力で次のタグへ）" color="primary" size="normal" />
        <Textarea
          placeholder="タグを入力（,コンマ入力で次のタグへ）"
          width="100%"
          height="200px"
        />
      </Wrapper>
      <Wrapper justify="justify-end" gap="4rem">
        <Button bgColor="secondary" padding="7px 10px" onClick={onBack}>
          <Typography content="戻る" color="primary" size="normal" weight="normal" />
        </Button>
        <Button bgColor="primary" padding="7px 10px" onClick={() => {}}>
          <Typography content="追加する" color="primary" size="normal" weight="normal" />
        </Button>
      </Wrapper>
    </Wrapper>
  )
}
