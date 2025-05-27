import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";

type Props = {
  children: React.ReactNode
  label: string
  className?: string
  counter?: {
    current: number
    max: number
  }
}

export default function LayoutLabeledFormItem({label, children, className, counter}: Props) {
  return (
    <Wrapper direction="col" gap="1rem" className={className}>
          <Typography content={label} size="normal" color="primary" />
      <Wrapper direction="col" gap="0.5rem">
        {children}
        {counter && (
          <Wrapper justify="justify-end">
            <Typography
              content={`${counter.current} / ${counter.max}`}
              size="xsmall"
              color={counter.current > counter.max ? "error" : "secondary"}
            />
          </Wrapper>
        )}
      </Wrapper>
    </Wrapper>
  )
}
