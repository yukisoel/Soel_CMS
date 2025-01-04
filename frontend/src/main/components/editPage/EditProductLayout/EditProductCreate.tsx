import Button from "@/main/common/Button";
import useFileUpload from "@/main/common/FileUpload/useFileUpload";
import Input from "@/main/common/Input";
import LayoutLabeledFormItem from "@/main/common/LayoutLabeledFormItem";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import styles from '@/main/components/editPage/EditProductLayout/EditProductCreate.module.scss';
import PhotoPullDownMenu from "../PhotoPullDownMenu";

type Props = {
  onClickSave: () => void
  onClickCancel: () => void
}

export default function EditProductCreate({onClickSave, onClickCancel}: Props) {
  const { render } = useFileUpload({size: 'regular'})
  const pullDownSections = ['すべての商品', '食品', '飲料', 'その他']

  return (
    <Wrapper direction="col" className={styles.edit_product_container}>
      <Wrapper justify="justify-center" gap="2rem" className={styles.header_container}>
        <Button bgColor="secondary" padding="2rem 3.2rem 2.2rem 3.1rem" onClick={onClickCancel}>
            <Typography content="キャンセル" size="medium" color="primary" />
        </Button>
        <Button bgColor="primary" padding="2rem 4.3rem 2.2rem 4.5rem" onClick={onClickSave}>
            <Typography content="公開する" size="medium" color="primary" />
        </Button>
      </Wrapper>
      <Wrapper padding="5rem 4rem 5rem 10rem" gap="5rem" direction="col" justify="justify-center" align="align-center" className={styles.product_container}>
        <Wrapper gap="5rem" direction="col" padding="0 8rem 0 0" className={styles.product_form_container}>
          {render()}
          <Wrapper direction="col" gap="4rem">
            <LayoutLabeledFormItem label="商品名">
              <Input placeholder="商品名/サービス名を入力" width="100%" padding="2.3rem 3.8rem 2.3rem 3.8rem" />
            </LayoutLabeledFormItem>
            <Wrapper gap="4rem">
              <LayoutLabeledFormItem label="カテゴリ">
                <div className={styles.pull_down_menu}>
                  <PhotoPullDownMenu options={pullDownSections} selectedContent="すべての商品" setSelectedContent={() => {}} />
                </div>
              </LayoutLabeledFormItem>
              <LayoutLabeledFormItem label="価格を設定">
                <Input placeholder="価格（JPY）を入力" width="726px" padding="2.3rem 3.8rem 2.3rem 3.8rem" />
              </LayoutLabeledFormItem>
            </Wrapper>
            <LayoutLabeledFormItem label="商品説明">
              <Input placeholder="商品名の説明を入力" width="100%" padding="2.3rem 3.8rem 2.3rem 3.8rem" />
            </LayoutLabeledFormItem>
          </Wrapper>
          <LayoutLabeledFormItem label="商品URL">
            <Input placeholder="商品のURLを入力" width="100%" padding="2.3rem 3.8rem 2.3rem 3.8rem" />
          </LayoutLabeledFormItem>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
