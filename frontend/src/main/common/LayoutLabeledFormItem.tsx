import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";

type Props = {
  children: React.ReactNode
  label: string
  className?: string
}

export default function LayoutLabeledFormItem({label, children, className}: Props) {
  return (
    <Wrapper direction="col" gap="1rem" className={className}>
      <Wrapper>
          <Typography content={label} size="normal" color="primary" />
      </Wrapper>
      {children}
    </Wrapper>
  )
}
