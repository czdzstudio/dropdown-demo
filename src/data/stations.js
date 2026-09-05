/**
 * 站點資料範例庫
 * 支援使用者指定之水湳經貿園區路線（涵蓋 5~12 個繁體中文字與全形括號）
 */

// 使用者指定的範例站點清單（水湳經貿接駁循環線）
export const SHUINAN_STATIONS = [
  { id: 1, name: '水湳轉運中心', sub: '第 1 站・轉運樞紐', type: '轉運中心', pinyin: 'shuinan', code: 'SN' },
  { id: 2, name: '臺中中央公園（去）', sub: '第 2 站・公園北側', type: '景點商圈', pinyin: 'zhongyangqu', code: 'ZYQ' },
  { id: 3, name: '捷運文化高中站', sub: '第 3 站・捷運轉乘', type: '捷運共構', pinyin: 'wenhuagaozhong', code: 'WHGZ' },
  { id: 4, name: '臺中中央公園（返）', sub: '第 4 站・公園南側', type: '景點商圈', pinyin: 'zhongyangfan', code: 'ZYF' },
  { id: 5, name: '台中綠美園', sub: '第 5 站・圖美館舍', type: '文創園區', pinyin: 'lvmeiyuan', code: 'LMY' },
  { id: 6, name: '黎明經貿路口（會展中心）', sub: '第 6 站・台中國際會展', type: '展覽會館', pinyin: 'limingjingmao', code: 'LMJM' },
  { id: 7, name: '水湳轉運中心', sub: '第 7 站・返程終點', type: '轉運終點', pinyin: 'shuinanzhong', code: 'SN2' },
];

// 全台幹線長短站名示範資料（供切換比對 2~8 字）
export const TAIWAN_STATIONS = [
  { id: 101, name: '台北', sub: '三鐵共構', type: '高鐵/台鐵/捷運', pinyin: 'taipei', code: 'TB' },
  { id: 102, name: '板橋', sub: '新北核心', type: '高鐵/台鐵/捷運', pinyin: 'banqiao', code: 'BQ' },
  { id: 103, name: '桃園機場', sub: '航廈直達', type: '機捷特快', pinyin: 'taoyuan', code: 'TY' },
  { id: 104, name: '台中', sub: '烏日轉乘', type: '高鐵/捷運', pinyin: 'taichung', code: 'TC' },
  { id: 105, name: '左營', sub: '高鐵終點', type: '高鐵/捷運', pinyin: 'zuoying', code: 'ZY' },
  { id: 106, name: '南港軟體園區', sub: '經貿園區', type: '文湖線捷運', pinyin: 'nangang', code: 'NGRT' },
  { id: 107, name: '高雄國際航空站', sub: '小港機場', type: '紅線捷運/機場', pinyin: 'gaoxiong', code: 'GXJC' },
];

export const RECENT_SEARCHES = [
  { fromId: 1, toId: 6, from: '水湳轉運中心', to: '黎明經貿路口（會展中心）', time: '剛剛' },
  { fromId: 2, toId: 5, from: '臺中中央公園（去）', to: '台中綠美園', time: '昨天' },
  { fromId: 6, toId: 7, from: '黎明經貿路口（會展中心）', to: '水湳轉運中心', time: '前天' },
];
