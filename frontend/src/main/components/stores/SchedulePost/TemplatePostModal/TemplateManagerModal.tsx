import { useEffect, useMemo, useState } from 'react';
import TemplateSelect, { Template } from './TemplateSelect';
import TemplateCreate from './TemplateCreate';
import Modal from '@/main/common/Modal/Modal';
import { useTabs } from '@/main/common/Tabs/useTabs';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const tabs = [
    { tabKey: 'store', content: "店舗紹介" },
    { tabKey: 'sales', content: "営業情報" },
    { tabKey: 'menu', content: "メニュー" },
    { tabKey: 'staff', content: "スタッフ" },
    { tabKey: 'campaign', content: "お問い合わせ" },
]

type TemplateGroup = {
    groupKey: string
    templates: Template[]
}

const templateGroups: TemplateGroup[] = [
    { groupKey: 'store', templates: [
        { title: 'Store Template 1', content: 'Store content 1Store content 1Store content 1Store content 1Store content 1Store content 1Store content 1Store content 1Store content 1Store content 1' },
        { title: 'Store Template 2', content: 'Store content 2' },
        { title: 'Store Template 3', content: 'Store content 3' }
    ]},
    { groupKey: 'sales', templates: [
        { title: 'Sales Template 1', content: 'Sales content 1' },
        { title: 'Sales Template 2', content: 'Sales content 2' },
        { title: 'Sales Template 3', content: 'Sales content 3' }
    ]},
    { groupKey: 'menu', templates: [
        { title: 'Menu Template 1', content: 'Menu content 1' },
        { title: 'Menu Template 2', content: 'Menu content 2' },
        { title: 'Menu Template 3', content: 'Menu content 3' }
    ]},
    { groupKey: 'staff', templates: [
        { title: 'Staff Template 1', content: 'Staff content 1' },
        { title: 'Staff Template 2', content: 'Staff content 2' },
        { title: 'Staff Template 3', content: 'Staff content 3' }
    ]},
    { groupKey: 'campaign', templates: [
        { title: 'Campaign Template 1', content: 'Campaign content 1' },
        { title: 'Campaign Template 2', content: 'Campaign content 2' },
        { title: 'Campaign Template 3', content: 'Campaign content 3' }
    ]}
]

export default function TemplateManagerModal({ isOpen, onClose }: Props) {
    const [mode, setMode] = useState<'select' | 'create'>('select');

    const { selectedTab, setSelectedTab, tabsRender } = useTabs({tabs, width: "585px", size: "normal"})

    const templates = useMemo(
        () => templateGroups.find(group => group.groupKey === selectedTab)?.templates ?? []
    , [selectedTab])

    useEffect(() => {
        if (mode === 'create') {
            setSelectedTab('')
        } else {
            setSelectedTab(tabs[0].tabKey)
        }
    }, [mode])

    if (!isOpen) return null;

    return (
        <Modal headerContent={`テンプレート文章を${mode === 'select' ? '選択' : '作成'}`} isOpen={isOpen} onClose={onClose} contentRender={() => (
            <>
            {
                mode === 'select' && <TemplateSelect templates={templates} tabsRender={tabsRender} onCreateClick={() => setMode('create')} />
            }
            {
                mode === 'create' && <TemplateCreate tabsRender={tabsRender} setSelectedTab={setSelectedTab} onBack={() => setMode('select')}/>
            }
            </>
        )}
        />
    )}
