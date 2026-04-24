/**
 * MIUIX CONSOLE — Framework Entry Point
 * 引入此文件自动初始化所有组件
 *
 * <script src="miuix-console.js"></script>
 */

(function() {
  'use strict';

  // 动态加载 CSS（如果未手动引入）
  function loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  // 获取当前脚本路径
  const scripts = document.querySelectorAll('script[src*="miuix-console"]');
  const currentScript = scripts[scripts.length - 1];
  const basePath = currentScript ? currentScript.src.replace(/\/[^/]*$/, '/') : './';

  // 加载所有 CSS
  const cssFiles = [
    'core/tokens.css',
    'core/base.css',
    'core/animations.css',
    'components/card.css',
    'components/button.css',
    'components/switch.css',
    'components/badge.css',
    'components/input.css',
    'components/navigation.css',
    'components/table.css',
    'components/stat.css',
    'components/activity.css',
    'components/layout.css',
  ];
  cssFiles.forEach(f => loadCSS(basePath + f));

  // DOM Ready 后初始化
  function init() {
    // 加载工具脚本
    const utils = [
      'utils/smooth-corner.js',
      'utils/ripple.js',
      'utils/counter.js',
      'utils/theme.js',
      'utils/chart.js',
    ];

    let loaded = 0;
    utils.forEach(f => {
      const script = document.createElement('script');
      script.src = basePath + f;
      script.onload = () => {
        loaded++;
        if (loaded === utils.length) {
          // 所有工具加载完毕，初始化
          if (typeof MxSmoothCorner !== 'undefined') MxSmoothCorner.init();
          if (typeof MxRipple !== 'undefined') MxRipple.init();
          if (typeof MxCounter !== 'undefined') MxCounter.init();
          if (typeof MxTheme !== 'undefined') MxTheme.init();
          if (typeof MxDensity !== 'undefined') MxDensity.init();

          // 派发就绪事件
          window.dispatchEvent(new CustomEvent('mx-ready'));
          console.log('%c✦ Miuix Console Framework loaded', 'color:#4C8BF5;font-weight:bold');
        }
      };
      document.head.appendChild(script);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
