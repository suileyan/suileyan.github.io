// Canvas背景绘制系统
class BackgroundCanvas {
    constructor(canvasId, title) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.title = title;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw();
    }

    draw() {
        // 根据标题选择不同的绘制方法
        switch(this.title) {
            case '迷茫':
                this.drawConfusion();
                break;
            case '堂吉诃德':
                this.drawQuixote();
                break;
            case '虚无主义':
                this.drawNihilism();
                break;
            case '存在主义':
                this.drawExistentialism();
                break;
            case '独白 - 释怀':
            case '独白 - 多想':
                this.drawMonologue();
                break;
            case '解离':
                this.drawDissociation();
                break;
            case '青春 - 遗憾':
            case '青春 - 爱恋':
                this.drawYouth();
                break;
            default:
                this.drawDefault();
        }
    }

    // 迷茫主题背景
    drawConfusion() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 绘制迷雾效果
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 100 + 50;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // 绘制路径
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < width; i += 20) {
            const y = height / 2 + Math.sin(i * 0.01) * 50;
            if (i === 0) {
                ctx.moveTo(i, y);
            } else {
                ctx.lineTo(i, y);
            }
        }
        ctx.stroke();
    }

    // 堂吉诃德主题背景
    drawQuixote() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#1a1a1a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 绘制风车
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 4;

        // 绘制风车叶片
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI / 2) + Date.now() * 0.001;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
        }
    }

    // 虚无主义主题背景
    drawNihilism() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#1a1a1a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 绘制虚无的粒子
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 绘制虚无的线条
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }
    }

    // 存在主义主题背景
    drawExistentialism() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

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

    // 独白主题背景
    drawMonologue() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#3498db');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 绘制雨滴效果
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const length = Math.random() * 20 + 10;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + length);
            ctx.stroke();
        }
    }

    // 解离主题背景
    drawDissociation() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#2c3e50');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 绘制分裂效果
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 100 + 50;
            ctx.beginPath();
            ctx.moveTo(x - size, y);
            ctx.lineTo(x + size, y);
            ctx.moveTo(x, y - size);
            ctx.lineTo(x, y + size);
            ctx.stroke();
        }
    }

    // 青春主题背景
    drawYouth() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

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

    // 默认背景
    drawDefault() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#3498db');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 绘制简单的几何图形
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 100 + 50;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

// 导出BackgroundCanvas类
export default BackgroundCanvas; 