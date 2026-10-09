/**
 * Universal Loader
 */
(function () {

    /** 加载 JS */
    function loadJS(url, version) {
        return new Promise((resolve, reject) => {
            if (!url) return resolve();

            if (document.querySelector(`script[data-loader="${url}"]`)) {
                return resolve();
            }

            const script = document.createElement("script");
            script.src = `${url}?v=${version}`;
            script.async = true;
            script.dataset.loader = url;

            script.onload = resolve;
            script.onerror = () => reject(`JS 加载失败: ${url}`);

            document.head.appendChild(script);
        });
    }

    /** 加载 CSS */
    function loadCSS(url, version) {
        return new Promise((resolve, reject) => {
            if (!url) return resolve();

            if (document.querySelector(`link[data-loader="${url}"]`)) {
                return resolve();
            }

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `${url}?v=${version}`;
            link.dataset.loader = url;

            link.onload = resolve;
            link.onerror = () => reject(`CSS 加载失败: ${url}`);

            document.head.appendChild(link);
        });
    }

    /** 主流程 */
    function startLoader() {
        if (!dataInfo) return console.warn("缺少 templateDate，无法加载资源。");

        const version = dataInfo.versionId || Date.now();

        if (!window.TEMPLATE_ASSETS) {
            return console.log("未定义 TEMPLATE_ASSETS，跳过加载");
        }

        const { js = [], css = [] } = window.TEMPLATE_ASSETS;

        // 加载 CSS
        css.forEach(c => loadCSS(c, version).catch(console.warn));

        // 加载 JS
        js.reduce((p, j) => {
            return p.then(() => loadJS(j, version).catch(console.warn));
        }, Promise.resolve());
    }

    startLoader();

})();