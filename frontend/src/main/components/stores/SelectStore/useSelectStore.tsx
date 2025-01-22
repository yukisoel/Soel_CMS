import { GoogleService } from "@/main/service/GoogleService";
import { useState } from "react";
import SelectStore, { Branch, Region, Store } from "./SelectStore";

type Props = {
    googleService: GoogleService
    onNextClick: () => void
    onBackClick: () => void
}

const brandSelectorProps: Store[] = [
    {
        name: '鳥貴族',
        branches: [
        { id: '1', name: '熱海店', checked: false },
        { id: '2', name: '青山一丁目駅前', checked: false },
        { id: '3', name: '六本木ヒルズ', checked: false },
        { id: '4', name: '文字数が多い場合は改行です', checked: false },
        { id: '5', name: '六本木ヒルズ', checked: false },
        ],
        checked: false
    },
    {
        name: '焼肉きんぐ',
        branches: [
        { id: '1', name: '熱海店', checked: false },
        { id: '2', name: '青山一丁目駅前', checked: false },
        { id: '3', name: '六本木ヒルズ', checked: false },
        { id: '4', name: '文字数が多い場合は改行です', checked: false },
        { id: '5', name: '六本木ヒルズ', checked: false },
        ],
        checked: false
    }
]

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
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        },
        {
            name: '焼肉きんぐ',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        }
        ],
        checked: false
    },
    {
        name: '岩手',
        stores: [
        {
            name: '鳥貴族',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        },
        {
            name: '焼肉きんぐ',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        }
        ],
        checked: false
    }
    ],
    checked: false
},
{
    name: '関東',
    prefectures: [
    {
        name: '茨城',
        stores: [
        {
            name: '鳥貴族',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        },
        {
            name: '焼肉きんぐ',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        }
        ],
        checked: false
    },
    {
        name: '栃木',
        stores: [
        {
            name: '鳥貴族',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        },
        {
            name: '焼肉きんぐ',
            branches: [
            { id: '1', name: '熱海店', checked: false },
            { id: '2', name: '青山一丁目駅前', checked: false },
            { id: '3', name: '六本木ヒルズ', checked: false },
            { id: '4', name: '文字数が多い場合は改行です', checked: false },
            { id: '5', name: '六本木ヒルズ', checked: false },
            ],
            checked: false
        }
        ],
        checked: false
    }
    ],
    checked: false
}
]

export const useSelectStore = ({googleService, onNextClick, onBackClick}: Props) => {
    const [selectedBranches, setSelectedBranches] = useState<Array<Omit<Branch, 'checked'>>>([])

    const onChangeSelectedBranches = (stores: Branch[]) => {
        setSelectedBranches(stores)
    }

    const selectStoreRender = () => (
        <SelectStore
            areaSelectorProps={areaSelectorProps}
            brandSelectorProps={brandSelectorProps}
            onChangeSelectedBranches={onChangeSelectedBranches}
            onNextClick={onNextClick}
            onBackClick={onBackClick}
        />
    )

    return {
        selectedBranches,
        setSelectedBranches,
        selectStoreRender,
    };
}
