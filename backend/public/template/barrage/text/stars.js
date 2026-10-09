let stars = [];
let isUniverseCreated = false;
export let fireworksStartTime = 0;

export function getUniverseStatus() {
    return isUniverseCreated;
}

export function createUniverse(screenWidth, screenHeight) {
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const isSmall = screenWidth < 480;
    const isMobile = screenWidth < 768;

    // 定义核心避让区
    const coreRadiusX = isSmall ? 140 : isMobile ? 280 : 380;
    const coreRadiusY = isSmall ? 35 : isMobile ? 60 : 80;

    // 定义词汇尺寸
    const bigBoxW = isSmall ? 70 : isMobile ? 90 : 120;
    const bigBoxH = isSmall ? 28 : isMobile ? 36 : 48;
    const smallBoxW = bigBoxW * 0.6;
    const smallBoxH = bigBoxH * 0.9;

    const occupied = [];

    function checkCollision(x, y, w, h) {
        if (Math.abs(x - centerX) < (coreRadiusX + w/2) && 
            Math.abs(y - centerY) < (coreRadiusY + h/2)) {
            return true;
        }
        const padding = -2; 
        for (const obj of occupied) {
            if (Math.abs(x - obj.x) < (w/2 + obj.w/2 + padding) &&
                Math.abs(y - obj.y) < (h/2 + obj.h/2 + padding)) {
                return true;
            }
        }
        return false;
    }

    function isInBounds(x, y, w, h) {
        const margin = 10;
        return x - w/2 > margin && x + w/2 < screenWidth - margin &&
               y - h/2 > margin && y + h/2 < screenHeight - margin;
    }

    function findPositionSpiral(w, h) {
        let angle = 0;
        let radius = 0;
        const angleStep = 0.2; 
        const radiusStep = isSmall ? 2 : 4; 
        let maxSteps = 3000; 

        while (maxSteps > 0) {
            const ratio = screenHeight / screenWidth;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius * ratio;

            if (radius > Math.max(screenWidth, screenHeight)) break;

            if (isInBounds(x, y, w, h)) {
                const jitterX = (Math.random() - 0.5) * 10;
                const jitterY = (Math.random() - 0.5) * 10;
                
                if (!checkCollision(x + jitterX, y + jitterY, w, h)) {
                    return { x: x + jitterX, y: y + jitterY };
                }
            }
            angle += angleStep;
            radius += radiusStep / (2 * Math.PI);
            maxSteps--;
        }
        return null;
    }

    function addStar(text, x, y, isSmallStar, isSmallScreen, isMobileScreen) {
        const baseSize = isSmallScreen ? 14 : isMobileScreen ? 16 : 20;
        const fontSize = isSmallStar ? baseSize * 0.85 : baseSize;
        
        stars.push({
            text: text,
            x: x,
            y: y,
            fontSize: fontSize,
            opacity: 0,
            scale: 0.6,
            targetOpacity: 0.7 + Math.random() * 0.3,
            startTime: 0, 
            delay: 0,     
            phase: 0,     
            breathSpeed: 0.001 + Math.random() * 0.002
        });
    }

    // 获取合并后的祝福数组
    const blessings = window.blessings;
    
    // 生成数据（大尺寸祝福）
    let attemptCount = 0;
    let blessingIndex = 0;
    while (attemptCount < 300) {
        const text = blessings[blessingIndex % blessings.length];
        const pos = findPositionSpiral(bigBoxW, bigBoxH);
        
        if (pos) {
            addStar(text, pos.x, pos.y, false, isSmall, isMobile);
            occupied.push({ x: pos.x, y: pos.y, w: bigBoxW, h: bigBoxH });
        }
        blessingIndex++;
        attemptCount++;
    }

    // 生成小尺寸祝福（使用同一数组）
    let smallIndex = 0;
    let fillerAttempts = isMobile ? 400 : 800; 
    
    while (fillerAttempts > 0) {
        const text = blessings[smallIndex % blessings.length];
        const rx = Math.random() * screenWidth;
        const ry = Math.random() * screenHeight;
        
        if (isInBounds(rx, ry, smallBoxW, smallBoxH)) {
             if (!checkCollision(rx, ry, smallBoxW, smallBoxH)) {
                addStar(text, rx, ry, true, isSmall, isMobile);
                occupied.push({ x: rx, y: ry, w: smallBoxW, h: smallBoxH });
            }
        }
        smallIndex++;
        fillerAttempts--;
    }
    
    // 网格填充（使用同一数组）
    const gridStepX = smallBoxW * 0.8; 
    const gridStepY = smallBoxH * 0.8;
    const gridCols = Math.ceil(screenWidth / gridStepX);
    const gridRows = Math.ceil(screenHeight / gridStepY);
    const MAX_STARS = 2000; 
    
    for (let r = 0; r < gridRows; r++) {
        if (stars.length >= MAX_STARS) break;
        for (let c = 0; c < gridCols; c++) {
            if (stars.length >= MAX_STARS) break;

            let gx = c * gridStepX + gridStepX / 2;
            let gy = r * gridStepY + gridStepY / 2;
            gx += (Math.random() - 0.5) * gridStepX * 0.3;
            gy += (Math.random() - 0.5) * gridStepY * 0.3;
            
            const text = blessings[smallIndex % blessings.length];
            
            if (isInBounds(gx, gy, smallBoxW, smallBoxH)) {
                if (!checkCollision(gx, gy, smallBoxW, smallBoxH)) {
                    addStar(text, gx, gy, true, isSmall, isMobile);
                    occupied.push({ x: gx, y: gy, w: smallBoxW, h: smallBoxH });
                }
            }
            smallIndex++;
        }
    }
    
    stars.sort((a, b) => {
        const distA = Math.pow(a.x - centerX, 2) + Math.pow(a.y - centerY, 2);
        const distB = Math.pow(b.x - centerX, 2) + Math.pow(b.y - centerY, 2);
        return distA - distB;
    });

    let maxDelay = 0; 
    
    stars.forEach((star, index) => {
        if (index < 50) {
            star.delay = index * 180 + Math.random() * 200;
        } 
        else if (index < 150) {
            const baseDelay1 = 50 * 180;
            star.delay = baseDelay1 + (index - 50) * 80 + Math.random() * 300;
        }
        else {
            const baseDelay1 = 50 * 180;
            const baseDelay2 = baseDelay1 + 100 * 80;
            star.delay = baseDelay2 + (index - 150) * 25 + Math.random() * 500;
        }
        
        if (star.delay > maxDelay) {
            maxDelay = star.delay;
        }
    });
    
    fireworksStartTime = maxDelay + 1000;
    isUniverseCreated = true;
}

export function updateAndDrawStars(ctx, elapsed) {
    const fontFamily = "'PingFang SC', 'Lantinghei SC', 'Microsoft YaHei UI', 'Microsoft YaHei', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let activeCount = 0;

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        if (elapsed < star.delay) continue;
        
        const localTime = elapsed - star.delay;
        let currentOpacity = star.opacity;
        let currentScale = star.scale;
        
        if (localTime < 800) {
            const progress = localTime / 800;
            const ease = 1 - Math.pow(1 - progress, 3); 
            
            currentOpacity = ease * star.targetOpacity;
            currentScale = 0.6 + ease * 0.4; 
        } else {
            currentOpacity = star.targetOpacity;
            currentScale = 1.0;
            
            const breathTime = localTime - 800;
            const wave = Math.sin(breathTime * star.breathSpeed + star.phase);
            const magnitude = star.fontSize > 16 ? 1 : 0.5;
            const normWave = (wave + 1) / 2;
            
            currentScale = 1.0 + normWave * 0.05 * magnitude;
            currentOpacity = star.targetOpacity + (wave * 0.1 * magnitude);
        }

        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.scale(currentScale, currentScale);
        ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
        
        ctx.font = `600 ${star.fontSize}px ${fontFamily}`;
        ctx.fillStyle = '#ffffff';
        
        ctx.fillText(star.text, 0, 0);
        
        ctx.restore();
        
        activeCount++;
    }
}