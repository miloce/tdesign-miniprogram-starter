// 音效上下文 (Web Audio API)
let audioCtx;

export function initAudio() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    } catch (e) {
        console.warn('Web Audio API not supported');
    }
}

// 播放发射音效 (嗖~) - 增加音调随机性
export function playLaunchSound() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    
    // 基础频率随机化，避免听起来一样
    const startFreq = 150 + Math.random() * 100;
    const endFreq = 400 + Math.random() * 300;
    
    // 频率从低到高，模拟升空声
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 1 + Math.random() * 0.5);

    // 音量包络
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0, now + 1);

    osc.start(now);
    osc.stop(now + 1.5);
}

// 播放爆炸音效 (嘭!)
export function playExplosionSound() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // 创建白噪声
    const bufferSize = audioCtx.sampleRate * 1.5; // 1.5秒
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // 滤波器 (模拟远处的沉闷感)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const gain = audioCtx.createGain();
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    
    // 音量包络：瞬间爆发然后衰减
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    noise.start(now);
}
