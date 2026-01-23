# 設計系統 (Design System)

## 🎨 工業風格設計規範 (Industrial Style Design Specifications)

本專案採用「工業風格」設計語言，營造現代、專業、科技感的使用者體驗。以下為詳細的設計規範與實作指南。

This project adopts an "Industrial Style" design language to create a modern, professional, and tech-savvy user experience. Below are detailed design specifications and implementation guidelines.

---

## 📐 設計原則 (Design Principles)

1. **高對比度** - 使用強烈的色彩對比來突出重要資訊
2. **幾何簡潔** - 採用清晰的幾何線條與格柵元素
3. **金屬質感** - 運用金屬色彩與漸層營造工業感
4. **空間寬鬆** - 保持足夠的留白，避免視覺擁擠
5. **專業科技** - 體現現代工業與科技的專業形象

---

## 🎨 色彩系統 (Color System)

### 主色系 (Primary Colors)

#### 高亮藍色 (Bright Blue) - 強調與主要動作
- **Primary Blue**: `#00D4FF` (rgb(0, 212, 255))
- **Dark Blue**: `#0099CC` (rgb(0, 153, 204))
- **Light Blue**: `#4DE4FF` (rgb(77, 228, 255))

**使用場景**：
- 主要按鈕與 CTA (Call-to-Action)
- 關鍵標題與重點文字
- 互動元素的 hover 狀態
- 連結與可點擊元素

#### 亮黃色 (Bright Yellow) - 警示與提示
- **Primary Yellow**: `#FFD700` (rgb(255, 215, 0))
- **Warning Yellow**: `#FFC700` (rgb(255, 199, 0))
- **Light Yellow**: `#FFE44D` (rgb(255, 228, 77))

**使用場景**：
- 警告訊息與提示
- 重要通知標籤
- 強調文字的點綴
- 次要按鈕或圖標強調（少量使用）

### 中性色系 (Neutral Colors)

#### 黑色與深灰 (Black & Dark Gray) - 主要背景
- **Pure Black**: `#000000` (rgb(0, 0, 0))
- **Dark Gray**: `#0A0E1A` (rgb(10, 14, 26))
- **Medium Dark**: `#1A1F2E` (rgb(26, 31, 46))
- **Charcoal**: `#2A2F3E` (rgb(42, 47, 62))

**使用場景**：
- 網站主背景
- 側邊欄與導航區塊背景
- 深色模式基底

#### 白色與淺灰 (White & Light Gray) - 文字與區塊
- **Pure White**: `#FFFFFF` (rgb(255, 255, 255))
- **Light Gray**: `#E8E8E8` (rgb(232, 232, 232))
- **Medium Gray**: `#9CA3AF` (rgb(156, 163, 175))
- **Soft Gray**: `#6B7280` (rgb(107, 114, 128))

**使用場景**：
- 主要文字內容
- 卡片與區塊背景
- 分隔線與邊框

### 金屬漸層 (Metallic Gradients)

#### 銀色金屬 (Silver Metallic)
```css
background: linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%);
```

#### 藍色金屬 (Blue Metallic)
```css
background: linear-gradient(135deg, #00D4FF 0%, #0066CC 50%, #00D4FF 100%);
```

**使用場景**：
- 按鈕背景
- 標題文字漸層
- 裝飾性邊框

---

## 🔤 字型系統 (Typography)

### 字型家族 (Font Families)
```css
--font-primary: 'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'Consolas', 'Monaco', 'Courier New', monospace;
```

### 字型大小 (Font Sizes)
- **Heading 1**: `3.5rem` (56px) - 主標題
- **Heading 2**: `2.5rem` (40px) - 次標題
- **Heading 3**: `1.75rem` (28px) - 區塊標題
- **Body Large**: `1.125rem` (18px) - 重要內文
- **Body**: `1rem` (16px) - 一般內文
- **Small**: `0.875rem` (14px) - 輔助文字
- **Tiny**: `0.75rem` (12px) - 標籤與註解

### 字重 (Font Weights)
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## 🧩 元件規範 (Component Specifications)

### 按鈕 (Buttons)

#### 主要按鈕 (Primary Button)
```css
background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
color: #000000;
border: 2px solid #00D4FF;
border-radius: 4px;
padding: 12px 24px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
transition: all 0.3s ease;
```

Hover 狀態：
```css
background: linear-gradient(135deg, #4DE4FF 0%, #00D4FF 100%);
box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
transform: translateY(-2px);
```

#### 次要按鈕 (Secondary Button)
```css
background: transparent;
color: #00D4FF;
border: 2px solid #00D4FF;
border-radius: 4px;
padding: 12px 24px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
transition: all 0.3s ease;
```

Hover 狀態：
```css
background: rgba(0, 212, 255, 0.1);
border-color: #4DE4FF;
color: #4DE4FF;
```

#### 警告按鈕 (Warning Button)
```css
background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
color: #000000;
border: 2px solid #FFD700;
/* 其他屬性同主要按鈕 */
```

### 卡片 (Cards)
```css
background: rgba(26, 31, 46, 0.8);
border: 1px solid rgba(0, 212, 255, 0.3);
border-radius: 8px;
padding: 24px;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
backdrop-filter: blur(10px);
transition: all 0.3s ease;
```

Hover 狀態：
```css
border-color: rgba(0, 212, 255, 0.6);
box-shadow: 0 8px 24px rgba(0, 212, 255, 0.2);
transform: translateY(-4px);
```

### 分隔線 (Dividers)
```css
/* 標準分隔線 */
border-bottom: 1px solid rgba(156, 163, 175, 0.2);

/* 強調分隔線 */
border-bottom: 2px solid rgba(0, 212, 255, 0.5);

/* 金屬分隔線 */
height: 2px;
background: linear-gradient(90deg, transparent 0%, #00D4FF 50%, transparent 100%);
```

### 輸入框 (Input Fields)
```css
background: rgba(0, 0, 0, 0.3);
border: 2px solid rgba(156, 163, 175, 0.3);
border-radius: 4px;
padding: 12px 16px;
color: #FFFFFF;
font-size: 1rem;
transition: all 0.3s ease;
```

Focus 狀態：
```css
border-color: #00D4FF;
box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2);
outline: none;
```

---

## ✨ 動態效果 (Dynamic Effects)

### 跑馬燈 (Marquee / Scrolling Text)

用於展示重要公告、活動消息或更新資訊。

#### HTML 結構
```html
<div class="marquee-container">
  <div class="marquee-content">
    <span class="marquee-text">🎮 新遊戲即將推出！ | ⚡ 系統更新公告 | 🎉 特別活動進行中</span>
    <span class="marquee-text">🎮 新遊戲即將推出！ | ⚡ 系統更新公告 | 🎉 特別活動進行中</span>
  </div>
</div>
```

#### CSS 樣式
```css
.marquee-container {
  background: linear-gradient(90deg, #0A0E1A 0%, #1A1F2E 50%, #0A0E1A 100%);
  border-top: 2px solid #00D4FF;
  border-bottom: 2px solid #00D4FF;
  padding: 12px 0;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: flex;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}

.marquee-text {
  display: inline-block;
  padding: 0 4rem;
  font-size: 1rem;
  font-weight: 500;
  color: #FFFFFF;
  letter-spacing: 0.5px;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

#### 進階效果
- 滑鼠 hover 時暫停動畫
- 不同速度的跑馬燈（快速、中速、慢速）
- 支援 RTL（右至左）滾動

---

## 📱 響應式設計 (Responsive Design)

### 斷點 (Breakpoints)
```css
/* 手機 */
@media (max-width: 640px) { }

/* 平板 */
@media (min-width: 641px) and (max-width: 1024px) { }

/* 桌面 */
@media (min-width: 1025px) { }
```

### 響應式調整原則
1. **手機裝置**：單欄布局，增大觸控目標（最小 44x44px）
2. **平板裝置**：雙欄或三欄布局，適度縮小間距
3. **桌面裝置**：充分利用寬螢幕，展現完整工業風格細節

---

## 🎯 使用範例 (Usage Examples)

### CSS 變數定義
```css
:root {
  /* 主色 */
  --color-primary-blue: #00D4FF;
  --color-primary-yellow: #FFD700;
  
  /* 中性色 */
  --color-black: #000000;
  --color-dark: #0A0E1A;
  --color-white: #FFFFFF;
  --color-gray: #9CA3AF;
  
  /* 間距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* 圓角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  
  /* 陰影 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-blue: 0 4px 12px rgba(0, 212, 255, 0.3);
}
```

### 工業風格背景範例
```css
body {
  background-color: #0A0E1A;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

## 📋 設計檢查清單 (Design Checklist)

使用此清單確保所有元件符合工業風格規範：

- [ ] 使用了正確的色彩系統（藍、黃、黑、白）
- [ ] 保持高對比度，確保可讀性
- [ ] 按鈕與互動元素有清晰的 hover 狀態
- [ ] 使用了金屬質感的漸層或邊框
- [ ] 保持幾何簡潔的線條與布局
- [ ] 文字清晰，留白充足
- [ ] 動態效果流暢且與風格協調
- [ ] 響應式設計在各裝置上正常運作
- [ ] 無障礙設計（顏色對比度、鍵盤導航等）

---

## 🔗 參考資源 (References)

### 工業風格設計靈感
- 科技儀表板介面
- 工業控制面板
- 未來科幻電影 UI
- 機械工程軟體介面

### 推薦工具
- **色彩對比檢查**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **漸層產生器**: [CSS Gradient](https://cssgradient.io/)
- **調色盤工具**: [Coolors](https://coolors.co/)

---

**版本**: 1.0.0  
**最後更新**: 2026-01-23  
**維護者**: Daily Kusogames Team
