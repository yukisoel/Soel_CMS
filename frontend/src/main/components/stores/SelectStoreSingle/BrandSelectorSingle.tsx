import classNames from 'classnames'
import { useState } from 'react'
import { Branch, Store } from './SelectStoreSingle'
import styles from '@/main/components/stores/SelectStoreSingle/BrandSelectorSingle.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import RadioButton from '@/main/common/RadioButton'
import ArrowIcon from '@/main/assets/ArrowIcon.svg'
import ArrowIconYellow from '@/main/assets/ArrowIconYellow.svg'
import Separator from '@/main/common/Separator'

type Props = {
    stores: Store[];
    onChangeSelectedBranch: (branch: Branch) => void;
};

export default function BrandSelectorSingle({ stores, onChangeSelectedBranch }: Props) {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)

  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch)
    onChangeSelectedBranch(branch)
  }

  return (
    <Wrapper direction="col">
      {stores.map((store, storeIndex) => (
        <BrandWithBranches
          {...store}
          key={storeIndex}
          storeIndex={storeIndex}
          selectedBranch={selectedBranch}
          onBranchChange={handleBranchChange}
        />
      ))}
    </Wrapper>
  )
}

type BrandWithBranchesProps = Store & {
    storeIndex: number;
    selectedBranch: Branch | null;
    onBranchChange: (branch: Branch) => void;
};

function BrandWithBranches({ name, branches, selectedBranch, onBranchChange }: BrandWithBranchesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Wrapper direction="col" gap="5rem" padding="2.5rem 0 3rem 3rem">
        <div className={classNames(styles.store_container)} onClick={() => setIsOpen(!isOpen)}>
          <Wrapper>
            <Typography content={`${name}`} size="normal" color="primary" />
            <Typography content={`（${branches.length}店舗）`} size="normal" color="secondary" />
          </Wrapper>
          <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
        </div>
        {isOpen && (
          <Wrapper direction="col">
            <Wrapper padding="0 0 2.6rem" gap="2rem" className={styles.checkbox_container}>
              {branches.map((branch, branchIndex) => (
                <div className={styles.checkbox_wrapper} key={branchIndex}>
                  <RadioButton
                    name="branch"
                    label={branch.name}
                    value={branch.id}
                    checked={selectedBranch?.id === branch.id}
                    onChange={() => onBranchChange(branch)}
                  />
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
