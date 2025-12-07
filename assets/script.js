// assets/script.js - 互動邏輯與 App 介面切換

// --- 核心變數 ---
const dayCards = document.querySelectorAll('.itinerary-day-card');
const dateNavItems = document.querySelectorAll('.date-nav-item');
const prevDayBtn = document.getElementById('prevDayBtn');
const nextDayBtn = document.getElementById('nextDayBtn');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
const mainSections = document.querySelectorAll('.main-section');

let currentDayIndex = 0;

// --- 1. 日期切換與卡片顯示邏輯 ---

function showDay(index) {
    if (index < 0 || index >= dayCards.length) return;

    // 1. 隱藏所有卡片，顯示當前卡片
    dayCards.forEach((card, i) => {
        card.classList.toggle('active-day', i === index);
    });

    // 2. 更新頂部日期導航的 active 狀態
    dateNavItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        // 滾動到選中的日期項目，確保它在螢幕中央
        if (i === index) {
            item.scrollIntoView({ behavior: 'smooth', inline: 'center' });

            // 3. **核心修改：滾動網頁視窗到對應的錨點位置**
            const targetAnchorId = item.getAttribute('href'); // e.g., #day1-anchor
            if (targetAnchorId.startsWith('#')) {
                const targetElement = document.getElementById(targetAnchorId.substring(1));
                if (targetElement) {
                    // 使用 scrollIntoView 配合平滑滾動，會滾動到目標元素頂部
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    });

    // 4. 更新底部行程切換按鈕狀態
    prevDayBtn.classList.toggle('disabled', index === 0);
    nextDayBtn.classList.toggle('disabled', index === dayCards.length - 1);
    currentDayIndex = index;
}

// 事件綁定：頂部日期點擊 (保持不變，因為邏輯已在 showDay 中處理)
dateNavItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); 
        showDay(index);
    });
});

// 事件綁定：上一天/下一天按鈕
prevDayBtn.addEventListener('click', () => {
    if (currentDayIndex > 0) {
        showDay(currentDayIndex - 1);
    }
});

nextDayBtn.addEventListener('click', () => {
    if (currentDayIndex < dayCards.length - 1) {
        showDay(currentDayIndex + 1);
    }
});

// --- 2. 底部導航與區塊切換邏輯 (App 功能) ---

function showSection(targetId) {
    // 隱藏所有主要區塊，顯示目標區塊
    mainSections.forEach(section => {
        section.classList.toggle('active-section', section.id === targetId);
    });

    // 更新底部導航的 active 狀態
    bottomNavItems.forEach(item => {
        // 記帳是外部連結，不應被設為 active
        if (item.dataset.target === targetId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 只有在顯示行程時才顯示日期導航
    const dateNav = document.getElementById('dateNav');
    if (targetId === 'itinerary') {
        dateNav.style.display = 'flex';
        // 如果是從其他區塊切換回來，確保行程卡片導航也顯示
        document.querySelector('.card-navigation').style.display = 'flex';
        // 確保當前日期的卡片是顯示的
        showDay(currentDayIndex);
    } else {
        dateNav.style.display = 'none';
        document.querySelector('.card-navigation').style.display = 'none';
    }
}

// 事件綁定：底部導航點擊
bottomNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // 如果是外部連結 (例如記帳頁)，允許預設行為
        if (item.getAttribute('href').startsWith('http') || item.getAttribute('href').endsWith('.html')) {
            // 允許跳轉到外部頁面
            return; 
        }

        e.preventDefault(); 
        const targetId = item.dataset.target;
        showSection(targetId);
    });
});


// --- 3. 初始化 ---

document.addEventListener('DOMContentLoaded', () => {
    // 預設顯示行程區塊
    showSection('itinerary');
    // 預設顯示第一天行程
    showDay(0);
});