# Daily Kusogames (每日糞Game)

一個使用 Tauri V2 + Svelte 開發的專案，目標是定期（每幾天）製作一款廣告手遊風格的遊戲作品。

A project built with Tauri V2 + Svelte, aiming to create one advertising mobile game style project every few days.

## 📋 專案概述 (Project Overview)

這個專案的目標是快速開發和發布各種有趣的小遊戲，每個遊戲都可能模仿或諷刺常見的廣告手遊元素。專案使用現代 Web 技術棧，並通過 Tauri 打包成桌面應用程式。

The goal of this project is to rapidly develop and release various fun mini-games, each potentially mimicking or satirizing common elements found in mobile game advertisements. The project uses a modern web technology stack and is packaged as a desktop application through Tauri.

## 🛠️ 技術棧 (Tech Stack)

- **前端框架 (Frontend)**: Svelte 5 + SvelteKit
- **語言 (Language)**: TypeScript
- **桌面應用框架 (Desktop App Framework)**: Tauri V2
- **建置工具 (Build Tool)**: Vite
- **套件管理 (Package Manager)**: npm

> **注意**: 本專案主要專注於前端開發，Rust 後端保持最小化配置。
> **Note**: This project focuses primarily on frontend development, with Rust backend kept at minimal configuration.

## 🚀 快速開始 (Getting Started)

### 前置需求 (Prerequisites)

1. **Node.js** (v20 或更高版本)
2. **npm** (v10 或更高版本)
3. **Rust** (用於 Tauri，但不需要修改 Rust 程式碼)
   - 安裝 Rust: https://www.rust-lang.org/tools/install
   - 安裝 Tauri 相依套件: https://tauri.app/start/prerequisites/

### 安裝 (Installation)

```bash
# 克隆專案
git clone https://github.com/YuutaTsubasa/dailykusogames.git
cd dailykusogames

# 安裝相依套件
npm install
```

### 開發 (Development)

```bash
# 啟動開發伺服器 (Start development server)
npm run dev

# 啟動 Tauri 開發模式 (Start Tauri development mode)
npm run tauri dev
```

開發伺服器會在 `http://localhost:1420` 啟動（或其他可用埠）。

### 建置 (Build)

```bash
# 建置前端應用 (Build frontend app)
npm run build

# 建置 Tauri 桌面應用 (Build Tauri desktop app)
npm run tauri build
```

### 程式碼檢查 (Code Checking)

```bash
# 執行 Svelte 型別檢查 (Run Svelte type checking)
npm run check

# 監看模式的型別檢查 (Type checking in watch mode)
npm run check:watch
```

## 📁 專案結構 (Project Structure)

```
dailykusogames/
├── src/                    # Svelte 前端原始碼
│   ├── routes/            # SvelteKit 路由
│   └── app.html           # HTML 模板
├── src-tauri/             # Tauri 後端（Rust）
│   ├── src/               # Rust 原始碼（最小化）
│   ├── icons/             # 應用程式圖示
│   └── tauri.conf.json    # Tauri 配置
├── static/                # 靜態資源
├── docs/                  # 文件
│   ├── DESIGN_SYSTEM.md   # 設計系統規範
│   └── GAME_DESIGN.md     # 遊戲設計指南
├── package.json           # NPM 套件配置
├── vite.config.js         # Vite 配置
├── svelte.config.js       # Svelte 配置
└── tsconfig.json          # TypeScript 配置
```

## 🎮 遊戲開發流程 (Game Development Workflow)

1. **構思** - 確定遊戲概念和核心玩法
2. **設計** - 參考 [docs/GAME_DESIGN.md](./docs/GAME_DESIGN.md) 進行遊戲設計
3. **開發** - 在 `src/routes` 中建立新的遊戲頁面
4. **測試** - 使用 `npm run tauri dev` 測試
5. **發布** - 建置並發布桌面應用程式

詳細的遊戲設計流程和規範，請參閱 [遊戲設計文件](./docs/GAME_DESIGN.md)。

## 🎨 設計系統 (Design System)

本專案採用「**工業風格**」設計語言，以高對比度的藍色、黃色、黑色、白色為主色系，營造現代工業科技感。

This project adopts an "**Industrial Style**" design language with high-contrast blue, yellow, black, and white color schemes to create a modern industrial tech aesthetic.

### 設計特色 (Design Features)

- **🔵 高亮藍色** - 用於主要動作、關鍵按鈕與標題強調
- **🟡 亮黃點綴** - 警示提示與重要消息標籤
- **⚫ 黑色背景** - 深色主題配合金屬質感
- **⚪ 白色文字** - 高對比度確保清晰可讀
- **✨ 動態效果** - 跑馬燈滾動展示公告與活動

### 設計文件 (Design Documentation)

完整的設計系統規範、色彩定義、元件樣式與使用範例，請參閱：

📘 **[設計系統文件](./docs/DESIGN_SYSTEM.md)** - 包含色彩系統、字型規範、元件設計、動態效果等完整說明

For complete design specifications, color definitions, component styles, and usage examples, please refer to:

📘 **[Design System Documentation](./docs/DESIGN_SYSTEM.md)** - Includes color systems, typography, component design, dynamic effects, and more

## 🤝 貢獻 (Contributing)

歡迎提交 Pull Request 或開 Issue！

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.

## 📝 授權 (License)

MIT

## 💡 開發建議 (Development Recommendations)

### 推薦的 IDE 設定 (Recommended IDE Setup)

- [VS Code](https://code.visualstudio.com/)
- 擴充套件 (Extensions):
  - [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
  - [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) (可選)

### 最佳實踐 (Best Practices)

1. **保持 Rust 程式碼最小化** - 所有遊戲邏輯都應在前端實現
2. **使用 TypeScript** - 提高程式碼品質和可維護性
3. **元件化設計** - 建立可重用的 Svelte 元件
4. **版本控制** - 為每個遊戲建立獨立的分支或標籤

## 🔗 相關資源 (Related Resources)

- [Tauri 文件](https://tauri.app/)
- [Svelte 文件](https://svelte.dev/)
- [SvelteKit 文件](https://kit.svelte.dev/)
- [Vite 文件](https://vitejs.dev/)

---

**Happy Gaming! 祝開發愉快！** 🎮✨
