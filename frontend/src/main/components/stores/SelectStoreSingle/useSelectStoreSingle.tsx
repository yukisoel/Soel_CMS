import { useState } from "react";
import SelectStoreSingle from "./SelectStoreSingle";
import { GoogleService } from "@/main/service/GoogleService";
import { Branch, Region, Store } from "../SelectStoreSingle/SelectStoreSingle";

type Props = {
    googleService: GoogleService;
    onNextClick: () => void;
    onBackClick: () => void;
};

const brandSelectorProps: Store[] = [
    {
        name: '鳥貴族',
        branches: [
            { id: '1', name: '熱海店' },
            { id: '2', name: '青山一丁目駅前' },
            { id: '3', name: '六本木ヒルズ' },
            { id: '4', name: '文字数が多い場合は改行です' },
            { id: '5', name: '六本木ヒルズ' },
            { id: '16', name: '渋谷店' },
            { id: '17', name: '新宿店' },
            { id: '18', name: '池袋店' },
            { id: '19', name: '上野店' },
            { id: '20', name: '秋葉原店' },
        ],
    },
    {
        name: '焼肉きんぐ',
        branches: [
            { id: '6', name: '熱海店' },
            { id: '7', name: '青山一丁目駅前' },
            { id: '8', name: '六本木ヒルズ' },
            { id: '9', name: '文字数が多い場合は改行です' },
            { id: '10', name: '六本木ヒルズ' },
            { id: '21', name: '渋谷店' },
            { id: '22', name: '新宿店' },
            { id: '23', name: '池袋店' },
            { id: '24', name: '上野店' },
            { id: '25', name: '秋葉原店' },
        ],
    },
    {
        name: 'サイゼリヤ',
        branches: [
            { id: '26', name: '熱海店' },
            { id: '27', name: '青山一丁目駅前' },
            { id: '28', name: '六本木ヒルズ' },
            { id: '29', name: '文字数が多い場合は改行です' },
            { id: '30', name: '六本木ヒルズ' },
            { id: '31', name: '渋谷店' },
            { id: '32', name: '新宿店' },
            { id: '33', name: '池袋店' },
            { id: '34', name: '上野店' },
            { id: '35', name: '秋葉原店' },
        ],
    }
];

const areaSelectorProps: Region[] = [
    {
        name: '東北',
        prefectures: [
            {
                name: '青森',
                stores: [
                    {
                        name: '鳥貴族',
                        branches: [
                            { id: '11', name: '熱海店' },
                            { id: '12', name: '青山一丁目駅前' },
                            { id: '13', name: '六本木ヒルズ' },
                            { id: '14', name: '文字数が多い場合は改行です' },
                            { id: '15', name: '六本木ヒルズ' },
                        ],
                    },
                    {
                        name: '焼肉きんぐ',
                        branches: [
                            { id: '36', name: '熱海店' },
                            { id: '37', name: '青山一丁目駅前' },
                            { id: '38', name: '六本木ヒルズ' },
                            { id: '39', name: '文字数が多い場合は改行です' },
                            { id: '40', name: '六本木ヒルズ' },
                        ],
                    }
                ],
            },
            {
                name: '岩手',
                stores: [
                    {
                        name: 'サイゼリヤ',
                        branches: [
                            { id: '41', name: '熱海店' },
                            { id: '42', name: '青山一丁目駅前' },
                            { id: '43', name: '六本木ヒルズ' },
                            { id: '44', name: '文字数が多い場合は改行です' },
                            { id: '45', name: '六本木ヒルズ' },
                        ],
                    }
                ],
            }
        ],
    },
    {
        name: '関東',
        prefectures: [
            {
                name: '東京',
                stores: [
                    {
                        name: '鳥貴族',
                        branches: [
                            { id: '46', name: '渋谷店' },
                            { id: '47', name: '新宿店' },
                            { id: '48', name: '池袋店' },
                            { id: '49', name: '上野店' },
                            { id: '50', name: '秋葉原店' },
                        ],
                    },
                    {
                        name: '焼肉きんぐ',
                        branches: [
                            { id: '51', name: '渋谷店' },
                            { id: '52', name: '新宿店' },
                            { id: '53', name: '池袋店' },
                            { id: '54', name: '上野店' },
                            { id: '55', name: '秋葉原店' },
                        ],
                    }
                ],
            }
        ],
    }
];

export const useSelectStoreSingle = ({ googleService, onNextClick, onBackClick }: Props) => {
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const onChangeSelectedBranch = (branch: Branch) => {
        setSelectedBranch(branch);
    };

    const selectStoreRender = () => (
        <SelectStoreSingle
            areaSelectorProps={areaSelectorProps}
            brandSelectorProps={brandSelectorProps}
            onChangeSelectedBranch={onChangeSelectedBranch}
            onNextClick={onNextClick}
            onBackClick={onBackClick}
            isNextButtonDisabled={!selectedBranch}
        />
    );

    return {
        selectedBranch,
        setSelectedBranch,
        selectStoreRender,
    };
};
