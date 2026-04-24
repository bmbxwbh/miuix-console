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
  - [Tag 标签](#tag-标签)
  - [Input 输入框](#input-输入框)
  - [Select 下拉选择](#select-下拉选择)
  - [Checkbox & Radio](#checkbox--radio)
  - [Slider 滑块](#slider-滑块)
  - [Date Picker 日期选择](#date-picker-日期选择)
  - [Upload 文件上传](#upload-文件上传)
  - [Table 表格](#table-表格)
  - [Stat 统计卡](#stat-统计卡)
  - [Tabs 选项卡](#tabs-选项卡)
  - [Pagination 分页器](#pagination-分页器)
  - [Accordion 折叠面板](#accordion-折叠面板)
  - [Tree 树形控件](#tree-树形控件)
  - [Navigation 导航](#navigation-导航)
  - [Activity 活动列表](#activity-活动列表)
  - [Chart 图表](#chart-图表)
  - [Layout 布局](#layout-布局)
  - [Modal 弹窗](#modal-弹窗)
  - [Drawer 抽屉](#drawer-抽屉)
  - [Toast 轻提示](#toast-轻提示)
  - [Tooltip 文字提示](#tooltip-文字提示)
  - [Popover 弹出层](#popover-弹出层)
  - [Progress 进度](#progress-进度)
  - [Empty 空状态](#empty-空状态)
  - [Avatar 头像](#avatar-头像)
- [工具库 (Utils)](#工具库)
- [响应式系统](#响应式系统)
- [主题系统](#主题系统)
- [浏览器兼容](#浏览器兼容)

---

## 设计理念

Miuix Console 是 [Miuix](https://github.com/compose-miuix-ui/miuix)（小米 HyperOS 的 Compose Multiplatform 组件库）在 Web 端的忠实移植。

### 核心原则

| 原则 | 说明 |
|------|------|
| **Smooth Corner** | 不用普通 `border-radius`，而是连续曲率的贝塞尔曲线过渡 |
| **多层 Surface** | 4 级 surface 色阶，逐层递进 |
| **柔和阴影** | 所有阴影都是多层半透明叠加 |
| **弹簧动效** | 使用 `cubic-bezier(0.34, 1.56, 0.64, 1)` 弹簧曲线 |
| **深色优先** | Dark mode 是默认主题 |
| **毛玻璃** | 顶栏和底部导航使用 `backdrop-filter: blur(24px)` |

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
<!-- ... 其他组件 -->

<!-- Utils (按需) -->
<script src="miuix-console/utils/smooth-corner.js"></script>
<script src="miuix-console/utils/ripple.js"></script>
<!-- ... 其他工具 -->
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
│   ├── tag.css                  # 标签 / Chip（可关闭、多色、输入标签）
│   ├── input.css                # 输入框 / 文本域
│   ├── select.css               # 下拉选择器（单选/多选/搜索）
│   ├── checkbox.css             # 复选框 & 单选框
│   ├── slider.css               # 滑块 / 范围选择
│   ├── datepicker.css           # 日期选择器
│   ├── upload.css               # 文件上传（拖拽/文件列表/进度）
│   ├── table.css                # 数据表格
│   ├── stat.css                 # 统计卡片
│   ├── tabs.css                 # 选项卡（下划线/胶囊/卡片变体）
│   ├── pagination.css           # 分页器
│   ├── accordion.css            # 折叠面板（默认/卡片/无边框）
│   ├── tree.css                 # 树形控件
│   ├── navigation.css           # 顶栏 / 侧边栏 / 底部导航 / 面包屑 / 胶囊组
│   ├── activity.css             # 活动列表 / 柱状图
│   ├── layout.css               # 页面布局 shell / 网格 / flex 工具
│   ├── modal.css                # 弹窗 / 对话框 / 确认框
│   ├── drawer.css               # 抽屉 / 侧边面板
│   ├── toast.css                # 轻提示 / Snackbar
│   ├── tooltip.css              # 文字提示
│   ├── popover.css              # 弹出层 / 下拉菜单
│   ├── progress.css             # 进度条 / 加载指示器 / 环形进度
│   ├── empty.css                # 空状态占位
│   └── avatar.css               # 头像 / 头像组 / 在线状态
│
├── utils/                       # JavaScript 工具库
│   ├── smooth-corner.js         # Miuix SmoothRoundedCornerShape → CSS clip-path
│   ├── ripple.js                # 点击涟漪效果
│   ├── counter.js               # 数字滚动动画
│   ├── theme.js                 # 主题切换 + 密度管理 + localStorage 持久化
│   ├── chart.js                 # 柱状图渲染器
│   ├── modal.js                 # 弹窗管理 + confirm() Promise API
│   ├── toast.js                 # Toast 管理（自动消失/进度条/操作按钮）
│   ├── select.js                # 下拉选择管理（单选/多选/搜索过滤）
│   ├── tabs.js                  # 选项卡管理
│   ├── pagination.js            # 分页器渲染
│   ├── accordion.js             # 折叠面板管理
│   ├── datepicker.js            # 日期选择器管理
│   └── upload.js                # 文件上传管理（拖拽/过滤/文件列表）
│
├── demo/                        # 演示页面
│   └── index.html               # 完整 demo（含所有组件展示）
│
├── miuix-console.js             # 一键入口（自动加载所有 CSS + JS + 初始化）
└── README.md                    # 本文档
```

---

## 设计令牌

所有视觉参数集中在 `core/tokens.css`，通过 CSS 自定义属性全局生效。

### 色彩

```css
/* Primary — 种子色 */
--mx-primary: #3482FF;
--mx-primary-hover: #5D9BFF;
--mx-primary-active: #277AF7;
--mx-primary-glow: rgba(52,130,255,0.12);

/* Semantic — 语义色 */
--mx-green: #34D399;    /* 成功 */
--mx-amber: #FBBF24;    /* 警告 */
--mx-red: #E94634;      /* 错误（Light）/ #F12522（Dark） */
--mx-blue: #60A5FA;     /* 信息 */
```

### Surface 色阶

```css
--mx-bg: #FFFFFF;          /* Light: 页面背景 */
--mx-s1: #F7F7F7;          /* 导航栏、侧边栏 */
--mx-s2: #FFFFFF;          /* 卡片 */
--mx-s3: #E8E8E8;          /* 输入框、浮层 */
--mx-s4: #E8E8E8;          /* 下拉菜单 */

/* Dark mode: */
--mx-bg: #242424;
--mx-s1: #000000;
--mx-s2: #242424;
--mx-s3: #242424;
--mx-s4: #2D2D2D;
```

### 动效

```css
--mx-ease: cubic-bezier(0.16, 1, 0.3, 1);       /* 标准缓动 */
--mx-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* 弹簧 */
--mx-d1: 180ms;   /* 快速 */
--mx-d2: 280ms;   /* 标准 */
--mx-d3: 420ms;   /* 慢速 */
--mx-d4: 600ms;   /* 极慢 */
```

---

## 组件文档

### Card 卡片

```html
<!-- 基础卡片 -->
<div class="mx-card">
  <div class="mx-card-head"><span class="mx-card-title">标题</span></div>
  <div class="mx-card-body">内容区域</div>
</div>

<!-- 可点击卡片 -->
<div class="mx-card mx-card-clickable" data-ripple>点击我</div>

<!-- Accent 卡片 — hover 顶部亮线 + 右上光晕 -->
<div class="mx-card mx-card-accent" style="--mx-card-accent: var(--mx-primary)">...</div>
```

### Button 按钮

```html
<button class="mx-btn mx-btn-primary" data-ripple>Primary</button>
<button class="mx-btn mx-btn-secondary" data-ripple>Secondary</button>
<button class="mx-btn mx-btn-ghost" data-ripple>Ghost</button>
<button class="mx-btn mx-btn-danger" data-ripple>Danger</button>
<button class="mx-btn mx-btn-primary mx-btn-pill">Pill</button>
<button class="mx-btn mx-btn-primary mx-btn-sm">Small</button>
<button class="mx-btn mx-btn-primary mx-btn-lg">Large</button>
```

### Switch 开关

```html
<label class="mx-switch">
  <input type="checkbox" checked>
  <span class="mx-switch-track"><span class="mx-switch-thumb"></span></span>
  <span class="mx-switch-label">开关标签</span>
</label>
```

### Badge 徽章

```html
<span class="mx-badge-success">运行中</span>
<span class="mx-badge-warning">部署中</span>
<span class="mx-badge-error">异常</span>
<span class="mx-badge-info">信息</span>
<span class="mx-badge-neutral">离线</span>
<span class="mx-count">12</span>
```

### Tag 标签

```html
<!-- 基础 -->
<span class="mx-tag">默认</span>
<span class="mx-tag mx-tag-primary">Primary</span>
<span class="mx-tag mx-tag-success mx-tag-dot">成功</span>
<span class="mx-tag mx-tag-error mx-tag-clickable">可删除 ×</span>

<!-- Outline 变体 -->
<span class="mx-tag mx-tag-outline mx-tag-primary">Outline</span>

<!-- 输入标签 -->
<div class="mx-tag-input">
  <span class="mx-tag mx-tag-primary">React <span class="mx-tag-close">×</span></span>
  <input placeholder="添加标签...">
</div>
```

### Input 输入框

```html
<div class="mx-input-wrap">
  <input class="mx-input" placeholder="请输入">
</div>
<!-- 带图标 -->
<div class="mx-input-wrap">
  <span class="mx-input-icon"><svg>...</svg></span>
  <input class="mx-input" placeholder="搜索...">
</div>
<!-- 文本域 -->
<div class="mx-input-wrap mx-textarea-wrap">
  <textarea class="mx-textarea" placeholder="输入内容..."></textarea>
</div>
<!-- 错误态 -->
<div class="mx-input-wrap mx-input-error"><input class="mx-input" value="错误"></div>
<span class="mx-helper mx-helper-error">此字段为必填项</span>
```

### Select 下拉选择

```html
<div class="mx-select">
  <div class="mx-select-trigger" data-ripple>
    <span class="mx-select-placeholder">请选择...</span>
    <span class="mx-select-value" style="display:none"></span>
    <svg class="mx-select-arrow">...</svg>
  </div>
  <div class="mx-select-dropdown">
    <div class="mx-select-option" data-value="apple">🍎 苹果</div>
    <div class="mx-select-option" data-value="banana">🍌 香蕉</div>
  </div>
</div>

<!-- 带搜索 -->
<div class="mx-select">
  <div class="mx-select-trigger">...</div>
  <div class="mx-select-dropdown">
    <div class="mx-select-search">
      <svg>...</svg>
      <input placeholder="搜索...">
    </div>
    <div class="mx-select-option" data-value="1">选项 1</div>
  </div>
</div>

<!-- 多选 -->
<div class="mx-select" data-multi="true">...</div>

<!-- JS API -->
<script>
  MxSelect.getValue(selectEl);           // 获取值
  MxSelect.setValue(selectEl, 'apple');   // 设置值
  selectEl.addEventListener('mx-select-change', e => console.log(e.detail.value));
</script>
```

### Checkbox & Radio

```html
<!-- Checkbox -->
<label class="mx-checkbox">
  <input type="checkbox" checked>
  <span class="mx-checkbox-box">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
  </span>
  <span class="mx-checkbox-label">已选中</span>
</label>

<!-- Radio -->
<label class="mx-radio">
  <input type="radio" name="group" checked>
  <span class="mx-radio-dot"></span>
  <span class="mx-radio-label">选项 A</span>
</label>
```

### Slider 滑块

```html
<div class="mx-slider">
  <input type="range" min="0" max="100" value="60">
  <span class="mx-slider-value">60</span>
</div>

<!-- JS: 同步显示值 -->
<script>
  document.querySelector('.mx-slider input').addEventListener('input', function() {
    this.closest('.mx-slider').querySelector('.mx-slider-value').textContent = this.value;
  });
</script>
```

### Date Picker 日期选择

```html
<div class="mx-datepicker">
  <div class="mx-datepicker-input">
    <svg>...</svg>
    <span class="placeholder">选择日期...</span>
  </div>
  <div class="mx-datepicker-dropdown">
    <div class="mx-datepicker-head">...</div>
    <div class="mx-datepicker-weekdays">...</div>
    <div class="mx-datepicker-days"></div>
  </div>
</div>

<script>
  picker.addEventListener('mx-date-change', e => console.log(e.detail.date));
  MxDatePicker.getValue(pickerEl);  // Date|null
  MxDatePicker.setValue(pickerEl, new Date(2024, 0, 15));
</script>
```

### Upload 文件上传

```html
<div class="mx-upload">
  <div class="mx-upload-icon"><svg>...</svg></div>
  <div class="mx-upload-text">点击或拖拽上传文件</div>
  <div class="mx-upload-hint">支持 JPG, PNG, PDF</div>
  <input type="file" multiple accept=".jpg,.png,.pdf" style="display:none">
</div>

<script>
  upload.addEventListener('mx-upload-change', e => console.log(e.detail.files));
</script>
```

### Table 表格

```html
<div class="mx-table-wrap">
  <table class="mx-table">
    <thead><tr><th>服务</th><th>状态</th><th>CPU</th></tr></thead>
    <tbody>
      <tr><td><strong>api-gateway</strong></td><td><span class="mx-badge-success">运行中</span></td><td class="mono">42%</td></tr>
    </tbody>
  </table>
</div>
<!-- 紧凑模式 -->
<table class="mx-table mx-table-compact">...</table>
```

### Stat 统计卡

```html
<div class="mx-stat-grid">
  <div class="mx-stat" style="--mx-stat-accent: var(--mx-primary)">
    <div class="mx-stat-label">
      <div class="mx-stat-icon" style="background:rgba(76,139,245,0.12);color:var(--mx-primary)">
        <svg>...</svg>
      </div>
      活跃用户
    </div>
    <div class="mx-stat-value"><span data-mx-count="12847">0</span></div>
    <span class="mx-stat-delta up">↑ 12.5%</span>
  </div>
</div>
```

### Tabs 选项卡

```html
<!-- 下划线变体（默认） -->
<div class="mx-tabs">
  <div class="mx-tab active" data-panel="tab1">概览</div>
  <div class="mx-tab" data-panel="tab2">详情</div>
  <div class="mx-tab" data-panel="tab3">日志 <span class="mx-count">3</span></div>
</div>
<div class="mx-tab-panel active" id="tab1">内容 1</div>
<div class="mx-tab-panel" id="tab2">内容 2</div>

<!-- 胶囊变体 -->
<div class="mx-tabs mx-tabs-pill">
  <div class="mx-tab active">全部</div>
  <div class="mx-tab">进行中</div>
</div>

<!-- 卡片变体 -->
<div class="mx-tabs mx-tabs-card">...</div>

<script>
  tabs.addEventListener('mx-tab-change', e => console.log(e.detail.index));
</script>
```

### Pagination 分页器

```html
<div id="pagination"></div>

<script>
  MxPagination.render(document.getElementById('pagination'), {
    current: 3,
    total: 12,
    onChange: page => {
      MxPagination.render(container, { current: page, total: 12, onChange: ... });
    }
  });
</script>
```

### Accordion 折叠面板

```html
<div class="mx-accordion">
  <div class="mx-accordion-item open">
    <div class="mx-accordion-header">
      <span class="mx-accordion-title">标题</span>
      <svg class="mx-accordion-arrow">...</svg>
    </div>
    <div class="mx-accordion-content">
      <div class="mx-accordion-body">内容</div>
    </div>
  </div>
</div>

<!-- 变体 -->
<div class="mx-accordion mx-accordion-card">...</div>  <!-- 卡片式 -->
<div class="mx-accordion mx-accordion-flush">...</div>  <!-- 无边框 -->
```

### Tree 树形控件

```html
<div class="mx-tree">
  <div class="mx-tree-node open">
    <div class="mx-tree-row">
      <span class="mx-tree-indent"></span>
      <span class="mx-tree-toggle"><svg>...</svg></span>
      <span class="mx-tree-icon"><svg>...</svg></span>
      <span class="mx-tree-label">文件夹</span>
    </div>
    <div class="mx-tree-children">
      <div class="mx-tree-node mx-tree-leaf">
        <div class="mx-tree-row">...</div>
      </div>
    </div>
  </div>
</div>
```

### Navigation 导航

```html
<!-- TopBar — 毛玻璃 -->
<header class="mx-topbar">...</header>

<!-- Sidebar -->
<aside class="mx-sidebar">
  <div class="mx-sidebar-section">概览</div>
  <div class="mx-nav-item active">
    <svg>...</svg>
    <span class="mx-nav-label">仪表盘</span>
  </div>
</aside>

<!-- BottomNav — 移动端 -->
<nav class="mx-bottom-nav">
  <ul class="mx-bottom-nav-items">
    <li class="mx-btm-item active"><svg>...</svg><span>首页</span></li>
  </ul>
</nav>

<!-- 面包屑 -->
<div class="mx-breadcrumb">
  <span>仪表盘</span>
  <span class="mx-breadcrumb-sep">›</span>
  <span>概览</span>
</div>

<!-- 胶囊组 -->
<div class="mx-pill-group">
  <button class="active">标准</button>
  <button>紧凑</button>
</div>
```

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

### Chart 图表

```html
<div class="mx-chart" id="myChart"></div>

<script>
  MxChart.render(document.getElementById('myChart'), [35, 52, 68, 45, 78, 92]);
  MxChart.replay(document.getElementById('myChart'));
</script>
```

### Layout 布局

```html
<div class="mx-app">
  <header class="mx-topbar">...</header>
  <aside class="mx-sidebar">...</aside>
  <div class="mx-desktop-shell">
    <header class="mx-desktop-topbar">...</header>
    <main class="mx-desktop-main mx-body">...</main>
  </div>
</div>

<div class="mx-grid-2">两列</div>
<div class="mx-grid-3">三列</div>
<div class="mx-grid-sidebar">主内容 + 右侧 320px</div>
```

### Modal 弹窗

```html
<!-- 静态声明 -->
<div class="mx-modal-overlay" id="myModal">
  <div class="mx-modal">
    <div class="mx-modal-head">
      <span class="mx-modal-title">标题</span>
      <button class="mx-modal-close" onclick="MxModal.close('myModal')">×</button>
    </div>
    <div class="mx-modal-body">内容</div>
    <div class="mx-modal-foot">
      <button class="mx-btn mx-btn-ghost" onclick="MxModal.close('myModal')">取消</button>
      <button class="mx-btn mx-btn-primary">确认</button>
    </div>
  </div>
</div>

<!-- JS: 打开/关闭 -->
<script>
  MxModal.open('myModal');
  MxModal.close('myModal');

  // 动态确认框 — 返回 Promise
  const confirmed = await MxModal.confirm({
    title: '确认删除？',
    message: '此操作不可撤销',
    type: 'danger',
    confirmText: '删除',
    cancelText: '取消'
  });
</script>

<!-- 尺寸变体 -->
<div class="mx-modal mx-modal-sm">...</div>
<div class="mx-modal mx-modal-lg">...</div>
<div class="mx-modal mx-modal-xl">...</div>
<div class="mx-modal mx-modal-full">...</div>
```

### Drawer 抽屉

```html
<div class="mx-drawer-overlay" id="myDrawerOverlay"></div>
<div class="mx-drawer mx-drawer-right" id="myDrawer">
  <div class="mx-drawer-head">
    <span class="mx-drawer-title">标题</span>
    <button class="mx-drawer-close">×</button>
  </div>
  <div class="mx-drawer-body">内容</div>
  <div class="mx-drawer-foot">
    <button class="mx-btn mx-btn-primary">确认</button>
  </div>
</div>

<!-- 位置变体 -->
<div class="mx-drawer mx-drawer-left">...</div>
<div class="mx-drawer mx-drawer-sm">...</div>
<div class="mx-drawer mx-drawer-lg">...</div>
```

### Toast 轻提示

```html
<script>
  MxToast.success('操作成功！');
  MxToast.warning('请注意检查');
  MxToast.error('操作失败');
  MxToast.info('这是一条信息');

  // 带操作按钮
  MxToast.info('已删除', {
    action: '撤销',
    onAction: () => { /* 撤销逻辑 */ }
  });

  // 完整参数
  MxToast.show({
    message: '自定义消息',
    type: 'success',      // success|warning|error|info
    duration: 5000,        // ms, 0=不自动消失
    action: '查看',
    onAction: () => {}
  });
</script>
```

### Tooltip 文字提示

```html
<button class="mx-btn mx-btn-secondary mx-tooltip" data-tooltip="提示文字">Hover me</button>

<!-- 方向变体 -->
<button class="mx-tooltip mx-tooltip-bottom" data-tooltip="下方">Bottom</button>
<button class="mx-tooltip mx-tooltip-left" data-tooltip="左侧">Left</button>
<button class="mx-tooltip mx-tooltip-right" data-tooltip="右侧">Right</button>
```

### Popover 弹出层

```html
<div class="mx-popover-wrap">
  <button class="mx-btn" onclick="document.getElementById('pop').classList.toggle('open')">打开</button>
  <div class="mx-popover mx-popover-bottom" id="pop">
    <div class="mx-popover-item"><svg>...</svg>编辑</div>
    <div class="mx-popover-item"><svg>...</svg>复制</div>
    <div class="mx-popover-divider"></div>
    <div class="mx-popover-item danger"><svg>...</svg>删除</div>
  </div>
</div>
```

### Progress 进度

```html
<!-- 线性进度条 -->
<div class="mx-progress">
  <div class="mx-progress-bar" style="width: 72%"></div>
</div>

<!-- 不确定进度 -->
<div class="mx-progress mx-progress-indeterminate">
  <div class="mx-progress-bar"></div>
</div>

<!-- 条纹动画 -->
<div class="mx-progress mx-progress-striped mx-progress-animated">
  <div class="mx-progress-bar" style="width: 45%"></div>
</div>

<!-- 颜色变体 -->
<div class="mx-progress mx-progress-success"><div class="mx-progress-bar" style="width:60%"></div></div>
<div class="mx-progress mx-progress-warning"><div class="mx-progress-bar" style="width:80%"></div></div>
<div class="mx-progress mx-progress-error"><div class="mx-progress-bar" style="width:90%"></div></div>

<!-- 尺寸 -->
<div class="mx-progress mx-progress-sm">...</div>
<div class="mx-progress mx-progress-lg">...</div>

<!-- 旋转加载 -->
<div class="mx-spinner"></div>
<div class="mx-spinner mx-spinner-sm"></div>
<div class="mx-spinner mx-spinner-lg"></div>
<div class="mx-spinner-dots"><span></span><span></span><span></span></div>

<!-- 带标签 -->
<div class="mx-progress-label"><span>上传进度</span><span class="mx-progress-value">72%</span></div>
<div class="mx-progress"><div class="mx-progress-bar" style="width:72%"></div></div>
```

### Empty 空状态

```html
<div class="mx-empty">
  <div class="mx-empty-icon"><svg>...</svg></div>
  <div class="mx-empty-title">暂无数据</div>
  <div class="mx-empty-desc">当前没有任何记录</div>
  <button class="mx-btn mx-btn-primary mx-btn-sm">新建</button>
</div>

<!-- 紧凑变体 -->
<div class="mx-empty mx-empty-inline">...</div>
```

### Avatar 头像

```html
<!-- 基础 -->
<div class="mx-avatar">B</div>

<!-- 尺寸 -->
<div class="mx-avatar mx-avatar-xs">A</div>
<div class="mx-avatar mx-avatar-sm">B</div>
<div class="mx-avatar mx-avatar-md">C</div>
<div class="mx-avatar mx-avatar-lg">D</div>
<div class="mx-avatar mx-avatar-xl">E</div>

<!-- 图片 -->
<img class="mx-avatar-img" src="avatar.jpg" alt="">

<!-- 头像组 -->
<div class="mx-avatar-group">
  <div class="mx-avatar mx-avatar-status online">A</div>
  <div class="mx-avatar mx-avatar-status busy">B</div>
  <div class="mx-avatar mx-avatar-status away">C</div>
  <div class="mx-avatar-overflow">+5</div>
</div>

<!-- 在线状态 -->
<div class="mx-avatar mx-avatar-status online">A</div>  <!-- online|busy|away|offline -->
```

---

## 工具库

### Smooth Corner

```html
<div class="mx-smooth" style="--mx-r: 16px">内容</div>
<script>MxSmoothCorner.init();</script>
```

### Ripple 涟漪

```html
<button data-ripple>点击产生涟漪</button>
```

### Counter 计数器

```html
<span data-mx-count="12847">0</span>
<span data-mx-count="0.05" data-mx-decimals="2">0</span>
```

### Theme 主题

```js
MxTheme.toggle();           // 切换 dark/light
MxTheme.set('dark');        // 设置主题
MxTheme.get();              // 获取当前主题

window.addEventListener('mx-theme-change', e => console.log(e.detail.theme));
```

### Density 密度

```js
MxDensity.set('compact');   // 紧凑模式
MxDensity.set('normal');    // 标准模式
```

### Chart 图表

```js
MxChart.render(container, [35, 52, 68, 45, 78]);
MxChart.replay(container);
```

### Modal 弹窗管理

```js
MxModal.open('myModal');
MxModal.close('myModal');
const ok = await MxModal.confirm({ title, message, type, confirmText, cancelText });
```

### Toast 轻提示

```js
MxToast.success('成功');
MxToast.error('失败', { duration: 5000 });
MxToast.show({ message, type, duration, action, onAction });
MxToast.dismiss(toastId);
```

### Select 下拉选择

```js
MxSelect.init();
MxSelect.getValue(selectEl);
MxSelect.setValue(selectEl, 'value');
selectEl.addEventListener('mx-select-change', e => {});
```

### Tabs 选项卡

```js
MxTabs.init();
MxTabs.activate(tabsEl, 2);
tabsEl.addEventListener('mx-tab-change', e => {});
```

### Pagination 分页器

```js
MxPagination.render(container, { current: 1, total: 10, onChange: page => {} });
```

### Accordion 折叠面板

```js
MxAccordion.init();
MxAccordion.open(accordionEl, 0);
MxAccordion.close(accordionEl, 0);
accordionEl.addEventListener('mx-accordion-change', e => {});
```

### Date Picker 日期选择

```js
MxDatePicker.init();
MxDatePicker.getValue(pickerEl);  // Date|null
MxDatePicker.setValue(pickerEl, new Date());
pickerEl.addEventListener('mx-date-change', e => console.log(e.detail.date));
```

### Upload 文件上传

```js
MxUpload.init();
uploadEl.addEventListener('mx-upload-change', e => console.log(e.detail.files));
uploadEl.addEventListener('mx-upload-remove', e => console.log(e.detail.index));
```

---

## 响应式系统

| 断点 | 设备 | 布局变化 |
|------|------|---------|
| `< 768px` | 手机 | 底部导航、2 列统计卡、精简表格 |
| `≥ 768px` | 平板 | 4 列统计卡 |
| `≥ 1024px` | 桌面 | 侧边栏 + 内容区、隐藏底部导航 |
| `≥ 1440px` | 大屏 | 侧边栏加宽至 260px |

---

## 主题系统

### Dark Mode（默认）

- 背景 `#242424`，Surface `#000000`
- 文字 `#F2F2F2`
- 卡片带 `inset 0 1px 0 rgba(255,255,255,0.04)` 内发光

### Light Mode

- 背景 `#FFFFFF`，Surface `#F7F7F7`
- 文字 `#000000`

### 自定义主题

```css
:root {
  --mx-primary: #E91E63;
  --mx-r: 20px;
}
```

---

## 浏览器兼容

| 浏览器 | 版本 |
|--------|------|
| Chrome | 80+ |
| Firefox | 80+ |
| Safari | 14+ |
| Edge | 80+ |
| iOS Safari | 14+ |
| Android Chrome | 80+ |

---

## License

Apache License 2.0
