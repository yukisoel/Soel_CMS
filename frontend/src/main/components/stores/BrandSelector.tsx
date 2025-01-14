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

type Branch = {
    id: string
    name: string
    checked: boolean
}

export type Store = {
    name: string
    branches: Branch[]
    checked: boolean
}

type Props = {
    stores: Store[]
}

export default function BrandSelector({ stores }: Props) {
  const [storeData, setStoreData] = useState<Store[]>(stores);

  const handleStoreChange = (storeIndex: number) => {
    const newStoreData = [...storeData];
    newStoreData[storeIndex].checked = !newStoreData[storeIndex].checked;
    newStoreData[storeIndex].branches = newStoreData[storeIndex].branches.map(branch => ({
      ...branch,
      checked: newStoreData[storeIndex].checked
    }));
    setStoreData(newStoreData);
  };

  const handleBranchChange = (storeIndex: number, branchIndex: number) => {
    const newStoreData = [...storeData];
    newStoreData[storeIndex].branches[branchIndex].checked = !newStoreData[storeIndex].branches[branchIndex].checked;
    newStoreData[storeIndex].checked = newStoreData[storeIndex].branches.every(branch => branch.checked);
    setStoreData(newStoreData);
  };

  return (
    <Wrapper direction="col">
        <Wrapper direction="col" gap="2rem" padding="4rem 0 4rem 3rem">
            <SearchBox placeholder="店舗名を検索" onChange={() => {}} width="42.7rem" />
            <Checkbox supplementaryText="すべて選択" onChange={() => {}} />
        </Wrapper>
        <Separator width="527px" />
        {storeData.map((store, index) => (
            <BrandWithBranches {...store} key={index} storeIndex={index} onStoreChange={handleStoreChange} onBranchChange={handleBranchChange} />
        ))}
    </Wrapper>
  )
}

type BrandWithBranchesProps = Store & {
  storeIndex: number;
  onStoreChange: (storeIndex: number) => void;
  onBranchChange: (storeIndex: number, branchIndex: number) => void;
}

function BrandWithBranches({ name, branches, checked, storeIndex, onStoreChange, onBranchChange }: BrandWithBranchesProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Wrapper direction="col" gap="5rem" padding="2.5rem 0 3rem 3rem">
                <div className={classNames(styles.store_container)} onClick={() => setIsOpen(!isOpen)}>
                    <Checkbox label={name} supplementaryText={`(${branches.length}店舗)`} checked={checked} onChange={() => onStoreChange(storeIndex)} />
                    <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
                </div>
            {isOpen && (
                <Wrapper direction="col">
                    <Wrapper padding="0 0 2.6rem" gap="2rem" className={styles.checkbox_container}>
                        {branches.map(({name, id, checked}, branchIndex) => (
                            <div className={styles.checkbox_wrapper} key={id}>
                                <Checkbox label={name} checked={checked} onChange={() => onBranchChange(storeIndex, branchIndex)} />
                            </div>
                        ))}
                    </Wrapper>
                    <div className={styles.close_button_wrapper} onClick={() => setIsOpen(!isOpen)}>
                        <Typography content="閉じる" size="small" color="primary" className={styles.close_button} />
                        <img src={ArrowIconYellow} alt="icon" />
                    </div>
                </Wrapper>
            )}
            </Wrapper>
            <Separator width="527px" />
        </>
    )
}
