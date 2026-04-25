# AI_GUIDE.md — Miuix Console AI 协作指南

> **本文档是给 AI 看的。** 它描述了如何使用 Miuix Console 框架构建界面，以及所有设计决策背后的哲学。
> 如果你是一个 AI 助手，正在帮用户搭建基于 Miuix Console 的 Web 界面，请仔细阅读本文档。

---

## 🚨 致命错误警告（构建 App Shell 前必须阅读）

使用 App Shell 布局（`mx-app` + `mx-sidebar` + `mx-desktop-shell`）时，**最常见的致命错误**是将 `<main>` 嵌套在 `.mx-desktop-shell` 内部。这会导致 flex 布局失效，**主内容区域完全空白**，页面只显示侧边栏和顶栏。

**正确结构：**
```
.mx-app
├── .mx-topbar            ← 手机端顶栏
├── .mx-sidebar           ← 侧边栏
├── .mx-desktop-shell     ← ⚠️ 只包裹桌面端顶栏！
│   └── .mx-desktop-topbar
├── <main class="mx-desktop-main mx-body">  ← ✅ 必须是 .mx-app 的直接子元素
└── .mx-bottom-nav        ← 底部导航
```

**错误结构（页面空白）：**
```
.mx-app
├── .mx-desktop-shell
│   ├── .mx-desktop-topbar
│   └── <main>            ← ❌ 内容不可见！
└── .mx-bottom-nav
```

> ⚠️ **这条规则适用于所有使用 Miuix Console App Shell 的项目。** 已多次因此导致线上页面空白。详见 [3.3 App Shell 完整模板](#33-app-shell-完整模板) 和 [6.2 常见错误](#62-常见错误)。

---

## 一、项目概述

**Miuix Console** 是小米 HyperOS Miuix 设计语言的 Web 端忠实移植。它不是一个"受启发"的框架——它是从 Miuix Compose Multiplatform 源码 **1:1 移植** 的。

- **技术栈**: 纯 CSS + Vanilla JavaScript，零依赖
- **字体**: MiSans（小米官方字体，通过 CDN 加载）
- **许可证**: Apache 2.0
- **GitHub**: https://github.com/bmbxwbh/miuix-console
- **在线演示**: https://bmbxwbh.github.io/miuix-console/

### 文件结构

```
miuix-console/
├── core/                    # 设计系统核心（必须引入）
│   ├── tokens.css           # 设计令牌：所有视觉参数的唯一来源
│   ├── base.css             # 全局重置 + 滚动条 + 选区 + reduced-motion
│   ├── animations.css       # @keyframe + 动画工具类 + 骨架屏
│   └── glass.css            # 液体玻璃效果（可选）
├── components/              # 28 个 UI 组件，每个独立 CSS 文件
│   ├── card.css             # 命名前缀: .mx-card
│   ├── button.css           # 命名前缀: .mx-btn
│   └── ...                  # 每个文件头部有详细注释
├── utils/                   # 14 个 JS 工具类
│   ├── smooth-corner.js     # 全局类: MxSmoothCorner
│   ├── ripple.js            # 全局类: MxRipple
│   └── ...                  # 每个文件导出一个全局类
├── demo/
│   ├── index.html           # 完整组件演示（控制台风格）
│   └── glass.html           # Liquid Glass 参数调节 Playground
├── miuix-console.js         # 一键入口（自动加载所有 CSS + JS）
└── index.html               # 项目落地页
```

---

## 二、设计理念（必须遵守）

### 2.1 纯色背景，拒绝渐变

**这是最重要的设计原则。** Miuix Console 的所有背景都是纯色（solid color），不使用渐变。

```
✅ 正确: background: #FFFFFF;
✅ 正确: background: var(--mx-bg);
❌ 错误: background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
❌ 错误: background: linear-gradient(to right, #ff6b6b, #feca57);
```

**为什么？** HyperOS 的设计语言追求"安静的高级感"。渐变会引入视觉噪音，分散用户对内容的注意力。纯色背景让界面感觉更沉稳、更专业。

**例外情况（极少）：**
- 按钮的渐变阴影（如 `.mx-btn-primary` 的 `box-shadow`）是允许的
- Logo icon 的渐变背景可以接受
- 图表中的渐变色是数据可视化需要，不算违反原则

### 2.2 简约至上，克制设计

Miuix Console 不追求炫技，追求**安静的高级感**。

- **留白充足**: 组件之间有明确的间距系统（`--mx-r: 16px`）
- **信息密度适中**: 不堆砌元素，每个区域有明确的呼吸空间
- **视觉层次清晰**: 通过字重、颜色透明度、阴影深浅建立层次，而非通过颜色数量
- **动效服务于交互**: 动画不是装饰，是反馈。只在用户需要确认操作时出现

```
✅ 正确: 一个按钮，一个主色，清晰的 hover 状态
❌ 错误: 一个按钮有渐变背景、发光边框、旋转动画、粒子效果
```

### 2.3 Smooth Corner（连续曲率圆角）

这是 Miuix 最具辨识度的视觉特征。**不使用普通 `border-radius`**，而是使用贝塞尔曲线实现从直线到圆弧的连续曲率过渡。

- **系数 k = 0.55**（比标准的 0.5523 更柔和）
- 通过 `MxSmoothCorner.apply(el)` 或 `.mx-smooth` 类应用
- 底层使用 CSS `clip-path: path()` 实现

```html
<!-- 使用方式 -->
<div class="mx-smooth" style="--mx-r: 16px">内容</div>

<!-- 或通过 JS -->
<script>MxSmoothCorner.apply(element, 16);</script>
```

### 2.4 多层 Surface 色阶系统

Miuix 使用 5 级 Surface 色阶创造深度感，而非通过阴影或边框：

| 层级 | 变量 | Light 值 | Dark 值 | 用途 |
|------|------|----------|---------|------|
| 背景 | `--mx-bg` | `#FFFFFF` | `#161616` | 页面最底层 |
| S1 | `--mx-s1` | `#F7F7F7` | `#0C0C0C` | 导航栏、侧边栏（比背景深） |
| S2 | `--mx-s2` | `#FFFFFF` | `#1C1C1C` | 卡片（比背景浅） |
| S3 | `--mx-s3` | `#E8E8E8` | `#242424` | 输入框、浮层 |
| S4 | `--mx-s4` | `#E8E8E8` | `#2C2C2C` | 下拉菜单（最亮） |

**使用规则：**
- 组件背景只用 `--mx-s1` 到 `--mx-s4`，不要自定义颜色
- 悬停态用 `--mx-s-hover`（半透明黑/白叠加）
- 按压态用 `--mx-s-active`

### 2.5 柔和阴影系统

所有阴影都是**多层半透明叠加**，不使用硬投影：

```css
/* 三级阴影 */
--mx-sh1: 0 1px 4px rgba(0,0,0,0.08);    /* 微弱: 卡片默认 */
--mx-sh2: 0 4px 16px rgba(0,0,0,0.06);   /* 中等: 卡片悬停 */
--mx-sh3: 0 8px 32px rgba(0,0,0,0.08);   /* 强烈: 弹窗、浮层 */
```

**深色模式**下阴影更重（`rgba(0,0,0,0.4~0.5)`），因为深色背景需要更强的阴影才能感知到层次。

### 2.6 弹簧动效 vs 减速缓动

Miuix 严格区分两种动效曲线，**不可混用**：

| 曲线 | 值 | 用途 | 场景 |
|------|----|------|------|
| **弹簧** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 物理反馈 | Switch thumb、BottomNav 圆点、Sidebar 指示条 |
| **减速** | `cubic-bezier(0.16, 1, 0.3, 1)` | 通用过渡 | 按钮、卡片、输入框、弹窗、所有其他交互 |

**时间节奏（4 级）：**

| 变量 | 时长 | 场景 |
|------|------|------|
| `--mx-d1` | 100ms | 按下反馈（即时感） |
| `--mx-d2` | 200ms | hover in（快速响应） |
| `--mx-d3` | 320ms | hover out / 弹窗出场（从容消散） |
| `--mx-d4` | 500ms | 图表生长（慢速编排） |

**进快出慢原则**: Card / Stat / Table 的 hover 效果使用不对称时间——进入 200ms，离开 320ms。这让消散过程更从容。

### 2.7 深色优先

Dark mode 是默认主题，源自 HyperOS 的暗色设计哲学。Light mode 做等价适配，但 Dark mode 是第一公民。

```html
<!-- 默认深色 -->
<html data-theme="dark">

<!-- 切换到浅色 -->
<html data-theme="light">
```

### 2.8 毛玻璃效果

顶栏、侧边栏、底部导航使用 `backdrop-filter: blur(24px)` 毛玻璃效果，营造通透的层次感。

```css
/* 标准毛玻璃 */
backdrop-filter: blur(24px) saturate(1.8);
-webkit-backdrop-filter: blur(24px) saturate(1.8);
```

### 2.9 Liquid Glass（液体玻璃）— 可选增强

基于 Apple Liquid Glass 效果移植的高级视觉层，通过 `data-glass="liquid"` 启用。

**4 种折射模式：**
- `standard` — 标准径向渐变位移（通用场景）
- `polar` — 极坐标位移，中心旋转扭曲
- `prominent` — 中心凸起 + 边缘收缩（立体感最强）
- `shader` — SDF 精确计算位移（Apple 原版效果）

**核心特性：** SVG feDisplacementMap 真实折射、RGB 三通道色差分离、鼠标跟踪弹性变形、双层动态边框、Over-Light 自适应。

---

## 三、如何调用本项目

### 3.1 最简方式：一键引入

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- MiSans 字体（必须） -->
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Regular.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Medium.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Semibold.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Bold.min.css" rel="stylesheet">
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

`miuix-console.js` 会自动加载所有 CSS 和 JS，并初始化所有组件。

### 3.2 按需引入

```html
<!-- Core（必须，顺序不能变） -->
<link rel="stylesheet" href="core/tokens.css">
<link rel="stylesheet" href="core/base.css">
<link rel="stylesheet" href="core/animations.css">

<!-- Components（按需引入） -->
<link rel="stylesheet" href="components/card.css">
<link rel="stylesheet" href="components/button.css">
<link rel="stylesheet" href="components/input.css">
<!-- ... -->

<!-- Utils（按需引入） -->
<script src="utils/smooth-corner.js"></script>
<script src="utils/ripple.js"></script>
<!-- ... -->
```

### 3.3 App Shell 完整模板

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Regular.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Medium.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Semibold.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/misans@4.1/lib/Normal/MiSans-Bold.min.css" rel="stylesheet">
  <link rel="stylesheet" href="core/tokens.css">
  <link rel="stylesheet" href="core/base.css">
  <link rel="stylesheet" href="core/animations.css">
  <link rel="stylesheet" href="components/layout.css">
  <link rel="stylesheet" href="components/navigation.css">
  <!-- 更多组件... -->
</head>
<body>
  <div class="mx-app">
    <!-- 手机端顶栏 -->
    <header class="mx-topbar">
      <div class="mx-topbar-left">
        <div class="mx-logo">
          <div class="mx-logo-icon"><!-- SVG icon --></div>
          <span class="mx-logo-text">App Name</span>
        </div>
      </div>
      <div class="mx-topbar-right">
        <button class="mx-btn-icon" onclick="MxTheme.toggle()">
          <!-- 月亮/太阳图标 -->
        </button>
      </div>
    </header>

    <!-- 侧边栏（桌面端显示） -->
    <aside class="mx-sidebar">
      <div class="mx-sidebar-section">导航</div>
      <div class="mx-nav-item active" data-section="dashboard">
        <svg><!-- icon --></svg>
        <span class="mx-nav-label">概览</span>
      </div>
      <!-- 更多导航项... -->
    </aside>

    <!-- 桌面端顶栏（桌面端显示） -->
    <div class="mx-desktop-shell">
      <header class="mx-desktop-topbar">
        <div class="mx-breadcrumb">
          <span>App</span>
          <span class="mx-breadcrumb-sep">›</span>
          <span>当前页</span>
        </div>
      </header>
    </div>

    <!-- 主内容区（必须是 .mx-app 的直接子元素） -->
    <main class="mx-desktop-main mx-body">
      <div class="mx-page-head">
        <h1 class="mx-page-title">页面标题</h1>
        <p class="mx-page-sub">页面描述</p>
      </div>
      <!-- 内容... -->
    </main>

    <!-- 底部导航（手机端显示） -->
    <nav class="mx-bottom-nav">
      <ul class="mx-bottom-nav-items">
        <li class="mx-btm-item active">
          <svg><!-- icon --></svg>
          <span>首页</span>
        </li>
        <!-- 更多导航项... -->
      </ul>
    </nav>
  </div>

  <script src="miuix-console.js"></script>
</body>
</html>
```

> ### 🚨 最高优先级：DOM 结构规则（违反将导致内容完全不可见）
>
> **`<main>` 必须是 `.mx-app` 的直接子元素，绝对不能嵌套在 `.mx-desktop-shell` 内部。**
> 这是最常犯的错误。违反此规则会导致 flex 布局失效，主内容区域完全空白。
>
> **正确结构：**
> ```
> .mx-app
> ├── .mx-topbar          ← 手机端顶栏
> ├── .mx-sidebar         ← 侧边栏
> ├── .mx-desktop-shell   ← ⚠️ 只包裹桌面端顶栏！
> │   └── .mx-desktop-topbar
> ├── <main>              ← ✅ 必须在这里，作为 .mx-app 的直接子元素
> └── .mx-bottom-nav      ← 底部导航
> ```
>
> **错误结构（会导致页面空白）：**
> ```
> .mx-app
> ├── .mx-desktop-shell
> │   ├── .mx-desktop-topbar
> │   └── <main>           ← ❌ 嵌套在 desktop-shell 内部！内容不可见！
> └── .mx-bottom-nav
> ```

其他直接子元素规则：
- `.mx-sidebar` 是 `.mx-app` 的直接子元素
- `.mx-bottom-nav` 是 `.mx-app` 的直接子元素
- `.mx-desktop-shell` **只允许包含** `.mx-desktop-topbar`，不能放其他内容

### 3.4 响应式断点

| 断点 | 设备 | 适配策略 |
|------|------|----------|
| `< 768px` | 手机 | 触控优先、全屏弹窗、卡片式表格、单列网格 |
| `768–1023px` | 平板 | 居中弹窗、可滚动 tabs |
| `≥ 1024px` | 桌面 | 侧边栏布局 |
| `≥ 1440px` | 大屏 | 加宽侧边栏（260px） |
| `hover:none` | 纯触控 | 禁用 hover、加大触控区 ≥ 44px |
| `max-height:500px` | 横屏 | 隐藏底部导航 |

### 3.5 JS 工具类 API 速查

| 类名 | 核心方法 | 说明 |
|------|----------|------|
| `MxSmoothCorner` | `.init()` `.apply(el, r)` | Smooth Corner → clip-path |
| `MxRipple` | `.init()` | 点击涟漪（事件委托） |
| `MxCounter` | `.animate(el, to, opts)` | 数字滚动动画 |
| `MxTheme` | `.toggle()` `.set(t)` `.get()` | 主题切换 + localStorage |
| `MxDensity` | `.set(d)` `.get()` | 密度管理（normal/compact） |
| `MxChart` | `.render(container, data)` | 柱状图渲染器 |
| `MxModal` | `.open(id)` `.close(id)` `.confirm(opts)` | 弹窗 + Promise API |
| `MxToast` | `.show(opts)` `.success(m)` `.error(m)` | 轻提示 |
| `MxSelect` | `.init()` `.getValue(el)` `.setValue(el, v)` | 下拉选择 |
| `MxTabs` | `.init()` `.activate(el, i)` | 选项卡 |
| `MxPagination` | `.render(container, opts)` | 分页器 |
| `MxAccordion` | `.init()` `.open(el, i)` `.close(el, i)` | 折叠面板 |
| `MxDatePicker` | `.init()` `.getValue(el)` `.setValue(el, d)` | 日期选择 |
| `MxUpload` | `.init()` | 文件上传 |
| `MxGlass` | `.enable()` `.disable()` `.setMode(m)` | 液体玻璃 |

---

## 四、组件使用规范

### 4.1 命名约定

所有组件类名以 `mx-` 为前缀：

```
.mx-card          卡片
.mx-btn           按钮
.mx-btn-primary   按钮变体
.mx-btn-sm        按钮尺寸
.mx-input-wrap    输入框容器
.mx-modal         弹窗
.mx-toast         轻提示
```

状态类名不带前缀：

```
.active           激活态
.open             展开态
.disabled         禁用态
.selected         选中态
```

### 4.2 卡片 (Card)

```html
<div class="mx-card">
  <div class="mx-card-head">
    <span class="mx-card-title">标题</span>
    <span class="mx-badge mx-badge-success">状态</span>
  </div>
  <div class="mx-card-body">
    内容区域。子元素之间自动 12px 间距。
  </div>
</div>
```

变体：
- `.mx-card-clickable` — 可点击卡片（scale(0.98) 按压反馈）
- `.mx-card-accent` — 顶部 accent 线 + 右上角柔光晕

### 4.3 按钮 (Button)

```html
<button class="mx-btn mx-btn-primary" data-ripple>主要按钮</button>
<button class="mx-btn mx-btn-secondary">次要按钮</button>
<button class="mx-btn mx-btn-ghost">幽灵按钮</button>
<button class="mx-btn mx-btn-danger">危险按钮</button>
```

尺寸：`.mx-btn-sm` / 默认 / `.mx-btn-lg` / `.mx-btn-pill`
图标：`.mx-btn-icon`（正方形按钮）

**`data-ripple` 属性**会自动在按钮上启用 Miuix 涟漪效果。

### 4.4 输入框 (Input)

```html
<label class="mx-label">标签文字</label>
<div class="mx-input-wrap">
  <span class="mx-input-icon"><!-- SVG --></span>
  <input class="mx-input" placeholder="请输入...">
</div>
<span class="mx-helper">帮助文字</span>
```

变体：`.mx-input-error`（错误态）、`.mx-textarea-wrap`（文本域）
手机端自动使用 16px 字号防止 iOS 自动缩放。

### 4.5 弹窗 (Modal)

```html
<div class="mx-modal-overlay" id="myModal">
  <div class="mx-modal">
    <div class="mx-modal-head">
      <span class="mx-modal-title">标题</span>
      <button class="mx-modal-close" onclick="MxModal.close('myModal')">✕</button>
    </div>
    <div class="mx-modal-body">内容</div>
    <div class="mx-modal-foot">
      <button class="mx-btn mx-btn-ghost" onclick="MxModal.close('myModal')">取消</button>
      <button class="mx-btn mx-btn-primary">确认</button>
    </div>
  </div>
</div>
```

JS 调用：
```js
MxModal.open('myModal');
MxModal.close('myModal');
// Promise 弹窗
const confirmed = await MxModal.confirm({ title: '确认？', message: '...', type: 'danger' });
```

### 4.6 轻提示 (Toast)

```js
MxToast.success('操作成功');
MxToast.error('操作失败');
MxToast.warning('请注意');
MxToast.info('提示信息', { action: '撤销', onAction: () => {} });
```

### 4.7 表格 (Table)

```html
<div class="mx-table-wrap">
  <table class="mx-table">
    <thead><tr><th>列名</th></tr></thead>
    <tbody>
      <tr><td data-label="列名">内容</td></tr>
    </tbody>
  </table>
</div>
```

**手机端卡片式**：必须在 `<td>` 上添加 `data-label` 属性，表格在手机端会自动转换为卡片布局。

### 4.8 数据可视化 (Stat + Chart)

```html
<div class="mx-stat-grid">
  <div class="mx-stat" style="--mx-stat-accent: var(--mx-primary)">
    <div class="mx-stat-label">
      <div class="mx-stat-icon"><!-- SVG --></div>
      指标名称
    </div>
    <div class="mx-stat-value" data-counter="12846">0</div>
    <span class="mx-stat-delta up">↑ 12.5%</span>
  </div>
</div>
```

`data-counter` 属性会自动触发数字滚动动画。

---

## 五、CSS 变量覆盖指南

覆盖设计令牌来定制主题：

```css
:root {
  --mx-primary: #E91E63;    /* 修改主色 */
  --mx-r: 20px;             /* 修改默认圆角 */
  --mx-font: "Inter", sans-serif; /* 修改字体 */
}
```

**可覆盖的完整变量列表**（定义在 `core/tokens.css`）：
- 色彩：`--mx-primary` `--mx-error` `--mx-green` `--mx-amber` `--mx-blue`
- Surface：`--mx-bg` `--mx-s1` `--mx-s2` `--mx-s3` `--mx-s4`
- 文字：`--mx-text` `--mx-t2` `--mx-t3`
- 边框：`--mx-border` `--mx-divider`
- 圆角：`--mx-r` `--mx-r-sm` `--mx-r-xs` `--mx-r-pill`
- 阴影：`--mx-sh1` `--mx-sh2` `--mx-sh3`
- 动效：`--mx-ease` `--mx-spring` `--mx-d1` `--mx-d2` `--mx-d3` `--mx-d4`
- 字体：`--mx-font` `--mx-mono`

---

## 六、AI 协作规范

### 6.1 生成界面时必须遵守

1. **背景必须纯色**。使用 `--mx-bg`、`--mx-s1`~`--mx-s4`，不要使用渐变
2. **圆角使用 Miuix 值**。`--mx-r`（16px）、`--mx-r-sm`（12px）、`--mx-r-xs`（8px）
3. **动效使用预定义曲线**。`--mx-ease`（通用）或 `--mx-spring`（仅物理反馈）
4. **颜色使用 CSS 变量**。不要硬编码颜色值，使用 `--mx-primary`、`--mx-text` 等
5. **阴影使用预定义级别**。`--mx-sh1` / `--mx-sh2` / `--mx-sh3`
6. **响应式必须覆盖手机端**。确保内容在 `<768px` 下可用
7. **触控区域 ≥ 44px**。所有可交互元素在手机端必须有足够大的触控区域

### 6.2 常见错误

```
❌ 使用渐变背景:
   background: linear-gradient(135deg, #667eea, #764ba2);

❌ 硬编码颜色:
   color: #333;
   ✅ 应该用: color: var(--mx-text);

❌ 使用普通圆角:
   border-radius: 16px;
   ✅ 应该用: border-radius: var(--mx-r);

❌ 滥用弹簧动效:
   transition: all 0.3s var(--mx-spring);
   ✅ 弹簧只用于 Switch/BottomNav/Sidebar，其他用 var(--mx-ease)

❌ 忘记 data-ripple:
   <button class="mx-btn">点击</button>
   ✅ <button class="mx-btn" data-ripple>点击</button>

❌ main 嵌套在 desktop-shell 内（最常犯的致命错误！会导致页面完全空白）:
   <div class="mx-desktop-shell"><main>...</main></div>
   ✅ <main> 必须是 .mx-app 的直接子元素，desktop-shell 只包裹 topbar
```

### 6.3 代码风格

- CSS 缩进 2 空格
- 单行写法（不换行），组件内按功能分组
- JS 使用 ES6+ class 语法
- 全局类名不加 `IIFE` 包裹，直接 `class MxXxx {}`
- 文件头部有 `/* ══ MIUIX CONSOLE — Component Name ══ */` 注释
- 组件 CSS 文件头部包含对应 Miuix 源码文件的映射关系

### 6.4 配色参考（AI 调色板）

当需要为组件添加语义色时，使用以下色值：

| 语义 | Light | Dark | CSS 变量 |
|------|-------|------|----------|
| Primary | `#3482FF` | `#277AF7` | `--mx-primary` |
| Success | `#34D399` | `#34D399` | `--mx-green` |
| Warning | `#FBBF24` | `#FBBF24` | `--mx-amber` |
| Error | `#E94634` | `#F12522` | `--mx-error` |
| Info | `#60A5FA` | `#60A5FA` | `--mx-blue` |

语义色的背景使用 10% 透明度叠加：
```css
background: rgba(52,130,255,0.1);   /* primary 10% */
background: rgba(52,211,153,0.1);   /* success 10% */
background: rgba(251,191,36,0.1);   /* warning 10% */
background: rgba(248,113,113,0.1);  /* error 10% */
```

---

## 七、浏览器兼容

| 浏览器 | 最低版本 | 备注 |
|--------|----------|------|
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
- `ResizeObserver` / `MutationObserver`
- `CustomEvent`
- SVG `feDisplacementMap`（液体玻璃）

---

## 八、用户偏好（持续更新）

- **白色模式优先** > 深色模式
- **纯色背景** > 渐变背景
- **简约干净** > 花哨炫酷
- **频繁同步进度**（每 5 分钟左右推送一次进展）

---

_本文档由 AI 维护。当框架更新时，请同步更新此文件。_
_最后更新: 2026-04-25_
