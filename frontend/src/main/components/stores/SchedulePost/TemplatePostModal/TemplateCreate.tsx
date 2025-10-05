import CloseSymbol from '@/main/assets/CloseSymbol.svg'
import Button from '@/main/common/Button'
import Input from '@/main/common/Input'
import Textarea from '@/main/common/Textarea'
import Typography from '@/main/common/Typography'
import Wrapper from '@/main/common/Wrapper'

type Props = {
    tabsRender: () => React.ReactNode;
    setSelectedTab: (tabKey: string) => void;
    onBack: () => void;
};

export default function TemplateCreate({ tabsRender, setSelectedTab, onBack }: Props) {
  return (
    <Wrapper direction="col" gap="3rem">
      <Wrapper direction="col" gap="1.5rem">
        <Typography content="グループを選択" color="primary" size="normal" />
        <Wrapper gap="1.5rem">
          {tabsRender()}
          <img src={CloseSymbol} alt="close" onClick={() => setSelectedTab('')} />
        </Wrapper>
      </Wrapper>
      <Wrapper direction="col" gap="1.5rem">
        <Typography content="またはグループのタイトル" color="primary" size="normal" />
        <Input placeholder="グループのタイトルを入力" width="100%" padding="0.7rem 1.5rem " />
      </Wrapper>
      <Wrapper direction="col" gap="1.5rem">
        <Typography content="テンプレートのタイトル" color="primary" size="normal" />
        <Input placeholder="テンプレートのタイトルを入力" width="100%" padding="0.7rem 1.5rem " />
      </Wrapper>
      <Wrapper direction="col" gap="1.5rem">
        <Typography content="テンプレートの内容" color="primary" size="normal" />
        <Textarea
          placeholder="投稿の内容を入力"
          width="1000px"
          height="289px"
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
