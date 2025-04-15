export default function drawYouth(canvas) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#ff9a9e');
    gradient.addColorStop(1, '#fad0c4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 绘制花瓣效果
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 20 + 10;
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
            const angle = (j * Math.PI * 2) / 5;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (j === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.fill();
    }
} 