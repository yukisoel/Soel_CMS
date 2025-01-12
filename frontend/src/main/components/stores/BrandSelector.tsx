import styles from "@/main/components/stores/BrandSelector.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SearchBox from "@/main/common/SearchBox";
import Checkbox from "@/main/common/Checkbox";
import ArrowIcon from "@/main/assets/ArrowIcon.svg";
import ArrowIconYellow from "@/main/assets/ArrowIconYellow.svg";
import classNames from "classnames";
import { useState } from "react";
import Separator from "@/main/common/Separator";

type Store = {
    name: string
    branches: string[]
}

type Props = {
    stores: Store[]
}

export default function BrandSelector({ stores }: Props) {
  return (
    <Wrapper direction="col">
        <Wrapper direction="col" gap="2rem" padding="4rem 0 4rem 3rem">
            <SearchBox placeholder="店舗名を検索" onChange={() => {}} width="42.7rem" />
            <Checkbox supplementaryText="すべて選択" onChange={() => {}} />
        </Wrapper>
        <Separator width="527px" />
        {stores.map((store, index) => (
            <BrandWithBranches {...store} key={index} />
        ))}
    </Wrapper>
  )
}

function BrandWithBranches({ name, branches }: Store) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <Wrapper direction="col" gap="5rem" padding="2.5rem 0 3rem 3rem">
                <div className={classNames(styles.store_container)} onClick={() => setIsOpen(!isOpen)}>
                    <Checkbox label={name} supplementaryText={`(${branches.length}店舗)`} onChange={() => {}} />
                    <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
                </div>
            {isOpen && (
                <Wrapper direction="col">
                    <Wrapper padding="0 0 2.6rem" gap="2rem" className={styles.checkbox_container}>
                        {branches.map(branch => (
                            <div className={styles.checkbox_wrapper}>
                                <Checkbox label={branch} onChange={() => {}} />
                            </div>
                        ))}
                    </Wrapper>
                    <div className={styles.close_button_wrapper} onClick={() => setIsOpen(!isOpen)}>
                        <Typography content="閉じる" size="small" color="primary" className={styles.close_button} />
                        <img src={ArrowIconYellow} alt="icon" className={classNames()} />
                    </div>
                </Wrapper>
            )}
            </Wrapper>
            <Separator width="527px" />
        </>
    )
}
