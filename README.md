# Miuix Console

> 基于 [Miuix](https://github.com/compose-miuix-ui/miuix) 设计语言的 Web 控制台 UI 框架。
> 将 Compose Multiplatform 的 Miuix 组件库的设计 DNA 移植到纯 CSS + Vanilla JS，零依赖。

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![CSS](https://img.shields.io/badge/CSS-pure-1572B6.svg)]()
[![JS](https://img.shields.io/badge/JS-Vanilla-F7DF1E.svg)]()

---

## 目录

- [设计理念](#设计理念)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [设计令牌 (Tokens)](#设计令牌)
- [组件文档](#组件文档)
  - [Card 卡片](#card-卡片)
  - [Button 按钮](#button-按钮)
  - [Switch 开关](#switch-开关)
  - [Badge 徽章](#badge-徽章)
  - [Input 输入框](#input-输入框)
  - [Table 表格](#table-表格)
  - [Stat 统计卡](#stat-统计卡)
  - [Navigation 导航](#navigation-导航)
  - [Activity 活动列表](#activity-活动列表)
  - [Chart 图表](#chart-图表)
  - [Layout 布局](#layout-布局)
- [工具库 (Utils)](#工具库)
  - [Smooth Corner](#smooth-corner)
  - [Ripple 涟漪](#ripple-涟漪)
  - [Counter 计数器](#counter-计数器)
  - [Theme 主题](#theme-主题)
  - [Density 密度](#density-密度)
  - [Chart 图表工具](#chart-图表工具)
- [响应式系统](#响应式系统)
- [主题系统](#主题系统)
- [与 Miuix 源码对齐](#与-miuix-源码对齐)
- [性能优化](#性能优化)
- [浏览器兼容](#浏览器兼容)
- [FAQ](#faq)

---

## 设计理念

Miuix Console 不是另一个 UI 框架。它是 [Miuix](https://github.com/compose-miuix-ui/miuix)（小米 HyperOS 的 Compose Multiplatform 组件库）在 Web 端的忠实移植。

### 核心原则

| 原则 | 说明 |
|------|------|
| **Smooth Corner** | 不用普通 `border-radius`，而是连续曲率的贝塞尔曲线过渡，这是 Miuix 最具辨识度的视觉特征 |
| **多层 Surface** | 4 级 surface 色阶，逐层递进，形成自然的层级关系 |
| **柔和阴影** | 所有阴影都是多层半透明叠加，不用硬投影 |
| **弹簧动效** | 使用 `cubic-bezier(0.34, 1.56, 0.64, 1)` 弹簧曲线，动作自然有弹性 |
| **深色优先** | Dark mode 是默认主题，Light mode 做等价适配 |
| **毛玻璃** | 顶栏和底部导航使用 `backdrop-filter: blur(24px)` |

### 与 Miuix 的关系

```
Miuix (Compose Multiplatform)     Miuix Console (Web)
─────────────────────────────     ──────────────────────
Card.kt                    →      components/card.css
Button.kt                  →      components/button.css
Switch.kt                  →      components/switch.css
TextField.kt               →      components/input.css
TopAppBar.kt               →      components/navigation.css
Scaffold.kt                →      components/layout.css
SmoothRoundedCornerShape   →      utils/smooth-corner.js
ThemeController            →      utils/theme.js
Colors.kt                  →      core/tokens.css
```

---

## 快速开始

### 方式一：一键引入

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>

  <div class="mx-card">
    <div class="mx-card-body">
      <button class="mx-btn mx-btn-primary" data-ripple>Hello Miuix</button>
    </div>
  </div>

  <!-- 自动加载所有 CSS + JS -->
  <script src="miuix-console/miuix-console.js"></script>
</body>
</html>
```

### 方式二：按需引入

```html
<!-- Core (必须) -->
<link rel="stylesheet" href="miuix-console/core/tokens.css">
<link rel="stylesheet" href="miuix-console/core/base.css">
<link rel="stylesheet" href="miuix-console/core/animations.css">

<!-- Components (按需) -->
<link rel="stylesheet" href="miuix-console/components/card.css">
<link rel="stylesheet" href="miuix-console/components/button.css">
<link rel="stylesheet" href="miuix-console/components/badge.css">
<link rel="stylesheet" href="miuix-console/components/input.css">
<link rel="stylesheet" href="miuix-console/components/switch.css">
<link rel="stylesheet" href="miuix-console/components/table.css">
<link rel="stylesheet" href="miuix-console/components/stat.css">
<link rel="stylesheet" href="miuix-console/components/navigation.css">
<link rel="stylesheet" href="miuix-console/components/activity.css">
<link rel="stylesheet" href="miuix-console/components/layout.css">

<!-- Utils (按需) -->
<script src="miuix-console/utils/smooth-corner.js"></script>
<script src="miuix-console/utils/ripple.js"></script>
<script src="miuix-console/utils/counter.js"></script>
<script src="miuix-console/utils/theme.js"></script>
<script src="miuix-console/utils/chart.js"></script>
```

### 方式三：CDN 引入（待发布）

```html
<link rel="stylesheet" href="https://cdn.example.com/miuix-console@1.0.0/miuix-console.min.css">
<script src="https://cdn.example.com/miuix-console@1.0.0/miuix-console.min.js"></script>
```

---

## 项目结构

```
miuix-console/
├── core/                        # 核心设计系统
│   ├── tokens.css               # 设计令牌：色彩、圆角、阴影、动效、字体
│   ├── base.css                 # 全局重置、滚动条、选区、暗色内发光
│   └── animations.css           # 所有 @keyframe + 动画工具类 + stagger 延迟
│
├── components/                  # UI 组件（每个组件独立 CSS 文件）
│   ├── card.css                 # 卡片容器
│   ├── button.css               # 按钮（6 种变体 × 3 种尺寸）
│   ├── switch.css               # 开关
│   ├── badge.css                # 徽章 / 标签
│   ├── input.css                # 输入框 / 文本域
│   ├── table.css                # 数据表格
│   ├── stat.css                 # 统计卡片
│   ├── navigation.css           # 顶栏 / 侧边栏 / 底部导航 / 面包屑 / 胶囊组
│   ├── activity.css             # 活动列表 / 柱状图
│   └── layout.css               # 页面布局 shell / 网格 / flex 工具
│
├── utils/                       # JavaScript 工具库
│   ├── smooth-corner.js         # Miuix SmoothRoundedCornerShape → CSS clip-path
│   ├── ripple.js                # 点击涟漪效果
│   ├── counter.js               # 数字滚动动画
│   ├── theme.js                 # 主题切换 + 密度管理 + localStorage 持久化
│   └── chart.js                 # 柱状图渲染器
│
├── demo/                        # 演示页面
│   └── index.html               # 完整 demo（含所有组件展示）
│
├── miuix-console.js             # 一键入口（自动加载所有 CSS + JS + 初始化）
└── README.md                    # 本文档
```

---

## 设计令牌

所有视觉参数集中在 `core/tokens.css`，通过 CSS 自定义属性（Custom Properties）全局生效。

### 色彩

```css
/* Primary — 种子色，用于主要交互元素 */
--mx-primary: #4C8BF5;
--mx-primary-hover: #6BA1FF;
--mx-primary-active: #3A72D9;
--mx-primary-glow: rgba(76,139,245,0.12);

/* Accent — 强调色，用于渐变和高亮 */
--mx-accent: #A78BFA;
--mx-accent-glow: rgba(167,139,250,0.10);

/* Semantic — 语义色 */
--mx-green: #34D399;    /* 成功 */
--mx-amber: #FBBF24;    /* 警告 */
--mx-red: #F87171;      /* 错误 */
--mx-blue: #60A5FA;     /* 信息 */
```

### Surface 色阶

Miuix 的核心设计特征之一是 4 级 Surface 色阶，形成自然的层级关系：

```css
--mx-bg: #08090C;          /* 页面背景 — 最底层 */
--mx-s1: #111318;          /* Surface — 导航栏、侧边栏 */
--mx-s2: #171A22;          /* surfaceContainer — 卡片 */
--mx-s3: #1C2030;          /* surfaceContainerHigh — 输入框、浮层 */
--mx-s4: #242A3A;          /* surfaceContainerHighest — 下拉菜单 */
--mx-s-hover: rgba(255,255,255,0.04);   /* Hover 叠加 */
--mx-s-active: rgba(255,255,255,0.07);  /* Active 叠加 */
```

### 文字

```css
--mx-text: #E8ECF2;    /* 主文字 — 90% 白 */
--mx-t2: #8B95A5;      /* 辅助文字 — 55% 白 */
--mx-t3: #4A5268;      /* 占位符/禁用 — 30% 白 */
```

### 圆角

```css
--mx-r: 16px;           /* 标准圆角 — 对应 Miuix CardDefaults.CornerRadius = 16.dp */
--mx-r-sm: 12px;        /* 小圆角 — 输入框、按钮 */
--mx-r-xs: 8px;         /* 极小圆角 */
--mx-r-pill: 9999px;    /* 胶囊形 — 对应 Miuix miuixCapsuleShape */
```

### 阴影

```css
--mx-sh1: 0 1px 4px rgba(0,0,0,0.5);                    /* 卡片默认 */
--mx-sh2: 0 4px 16px rgba(0,0,0,0.4);                   /* 卡片 hover */
--mx-sh3: 0 8px 32px rgba(0,0,0,0.45);                  /* 浮层 */
--mx-glow: 0 0 0 1px rgba(76,139,245,0.06), 0 2px 12px rgba(76,139,245,0.05);  /* Focus */
```

### 动效

```css
--mx-ease: cubic-bezier(0.16, 1, 0.3, 1);       /* 标准缓动 — 减速进入 */
--mx-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* 弹簧 — Miuix 标志性动效 */
--mx-d1: 180ms;   /* 快速 — 按钮反馈 */
--mx-d2: 280ms;   /* 标准 — hover、展开 */
--mx-d3: 420ms;   /* 慢速 — 弹窗、入场 */
--mx-d4: 600ms;   /* 极慢 — 复杂编排 */
```

---

## 组件文档

### Card 卡片

对应 Miuix `Card.kt`。默认圆角 16dp，`surfaceContainer` 背景。

```html
<!-- 基础卡片 -->
<div class="mx-card">
  <div class="mx-card-head">
    <span class="mx-card-title">标题</span>
  </div>
  <div class="mx-card-body">
    内容区域
  </div>
</div>

<!-- 可点击卡片 — 带 press 反馈 -->
<div class="mx-card mx-card-clickable" data-ripple>
  <div class="mx-card-body">点击我</div>
</div>

<!-- Accent 卡片 — hover 时顶部亮线 + 右上光晕 -->
<div class="mx-card mx-card-accent" style="--mx-card-accent: var(--mx-primary)">
  <div class="mx-card-body">带 accent 效果</div>
</div>
```

**CSS 类：**

| 类名 | 说明 |
|------|------|
| `.mx-card` | 基础卡片容器 |
| `.mx-card-head` | 卡片头部（flex 布局，底部边框） |
| `.mx-card-title` | 卡片标题 |
| `.mx-card-body` | 卡片内容区域 |
| `.mx-card-clickable` | 可点击卡片（active 缩放 0.98） |
| `.mx-card-accent` | Accent 效果卡片（顶部亮线 + 光晕） |

**CSS 变量：**

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `--mx-card-accent` | Accent 颜色 | `var(--mx-primary)` |

---

### Button 按钮

```html
<!-- 变体 -->
<button class="mx-btn mx-btn-primary" data-ripple>Primary</button>
<button class="mx-btn mx-btn-secondary" data-ripple>Secondary</button>
<button class="mx-btn mx-btn-ghost" data-ripple>Ghost</button>
<button class="mx-btn mx-btn-danger" data-ripple>Danger</button>

<!-- 胶囊按钮 -->
<button class="mx-btn mx-btn-primary mx-btn-pill">Pill Button</button>

<!-- 图标按钮 -->
<button class="mx-btn mx-btn-icon mx-btn-ghost">
  <svg>...</svg>
</button>

<!-- 尺寸 -->
<button class="mx-btn mx-btn-primary mx-btn-sm">Small</button>
<button class="mx-btn mx-btn-primary">Default</button>
<button class="mx-btn mx-btn-primary mx-btn-lg">Large</button>

<!-- 禁用 -->
<button class="mx-btn mx-btn-primary" disabled>Disabled</button>
```

**变体：**

| 类名 | 背景 | 文字 | 用途 |
|------|------|------|------|
| `mx-btn-primary` | `--mx-primary` | 白色 | 主要操作 |
| `mx-btn-secondary` | `--mx-s3` + 边框 | `--mx-text` | 次要操作 |
| `mx-btn-ghost` | 透明 | `--mx-t2` | 低优先级操作 |
| `mx-btn-danger` | `--mx-red` | 白色 | 危险操作 |

---

### Switch 开关

对应 Miuix `Switch.kt` 的 `miuixCapsuleShape`。

```html
<label class="mx-switch">
  <input type="checkbox" checked>
  <span class="mx-switch-track">
    <span class="mx-switch-thumb"></span>
  </span>
  <span class="mx-switch-label">开关标签</span>
</label>

<!-- 禁用 -->
<label class="mx-switch">
  <input type="checkbox" disabled>
  <span class="mx-switch-track">
    <span class="mx-switch-thumb"></span>
  </span>
  <span class="mx-switch-label">禁用状态</span>
</label>
```

---

### Badge 徽章

Miuix 胶囊形徽章，带状态圆点。

```html
<span class="mx-badge-success">运行中</span>
<span class="mx-badge-warning">部署中</span>
<span class="mx-badge-error">异常</span>
<span class="mx-badge-info">信息</span>
<span class="mx-badge-neutral">离线</span>

<!-- 圆点 -->
<span class="mx-dot" style="background: var(--mx-green)"></span>

<!-- 计数 -->
<span class="mx-count">12</span>
```

---

### Input 输入框

```html
<!-- 标准输入框 -->
<label class="mx-label">用户名</label>
<div class="mx-input-wrap">
  <input class="mx-input" placeholder="请输入用户名">
</div>

<!-- 带图标 -->
<div class="mx-input-wrap">
  <span class="mx-input-icon">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  </span>
  <input class="mx-input" placeholder="搜索...">
</div>

<!-- 文本域 -->
<div class="mx-input-wrap mx-textarea-wrap">
  <textarea class="mx-textarea" placeholder="输入内容..."></textarea>
</div>

<!-- 错误态 -->
<div class="mx-input-wrap mx-input-error">
  <input class="mx-input" value="错误内容">
</div>
<span class="mx-helper mx-helper-error">此字段为必填项</span>

<!-- 禁用 -->
<div class="mx-input-wrap mx-disabled">
  <input class="mx-input" value="不可编辑" disabled>
</div>
```

**变体：**

| 类名 | 说明 |
|------|------|
| `.mx-input-sm` | 小尺寸 (34px) |
| `.mx-input-lg` | 大尺寸 (46px) |
| `.mx-input-error` | 错误态（红色边框） |
| `.mx-disabled` | 禁用态 |

---

### Table 表格

```html
<div class="mx-table-wrap">
  <table class="mx-table">
    <thead>
      <tr>
        <th>服务名称</th>
        <th>状态</th>
        <th>CPU</th>
        <th>延迟</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>api-gateway</strong></td>
        <td><span class="mx-badge-success">运行中</span></td>
        <td class="mono">42%</td>
        <td class="mono">18ms</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 紧凑模式 -->
<table class="mx-table mx-table-compact">
  <!-- ... -->
</table>
```

**交互效果：**
- 表头 hover → 底部蓝色亮线 `scaleX` 展开
- 行 hover → 背景变亮 + 左 padding 微推 (14px → 18px)
- 行 active → 背景进一步变亮

---

### Stat 统计卡

```html
<div class="mx-stat-grid">
  <div class="mx-stat" style="--mx-stat-accent: var(--mx-primary)">
    <div class="mx-stat-label">
      <div class="mx-stat-icon" style="background: rgba(76,139,245,0.12); color: var(--mx-primary)">
        <svg>...</svg>
      </div>
      活跃用户
    </div>
    <div class="mx-stat-value">
      <span data-mx-count="12847">0</span>
    </div>
    <span class="mx-stat-delta up">↑ 12.5%</span>
  </div>
</div>
```

**响应式网格：**
- `<768px` → 2 列
- `≥768px` → 4 列

---

### Navigation 导航

#### TopBar 顶栏

```html
<header class="mx-topbar">
  <div class="mx-topbar-left">
    <div class="mx-logo">
      <div class="mx-logo-icon">
        <svg>...</svg>
      </div>
      <span class="mx-logo-text">Console</span>
    </div>
  </div>
  <div class="mx-topbar-right">
    <button class="mx-btn-icon">...</button>
    <div class="mx-avatar">B</div>
  </div>
</header>
```

#### Sidebar 侧边栏

```html
<aside class="mx-sidebar">
  <div class="mx-sidebar-section">概览</div>
  <div class="mx-nav-item active">
    <svg>...</svg>
    <span class="mx-nav-label">仪表盘</span>
  </div>
  <div class="mx-nav-item">
    <svg>...</svg>
    <span class="mx-nav-label">数据分析</span>
    <span class="mx-count">12</span>
  </div>
</aside>
```

#### BottomNav 底部导航

```html
<nav class="mx-bottom-nav">
  <ul class="mx-bottom-nav-items">
    <li class="mx-btm-item active">
      <svg>...</svg>
      <span>首页</span>
    </li>
    <li class="mx-btm-item">
      <svg>...</svg>
      <span>分析</span>
    </li>
  </ul>
</nav>
```

#### 其他导航组件

```html
<!-- 面包屑 -->
<div class="mx-breadcrumb">
  <span>仪表盘</span>
  <span class="mx-breadcrumb-sep">›</span>
  <span>概览</span>
</div>

<!-- 胶囊组 — 主题/密度切换 -->
<div class="mx-pill-group">
  <button class="active">标准</button>
  <button>紧凑</button>
</div>

<!-- 头像 -->
<div class="mx-avatar">B</div>

<!-- 通知点 -->
<div class="mx-notify">
  <button class="mx-btn-icon">...</button>
  <span class="mx-notify-dot"></span>
</div>
```

---

### Activity 活动列表

```html
<div class="mx-activity-item">
  <div class="mx-activity-dot" style="background: var(--mx-green)"></div>
  <div>
    <div class="mx-activity-text">服务 <b>api-gateway</b> 部署成功</div>
    <div class="mx-activity-time">2 分钟前</div>
  </div>
</div>
```

---

### Chart 图表

```html
<div class="mx-chart" id="myChart"></div>

<script>
  MxChart.render(document.getElementById('myChart'), [35, 52, 68, 45, 78, 92]);
  MxChart.replay(document.getElementById('myChart')); // 重播动画
</script>
```

---

### Layout 布局

```html
<!-- App Shell -->
<div class="mx-app">
  <header class="mx-topbar">...</header>
  <aside class="mx-sidebar">...</aside>
  <nav class="mx-bottom-nav">...</nav>
  <div class="mx-desktop-shell">
    <header class="mx-desktop-topbar">...</header>
    <main class="mx-desktop-main mx-body">
      <div class="mx-page-head">
        <h1 class="mx-page-title">Dashboard</h1>
        <p class="mx-page-sub">描述文字</p>
      </div>
      <div class="mx-section">...</div>
    </main>
  </div>
</div>

<!-- 网格 -->
<div class="mx-grid-2">两列等宽</div>
<div class="mx-grid-3">三列等宽</div>
<div class="mx-grid-sidebar">左侧主内容 + 右侧 320px</div>

<!-- Flex 工具 -->
<div class="mx-flex mx-flex-between mx-gap-8">...</div>
```

---

## 工具库

### Smooth Corner

Miuix 的 `SmoothRoundedCornerShape` 不用普通 `border-radius`，而是用贝塞尔曲线实现从直线到圆弧的**连续曲率过渡**。这是 Miuix 最具辨识度的视觉特征。

```html
<div class="mx-smooth" style="--mx-r: 16px">内容</div>
<script>
  MxSmoothCorner.init(); // 自动监听所有 .mx-smooth 元素
</script>
```

**工作原理：**
1. 读取元素的 `--mx-r` 值作为圆角半径
2. 用贝塞尔曲线算法生成 SVG path（系数 k=0.55，比标准 0.5523 更柔和）
3. 应用为 `clip-path: path()`
4. 通过 `ResizeObserver` 和 `MutationObserver` 自动更新

---

### Ripple 涟漪

```html
<button data-ripple>点击产生涟漪</button>
<div class="mx-card" data-ripple>卡片点击涟漪</div>
```

通过事件委托自动绑定所有 `data-ripple` 元素，无需手动初始化。

---

### Counter 计数器

```html
<span data-mx-count="12847">0</span>           <!-- 整数 -->
<span data-mx-count="0.05" data-mx-decimals="2">0</span>  <!-- 小数 -->
```

**动画曲线：** Ease-out cubic `1 - (1 - t)³`

---

### Theme 主题

```js
MxTheme.toggle();           // 切换 dark/light
MxTheme.set('dark');        // 设置主题
MxTheme.get();              // 获取当前主题 ('dark' | 'light')
```

**特性：**
- 自动持久化到 `localStorage`
- 首次访问跟随系统偏好
- 监听系统主题变化自动切换
- 更新所有 `.mx-theme-toggle` 按钮的图标

**事件：**
```js
window.addEventListener('mx-theme-change', e => {
  console.log(e.detail.theme); // 'dark' | 'light'
});
```

---

### Density 密度

```js
MxDensity.set('compact');   // 紧凑模式
MxDensity.set('normal');    // 标准模式
MxDensity.get();            // 获取当前密度
```

**紧凑模式的变化：**
- `--mx-r`: 16px → 14px
- `--mx-r-sm`: 12px → 10px

---

### Chart 图表工具

```js
// 渲染柱状图
MxChart.render(container, [35, 52, 68, 45, 78], {
  barDelay: 25,      // 每条动画延迟 ms
  startDelay: 300    // 起始延迟 ms
});

// 重播动画（主题切换时用）
MxChart.replay(container);
```

---

## 响应式系统

框架采用 **Mobile First** 策略，通过 3 个断点覆盖所有设备：

| 断点 | 设备 | 布局变化 |
|------|------|---------|
| `< 768px` | 手机 | 底部导航、2 列统计卡、精简表格 |
| `≥ 768px` | 平板 | 4 列统计卡 |
| `≥ 1024px` | 桌面 | 侧边栏 + 内容区、隐藏底部导航 |
| `≥ 1440px` | 大屏 | 侧边栏加宽至 260px、内容区加大 padding |

**安全区域适配：**
```css
--mx-safe-t: env(safe-area-inset-top, 0px);
--mx-safe-b: env(safe-area-inset-bottom, 0px);
```

---

## 主题系统

### Dark Mode（默认）

- 背景 `#08090C`，4 级 surface 色阶
- 文字 `#E8ECF2`（90% 白）
- 卡片带 `inset 0 1px 0 rgba(255,255,255,0.03)` 内发光 — Miuix 深度感
- 顶栏/底部导航毛玻璃 `rgba(17,19,24,0.82)`

### Light Mode

- 背景 `#F2F3F5`，surface 全白
- 文字 `#1A1D24`
- 阴影更轻柔
- 顶栏/底部导航 `rgba(255,255,255,0.85)`

### 自定义主题

覆盖 CSS 变量即可：

```css
:root {
  --mx-primary: #E91E63;     /* 换成粉色主题 */
  --mx-r: 20px;              /* 更大圆角 */
}
```

---

## 与 Miuix 源码对齐

| Miuix 源码 | 值 | 本框架 | 值 |
|---|---|---|---|
| `CardDefaults.CornerRadius` | `16.dp` | `--mx-r` | `16px` |
| `SmoothRoundedCornerShape` | 贝塞尔 k=0.55 | `MxSmoothCorner` | 同算法 |
| `surfaceContainer` | 动态 | `--mx-s2` | `#171A22` |
| `spring` 动画 | `Spring()` | `--mx-spring` | `cubic-bezier(0.34,1.56,0.64,1)` |
| `miuixCapsuleShape` | 胶囊 | `--mx-r-pill` | `9999px` |
| `Card` inner glow | `inset 0 1px 0...` | CSS | 同值 |
| `InsideMargin` | `0.dp` | `.mx-card-body` | `padding: 16px` |
| `Switch` thumb size | `20.dp` | `.mx-switch-thumb` | `20px` |
| `Switch` track size | `44×26.dp` | `.mx-switch-track` | `44×26px` |

---

## 性能优化

- **零依赖** — 纯 CSS + Vanilla JS，无 runtime framework
- **按需引入** — 每个组件独立 CSS 文件，只引入需要的
- **CSS 动画** — 所有动效用 CSS `transition` / `animation`，GPU 加速
- **事件委托** — Ripple 和导航点击用事件委托，不用逐个绑定
- **ResizeObserver** — Smooth Corner 只在尺寸变化时重算
- **MutationObserver** — 自动处理动态新增的 `.mx-smooth` 元素
- **`will-change`** — 未使用（避免过度合成层，按需添加）
- **`content-visibility`** — 长列表可添加 `content-visibility: auto` 优化

---

## 浏览器兼容

| 浏览器 | 版本 | 说明 |
|--------|------|------|
| Chrome | 80+ | 完整支持 |
| Firefox | 80+ | 完整支持 |
| Safari | 14+ | 需要 `-webkit-backdrop-filter` |
| Edge | 80+ | 完整支持 |
| iOS Safari | 14+ | 安全区域适配 |
| Android Chrome | 80+ | 完整支持 |

**关键 API 依赖：**
- CSS Custom Properties
- `backdrop-filter`
- `clip-path: path()`
- `ResizeObserver`
- `MutationObserver`
- `CustomEvent`

---

## FAQ

### Q: 为什么不用 React/Vue/Web Components？

Miuix 的设计语言（Smooth Corner、弹簧动效、毛玻璃）都是纯 CSS 可以实现的。引入框架反而增加复杂度。如果你用 React/Vue，直接把这些 CSS 类名用在你的组件上即可。

### Q: Smooth Corner 和普通 border-radius 有什么区别？

普通 `border-radius` 在直线和圆弧之间有一个**突变**的过渡点。Miuix 的 Smooth Corner 用贝塞尔曲线实现了**连续曲率**过渡，视觉上更柔和、更"有机"。

### Q: 如何在 React 中使用？

```jsx
function Card({ title, children }) {
  return (
    <div className="mx-card mx-card-accent" data-ripple>
      <div className="mx-card-head">
        <span className="mx-card-title">{title}</span>
      </div>
      <div className="mx-card-body">{children}</div>
    </div>
  );
}
```

### Q: 如何自定义 Primary 色？

```css
:root {
  --mx-primary: #E91E63;
  --mx-primary-hover: #FF4081;
  --mx-primary-active: #C2185B;
  --mx-primary-glow: rgba(233,30,99,0.12);
}
```

### Q: 文件体积多大？

| 文件 | 大小 (gzip) |
|------|-------------|
| 所有 CSS 合计 | ~8 KB |
| 所有 JS 合计 | ~4 KB |
| 总计 | ~12 KB |

---

## License

Apache License 2.0
