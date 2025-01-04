import Wrapper from "@/main/common/Wrapper";
import styles from '@/main/components/editPage/EditProductLayout/EditProductLayout.module.scss';
import PhotoPullDownMenu from "../PhotoPullDownMenu";
import Button from "@/main/common/Button";
import Typography from "@/main/common/Typography";

type Props = {
  pullDownSections: string[]
  productList: string[]
  onClickCreate: () => void
  onClickEdit: () => void
}

export default function EditProductList({pullDownSections, productList, onClickCreate, onClickEdit}: Props) {
  return (
    <Wrapper direction="col" className={styles.edit_product_container}>
      <Wrapper justify="justify-between" className={styles.header_container}>
        <div className={styles.pull_down_menu}>
            <PhotoPullDownMenu options={pullDownSections} selectedContent="すべての商品" setSelectedContent={() => {}} />
        </div>
        <Button bgColor="primary" padding="2rem 4.3rem 2.2rem 4.5rem" onClick={onClickCreate}>
            <Typography content="商品を追加" size="medium" color="primary" />
        </Button>
      </Wrapper>
      <Wrapper padding="5rem 7rem 5rem 11.1rem" className={styles.product_container}>
        <Wrapper padding="0 14rem 0 7.1rem" gap="2rem" className={styles.image_grid}>
            {productList.map((_, index) => (
            <div key={index} className={styles.image_item}>
                <div className={styles.box} onClick={onClickEdit}/>
            </div>
            ))}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
