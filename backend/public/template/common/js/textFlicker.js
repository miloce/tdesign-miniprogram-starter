(function () {
    // === 创建 canvas ===
    var stars = document.createElement('canvas');
    stars.id = 'stars';
    stars.style.position = 'fixed';
    stars.style.left = 0;
    stars.style.top = 0;
    stars.style.pointerEvents = 'none';
    stars.style.zIndex = 98; // 比爱心低一点，防止遮挡
    let info = dataInfo.plugin.textFlicker;
    document.body.appendChild(stars);

    var context;
    var arr = [];
    var starCount = info.count;
    var windowWidth;

    // === 初始化画布 ===
    function init() {
        windowWidth = window.innerWidth;
        if (window.innerWidth > 680) {
            stars.width = window.innerWidth / 2.8;
        } else {
            stars.width = window.innerWidth;
        }
        stars.height = window.innerHeight;
        context = stars.getContext('2d');
    }

    // === 创建一个星星对象 ===
    var Star = function () {
        this.x = windowWidth * Math.random(); // 横坐标
        this.y = 8000 * Math.random(); // 纵坐标
        
        this.text = info.text; // 文本
        this.color = info.color; // 颜色
        context.font = info.fontSize + 'px arial';

        // 产生随机颜色
        this.getColor = function () {
            var _r = Math.random();
            if (_r < 0.5) {
                this.color = "#000";
            } else {
                this.color = "#EA80AF";
            }
        };

        // 初始化
        this.init = function () {
            this.getColor();
        };

        // 绘制
        this.draw = function () {
            context.fillStyle = this.color;
            context.fillText(this.text, this.x, this.y);
        };
    };

    // === 星星闪起来 ===
    function playStars() {
        for (var n = 0; n < starCount; n++) {
            arr[n].getColor();
            arr[n].draw();
        }
        setTimeout(playStars, 100);
    }

    // === 初始化并绘制 ===
    function start() {
        init();
        arr = [];
        for (var i = 0; i < starCount; i++) {
            var star = new Star();
            star.init();
            star.draw();
            arr.push(star);
        }
        playStars();
    }

    // === 启动 ===
    window.addEventListener('load', start);
})();
