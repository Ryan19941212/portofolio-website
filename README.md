# Ryan Huang - Portfolio Website

個人作品集網站，使用 Astro + Tailwind CSS 建立。

## 特色功能

- ⚡ **快速載入** - 使用 Astro 的 Zero-JS 架構
- 🎨 **現代設計** - 簡潔清新的亮色系設計
- 📱 **響應式** - 完美支援手機、平板和桌面裝置
- ✨ **互動效果** - 使用 Astro Islands 實現打字動畫
- 📝 **Netlify Forms** - 整合聯絡表單功能
- 🚀 **易於部署** - 一鍵部署到 Netlify

## 頁面結構

- **Home** - 自我介紹、技能展示和 Hero 區域
- **Projects** - 專案作品集，包含圖片、描述和連結
- **Resume** - 線上履歷和 PDF 下載
- **Contact** - Netlify Forms 聯絡表單

## 技術棧

- [Astro](https://astro.build/) - 靜態網站生成器
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [React](https://react.dev/) - 用於 Astro Islands 互動組件
- [TypeScript](https://www.typescriptlang.org/) - 類型安全
- [Netlify](https://www.netlify.com/) - 部署平台

## 本地開發

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

網站將在 `http://localhost:4321` 運行

### 建置專案

```bash
npm run build
```

### 預覽建置結果

```bash
npm run preview
```

## 部署到 Netlify

### 方法一：透過 Git

1. 將程式碼推送到 GitHub/GitLab
2. 在 Netlify 中連接你的 repository
3. 建置設定會自動從 `netlify.toml` 讀取
4. 點擊部署！

### 方法二：拖放部署

1. 執行 `npm run build`
2. 將 `dist` 資料夾拖放到 Netlify

## 自訂內容

### 更新個人資訊

- **首頁內容**: 編輯 `src/pages/index.astro`
- **專案列表**: 編輯 `src/pages/projects.astro` 中的 `projects` 陣列
- **履歷內容**: 編輯 `src/pages/resume.astro`
- **聯絡資訊**: 編輯 `src/pages/contact.astro` 和 `src/components/Footer.astro`

### 更改顏色主題

編輯 `tailwind.config.mjs` 中的 `primary` 顏色設定

### 添加 Resume PDF

將你的 PDF 檔案放在 `public/resume.pdf`

## 專案結構

```
/
├── public/              # 靜態檔案
│   └── images/         # 圖片資源
├── src/
│   ├── components/     # Astro 組件
│   │   ├── islands/   # React 互動組件
│   │   ├── Navigation.astro
│   │   └── Footer.astro
│   ├── layouts/        # 頁面佈局
│   │   └── BaseLayout.astro
│   └── pages/          # 路由頁面
│       ├── index.astro
│       ├── projects.astro
│       ├── resume.astro
│       └── contact.astro
├── astro.config.mjs    # Astro 設定
├── tailwind.config.mjs # Tailwind 設定
├── netlify.toml        # Netlify 設定
└── package.json
```

## License

MIT License - 可自由使用和修改

---

**Designed by Claude, Built with Astro**
