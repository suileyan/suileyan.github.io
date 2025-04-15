class CanvasLoader {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawFunctions = new Map();
        this.animationId = null;
        this.currentTitle = null;
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.currentTitle) {
            this.loadCanvas(this.currentTitle);
        }
    }

    async loadCanvas(title) {
        this.currentTitle = title;
        
        // 如果已经缓存了绘制函数，直接使用
        if (this.drawFunctions.has(title)) {
            this.startAnimation(this.drawFunctions.get(title));
            return;
        }

        try {
            // 根据标题确定模块名称
            let moduleName = title;
            
            // 处理带空格的标题，提取主题部分
            if (title.includes(' - ')) {
                moduleName = title.split(' - ')[0];
            }
            
            // 动态导入对应的模块
            const module = await import(`./${encodeURIComponent(moduleName)}.js`);
            const drawFunction = module.default;
            
            // 缓存绘制函数
            this.drawFunctions.set(title, drawFunction);
            
            // 开始动画
            this.startAnimation(drawFunction);
        } catch (error) {
            console.error(`Failed to load canvas for '${title}':`, error);
            // 加载失败时使用默认背景
            this.loadDefaultCanvas();
        }
    }

    startAnimation(drawFunction) {
        // 取消之前的动画
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // 定义动画函数
        const animate = () => {
            drawFunction(this.canvas);
            this.animationId = requestAnimationFrame(animate);
        };

        // 开始动画
        animate();
    }

    loadDefaultCanvas() {
        const ctx = this.canvas.getContext('2d');
        const { width, height } = this.canvas;

        const drawDefault = () => {
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
        };

        this.startAnimation(drawDefault);
    }

    getCanvas() {
        return this.canvas;
    }
}

// 导出单例实例
const canvasLoader = new CanvasLoader();
export default canvasLoader; 