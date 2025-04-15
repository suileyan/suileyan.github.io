export default function drawDissociation(canvas) {
    const ctx = canvas.getContext('2d');
    
    // 初始化 - 只在首次执行时设置
    if (!canvas.initialized) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.groundLevel = canvas.height * 0.9; // 地面位置
        canvas.drops = [];
        canvas.MAX_DROPS = 80; // 控制雨量密度
        canvas.initialized = true;
    }

    // 定义雨滴类 - 将其放在canvas对象上以保持状态
    if (!canvas.Raindrop) {
        canvas.Raindrop = class Raindrop {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -20; // 从顶部外开始
                this.length = 8 + Math.random() * 12; // 雨丝长度
                this.speed = 3 + Math.random() * 5; // 下落速度
                this.opacity = 0.3 + Math.random() * 0.7; // 随机透明度
                this.rippleRadius = 0; // 涟漪半径
                this.rippleWidth = 0; // 涟漪宽度
                this.rippleHeight = 0; // 涟漪高度
                this.active = true;
            }

            update() {
                if (this.y < canvas.groundLevel) {
                    this.speed *= 1.01; // 减小加速度，避免过快
                    this.y += this.speed;
                    
                    // 拖尾效果实现
                    ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity * 0.3})`;
                    ctx.fillRect(this.x, this.y - this.length, 1.2, this.length * 1.5);
                } else {
                    // 涟漪扩散效果
                    this.rippleRadius += 1.5;
                    this.rippleWidth = this.rippleRadius * 1.2; // 水平方向扩展更快
                    this.rippleHeight = this.rippleRadius * 0.8; // 垂直方向扩展较慢
                    this.opacity *= 0.93; // 透明度衰减
                    
                    if (this.opacity < 0.05) {
                        this.active = false;
                    }
                }
            }

            draw() {
                if (this.y < canvas.groundLevel) {
                    // 绘制雨丝
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + 2, this.y - this.length); // 斜线雨丝
                    ctx.strokeStyle = `rgba(175, 218, 232, ${this.opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                } else {
                    // 绘制扁椭圆涟漪
                    ctx.save();
                    ctx.translate(this.x, canvas.groundLevel);
                    ctx.scale(1, 0.4); // 垂直方向压缩
                    ctx.beginPath();
                    ctx.arc(0, 0, this.rippleRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(135, 206, 250, ${this.opacity})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        };
    }

    // 创建深色背景 - 使用透明度创建拖尾效果
    ctx.fillStyle = 'rgba(10, 17, 34, 0.2)';  // 增加透明度来减弱拖尾效果
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 添加新雨滴
    if (canvas.drops.length < canvas.MAX_DROPS) {
        canvas.drops.push(new canvas.Raindrop());
    }

    // 绘制所有雨滴并更新
    for (let i = canvas.drops.length - 1; i >= 0; i--) {
        const drop = canvas.drops[i];
        drop.update();
        drop.draw();
        
        // 移除不活跃的雨滴
        if (!drop.active) {
            canvas.drops.splice(i, 1);
        }
    }
} 