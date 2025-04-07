import styles from "@/main/components/stores/SelectStoreSingle/AreaSelectorSingle.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import RadioButton from "@/main/common/RadioButton";
import ArrowIcon from "@/main/assets/ArrowIcon.svg";
import ArrowIconYellow from "@/main/assets/ArrowIconYellow.svg";
import classNames from "classnames";
import { useState } from "react";
import Separator from "@/main/common/Separator";
import { Branch, Prefecture, Region, Store } from "../SelectStoreSingle/SelectStoreSingle";

type Props = {
    regions: Region[];
    onChangeSelectedBranch: (branch: Branch) => void;
};

export default function AreaSelectorSingle({ regions, onChangeSelectedBranch }: Props) {
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const handleBranchChange = (branch: Branch) => {
        setSelectedBranch(branch);
        onChangeSelectedBranch(branch);
    };

    return (
        <Wrapper direction="col">
            {regions.map((region, regionIndex) => (
                <RegionWithPrefectures
                    {...region}
                    key={regionIndex}
                    regionIndex={regionIndex}
                    selectedBranch={selectedBranch}
                    onBranchChange={handleBranchChange}
                />
            ))}
        </Wrapper>
    );
}

type RegionWithPrefecturesProps = Region & {
    regionIndex: number;
    selectedBranch: Branch | null;
    onBranchChange: (branch: Branch) => void;
};

function RegionWithPrefectures({ name, prefectures, regionIndex, selectedBranch, onBranchChange }: RegionWithPrefecturesProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Wrapper direction="col" padding="2.5rem 0 3rem 3rem">
                <div className={classNames(styles.brand_container)} onClick={() => setIsOpen(!isOpen)}>
                    <Typography content={name} size="normal" color="primary" />
                    <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
                </div>
                {isOpen && (
                    <Wrapper direction="col" gap="2rem" padding="3rem 0 3rem 2rem">
                        {prefectures.map(({ name: prefectureName, stores }, prefectureIndex) => (
                            <PrefectureWithStores
                                name={prefectureName}
                                stores={stores}
                                key={prefectureIndex}
                                regionIndex={regionIndex}
                                prefectureIndex={prefectureIndex}
                                selectedBranch={selectedBranch}
                                onBranchChange={onBranchChange}
                            />
                        ))}
                    </Wrapper>
                )}
            </Wrapper>
            <Separator width="527px" />
        </>
    );
}

type PrefectureWithStoresProps = Prefecture & {
    regionIndex: number;
    prefectureIndex: number;
    selectedBranch: Branch | null;
    onBranchChange: (branch: Branch) => void;
};

function PrefectureWithStores({ name, stores, regionIndex, prefectureIndex, selectedBranch, onBranchChange }: PrefectureWithStoresProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Wrapper direction="col" gap="3rem">
            <div className={classNames(styles.prefecture_container)} onClick={() => setIsOpen(!isOpen)}>
                <Typography content={name} size="normal" color="primary" />
                <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
            </div>
            {isOpen && (
                <>
                    <Separator width="1200px" />
                    <Wrapper direction="col" gap="2rem" padding="0 0 0 2rem">
                        {stores.map(({ name: storeName, branches }, storeIndex) => (
                            <StoreWithBranches
                                name={storeName}
                                branches={branches}
                                key={storeIndex}
                                regionIndex={regionIndex}
                                prefectureIndex={prefectureIndex}
                                storeIndex={storeIndex}
                                selectedBranch={selectedBranch}
                                onBranchChange={onBranchChange}
                            />
                        ))}
                    </Wrapper>
                </>
            )}
        </Wrapper>
    );
}

type StoreWithBranchesProps = Store & {
    regionIndex: number;
    prefectureIndex: number;
    storeIndex: number;
    selectedBranch: Branch | null;
    onBranchChange: (branch: Branch) => void;
};

function StoreWithBranches({ name, branches, regionIndex, prefectureIndex, storeIndex, selectedBranch, onBranchChange }: StoreWithBranchesProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={classNames(styles.prefecture_container)} onClick={() => setIsOpen(!isOpen)}>
                <Wrapper>
                    <Typography content={`${name}`} size="normal" color="primary"/>
                    <Typography content={`（${branches.length}店舗）`} size="normal" color="secondary"/>
                </Wrapper>
                <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
            </div>
            {isOpen && (
                <Wrapper direction="col">
                    <Wrapper padding="0 0 2.6rem 2rem" gap="2rem" className={styles.checkbox_container}>
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
                    <Separator width="1200px" className={styles.branche_separator} />
                </Wrapper>
            )}
        </>
    );
}
