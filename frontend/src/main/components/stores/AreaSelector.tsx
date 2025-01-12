import styles from "@/main/components/stores/AreaSelector.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Checkbox from "@/main/common/Checkbox";
import ArrowIcon from "@/main/assets/ArrowIcon.svg";
import ArrowIconYellow from "@/main/assets/ArrowIconYellow.svg";
import classNames from "classnames";
import { useState } from "react";
import Separator from "@/main/common/Separator";

export type Branch = {
    name: string
}

export type Store = {
    name: string
    branches: string[]
}

export type Prefecture = {
    name: string
    stores: Store[]
}

export type Region = {
    name: string
    prefectures: Prefecture[]
}

type Props = {
    regions: Region[]
}

export default function AreaSelector({ regions }: Props) {
  return (
    <Wrapper direction="col">
        <Wrapper direction="col" gap="2rem" padding="4rem 0 4rem 3rem">
            <Checkbox supplementaryText="すべて選択" onChange={() => {}} />
        </Wrapper>
        <Separator width="527px" />
        {
            regions.map((region, index) => (
                <RegionWithPrefectures {...region} key={index} />
            ))
        }
    </Wrapper>
  )
}

function RegionWithPrefectures({ name, prefectures }: Region) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <Wrapper direction="col" padding="2.5rem 0 3rem 3rem">
                <div className={classNames(styles.brand_container)} onClick={() => setIsOpen(!isOpen)}>
                    <Checkbox label={name} onChange={() => {}} />
                    <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
                </div>
            {isOpen &&
                <Wrapper direction="col" gap="2rem" padding="3rem 0 3rem 2rem">
                    {prefectures.map(({name: prefectureName, stores}, index) => (
                        <PrefectureWithStores name={prefectureName} stores={stores} key={index} />
                    ))}
                </Wrapper>
            }
            </Wrapper>
            <Separator width="527px" />
        </>
    )
}

function PrefectureWithStores({ name, stores }: Prefecture) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Wrapper direction="col" gap="3rem">
            <div className={classNames(styles.prefecture_container)} onClick={() => setIsOpen(!isOpen)}>
                <Checkbox label={name} onChange={() => {}} />
                <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
            </div>
            {isOpen && (
                <>
                    <Separator width="1200px" />
                    <Wrapper direction="col" gap="2rem" padding="0 0 0 2rem">
                        {stores.map(({name: storeName, branches}, index) => (
                            <StoreWithBranches name={storeName} branches={branches} key={index} />
                        ))}
                    </Wrapper>
                </>
            )}
        </Wrapper>
    )
}

function StoreWithBranches({ name, branches }: Store) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <div className={classNames(styles.prefecture_container)} onClick={() => setIsOpen(!isOpen)}>
                <Checkbox label={name} supplementaryText={`(${branches.length}店舗)`} onChange={() => {}} />
                <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
            </div>
            {isOpen && (
                <Wrapper direction="col">
                    <Wrapper padding="0 0 2.6rem 2rem" gap="2rem" className={styles.checkbox_container}>
                        {branches.map((branch, index) => (
                            <div className={styles.checkbox_wrapper} key={index}>
                                <Checkbox label={branch} onChange={() => {}} />
                            </div>
                        ))}
                    </Wrapper>
                    <div className={styles.close_button_wrapper} onClick={() => setIsOpen(!isOpen)}>
                        <Typography content="閉じる" size="small" color="primary" className={styles.close_button} />
                        <img src={ArrowIconYellow} alt="icon" />
                    </div>
                    <Separator width="1200px" className={styles.branche_separator} />
                </Wrapper>
            )}
        </>
    )
}
