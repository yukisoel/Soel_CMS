import styles from './TemplateSelect.module.scss';
import Wrapper from '../Wrapper';
import Typography from '../Typography';
import Button from '../Button';
import Separator from '../Separator';

type Props = {
    tabsRender: () => React.ReactNode
    templates: Template[]
    onCreateClick: () => void
};

export type Template = {
    title: string
    content: string
}

export default function TemplateSelect({ templates, tabsRender, onCreateClick }: Props) {
    return (
            <Wrapper direction="col" gap="1rem">
                <Wrapper gap="3rem" padding="0 0 2rem">
                    {tabsRender()}
                    <Button bgColor="primary" onClick={onCreateClick}>
                        <Typography content="新規作成" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
                <Separator />
                {
                    templates.map((template) => (
                        <>
                            <Wrapper justify="justify-between" align="align-center">
                                <Typography content={template.title} color="primary" size="normal" weight="normal" className={styles.template_title}/>
                                <Typography content={template.content} color="primary" size="normal" weight="normal" className={styles.template_content} />
                            </Wrapper>
                            <Separator />
                        </>
                    ))
                }
            </Wrapper>
    )}
