import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";

type Props = {
  children: React.ReactNode
  label: string
}

export default function LayoutLabeledFormItem({label, children}: Props) {
  return (
    <Wrapper direction="col" gap="1rem">
    <Wrapper padding="0 0 0 3.8rem">
        <Typography content={label} size="medium" color="primary" />
    </Wrapper>
      {children}
    </Wrapper>
  )
}
