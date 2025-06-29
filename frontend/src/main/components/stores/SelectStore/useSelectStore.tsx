import { GoogleService } from "@/main/service/GoogleService";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SelectStore, { Branch, Region, Store } from "./SelectStore";

type Props = {
    googleService: GoogleService
    onNextClick: () => void
    onBackClick: () => void
}

// Temporary hardcoded data - will be replaced by API data
const defaultBrandSelectorProps: Store[] = []

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
    const [selectedBranches, setSelectedBranches] = useState<Array<Omit<Branch, 'checked'>>>([]);
    const [brandSelectorProps, setBrandSelectorProps] = useState<Store[]>(defaultBrandSelectorProps);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'brand';

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                setIsLoading(true);
                const response = await googleService.getBrandList();
                console.log(response);

                // Transform API response to match Store[] format
                const transformedData: Store[] = response.brands.map(brand => ({
                    name: brand.name,
                    branches: brand.stores.map(store => ({
                        id: store.storeId,
                        name: store.name,
                        checked: false
                    })),
                    checked: false
                }));

                console.log('Transformed data:', transformedData);
                setBrandSelectorProps(transformedData);
            } catch (error) {
                console.error('Failed to fetch brand data:', error);
                // Keep empty array on error
                setBrandSelectorProps([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBrandData();
    }, [googleService]);

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
            isNextButtonDisabled={selectedBranches.length === 0}
            mode={mode as 'brand' | 'area'}
        />
    )

    return {
        selectedBranches,
        setSelectedBranches,
        selectStoreRender,
        isLoading,
    };
}
