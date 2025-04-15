export default function drawExistentialism(canvas) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1e3c72');
    gradient.addColorStop(1, '#2a5298');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 绘制自由选择的路径
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        let x = Math.random() * width;
        let y = Math.random() * height;
        ctx.moveTo(x, y);
        for (let j = 0; j < 10; j++) {
            x += Math.random() * 100 - 50;
            y += Math.random() * 100 - 50;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
} 