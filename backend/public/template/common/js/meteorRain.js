(function () {
    // === 创建 canvas ===
    var meteor = document.createElement('canvas');
    meteor.id = 'meteor';
    meteor.style.position = 'fixed';
    meteor.style.left = 0;
    meteor.style.top = 0;
    meteor.style.pointerEvents = 'none';
    meteor.style.zIndex = 98; // 比爱心低一点，防止遮挡
    let info = dataInfo.plugin.meteorRain;
    document.body.appendChild(meteor);

    var context;
    var windowWidth;
    var rains = new Array();
    var rainCount = info.count;

    // === 初始化画布 ===
    function init() {
        windowWidth = window.innerWidth;
        if (window.innerWidth > 680) {
            meteor.width = window.innerWidth / 2.8;
        } else {
            meteor.width = window.innerWidth;
        }
        meteor.height = window.innerHeight;
        context = meteor.getContext('2d');
    }

    // === 流星对象 ===
    var MeteorRain = function () {
        this.x = -1;
        this.y = -1;
        this.length = -1; // 长度
        this.angle = 30;  // 倾斜角度
        this.width = -1;  // 宽度
        this.height = -1; // 高度
        this.speed = 1;   // 速度
        this.offset_x = -1;
        this.offset_y = -1;
        this.alpha = 1;   // 透明度
        this.color1 = info.color;
        this.color2 = "";

        this.init = function () {
            this.getPos();
            this.alpha = 1;
            this.getRandomColor();
            var x = Math.random() * 80 + 150;
            this.length = Math.ceil(x);
            this.angle = 30;
            x = Math.random() + 0.5;
            this.speed = Math.ceil(x);
            var cos = Math.cos(this.angle * 3.14 / 180);
            var sin = Math.sin(this.angle * 3.14 / 180);
            this.width = this.length * cos;
            this.height = this.length * sin;
            this.offset_x = this.speed * cos;
            this.offset_y = this.speed * sin;
        };

        this.getRandomColor = function () {
            var a = Math.ceil(255 - 240 * Math.random());
            this.color1 = "rgba(" + a + "," + a + "," + a + ",1)";
            this.color2 = "black";
        };

        this.countPos = function () {
            this.x = this.x - this.offset_x;
            this.y = this.y + this.offset_y;
        };

        this.getPos = function () {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
        };

        this.draw = function () {
            context.save();
            context.beginPath();
            context.lineWidth = 1;
            context.globalAlpha = this.alpha;
            var line = context.createLinearGradient(this.x, this.y, this.x + this.width, this.y - this.height);
            line.addColorStop(0, info.color);
            line.addColorStop(0.3, this.color1);
            line.addColorStop(0.6, this.color2);
            context.strokeStyle = line;
            context.moveTo(this.x, this.y);
            context.lineTo(this.x + this.width, this.y - this.height);
            context.closePath();
            context.stroke();
            context.restore();
        };

        this.move = function () {
            var x = this.x + this.width - this.offset_x;
            var y = this.y - this.height;
            context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5);
            this.countPos();
            this.alpha -= 0.002;
            this.draw();
        };
    };

    // === 绘制流星 ===
    function playRains() {
        for (var n = 0; n < rainCount; n++) {
            var rain = rains[n];
            rain.move();
            if (rain.y > window.innerHeight) {
                context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
                rains[n] = new MeteorRain();
                rains[n].init();
            }
        }
        setTimeout(playRains, 2);
    }

    // === 初始化并启动 ===
    function start() {
        init();
        rains = [];
        for (var i = 0; i < rainCount; i++) {
            var rain = new MeteorRain();
            rain.init();
            rain.draw();
            rains.push(rain);
        }
        playRains();
    }

    // === 监听窗口大小变化 ===
    window.addEventListener('resize', function () {
        start();
    });

    // === 页面加载后启动 ===
    window.addEventListener('load', function () {
        start();
    });
})();
