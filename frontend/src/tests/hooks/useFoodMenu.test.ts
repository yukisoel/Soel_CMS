import {describe, expect} from "vitest"
import { toFoodMenus, MenuSectionItem, toMenuSectionItems } from '@/main/hooks/EditMenu/useFoodMenu'
import { GoogleLocationFoodMenusModel, GoogleLocationFoodMenu } from '@/main/model/LocationModel'
import { testMenus } from './testMenus'
import { testNewMenuSections } from './testNewMenuSections'
import { diff } from 'jest-diff'
import { testEditedMenus } from "./testEditMenuSections"

// モックデータ
const mockFoodMenu: GoogleLocationFoodMenusModel = {
  menus: testMenus,
  name: 'foodMenus',
};

const mockNewMenuSectionItems: MenuSectionItem[] = toMenuSectionItems(testMenus[0].sections).concat(
  [
    {
      sectionTitle: '海鮮',
      items: [
        { title: 'お造り2人前', price: '2000' },
        { title: 'お造り3人前', price: '3000' },
        { title: 'お造り4人前', price: '4000' },
      ],
    },
  ]
)

const mockEditMenuSectionItems: MenuSectionItem[] = toMenuSectionItems(testMenus[0].sections).map((section, index) => {
  if (index === 0) {
    return {
      sectionTitle: '編集されたセクション',
      items: [
        { title: '編集された商品1', price: '1500' },
        { title: '編集された商品2', price: '2500' },
      ],
    };
  }
  return section;
})

describe('toFoodMenuSections', () => {
  it('セクションが新規登録の場合、正しく変換されること', () => {
    const result = toFoodMenus(mockNewMenuSectionItems, mockFoodMenu);

    const addedTestMenus: GoogleLocationFoodMenu[] = [{
        ...testMenus[0],
        sections: testMenus[0].sections.concat(testNewMenuSections)
      }]

    const difference = diff(result, addedTestMenus)
    expect(difference).toContain('Compared values have no visual difference.')
  })

  // TODO: 削除した場合に今のやり方だと不整合が起きるので、
  // modelを全部持ちつつ、編集のformに渡すようにする
  it('セクションが編集された場合、正しく変換されること', () => {
    const result = toFoodMenus(mockEditMenuSectionItems, mockFoodMenu);

    const difference = diff(result, testEditedMenus);
    console.log(difference);
    expect(difference).toContain('Compared values have no visual difference.')
  })
})

