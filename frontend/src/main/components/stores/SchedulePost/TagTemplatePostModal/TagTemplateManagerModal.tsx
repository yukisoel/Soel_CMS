import { useEffect, useMemo, useState } from 'react'
import TagTemplateSelect from './TagTemplateSelect'
import TagTemplateCreate from './TagTemplateCreate'
import Modal from '@/main/common/Modal/Modal'
import { useTabs } from '@/main/common/Tabs/useTabs'
import { TabItem } from '@/main/common/Tabs/Tabs'

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const subTabs: TabItem[] = [
  { tabKey: 'store', content: '店舗紹介' },
  { tabKey: 'sales', content: '営業情報' },
  { tabKey: 'menu', content: 'メニュー' },
  { tabKey: 'staff', content: 'スタッフ' },
  { tabKey: 'campaign', content: 'お問い合わせ' }
]

type TabItemWithSubTabs = TabItem & {
    subTabs?: TabItem[]
};

const tabs: TabItemWithSubTabs[] = [
  { tabKey: 'group', content: 'グループ', subTabs: subTabs },
  { tabKey: 'popular', content: '人気タグ', subTabs: [] }
]

type TagGroup = {
    groupKey: string
    tags: string[]
}

const tagGroups: TagGroup[] = [
  { groupKey: 'store', tags: ['Store Template 1', 'Store Template 2', 'Store Template 3'] },
  { groupKey: 'sales', tags: ['Sales Template 1', 'Sales Template 2', 'Sales Template 3'] },
  { groupKey: 'menu', tags: ['Menu Template 1', 'Menu Template 2', 'Menu Template 3'] },
  { groupKey: 'staff', tags: ['Staff Template 1', 'Staff Template 2', 'Staff Template 3'] },
  { groupKey: 'campaign', tags: ['Campaign Template 1', 'Campaign Template 2', 'Campaign Template 3'] }
]

export default function TagTemplateManagerModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<'select' | 'create'>('select')

  const { selectedTab, tabsRender } = useTabs({ tabs, size: 'normal' })
  const subTabs = useMemo(() => {
    return tabs.find(tab => tab.tabKey === selectedTab)?.subTabs ?? []
  }, [selectedTab])
  const { selectedTab: subSelectedTab, setSelectedTab: setSubSelectedTab, tabsRender: subTabsRender } = useTabs({ tabs: subTabs, size: 'normal' })

  const tags = useMemo(
    () => tagGroups.find(group => group.groupKey === subSelectedTab)?.tags ?? []
    , [selectedTab])

  useEffect(() => {
    if (mode === 'create') {
      setSubSelectedTab('')
    } else {
      setSubSelectedTab(tabs[0].tabKey)
    }
  }, [mode])

  if (!isOpen) return null

  return (
    <Modal headerContent={`タグテンプレート文章を${mode === 'select' ? '選択' : '作成'}`} isOpen={isOpen} onClose={onClose} contentRender={() => (
      <>
        {
          mode === 'select' && <TagTemplateSelect tags={tags} tabsRender={tabsRender} subTabsRender={subTabsRender} onCreateClick={() => setMode('create')} />
        }
        {
          mode === 'create' && <TagTemplateCreate tabsRender={subTabsRender} setSelectedTab={setSubSelectedTab} onBack={() => setMode('select')} />
        }
      </>
    )}
    />
  )}
