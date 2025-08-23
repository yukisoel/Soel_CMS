import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Branch, Store } from './SelectStore'
import styles from '@/main/components/stores/SelectStore/BrandSelector.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Checkbox from '@/main/common/Checkbox'
import ArrowIcon from '@/main/assets/ArrowIcon.svg'
import ArrowIconYellow from '@/main/assets/ArrowIconYellow.svg'
import Separator from '@/main/common/Separator'

type Props = {
    stores: Store[];
    onChangeSelectedBranches: (branches: Branch[]) => void;
};

export default function BrandSelector({ stores, onChangeSelectedBranches }: Props) {
  const [storeData, setStoreData] = useState<Store[]>(stores)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)

  useEffect(() => {
    setStoreData(stores)
  }, [stores])

  useEffect(() => {
    const branches = storeData.reduce((acc, store) => {
      const selectedBranches = store.branches.filter(branch => branch.checked)
      return [...acc, ...selectedBranches]
    }, [] as Branch[])
    onChangeSelectedBranches(branches)

    const allChecked = storeData.every(store => store.checked)
    const someChecked = storeData.some(store => store.checked || store.branches.some(branch => branch.checked))
    setSelectAll(allChecked)
    setIndeterminate(!allChecked && someChecked)
  }, [storeData, onChangeSelectedBranches])

  const handleStoreChange = (storeIndex: number) => {
    const newStoreData = [...storeData]
    newStoreData[storeIndex].checked = !newStoreData[storeIndex].checked
    newStoreData[storeIndex].branches = newStoreData[storeIndex].branches.map(branch => ({
      ...branch,
      checked: newStoreData[storeIndex].checked
    }))
    setStoreData(newStoreData)
  }

  const handleBranchChange = (storeIndex: number, branchIndex: number) => {
    const newStoreData = [...storeData]
    newStoreData[storeIndex].branches[branchIndex].checked = !newStoreData[storeIndex].branches[branchIndex].checked
    newStoreData[storeIndex].checked = newStoreData[storeIndex].branches.every(branch => branch.checked)
    setStoreData(newStoreData)
  }

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    const newStoreData = storeData.map(store => ({
      ...store,
      checked: newSelectAll,
      branches: store.branches.map(branch => ({
        ...branch,
        checked: newSelectAll
      }))
    }))
    setStoreData(newStoreData)
  }

  return (
    <Wrapper direction="col">
      <Wrapper direction="col" gap="2rem" padding="4rem 0 4rem 3rem">
        <Checkbox label="すべて選択" checked={selectAll} indeterminate={indeterminate} onChange={handleSelectAllChange} />
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
};

function BrandWithBranches({ name, branches, checked, storeIndex, onStoreChange, onBranchChange }: BrandWithBranchesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const indeterminate = branches.some(branch => branch.checked) && !branches.every(branch => branch.checked)

  return (
    <>
      <Wrapper direction="col" gap="5rem" padding="2.5rem 0 3rem 3rem">
        <div className={classNames(styles.store_container)} onClick={() => setIsOpen(!isOpen)}>
          <Checkbox label={name} supplementaryText={`(${branches.length}店舗)`} checked={checked} indeterminate={indeterminate} onChange={() => onStoreChange(storeIndex)} />
          <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
        </div>
        {isOpen && (
          <Wrapper direction="col">
            <Wrapper padding="0 0 2.6rem 2rem" gap="2rem" className={styles.checkbox_container}>
              {branches.map(({ name, checked }, branchIndex) => (
                <div className={styles.checkbox_wrapper} key={branchIndex}>
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
