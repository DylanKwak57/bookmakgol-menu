/**
 * 북막골 메뉴판 - JavaScript
 * ================================
 * API 연동 버전
 */

// ========================================
// API 설정
// ========================================
const API_BASE_URL = 'https://dylan-automation.app.n8n.cloud/webhook/bookmakgol-menu';

// ========================================
// 다국어 텍스트
// ========================================
const translations = {
    ko: {
        pageTitle: '북막골 메뉴 | Bookmakgol Menu',
        subtitle: 'Menu',
        branchTitle: '지점 선택',
        ekamaiName: '에까마이 지점',
        ekamaiInfo: 'BTS 에까마이역 4번 출구',
        phromName: '프롬퐁 지점',
        phromInfo: '수쿰윗 소이 24',
        reservationBtn: '예약하기',
        loading: '메뉴를 불러오는 중...',
        emptyState: '이 카테고리에 메뉴가 없습니다.',
        allCategories: '전체',
        currency: '.-',
        errorLoading: '메뉴를 불러오는데 실패했습니다.',
        retry: '다시 시도',
        recommended: '추천'
    },
    th: {
        pageTitle: 'เมนูบุกมักกล | Bookmakgol Menu',
        subtitle: 'Menu',
        branchTitle: 'เลือกสาขา',
        ekamaiName: 'สาขาเอกมัย',
        ekamaiInfo: 'BTS เอกมัย ทางออก 4',
        phromName: 'สาขาพร้อมพงษ์',
        phromInfo: 'สุขุมวิท ซอย 24',
        reservationBtn: 'จองโต๊ะ',
        loading: 'กำลังโหลดเมนู...',
        emptyState: 'ไม่มีเมนูในหมวดหมู่นี้',
        allCategories: 'ทั้งหมด',
        currency: '.-',
        errorLoading: 'ไม่สามารถโหลดเมนูได้',
        retry: 'ลองอีกครั้ง',
        recommended: 'แนะนำ'
    },
    en: {
        pageTitle: 'Bookmakgol Menu',
        subtitle: 'Menu',
        branchTitle: 'Select Branch',
        ekamaiName: 'Ekamai Branch',
        ekamaiInfo: 'BTS Ekamai Exit 4',
        phromName: 'Phrom Phong Branch',
        phromInfo: 'Sukhumvit Soi 24',
        reservationBtn: 'Reservation',
        loading: 'Loading menu...',
        emptyState: 'No items in this category.',
        allCategories: 'All',
        currency: '.-',
        errorLoading: 'Failed to load menu.',
        retry: 'Try Again',
        recommended: 'Recommended'
    }
};

// ========================================
// 카테고리 ID 매핑 (API 카테고리명 → 내부 ID)
// ========================================
const categoryMapping = {
    '01. Special Recommendation': { id: 'special', ko: '추천 메뉴', th: 'เมนูแนะนำ', en: 'Special' },
    '02. Set Menu': { id: 'set', ko: '세트 메뉴', th: 'เซ็ตเมนู', en: 'Set Menu' },
    '03. Appetizer': { id: 'appetizer', ko: '전채', th: 'อาหารเรียกน้ำย่อย', en: 'Appetizer' },
    '04. Salad': { id: 'salad', ko: '샐러드', th: 'สลัด', en: 'Salad' },
    '05. Soup & Jjigae': { id: 'soup', ko: '국/찌개', th: 'ซุป/จิเก', en: 'Soup & Jjigae' },
    '06. Noodles': { id: 'noodles', ko: '면류', th: 'เส้น', en: 'Noodles' },
    '07. Rice': { id: 'rice', ko: '밥류', th: 'ข้าว', en: 'Rice' },
    '08. Meat': { id: 'meat', ko: '육류', th: 'เนื้อ', en: 'Meat' },
    '09. Seafood': { id: 'seafood', ko: '해산물', th: 'อาหารทะเล', en: 'Seafood' },
    '10. Grilled': { id: 'grilled', ko: '구이류', th: 'ปิ้งย่าง', en: 'Grilled' },
    '11. Side Dish': { id: 'side', ko: '반찬', th: 'เครื่องเคียง', en: 'Side Dish' },
    '12. Topping': { id: 'topping', ko: '토핑', th: 'ท็อปปิ้ง', en: 'Topping' },
    '12. Lunch': { id: 'lunch', ko: '점심 메뉴', th: 'เมนูกลางวัน', en: 'Lunch' },
    '13. Beverage': { id: 'beverage', ko: '음료', th: 'เครื่องดื่ม', en: 'Beverage' },
    '14. Alcohol': { id: 'alcohol', ko: '주류', th: 'เครื่องดื่มแอลกอฮอล์', en: 'Alcohol' },
    '15. Dessert': { id: 'dessert', ko: '디저트', th: 'ของหวาน', en: 'Dessert' }
};

// ========================================
// 상태 관리
// ========================================
let currentLang = 'ko';
let selectedBranch = null;
let selectedCategory = 'all';
let menuData = {};        // API에서 로드된 메뉴 데이터
let categoryList = [];    // 현재 지점의 카테고리 목록
let isLoading = false;

// ========================================
// 초기화
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 언어 버튼 이벤트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLang = this.dataset.lang;
            updateLanguage();
            if (selectedBranch && Object.keys(menuData).length > 0) {
                renderCategories();
                renderMenu();
            }
        });
    });

    // 지점 선택 이벤트
    document.querySelectorAll('.branch-card').forEach(card => {
        card.addEventListener('click', function() {
            if (isLoading) return;
            
            document.querySelectorAll('.branch-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedBranch = this.dataset.branch;
            selectedCategory = 'all';
            
            // 메뉴 섹션 표시
            document.getElementById('menuSection').style.display = 'block';
            
            // API에서 메뉴 로드
            loadMenuFromAPI();
            
            // 스크롤
            document.getElementById('menuSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });
}

// ========================================
// API에서 메뉴 로드
// ========================================
async function loadMenuFromAPI() {
    const menuGrid = document.getElementById('menuGrid');
    const t = translations[currentLang];
    
    // 로딩 상태 표시
    isLoading = true;
    menuGrid.innerHTML = `
        <div class="loading-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <div class="loading-spinner" style="
                width: 50px;
                height: 50px;
                border: 4px solid var(--gold-light);
                border-top-color: var(--gold);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <p style="color: var(--text-secondary); font-size: 1rem;">${t.loading}</p>
        </div>
    `;
    
    // 카테고리 초기화
    document.querySelector('.category-scroll').innerHTML = '';
    
    try {
        const response = await fetch(`${API_BASE_URL}?branch=${selectedBranch}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
            // API 데이터를 내부 형식으로 변환
            processAPIData(result);
            
            // 카테고리 및 메뉴 렌더링
            renderCategories();
            renderMenu();
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error loading menu:', error);
        showErrorState();
    } finally {
        isLoading = false;
    }
}

// ========================================
// API 데이터 처리
// ========================================
function processAPIData(result) {
    menuData = {};
    categoryList = [];
    
    // grouped 데이터 사용
    const grouped = result.grouped || {};
    
    Object.keys(grouped).forEach(apiCategory => {
        const mapping = categoryMapping[apiCategory];
        if (!mapping) {
            console.warn('Unknown category:', apiCategory);
            return;
        }
        
        const categoryId = mapping.id;
        
        // 카테고리 목록에 추가 (중복 방지)
        if (!categoryList.find(c => c.id === categoryId)) {
            categoryList.push({
                id: categoryId,
                ko: mapping.ko,
                th: mapping.th,
                en: mapping.en,
                order: apiCategory // 정렬용
            });
        }
        
        // 메뉴 아이템 변환
        menuData[categoryId] = grouped[apiCategory].map(item => ({
            id: item.id,
            name: {
                ko: item.name_ko || item.name || '',
                th: item.name_th || item.name || '',
                en: item.name_en || item.name || ''
            },
            price: item.price || 0,
            image: item.image || null,
            description: item.description ? {
                ko: item.description,
                th: item.description,
                en: item.description
            } : null,
            recommended: item.recommended || false
        }));
    });
    
    // 카테고리 정렬 (API 카테고리명의 번호 순서대로)
    categoryList.sort((a, b) => a.order.localeCompare(b.order));
}

// ========================================
// 에러 상태 표시
// ========================================
function showErrorState() {
    const menuGrid = document.getElementById('menuGrid');
    const t = translations[currentLang];
    
    menuGrid.innerHTML = `
        <div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 20px;">😢</div>
            <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 20px;">${t.errorLoading}</p>
            <button onclick="loadMenuFromAPI()" style="
                background: var(--gold);
                color: var(--cream);
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
            ">${t.retry}</button>
        </div>
    `;
}

// ========================================
// 언어 업데이트
// ========================================
function updateLanguage() {
    const t = translations[currentLang];
    
    document.title = t.pageTitle;
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('branch-title').textContent = t.branchTitle;
    document.getElementById('ekamai-name').textContent = t.ekamaiName;
    document.getElementById('ekamai-info').textContent = t.ekamaiInfo;
    document.getElementById('phrom-name').textContent = t.phromName;
    document.getElementById('phrom-info').textContent = t.phromInfo;
    document.getElementById('reservationBtn').textContent = t.reservationBtn;
}

// ========================================
// 카테고리 렌더링
// ========================================
function renderCategories() {
    const categoryScroll = document.querySelector('.category-scroll');
    const t = translations[currentLang];
    
    let html = `<button class="category-btn ${selectedCategory === 'all' ? 'active' : ''}" 
                        data-category="all">${t.allCategories}</button>`;
    
    categoryList.forEach(cat => {
        const isActive = selectedCategory === cat.id ? 'active' : '';
        html += `<button class="category-btn ${isActive}" 
                         data-category="${cat.id}">${cat[currentLang]}</button>`;
    });
    
    categoryScroll.innerHTML = html;
    
    // 카테고리 버튼 이벤트
    categoryScroll.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            categoryScroll.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedCategory = this.dataset.category;
            renderMenu();
        });
    });
}

// ========================================
// 메뉴 렌더링
// ========================================
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const t = translations[currentLang];
    
    let items = [];
    
    if (selectedCategory === 'all') {
        // 모든 카테고리의 메뉴 합치기
        Object.values(menuData).forEach(categoryItems => {
            items = items.concat(categoryItems);
        });
    } else {
        items = menuData[selectedCategory] || [];
    }
    
    if (items.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🍽️</div>
                <p class="empty-state-text">${t.emptyState}</p>
            </div>
        `;
        return;
    }
    
    // 이미지 있는 메뉴와 없는 메뉴 분리
    const withImage = items.filter(item => item.image);
    const withoutImage = items.filter(item => !item.image);
    
    let html = '';
    
    // 1. 이미지 있는 메뉴 → 카드형 (2열 그리드)
    withImage.forEach(item => {
        const name = item.name[currentLang] || item.name.ko || item.name.en;
        const nameKo = currentLang !== 'ko' ? item.name.ko : '';
        const description = item.description ? (item.description[currentLang] || item.description.ko) : '';
        const recommendedBadge = item.recommended ? 
            `<span class="recommended-badge">⭐ ${t.recommended}</span>` : '';
        
        html += `
            <article class="menu-card ${item.recommended ? 'recommended' : ''}">
                <div class="menu-image">
                    <img src="${item.image}" alt="${name}" 
                         onerror="this.parentElement.classList.add('placeholder'); this.parentElement.innerHTML='🍲';">
                    ${recommendedBadge}
                </div>
                <div class="menu-info">
                    <h3 class="menu-name-ko">${name}</h3>
                    ${nameKo ? `<p class="menu-name-en">${nameKo}</p>` : ''}
                    <p class="menu-price">${formatPrice(item.price)}${t.currency}</p>
                    ${description ? `<p class="menu-description">${description}</p>` : ''}
                </div>
            </article>
        `;
    });
    
    // 2. 이미지 없는 메뉴 → 리스트형
    if (withoutImage.length > 0) {
        // 구분선 추가 (이미지 있는 메뉴가 있을 때만)
        if (withImage.length > 0) {
            html += `<div class="menu-section-divider">📋 ${currentLang === 'ko' ? '기타 메뉴' : currentLang === 'th' ? 'เมนูอื่นๆ' : 'Other Menu'}</div>`;
        }
        
        html += `<div class="menu-list" style="grid-column: 1 / -1;">`;
        
        withoutImage.forEach(item => {
            const name = item.name[currentLang] || item.name.ko || item.name.en;
            const nameSub = currentLang !== 'ko' ? item.name.ko : (item.name.en || '');
            const description = item.description ? (item.description[currentLang] || item.description.ko) : '';
            const recommendedMark = item.recommended ? '⭐ ' : '';
            
            html += `
                <div class="menu-list-item ${item.recommended ? 'recommended' : ''}">
                    <div class="menu-list-info">
                        <div class="menu-list-name">${recommendedMark}${name}</div>
                        ${nameSub ? `<div class="menu-list-name-sub">${nameSub}</div>` : ''}
                        ${description ? `<div class="menu-list-description">${description}</div>` : ''}
                    </div>
                    <div class="menu-list-price">${formatPrice(item.price)}${t.currency}</div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    menuGrid.innerHTML = html;
}

// ========================================
// 유틸리티 함수
// ========================================
function formatPrice(price) {
    return price.toLocaleString();
}

// ========================================
// CSS 애니메이션 추가
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .recommended-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--gold);
        color: var(--cream);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .menu-card.recommended {
        border: 2px solid var(--gold);
    }
    
    .menu-list-item.recommended {
        background: rgba(197, 157, 95, 0.1);
        border-left: 3px solid var(--gold);
    }
`;
document.head.appendChild(style);
