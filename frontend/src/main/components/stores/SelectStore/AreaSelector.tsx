import styles from "@/main/components/stores/SelectStore/AreaSelector.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Checkbox from "@/main/common/Checkbox";
import ArrowIcon from "@/main/assets/ArrowIcon.svg";
import ArrowIconYellow from "@/main/assets/ArrowIconYellow.svg";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Separator from "@/main/common/Separator";
import { Branch, Prefecture, Region, Store } from "./SelectStore";

type Props = {
    regions: Region[];
    onChangeSelectedBranches: (branches: Branch[]) => void;
};

export default function AreaSelector({ regions, onChangeSelectedBranches }: Props) {
    const [regionData, setRegionData] = useState<Region[]>(regions);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    useEffect(() => {
        const branches = regionData.reduce((acc, region) => {
            const selectedBranches = region.prefectures.reduce((acc, prefecture) => {
                const selectedStores = prefecture.stores.reduce((acc, store) => {
                    const selectedBranches = store.branches.filter(branch => branch.checked);
                    return [...acc, ...selectedBranches];
                }, [] as Branch[]);
                return [...acc, ...selectedStores];
            }, [] as Branch[]);
            return [...acc, ...selectedBranches];
        }, [] as Branch[]);
        onChangeSelectedBranches(branches);
    }, [regionData]);

    const handleRegionChange = (regionIndex: number) => {
        const newRegionData = [...regionData];
        newRegionData[regionIndex].checked = !newRegionData[regionIndex].checked;
        newRegionData[regionIndex].prefectures = newRegionData[regionIndex].prefectures.map(prefecture => ({
            ...prefecture,
            checked: newRegionData[regionIndex].checked,
            stores: prefecture.stores.map(store => ({
                ...store,
                checked: newRegionData[regionIndex].checked,
                branches: store.branches.map(branch => ({
                    ...branch,
                    checked: newRegionData[regionIndex].checked
                }))
            }))
        }));
        setRegionData(newRegionData);
    };

    const handlePrefectureChange = (regionIndex: number, prefectureIndex: number) => {
        const newRegionData = [...regionData];
        newRegionData[regionIndex].prefectures[prefectureIndex].checked = !newRegionData[regionIndex].prefectures[prefectureIndex].checked;
        newRegionData[regionIndex].prefectures[prefectureIndex].stores = newRegionData[regionIndex].prefectures[prefectureIndex].stores.map(store => ({
            ...store,
            checked: newRegionData[regionIndex].prefectures[prefectureIndex].checked,
            branches: store.branches.map(branch => ({
                ...branch,
                checked: newRegionData[regionIndex].prefectures[prefectureIndex].checked
            }))
        }));
        setRegionData(newRegionData);
    };

    const handleStoreChange = (regionIndex: number, prefectureIndex: number, storeIndex: number) => {
        const newRegionData = [...regionData];
        newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].checked = !newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].checked;
        newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].branches = newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].branches.map(branch => ({
            ...branch,
            checked: newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].checked
        }));
        setRegionData(newRegionData);
    };

    const handleBranchChange = (regionIndex: number, prefectureIndex: number, storeIndex: number, branchIndex: number) => {
        const newRegionData = [...regionData];
        newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].branches[branchIndex].checked = !newRegionData[regionIndex].prefectures[prefectureIndex].stores[storeIndex].branches[branchIndex].checked;
        setRegionData(newRegionData);
    };

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const newRegionData = regionData.map(region => ({
            ...region,
            checked: newSelectAll,
            prefectures: region.prefectures.map(prefecture => ({
                ...prefecture,
                checked: newSelectAll,
                stores: prefecture.stores.map(store => ({
                    ...store,
                    checked: newSelectAll,
                    branches: store.branches.map(branch => ({
                        ...branch,
                        checked: newSelectAll
                    }))
                }))
            }))
        }));
        setRegionData(newRegionData);
    };

    return (
        <Wrapper direction="col">
            <Wrapper direction="col" gap="2rem" padding="4rem 0 4rem 3rem">
                <Checkbox label="すべて選択" checked={selectAll} onChange={handleSelectAllChange} />
            </Wrapper>
            <Separator width="527px" />
            {regionData.map((region, regionIndex) => (
                <RegionWithPrefectures
                    {...region}
                    key={regionIndex}
                    regionIndex={regionIndex}
                    onRegionChange={handleRegionChange}
                    onPrefectureChange={handlePrefectureChange}
                    onStoreChange={handleStoreChange}
                    onBranchChange={handleBranchChange}
                />
            ))}
        </Wrapper>
    );
}

type RegionWithPrefecturesProps = Region & {
    regionIndex: number;
    onRegionChange: (regionIndex: number) => void;
    onPrefectureChange: (regionIndex: number, prefectureIndex: number) => void;
    onStoreChange: (regionIndex: number, prefectureIndex: number, storeIndex: number) => void;
    onBranchChange: (regionIndex: number, prefectureIndex: number, storeIndex: number, branchIndex: number) => void;
};

function RegionWithPrefectures({ name, prefectures, checked, regionIndex, onRegionChange, onPrefectureChange, onStoreChange, onBranchChange }: RegionWithPrefecturesProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Wrapper direction="col" padding="2.5rem 0 3rem 3rem">
                <div className={classNames(styles.brand_container)} onClick={() => setIsOpen(!isOpen)}>
                    <Checkbox label={name} checked={checked} onChange={() => onRegionChange(regionIndex)} />
                    <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
                </div>
                {isOpen && (
                    <Wrapper direction="col" gap="2rem" padding="3rem 0 3rem 2rem">
                        {prefectures.map(({ name: prefectureName, stores, checked }, prefectureIndex) => (
                            <PrefectureWithStores
                                name={prefectureName}
                                stores={stores}
                                checked={checked}
                                key={prefectureIndex}
                                regionIndex={regionIndex}
                                prefectureIndex={prefectureIndex}
                                onPrefectureChange={onPrefectureChange}
                                onStoreChange={onStoreChange}
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
    onPrefectureChange: (regionIndex: number, prefectureIndex: number) => void;
    onStoreChange: (regionIndex: number, prefectureIndex: number, storeIndex: number) => void;
    onBranchChange: (regionIndex: number, prefectureIndex: number, storeIndex: number, branchIndex: number) => void;
};

function PrefectureWithStores({ name, stores, checked, regionIndex, prefectureIndex, onPrefectureChange, onStoreChange, onBranchChange }: PrefectureWithStoresProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Wrapper direction="col" gap="3rem">
            <div className={classNames(styles.prefecture_container)} onClick={() => setIsOpen(!isOpen)}>
                <Checkbox label={name} checked={checked} onChange={() => onPrefectureChange(regionIndex, prefectureIndex)} />
                <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
            </div>
            {isOpen && (
                <>
                    <Separator width="1200px" />
                    <Wrapper direction="col" gap="2rem" padding="0 0 0 2rem">
                        {stores.map(({ name: storeName, branches, checked }, storeIndex) => (
                            <StoreWithBranches
                                name={storeName}
                                branches={branches}
                                checked={checked}
                                key={storeIndex}
                                regionIndex={regionIndex}
                                prefectureIndex={prefectureIndex}
                                storeIndex={storeIndex}
                                onStoreChange={onStoreChange}
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
    onStoreChange: (regionIndex: number, prefectureIndex: number, storeIndex: number) => void;
    onBranchChange: (regionIndex: number, prefectureIndex: number, storeIndex: number, branchIndex: number) => void;
};

function StoreWithBranches({ name, branches, checked, regionIndex, prefectureIndex, storeIndex, onStoreChange, onBranchChange }: StoreWithBranchesProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={classNames(styles.prefecture_container)} onClick={() => setIsOpen(!isOpen)}>
                <Checkbox label={name} supplementaryText={`(${branches.length}店舗)`} checked={checked} onChange={() => onStoreChange(regionIndex, prefectureIndex, storeIndex)} />
                <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
            </div>
            {isOpen && (
                <Wrapper direction="col">
                    <Wrapper padding="0 0 2.6rem 2rem" gap="2rem" className={styles.checkbox_container}>
                        {branches.map(({ name, checked }, branchIndex) => (
                            <div className={styles.checkbox_wrapper} key={branchIndex}>
                                <Checkbox label={name} checked={checked} onChange={() => onBranchChange(regionIndex, prefectureIndex, storeIndex, branchIndex)} />
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
