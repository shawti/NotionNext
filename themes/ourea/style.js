/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    /* 设置了从上到下的渐变黑色 */
    #theme-ourea .header-cover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:  linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.5) 100%);
    }
    .notion-table-of-contents-item {
        overflow: visible;
    }
    .notion-table-of-contents-item:hover {
        background-color: #f5f5ff;
    }
    
    #sticky-nav {
      box-shadow: 0 16px 34px rgba(206,203,255,.1);
    }
    
    #footer {
      box-shadow: 16px 0 34px rgba(206,203,255,.1);
    }

    @font-face {
      font-family:'Michroma-Regular';
      src:url('/webfonts/Michroma-Regular.ttf');
      font-display: swap;
    }
    
  `}</style>
}

export { Style }
