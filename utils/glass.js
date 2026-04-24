/**
 * MIUIX CONSOLE — Liquid Glass Manager
 * 液体玻璃效果管理器
 *
 * 基于 liquid-glass-react 项目的原理：
 * 1. SVG filter 中用 feDisplacementMap 做折射扭曲
 * 2. Canvas 动态生成径向渐变位移贴图
 * 3. backdrop-filter 做模糊和饱和度增强
 */

class MxGlass {
  static _initialized = false;
  static _svgFilter = null;

  /**
   * 初始化 — 创建 SVG filter 并注入到 body
   */
  static init() {
    if (MxGlass._initialized) return;

    // 动态生成位移贴图（用 Canvas）
    const displacementDataUrl = MxGlass._generateDisplacementMap();

    // 创建 SVG filter
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'position:absolute;width:0;height:0');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `
      <defs>
        <filter id="mx-glass-filter" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">
          <feImage id="mx-glass-feimage" x="0" y="0" width="100%" height="100%"
                   result="DISPLACEMENT_MAP" href="${displacementDataUrl}"
                   preserveAspectRatio="xMidYMid slice"/>
          <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP"
                            scale="${MxGlass.getDisplacement() * -1}"
                            xChannelSelector="R" yChannelSelector="B"
                            result="DISPLACED"/>
          <feGaussianBlur in="DISPLACED" stdDeviation="0.3" result="BLURRED"/>
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
    MxGlass._svgFilter = svg;
    MxGlass._initialized = true;
  }

  /**
   * 动态生成位移贴图
   * 生成一个径向渐变，中心无位移，边缘有位移
   */
  static _generateDisplacementMap() {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // 中性灰色底 (128,128 = 无位移)
    ctx.fillStyle = 'rgb(128, 128, 128)';
    ctx.fillRect(0, 0, size, size);

    // 径向渐变 — 中心无位移，边缘向内收缩
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, size * 0.1,
      size / 2, size / 2, size * 0.5
    );
    gradient.addColorStop(0, 'rgb(128, 128, 128)');
    gradient.addColorStop(0.5, 'rgb(128, 128, 128)');
    gradient.addColorStop(0.8, 'rgb(100, 128, 150)');
    gradient.addColorStop(1, 'rgb(80, 128, 170)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return canvas.toDataURL('image/jpeg', 0.9);
  }

  /**
   * 获取当前位移量
   */
  static getDisplacement() {
    return parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--mx-glass-displacement')) || 25;
  }

  /**
   * 设置位移量 (0-100)
   */
  static setDisplacement(value) {
    document.documentElement.style.setProperty('--mx-glass-displacement', value);
    MxGlass._updateFilter();
  }

  /**
   * 设置模糊量
   */
  static setBlur(value) {
    document.documentElement.style.setProperty('--mx-glass-blur', value + 'px');
  }

  /**
   * 设置饱和度
   */
  static setSaturation(value) {
    document.documentElement.style.setProperty('--mx-glass-saturation', value + '%');
  }

  /**
   * 更新 SVG filter 的位移量
   */
  static _updateFilter() {
    const dispMap = document.querySelector('#mx-glass-filter feDisplacementMap');
    if (dispMap) {
      dispMap.setAttribute('scale', MxGlass.getDisplacement() * -1);
    }
  }

  /**
   * 启用液体玻璃
   */
  static enable() {
    document.documentElement.dataset.glass = 'liquid';
    if (!MxGlass._initialized) MxGlass.init();
  }

  /**
   * 禁用液体玻璃
   */
  static disable() {
    delete document.documentElement.dataset.glass;
  }

  /**
   * 切换
   */
  static toggle() {
    if (document.documentElement.dataset.glass === 'liquid') {
      MxGlass.disable();
    } else {
      MxGlass.enable();
    }
  }

  /**
   * 获取状态
   */
  static isEnabled() {
    return document.documentElement.dataset.glass === 'liquid';
  }
}

if (typeof module !== 'undefined') module.exports = MxGlass;
