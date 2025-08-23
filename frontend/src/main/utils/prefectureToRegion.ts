// Prefecture to Region mapping utility
export const prefectureToRegion: Record<string, string> = {
  // 北海道
  '北海道': '北海道',
  
  // 東北
  '青森県': '東北',
  '青森': '東北',
  '岩手県': '東北',
  '岩手': '東北',
  '宮城県': '東北',
  '宮城': '東北',
  '秋田県': '東北',
  '秋田': '東北',
  '山形県': '東北',
  '山形': '東北',
  '福島県': '東北',
  '福島': '東北',
  
  // 関東
  '茨城県': '関東',
  '茨城': '関東',
  '栃木県': '関東',
  '栃木': '関東',
  '群馬県': '関東',
  '群馬': '関東',
  '埼玉県': '関東',
  '埼玉': '関東',
  '千葉県': '関東',
  '千葉': '関東',
  '東京都': '関東',
  '東京': '関東',
  '神奈川県': '関東',
  '神奈川': '関東',
  
  // 中部
  '新潟県': '中部',
  '新潟': '中部',
  '富山県': '中部',
  '富山': '中部',
  '石川県': '中部',
  '石川': '中部',
  '福井県': '中部',
  '福井': '中部',
  '山梨県': '中部',
  '山梨': '中部',
  '長野県': '中部',
  '長野': '中部',
  '岐阜県': '中部',
  '岐阜': '中部',
  '静岡県': '中部',
  '静岡': '中部',
  '愛知県': '中部',
  '愛知': '中部',
  
  // 関西
  '三重県': '関西',
  '三重': '関西',
  '滋賀県': '関西',
  '滋賀': '関西',
  '京都府': '関西',
  '京都': '関西',
  '大阪府': '関西',
  '大阪': '関西',
  '兵庫県': '関西',
  '兵庫': '関西',
  '奈良県': '関西',
  '奈良': '関西',
  '和歌山県': '関西',
  '和歌山': '関西',
  
  // 中国
  '鳥取県': '中国',
  '鳥取': '中国',
  '島根県': '中国',
  '島根': '中国',
  '岡山県': '中国',
  '岡山': '中国',
  '広島県': '中国',
  '広島': '中国',
  '山口県': '中国',
  '山口': '中国',
  
  // 四国
  '徳島県': '四国',
  '徳島': '四国',
  '香川県': '四国',
  '香川': '四国',
  '愛媛県': '四国',
  '愛媛': '四国',
  '高知県': '四国',
  '高知': '四国',
  
  // 九州
  '福岡県': '九州',
  '福岡': '九州',
  '佐賀県': '九州',
  '佐賀': '九州',
  '長崎県': '九州',
  '長崎': '九州',
  '熊本県': '九州',
  '熊本': '九州',
  '大分県': '九州',
  '大分': '九州',
  '宮崎県': '九州',
  '宮崎': '九州',
  '鹿児島県': '九州',
  '鹿児島': '九州',
  '沖縄県': '九州',
  '沖縄': '九州'
}

export const getRegionFromPrefecture = (prefecture: string): string => {
  return prefectureToRegion[prefecture] || '不明'
}

export const regionOrder = [
  '北海道',
  '東北',
  '関東',
  '中部',
  '関西',
  '中国',
  '四国',
  '九州'
]

// Create a map of regions to their prefectures
export const regionToPrefectures: Record<string, string[]> = {
  '北海道': ['北海道'],
  '東北': ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '中部': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  '関西': ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国': ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '四国': ['徳島県', '香川県', '愛媛県', '高知県'],
  '九州': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']
}

// Branch type from SelectStore component
type Branch = {
  id: string;
  name: string;
  checked: boolean;
};

// Initialize regionMap with all regions and prefectures for store selector
export const initializeRegionMapForStores = (): Map<string, Map<string, Map<string, Branch[]>>> => {
  const regionMap = new Map<string, Map<string, Map<string, Branch[]>>>()
  
  regionOrder.forEach(region => {
    const prefectureMap = new Map<string, Map<string, Branch[]>>()
    const prefectures = regionToPrefectures[region]
    
    if (prefectures) {
      prefectures.forEach(prefecture => {
        // 各都道府県に対して、ブランド名をキーとするMapを初期化
        prefectureMap.set(prefecture, new Map<string, Branch[]>())
      })
    }
    
    regionMap.set(region, prefectureMap)
  })
  
  return regionMap
}

// Get brandMap for a specific prefecture from regionMap
export const getBrandMapByPrefecture = (
  regionMap: Map<string, Map<string, Map<string, Branch[]>>>,
  prefectureName: string
): Map<string, Branch[]> | undefined => {
  for (const [, prefectureMap] of regionMap) {
    if (prefectureMap.has(prefectureName)) {
      return prefectureMap.get(prefectureName)
    }
  }
  return undefined
}