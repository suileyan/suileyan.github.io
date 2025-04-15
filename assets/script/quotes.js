// 全局变量存储当前金句数据
let currentQuotes = [];
let currentQuote = null;
let lastQuoteIndex = -1; // 添加变量记录上一个金句的索引
let shownQuoteIndices = []; // 存储已经显示过的金句索引

// 导入Canvas加载器
import canvasLoader from './canvas/CanvasLoader.js';

document.addEventListener('DOMContentLoaded', function() {
    fetchQuotes();
    
    // 为返回按钮添加点击事件
    document.getElementById('back-btn').addEventListener('click', closeDetailPage);
    
    // 为刷新按钮添加点击事件
    document.getElementById('refresh-btn').addEventListener('click', refreshQuote);
    
    // 添加ESC键退出功能
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const detailPage = document.getElementById('detail-page');
            if (detailPage.classList.contains('active')) {
                closeDetailPage();
            }
        }
    });
});

async function fetchQuotes() {
    try {
        // 显示加载状态
        document.getElementById('quote-container').innerHTML = '<p class="loading-message">正在加载金句...</p>';
//"textAlign": "center" "textAlign": "justify"
        
        const response = await fetch('./assets/data/quotes.json');
        const quotes = await response.json();
        
        // 存储金句数据
        currentQuotes = quotes;
        
        if (quotes.length > 0) {
            // 重置已显示的金句索引
            shownQuoteIndices = [];
            displayRandomQuote(quotes);
        } else {
            document.getElementById('quote-container').innerHTML = '<p class="loading-message">暂无金句数据</p>';
        }
    } catch (error) {
        console.error('获取金句数据失败:', error);
        document.getElementById('quote-container').innerHTML = '<p class="loading-message">加载金句失败，请稍后重试</p>';
    }
}

function displayRandomQuote(quotes) {
    // 如果只有一个金句，直接显示
    if (quotes.length === 1) {
        const quote = quotes[0];
        displayQuote(quote);
        return;
    }

    // 如果所有金句都已经显示过，开始新一轮
    if (shownQuoteIndices.length >= quotes.length) {
        console.log("所有金句已显示过一次，开始新一轮");
        shownQuoteIndices = [lastQuoteIndex]; // 保留最后一个，避免连续重复
    }

    // 随机选择一句金句，确保不在已显示过的列表中
    let randomQuoteIndex;
    do {
        randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    } while (shownQuoteIndices.includes(randomQuoteIndex));
    
    // 记录这个索引已经被显示
    shownQuoteIndices.push(randomQuoteIndex);
    lastQuoteIndex = randomQuoteIndex;
    
    const quote = quotes[randomQuoteIndex];
    displayQuote(quote);
}

function displayQuote(quote) {
    // 存储当前显示的金句
    currentQuote = quote;
    
    // 随机选择一张图片
    const randomImageIndex = Math.floor(Math.random() * quote.image.length);
    // 检查图片是对象还是字符串
    let imagePath, imageAuthor;
    if (typeof quote.image[randomImageIndex] === 'object') {
        // 检查src是否为数组
        if (Array.isArray(quote.image[randomImageIndex].src)) {
            const srcArray = quote.image[randomImageIndex].src;
            const randomSrcIndex = Math.floor(Math.random() * srcArray.length);
            imagePath = `./assets/images/${quote.title}/${srcArray[randomSrcIndex]}`;
        } else {
            imagePath = `./assets/images/${quote.title}/${quote.image[randomImageIndex].src}`;
        }
        imageAuthor = quote.image[randomImageIndex].author || '未知作者';
    } else {
        imagePath = `./assets/images/${quote.title}/${quote.image[randomImageIndex]}`;
        imageAuthor = '未知作者';
    }
    
    // 处理文本中的换行符
    const formattedText = quote.text.replace(/\n/g, '<br>');
    
    // 获取容器
    const quoteContainer = document.getElementById('quote-container');
    
    // 如果已有卡片，先移除旧卡片
    const oldCard = document.querySelector('.quote-card');
    if (oldCard) {
        oldCard.remove();
    }
    
    // 创建新的金句卡片元素
    const quoteCard = document.createElement('div');
    quoteCard.className = 'quote-card';
    quoteCard.innerHTML = `
        <div class="quote-image" data-title="${quote.title}" data-image="${imagePath}">
            <img src="${imagePath}" alt="${quote.title}" onerror="this.onerror=null; this.src='./assets/images/default.jpg';">
            <div class="image-author">${imageAuthor}</div>
        </div>
        <div class="quote-content">
            <h2>${quote.title}</h2>
            <p class="quote-text">${formattedText}</p>
            <p class="quote-author">—— ${quote.source || '佚名'}</p>
        </div>
    `;
    
    // 添加图片点击事件
    quoteCard.querySelector('.quote-image').addEventListener('click', function() {
        openDetailPage(quote, imagePath, imageAuthor);
    });
    
    // 移除加载消息并添加新卡片
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
    
    quoteContainer.appendChild(quoteCard);
    
    // 设置延时添加淡入类名，实现淡入效果
    setTimeout(() => {
        quoteCard.classList.add('fade-in');
    }, 10);
}

// 打开详情页 - 更新函数接收图片作者参数
function openDetailPage(quote, imagePath, imageAuthor) {
    // 设置详情页内容
    document.getElementById('detail-title').textContent = quote.title;
    
    // 处理内容中的换行符
    const formattedContent = quote.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    
    // 添加内容和出处
    const detailText = document.getElementById('detail-text');
    
    // 设置对齐方式，默认为两端对齐
    const textAlign = quote.textAlign || 'justify';
    detailText.className = `detail-text text-${textAlign}`;
    
    detailText.innerHTML = `
        <p>${formattedContent}</p>
        <p class="quote-source">—— ${quote.source || '佚名'}</p>
    `;
    
    // 加载Canvas背景
    const detailBackground = document.getElementById('detail-background');
    
    // 清除旧的背景图片
    detailBackground.style.backgroundImage = '';
    
    // 移除旧的Canvas元素（如果有）
    const oldCanvas = detailBackground.querySelector('canvas');
    if (oldCanvas) {
        detailBackground.removeChild(oldCanvas);
    }
    
    // 加载新的Canvas背景
    canvasLoader.loadCanvas(quote.title);
    const canvas = canvasLoader.getCanvas();
    
    // 添加Canvas到背景
    detailBackground.appendChild(canvas);
    
    // 显示详情页
    const detailPage = document.getElementById('detail-page');
    
    // 添加active类触发动画
    setTimeout(() => {
        detailPage.classList.add('active');
    }, 10);
}

// 关闭详情页
function closeDetailPage() {
    const detailPage = document.getElementById('detail-page');
    
    // 移除active类触发动画
    detailPage.classList.remove('active');
}

// 淡出效果后再刷新金句
function refreshQuote() {
    const quoteCard = document.querySelector('.quote-card');
    
    if (quoteCard) {
        // 添加淡出效果
        quoteCard.classList.remove('fade-in');
        
        // 等待淡出动画完成后获取新的金句
        setTimeout(() => {
            if (currentQuotes.length > 0) {
                displayRandomQuote(currentQuotes);
            } else {
                fetchQuotes();
            }
        }, 800); // 等待与CSS过渡时间相同的800ms
    } else {
        // 如果没有卡片，直接获取新金句
        fetchQuotes();
    }
}

// 导出函数
export {
    refreshQuote,
    openDetailPage,
    closeDetailPage
}; 