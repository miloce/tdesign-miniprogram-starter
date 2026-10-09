(function () {
    
    // === 注入样式 ===
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
        }
        body::before {
            content: "";
            position: fixed;
            inset: 0;
            background: var(--overlay-bg, rgba(0,0,0,.75)); /* 默认 .75 */
        }
    `;
    document.head.appendChild(style);
    
    
    // 检查 dataInfo 是否存在
    if (typeof dataInfo === 'undefined' || !dataInfo) return;

    // 透明度设置：dataInfo.opacity 是 0~100
    var opacity = 1 - dataInfo.opacity / 100;
    document.body.style.setProperty('--overlay-bg', 'rgba(0,0,0,' + opacity + ')');

    // 如果存在背景图字段
    if (dataInfo.backgroundImg) {
        document.body.style.background = `url("${encodeURI(dataInfo.backgroundImg)}") center center / cover no-repeat`;
    }
})();