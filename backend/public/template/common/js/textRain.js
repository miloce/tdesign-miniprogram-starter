// 动态创建并插入 <canvas>
const canvas = document.createElement('canvas');
canvas.id = 'canvas-rain2';
let info = dataInfo.plugin.textRain;
Object.assign(canvas.style, {position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', zIndex: '8', opacity: info['opacity']});
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var fontSize = info['fontSize'];
var columns = canvas.width / fontSize * 2;
// 用于计算输出文字时坐标，所以长度即为列数
var drops = [];
//初始值
for (var x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawRain() {
    //让背景逐渐由透明到不透明
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //文字颜色
    ctx.fillStyle = info['color'];;
    ctx.font = fontSize + 'px arial';
    //逐行输出文字
    for (var i = 0; i < drops.length; i++) {
        var text1 = info['text'][Math.floor(Math.random() * info['text'].length)];
        ctx.fillText(text1, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function frame() {
  if (frames > 100000) {
    seedTimer = 0;
    frames = 0;
  }
  frames++;
  requestAnimationFrame(frame);
}

window.addEventListener("resize", () => {
  canvas.width = canvas.clientWidth / 0.51;
  canvas.height = canvas.clientHeight / 0.51;
  cx = canvas.width / 2;
  cy = canvas.height / 2;
});

frame();
setInterval(drawRain, 50);