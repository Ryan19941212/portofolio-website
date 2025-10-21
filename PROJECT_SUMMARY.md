# Portfolio Website - 專案摘要

## 專案概述

這是一個使用 Astro + Tailwind CSS 建立的個人作品集網站，具有現代化設計、響應式布局和互動功能。

## 完整檔案結構

```
/
├── .astro/                         # Astro 自動生成的型別定義
├── .vscode/                        # VS Code 設定
├── public/                         # 靜態資源
│   ├── favicon.svg                # 網站圖示
│   └── images/                    # 圖片資源（待添加）
├── src/
│   ├── components/                # Astro 組件
│   │   ├── islands/              # React 互動組件（Astro Islands）
│   │   │   └── TypeWriter.tsx    # 打字機效果組件
│   │   ├── Footer.astro          # 頁尾組件
│   │   └── Navigation.astro      # 導航欄組件
│   ├── layouts/                   # 頁面佈局
│   │   └── BaseLayout.astro      # 基礎佈局（包含 head、nav、footer）
│   └── pages/                     # 路由頁面
│       ├── index.astro           # 首頁（Hero、About、Skills）
│       ├── projects.astro        # 專案展示頁
│       ├── resume.astro          # 履歷頁
│       └── contact.astro         # 聯絡頁（Netlify Forms）
├── astro.config.mjs               # Astro 配置
├── netlify.toml                   # Netlify 部署配置
├── package.json                   # 專案依賴
├── tailwind.config.mjs            # Tailwind CSS 配置
├── tsconfig.json                  # TypeScript 配置
└── README.md                      # 專案說明文件
```

## 已實現的功能

### 1. 首頁 (/)
- **Hero Section**: 包含姓名、職稱和打字機效果動畫
- **About Section**: 自我介紹
- **Skills Section**: 技能卡片展示（帶圖示）
- **CTA Section**: 行動呼籲區塊

### 2. Projects 頁面 (/projects)
- 專案網格展示（響應式：手機 1 欄、平板 2 欄、桌面 3 欄）
- 每個專案包含：
  - 專案標題和描述
  - 技術標籤
  - Demo 連結和 GitHub 連結按鈕
- 6 個範例專案（可自訂）

### 3. Resume 頁面 (/resume)
- **技能分類**: 前端、後端、資料庫、DevOps
- **工作經歷**: 時間軸設計，包含職位、公司、期間、工作內容
- **學歷**: 學位、學校、期間
- **認證**: AWS、GCP 等認證展示
- **下載/查看按鈕**: Download PDF 和 View Online

### 4. Contact 頁面 (/contact)
- **聯絡資訊**: Email、GitHub、LinkedIn
- **社群連結**: Twitter、Instagram
- **Netlify Forms**:
  - 姓名、Email、主旨、訊息欄位
  - 整合 Netlify 表單處理
  - 防機器人保護（honeypot）

### 5. 共用組件

#### Navigation.astro
- 響應式導航欄
- 桌面版：水平選單
- 手機版：漢堡選單
- 當前頁面高亮顯示
- 固定在頁面頂部

#### Footer.astro
- 顯示「Designed by Claude, Built with Astro」
- 社群連結（GitHub、LinkedIn、Email）
- 版權資訊

#### TypeWriter.tsx (React 組件)
- 打字機動畫效果
- 支援多個文字輪播
- 可調整打字速度、刪除速度、停留時間

## 技術特點

### Astro Islands
使用 Astro Islands 架構，只在需要的地方載入 JavaScript：
- TypeWriter 組件使用 `client:load` 指令
- 其他靜態內容零 JavaScript，提升效能

### Tailwind CSS
- 使用 utility-first 設計方式
- 自訂顏色主題（primary 藍色系）
- 自訂動畫（fadeIn、fadeInUp、typing）
- 完整響應式設計（mobile-first）

### TypeScript
- 嚴格模式設定
- 所有組件都有型別定義
- Props 介面定義清晰

## 樣式設計

### 顏色方案
- **主色**: 藍色系（#3b82f6 等）
- **背景**: 白色 + 淡藍漸層
- **文字**: 深灰色（#1f2937）
- **強調色**: 主題藍色

### 響應式斷點
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 部署配置

### Netlify
- **建置命令**: `npm run build`
- **發布目錄**: `dist`
- **表單處理**: 已啟用 Netlify Forms
- **重定向**: SPA 模式設定

## 使用指南

### 本地開發
```bash
npm install        # 安裝依賴
npm run dev        # 啟動開發伺服器 (http://localhost:4321)
npm run build      # 建置生產版本
npm run preview    # 預覽建置結果
```

### 自訂內容

1. **個人資訊**
   - 編輯 `src/pages/index.astro` 修改首頁內容
   - 編輯 `src/components/Footer.astro` 更新社群連結

2. **專案**
   - 編輯 `src/pages/projects.astro` 的 `projects` 陣列
   - 添加專案圖片到 `public/images/`

3. **履歷**
   - 編輯 `src/pages/resume.astro` 的工作經歷和學歷
   - 放置 PDF 檔案到 `public/resume.pdf`

4. **聯絡資訊**
   - 編輯 `src/pages/contact.astro` 更新聯絡方式

5. **顏色主題**
   - 編輯 `tailwind.config.mjs` 的 `primary` 顏色

## 已安裝的依賴

```json
{
  "@astrojs/react": "^4.4.0",
  "@astrojs/tailwind": "^6.0.2",
  "@rollup/rollup-darwin-arm64": "^4.52.5",
  "@types/react": "^19.2.2",
  "@types/react-dom": "^19.2.2",
  "astro": "^5.14.7",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "tailwindcss": "^3.4.18"
}
```

## 建置成功

✅ 專案已成功建置
✅ 生成 4 個靜態頁面
✅ 總建置時間: ~1 秒
✅ 檔案大小優化（gzip 壓縮）

## 下一步

1. **添加內容**
   - 替換範例文字為實際個人資訊
   - 添加真實專案資料和圖片
   - 上傳履歷 PDF

2. **部署到 Netlify**
   - 將程式碼推送到 GitHub
   - 在 Netlify 連接 repository
   - 自動部署完成

3. **可選優化**
   - 添加 SEO meta tags
   - 整合 Google Analytics
   - 添加 sitemap.xml
   - 設定自訂網域

## 參考資源

- [Astro 文件](https://docs.astro.build)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)
- [Netlify Forms 文件](https://docs.netlify.com/forms/setup/)
- [參考設計](https://kellychi-dev.netlify.app/)

---

**專案完成時間**: 2025-10-20
**設計者**: Claude
**技術棧**: Astro + Tailwind CSS + React
