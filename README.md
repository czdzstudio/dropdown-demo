# 📱 One-Hand Transit Picker (單手友善 RWD 交通起訖站選單)

專為**手機單手操作（Thumb Zone Ergonomics）**與**繁體中文長短站名（2~12字元）自適應排版**設計的響應式起訖站選單。

包含多種針對「單手易用性」設計的互動樣式，適合大眾運輸（捷運、公車、轉運中心、接駁車、高鐵）系統。

![Demo](https://img.shields.io/badge/UX-Thumb%20Zone%20Optimized-emerald)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

---

## 🎯 核心特色

### 1. 手機單手拇指操作極致優化
* **底部舒適圈（Thumb Zone）佈局**：所有重要互動與常客捷徑均座落於螢幕下半部拇指自然觸控半徑內。
* **手勢支援**：支援下滑關閉（Swipe-to-dismiss）、背景點擊收合。
* **一鍵對調（Quick Swap）**：180° 順暢旋轉微動效，單手即可反轉行程。
* **智慧自動推進（Auto-Advance）**：選完起點自動切換至選訖點模式。
* **互斥防呆機制**：已選起點自動於訖點反灰禁用並標示「已是起點」。

### 2. 繁體中文 2~12 字元自適應排版（不破版、不截斷）
實測支援複雜長站名與全形括號，自動調適字級與跨欄：
* `水湳轉運中心` (6字)
* `臺中中央公園（去）` (9字)
* `捷運文化高中站` (7字)
* `臺中中央公園（返）` (9字)
* `台中綠美園` (5字)
* `黎明經貿路口（會展中心）` (12字)
* `水湳轉運中心` (返程終點)

---

## 🎨 3 種單手操作風格（Variant Switcher）

本專案內建 3 種不同的單手互動風格，可在頁面上直接切換測試：

1. **風格 A：極致底部抽屜（Bottom Sheet Drawer）**
   - 行動裝置最經典熟悉的底部滑出抽屜，具備快速搜尋、分區與拇指捷徑。
2. **風格 B：拇指扇形滑軌（Thumb Arc Wheel / Dial）**
   - 專為單手右手或左手拇指弧度打造的圓弧滑軌選單，拇指順時針/逆時針輕滑即可選站。
3. **風格 C：兩段式底欄快捷面板（Bottom Dock / Stepper）**
   - 常駐螢幕底端，以時間軸/站序軌跡呈現，完全不遮蔽上方地圖或車班資訊。

---

## 💻 快速開始 (Quick Start)

### 依賴安裝
```bash
npm install
```

### 啟動本機開發伺服器
```bash
npm run dev
```
瀏覽器開啟：`http://localhost:5173/`

### 建立生產版本
```bash
npm run build
```

---

## 📄 License
MIT License
