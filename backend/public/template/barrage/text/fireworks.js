import { playLaunchSound, playExplosionSound } from './audio.js';
import { calculateLaunchVelocity } from './utils.js';

let fireworks = [];
let particles = [];
let flashes = []; // 爆炸闪光

// 修改：接收x和y参数（可选）
export function launchSingleFirework(clickX, clickY) {
    playLaunchSound();

    // 如果传入了点击坐标，就用点击位置作为目标；否则保持原随机逻辑
    const isClickTrigger = clickX !== undefined && clickY !== undefined;
    const startX = isClickTrigger ? clickX : window.innerWidth * (0.1 + Math.random() * 0.8);
    const startY = isClickTrigger ? clickY : window.innerHeight;
    // 目标高度：点击模式下直接在点击位置爆炸，非点击模式保持原逻辑
    const targetH = isClickTrigger ? startY : window.innerHeight * (0.4 + Math.random() * 0.4);
    
    // 重力参数
    const gravity = 0.015 + Math.random() * 0.01; 
    const vy = isClickTrigger ? 0 : calculateLaunchVelocity(targetH, gravity); // 点击模式下直接爆炸，不需要升空速度
    const vx = (Math.random() - 0.5) * 1.5; 

    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 100%, 65%)`;

    const firework = {
        x: startX,
        y: startY,
        vx: vx,
        vy: vy,
        gravity: gravity,
        color: color,
        trail: [],
        isClick: isClickTrigger // 标记是否是点击触发的烟花
    };

    fireworks.push(firework);

    // 点击触发的烟花直接爆炸，不需要升空
    if (isClickTrigger) {
        setTimeout(() => {
            createParticles(startX, startY, color);
            // 移除刚添加的烟花（因为直接爆炸了）
            const index = fireworks.indexOf(firework);
            if (index > -1) fireworks.splice(index, 1);
        }, 0);
    }
}

// 其他函数保持不变...
export function launchNaturalVolley() {
    // 自然随机发射逻辑
    const count = 1 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            playLaunchSound();

            const startX = window.innerWidth * (0.1 + Math.random() * 0.8);
            const targetH = window.innerHeight * (0.5 + Math.random() * 0.35);
            const gravity = 0.015 + Math.random() * 0.01;  
            const vy = calculateLaunchVelocity(targetH, gravity);
            const vx = (Math.random() - 0.5) * 1.5; 
            const hue = Math.floor(Math.random() * 360);
            const color = `hsl(${hue}, 100%, 65%)`;

            fireworks.push({
                x: startX,
                y: window.innerHeight,
                vx: vx,
                vy: vy,
                gravity: gravity,
                color: color,
                trail: [],
                isClick: false // 标记为非点击触发
            });
        }, i * 150 + Math.random() * 300);
    }
}

function createParticles(x, y, color) {
    const particleCount = 120 + Math.random() * 80; 
    playExplosionSound();

    // 1. 添加爆炸闪光 (Flash)
    flashes.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: 200 + Math.random() * 100, // 巨大的光晕
        alpha: 1,
        color: color
    });

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5; 
        const friction = 0.99; 
        const gravity = 0.01;  
        
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: color,
            alpha: 1,
            decay: 0.0015 + Math.random() * 0.002, 
            friction: friction,
            gravity: gravity,
            shimmer: Math.random() > 0.8 
        });
    }
}

export function updateAndDrawFireworks(ctx) {
    ctx.globalCompositeOperation = 'lighter';

    // A. 升空的烟花
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        
        // 非点击触发的烟花才需要升空逻辑
        if (!fw.isClick) {
            fw.vy += fw.gravity; 
            fw.x += fw.vx;
            fw.y += fw.vy;
            
            // --- 尾迹优化 ---
            const trailCount = 2; 
            for (let k = 0; k < trailCount; k++) {
                particles.push({
                    x: fw.x + (Math.random() - 0.5), 
                    y: fw.y + (Math.random() * 2),   
                    vx: (Math.random() - 0.5) * 0.2, 
                    vy: Math.random() * 0.3,         
                    color: `hsla(45, 100%, 60%, ${0.5 + Math.random()*0.5})`, 
                    alpha: 1,
                    decay: 0.04 + Math.random() * 0.03, 
                    friction: 0.98,
                    gravity: 0.01,
                    shimmer: false
                });
            }

            ctx.beginPath();
            ctx.arc(fw.x, fw.y, 1, 0, Math.PI * 2); 
            ctx.fillStyle = '#ffffff'; 
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2); 
            ctx.fillStyle = fw.color; 
            ctx.globalAlpha = 0.4;
            ctx.fill();
            ctx.globalAlpha = 1;
            
            if (fw.vy >= -0.05) {
                createParticles(fw.x, fw.y, fw.color);
                fireworks.splice(i, 1);
            }
        } else {
            // 点击触发的烟花直接爆炸（其实已经在launchSingleFirework里处理了）
            createParticles(fw.x, fw.y, fw.color);
            fireworks.splice(i, 1);
        }
    }
    
    // B. 爆炸闪光
    for (let i = flashes.length - 1; i >= 0; i--) {
        const flash = flashes[i];
        
        flash.radius += 15; 
        flash.alpha -= 0.08; 
        
        if (flash.alpha <= 0) {
            flashes.splice(i, 1);
            continue;
        }
        
        ctx.save();
        ctx.globalAlpha = flash.alpha;
        
        const gradient = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, flash.radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); 
        gradient.addColorStop(0.2, flash.color); 
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // C. 爆炸的粒子
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        
        if (p.shimmer) {
            if (Math.random() > 0.8) p.alpha = 1;
        }

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
    }
    
    ctx.globalCompositeOperation = 'source-over';
}