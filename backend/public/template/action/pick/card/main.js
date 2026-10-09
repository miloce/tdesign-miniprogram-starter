// 特效配置
const CONFIG = {
    PARTICLES: {
        count: 100,
        colors: ['#ff1493', '#ff69b4', '#ff0000', '#ff8c00', '#ffd700', '#ff1e90'],
        shapes: ['❤️', '💖', '💗', '💓', '💕', '💝', '💘', '💞'],
        size: { min: 5, max: 15 },
        speed: { min: 1, max: 3 }
    },
    SPARKLES: {
        count: 50,
        colors: ['#FFF', '#FFE5F0', '#FFC0CB', '#FFB6C1'],
        size: { min: 2, max: 5 }
    },
    HEARTS: {
        rainCount: 30,
        burstCount: 36,
        colors: ['#ff1493', '#ff69b4', '#ff0000']
    },
    ANIMATIONS: {
        duration: { min: 1000, max: 3000 },
        delay: { min: 0, max: 500 }
    }
};

// 工具函数
const Utils = {
    random: (min, max) => Math.random() * (max - min) + min,
    randomInt: (min, max) => Math.floor(Utils.random(min, max)),
    randomItem: array => array[Utils.randomInt(0, array.length)],
    randomColor: () => CONFIG.PARTICLES.colors[Utils.randomInt(0, CONFIG.PARTICLES.colors.length)],
    randomShape: () => CONFIG.PARTICLES.shapes[Utils.randomInt(0, CONFIG.PARTICLES.shapes.length)],
    createEl: (className, styles = {}) => {
        const el = document.createElement('div');
        el.className = className;
        Object.assign(el.style, styles);
        return el;
    },
    removeEl: (el, delay) => setTimeout(() => el.remove(), delay),
    lerp: (start, end, t) => start * (1 - t) + end * t,
    clamp: (num, min, max) => Math.min(Math.max(num, min), max),
    distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
};

// 高级粒子系统
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = Utils.createEl('particle-container', {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '9999'
        });
        document.body.appendChild(this.container);
    }

    createParticle(x, y, options = {}) {
        const particle = {
            el: Utils.createEl('particle'),
            x,
            y,
            vx: Utils.random(-2, 2),
            vy: Utils.random(-2, 2),
            size: options.size || Utils.random(CONFIG.PARTICLES.size.min, CONFIG.PARTICLES.size.max),
            color: options.color || Utils.randomColor(),
            shape: options.shape || Utils.randomShape(),
            rotation: Utils.random(0, 360),
            rotationSpeed: Utils.random(-5, 5),
            lifetime: options.lifetime || Utils.random(CONFIG.ANIMATIONS.duration.min, CONFIG.ANIMATIONS.duration.max),
            birth: Date.now()
        };

        particle.el.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background-color: ${particle.color};
            border-radius: 50%;
            transform: rotate(${particle.rotation}deg);
            opacity: 1;
            transition: opacity 0.3s ease;
        `;

        if (options.shape === 'heart') {
            particle.el.innerHTML = '❤️';
            particle.el.style.background = 'none';
            particle.el.style.fontSize = `${particle.size}px`;
            particle.el.style.color = particle.color;
        }

        this.container.appendChild(particle.el);
        this.particles.push(particle);
        return particle;
    }

    updateParticle(particle) {
        const age = Date.now() - particle.birth;
        const life = age / particle.lifetime;

        if (life >= 1) {
            particle.el.remove();
            return false;
        }

        // 应用物理
        particle.vy += 0.1; // 重力
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // 更新样式
        particle.el.style.transform = `
            translate(${particle.x}px, ${particle.y}px) 
            rotate(${particle.rotation}deg)
        `;
        particle.el.style.opacity = 1 - life;

        return true;
    }

    update() {
        this.particles = this.particles.filter(this.updateParticle);
        requestAnimationFrame(() => this.update());
    }

    burst(x, y, options = {}) {
        const count = options.count || 12;
        const radius = options.radius || 50;

        for (let i = 0; i < count; i++) {
            const angle = (i * Math.PI * 2) / count;
            const distance = radius * Utils.random(0.5, 1);
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;

            setTimeout(() => {
                this.createParticle(px, py, {
                    ...options,
                    vx: Math.cos(angle) * Utils.random(1, 3),
                    vy: Math.sin(angle) * Utils.random(1, 3)
                });
            }, i * 50);
        }
    }
}

// 闪光效果系统
class SparkleSystem {
    constructor() {
        this.sparkles = [];
        this.container = Utils.createEl('sparkle-container', {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '9998'
        });
        document.body.appendChild(this.container);
    }

    createSparkle() {
        const sparkle = Utils.createEl('sparkle', {
            position: 'absolute',
            left: `${Utils.random(0, 100)}vw`,
            top: `${Utils.random(0, 100)}vh`,
            width: `${Utils.random(CONFIG.SPARKLES.size.min, CONFIG.SPARKLES.size.max)}px`,
            height: `${Utils.random(CONFIG.SPARKLES.size.min, CONFIG.SPARKLES.size.max)}px`,
            backgroundColor: Utils.randomItem(CONFIG.SPARKLES.colors),
            borderRadius: '50%',
            animation: `sparkle ${Utils.random(1, 2)}s ease-in-out infinite`,
            opacity: '0'
        });

        this.container.appendChild(sparkle);
        Utils.removeEl(sparkle, 2000);
    }

    start() {
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                this.createSparkle();
            }
        }, 200);
    }
}

// 继续下一部分...
// 3D效果系统
class Effect3DSystem {
    constructor(element) {
        this.element = element;
        this.isActive = false;
        this.centerX = 0;
        this.centerY = 0;
        this.initialTransform = '';
        this.boundingRect = null;

        this.init();
    }

    init() {
        this.element.style.transition = 'transform 0.1s ease-out';
        this.initialTransform = this.element.style.transform;
        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener('mouseenter', () => this.onMouseEnter());
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseEnter() {
        this.isActive = true;
        this.boundingRect = this.element.getBoundingClientRect();
        this.centerX = this.boundingRect.left + this.boundingRect.width / 2;
        this.centerY = this.boundingRect.top + this.boundingRect.height / 2;
    }

    onMouseMove(e) {
        if (!this.isActive) return;

        const rotateX = Utils.clamp((e.clientY - this.centerY) / 10, -10, 10);
        const rotateY = Utils.clamp((this.centerX - e.clientX) / 10, -10, 10);

        this.element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
            ${this.initialTransform}
        `;
    }

    onMouseLeave() {
        this.isActive = false;
        this.element.style.transform = this.initialTransform;
    }
}

// 磁性按钮效果
class MagneticButton {
    constructor(button) {
        this.button = button;
        this.bound = button.getBoundingClientRect();
        this.magnetic = false;
        this.init();
    }

    init() {
        this.button.addEventListener('mouseenter', () => this.onMouseEnter());
        this.button.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.button.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseEnter() {
        this.magnetic = true;
        this.bound = this.button.getBoundingClientRect();
    }

    onMouseMove(e) {
        if (!this.magnetic) return;

        const x = (e.clientX - this.bound.left) / this.bound.width;
        const y = (e.clientY - this.bound.top) / this.bound.height;

        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;

        this.button.style.transform = `
            translate(${moveX}px, ${moveY}px)
            scale(1.1)
        `;
    }

    onMouseLeave() {
        this.magnetic = false;
        this.button.style.transform = '';
    }
}

// 心形雨系统
class HeartRainSystem {
    constructor() {
        this.hearts = [];
        this.isActive = false;
    }

    createHeart() {
        const heart = Utils.createEl('heart-rain', {
            position: 'fixed',
            left: `${Utils.random(-10, 110)}vw`,
            top: '-50px',
            fontSize: `${Utils.random(15, 35)}px`,
            color: Utils.randomItem(CONFIG.HEARTS.colors),
            textShadow: '0 0 5px rgba(255, 20, 147, 0.5)',
            pointerEvents: 'none',
            zIndex: '9997',
            animation: `heartFall ${Utils.random(2, 4)}s linear forwards`,
            transform: `rotate(${Utils.random(-30, 30)}deg)`
        });

        heart.innerHTML = '❤️';
        document.body.appendChild(heart);
        Utils.removeEl(heart, 4000);
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.interval = setInterval(() => this.createHeart(), 100);
    }

    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        clearInterval(this.interval);
    }
}

// 光晕效果系统
class GlowSystem {
    constructor(element) {
        this.element = element;
        this.glowEl = Utils.createEl('glow-effect');
        this.init();
    }

    init() {
        this.glowEl.style.cssText = `
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
                circle at center,
                rgba(255, 20, 147, 0.2) 0%,
                rgba(255, 20, 147, 0.1) 30%,
                transparent 70%
            );
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            animation: glow-rotate 10s linear infinite;
        `;

        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
        this.element.appendChild(this.glowEl);

        this.element.addEventListener('mouseenter', () => this.show());
        this.element.addEventListener('mouseleave', () => this.hide());
    }

    show() {
        this.glowEl.style.opacity = '1';
    }

    hide() {
        this.glowEl.style.opacity = '0';
    }
}

// 继续发送第三部分...
// 轨迹效果系统
class TrailSystem {
    constructor() {
        this.points = [];
        this.maxPoints = 50;
        this.container = Utils.createEl('trail-container', {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '9996'
        });
        document.body.appendChild(this.container);
    }

    addPoint(x, y) {
        const point = {
            x, y,
            el: Utils.createEl('trail-point', {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '8px',
                height: '8px',
                background: Utils.randomColor(),
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: '0.8'
            }),
            birth: Date.now()
        };

        this.container.appendChild(point.el);
        this.points.push(point);

        if (this.points.length > this.maxPoints) {
            const oldPoint = this.points.shift();
            oldPoint.el.remove();
        }
    }

    update() {
        const now = Date.now();
        this.points.forEach((point, index) => {
            const age = (now - point.birth) / 1000;
            const life = age / 0.5; // 0.5秒生命周期
            point.el.style.opacity = Math.max(0, 0.8 - life);
            point.el.style.transform = `
                translate(-50%, -50%) 
                scale(${1 + life})
            `;
        });
        requestAnimationFrame(() => this.update());
    }
}

// 打字机效果
class TypewriterEffect {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            delay: options.delay || 50,
            cursor: options.cursor || true,
            cursorChar: options.cursorChar || '|',
            onComplete: options.onComplete || (() => {})
        };
    }

    start() {
        this.element.textContent = '';
        if (this.options.cursor) {
            this.cursor = Utils.createEl('cursor', {
                display: 'inline-block',
                animation: 'cursor-blink 1s infinite'
            });
            this.cursor.textContent = this.options.cursorChar;
            this.element.appendChild(this.cursor);
        }

        let i = 0;
        const type = () => {
            if (i < this.text.length) {
                this.element.insertBefore(
                    document.createTextNode(this.text[i]),
                    this.cursor
                );
                i++;
                setTimeout(type, this.options.delay);
            } else {
                this.options.onComplete();
            }
        };
        setTimeout(type, this.options.delay);
    }
}

// 波纹效果
class RippleEffect {
    constructor(element) {
        this.element = element;
        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('click', (e) => this.createRipple(e));
    }

    createRipple(event) {
        const rect = this.element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        const ripple = Utils.createEl('ripple', {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: '0',
            height: '0',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        });

        this.element.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.opacity = '0';
        });

        setTimeout(() => ripple.remove(), 500);
    }
}

// 按钮动画系统
class ButtonAnimationSystem {
    constructor(noButton, yesButton) {
        this.noButton = noButton;
        this.yesButton = yesButton;
        this.moveCount = 0;
        this.maxMoves = 10; // 设置最大点击次数
        this.messages = [
            "再考虑一下嘛～",
            "真的不要吗？",
            "你确定吗？",
            "再想想呗～",
            "不要这样嘛～",
            "人家好难过～",
            "给个机会嘛～",
            "别这样嘛～",
            "想清楚哦～",
            "最后一次机会～"
        ];
        
        // 获取问题文字元素
        this.questionText = document.getElementById('question');
        this.originalQuestion = this.questionText.textContent;
        
        // 初始化按钮样式
        document.body.appendChild(this.noButton);
        this.noButton.style.position = 'fixed';
        this.noButton.style.zIndex = '999999';
        this.initButtons();

        // 问题文字变化数组
        this.questionTexts = [
            "可以成为我的恋人吗？",
            "真的不考虑一下吗？",
            "我真的很喜欢你呀！",
            "给我一次机会好不好？",
            "你真的要拒绝我吗？",
            "人家很难过呢～",
            "再好好想想嘛～",
            "不要拒绝我好不好？",
            "我会很伤心的～",
            "最后一次机会哦～"
        ];
    }

    initButtons() {
        // 设置按钮初始样式
        this.noButton.style.cssText = `
            position: fixed;
            z-index: 999999;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        `;

        this.noButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.moveButton();
        });

        this.yesButton.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    getRandomPosition() {
        // 获取视口尺寸
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // 获取按钮尺寸
        const buttonRect = this.noButton.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;

        // 设置安全边距
        const margin = 20;

        // 生成随机位置
        const x = Math.random() * (viewportWidth - buttonWidth - 2 * margin) + margin;
        const y = Math.random() * (viewportHeight - buttonHeight - 2 * margin) + margin;

        return { x, y };
    }

    moveButton() {
        this.moveCount++;

        // 获取新位置
        const newPos = this.getRandomPosition();

        // 应用新位置和过渡效果
        this.noButton.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        this.noButton.style.left = `${newPos.x}px`;
        this.noButton.style.top = `${newPos.y}px`;

        // 更新按钮文字
        const messageIndex = this.moveCount % this.messages.length;
        this.noButton.textContent = this.messages[messageIndex];

        // 更新问题文字
        this.updateQuestionText();

        // 放大Yes按钮
        const scale = Math.min(1 + this.moveCount * 0.15, 2.5);
        this.yesButton.style.transform = `scale(${scale})`;

        // 添加动画效果
        this.addMoveEffects();

        // 检查是否达到最大点击次数
        if (this.moveCount >= this.maxMoves) {
            this.noButton.style.transition = 'all 0.5s ease';
            this.noButton.style.opacity = '0';
            this.noButton.style.transform = 'scale(0)';
            setTimeout(() => {
                this.noButton.remove();
            }, 500);
        }
    }

    updateQuestionText() {
        const questionText = document.getElementById('question');
        
        // 根据点击次数改变文字内容和样式
        const textIndex = this.moveCount % this.questionTexts.length;
        questionText.textContent = this.questionTexts[textIndex];
        
        // 添加动画效果
        const progress = this.moveCount / this.maxMoves;
        const hue = 340 + (progress * 20); // 从粉红色到红色的渐变
        const scale = 1 + (progress * 0.1); // 逐渐放大
        
        questionText.style.transition = 'all 0.3s ease';
        questionText.style.color = `hsl(${hue}, 100%, 65%)`;
        questionText.style.transform = `scale(${scale})`;
        questionText.style.textShadow = `0 0 ${progress * 10}px rgba(255, 20, 147, 0.5)`;
        
        // 添加抖动动画
        questionText.style.animation = 'none';
        questionText.offsetHeight; // 触发重绘
        questionText.style.animation = 'questionShake 0.5s ease';
    }

    addMoveEffects() {
        // 移动时的缩放效果
        this.noButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.noButton.style.transform = 'scale(1)';
        }, 150);

        // 颜色变化
        const hue = (this.moveCount * 30) % 360;
        this.noButton.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;
        
        // 添加抖动动画
        this.noButton.style.animation = 'none';
        this.noButton.offsetHeight; // 触发重绘
        this.noButton.style.animation = 'shake 0.5s cubic-bezier(0.36, 0, 0.66, -0.56)';
    }
}

// 添加必要的CSS动画
const buttonStyles = document.createElement('style');
buttonStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }

    #no {
        position: fixed !important;
        z-index: 999999 !important;
    }

    .container {
        position: relative;
        z-index: 1;
    }
`;
document.head.appendChild(buttonStyles);

// 添加全局动画样式
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    #mainImage, #question {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(animationStyles);

// 添加新的动画样式
const styles = document.createElement('style');
styles.textContent = `
    @keyframes questionShake {
        0%, 100% { transform: translateX(0) rotate(0deg) scale(${1 + (this?.moveCount || 0) * 0.1}); }
        25% { transform: translateX(-2px) rotate(-1deg) scale(${1 + (this?.moveCount || 0) * 0.1}); }
        75% { transform: translateX(2px) rotate(1deg) scale(${1 + (this?.moveCount || 0) * 0.1}); }
    }

    #question {
        transition: all 0.3s ease;
        transform-origin: center;
    }

    ${buttonStyles.textContent}
`;
document.head.appendChild(styles);

// 创建音乐播放器并设置自动播放
function initAutoPlay() {
    const bgMusic = document.getElementById("audio_music");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    // 尝试多种方式触发自动播放
    function tryToPlay() {
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Autoplay started');
            }).catch(error => {
                // 自动播放失败时，添加用户交互触发
                console.log('Autoplay prevented:', error);
                
                // 添加点击任意位置播放
                const playHandler = () => {
                    bgMusic.play();
                    document.removeEventListener('click', playHandler);
                };
                document.addEventListener('click', playHandler);
                
                // 添加滚动触发播放
                const scrollHandler = () => {
                    bgMusic.play();
                    window.removeEventListener('scroll', scrollHandler);
                };
                window.addEventListener('scroll', scrollHandler);
            });
        }
    }

    // 页面加载完成后尝试播放
    if (document.readyState === 'complete') {
        tryToPlay();
    } else {
        window.addEventListener('load', tryToPlay);
    }

    // DOMContentLoaded 时尝试播放
    document.addEventListener('DOMContentLoaded', tryToPlay);

    // 用户交互时尝试播放
    document.addEventListener('mousemove', function onFirstInteraction() {
        tryToPlay();
        document.removeEventListener('mousemove', onFirstInteraction);
    });

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            bgMusic.pause();
        } else {
            tryToPlay();
        }
    });

    // 添加音乐控制按钮
    const musicBtn = document.createElement('div');
    musicBtn.innerHTML = '🎵';
    musicBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        cursor: pointer;
        z-index: 999999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        font-size: 20px;
        transition: all 0.3s ease;
        animation: rotate 3s linear infinite;
    `;
    document.body.appendChild(musicBtn);

    // 音乐控制按钮点击事件
    let isPlaying = true;
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.style.animation = 'none';
            musicBtn.style.opacity = '0.6';
        } else {
            bgMusic.play();
            musicBtn.style.animation = 'rotate 3s linear infinite';
            musicBtn.style.opacity = '1';
        }
        isPlaying = !isPlaying;
    });

    // 添加旋转动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    return bgMusic;
}