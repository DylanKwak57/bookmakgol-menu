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
        signature: '시그니처',
        recommended: '추천',
        popular: '인기',
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
        signature: 'ซิกเนเจอร์',
        recommended: 'แนะนำ',
        popular: 'ยอดนิยม',
        currency: '.-',
        errorLoading: 'ไม่สามารถโหลดเมนูได้',
        retry: 'ลองอีกครั้ง'
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
        signature: 'Signature',
        recommended: 'Recommended',
        popular: 'Popular',
        currency: '.-',
        errorLoading: 'Failed to load menu.',
        retry: 'Try Again'
    }
};

// ========================================
// 카테고리 ID 매핑 (API 카테고리명 → 내부 ID)
// 지점별로 다른 카테고리 (프롬퐁: 16개, 에까마이: 15개)
// ========================================
// ========================================
// 카테고리 매핑 (번호 없이 카테고리명만 사용)
// ========================================
const categoryMappingByBranch = {
    // 프롬퐁: 18개 (추천, 인기 포함)
    phromphong: {
        'Signature': { id: 'signature', ko: '시그니처', th: 'ซิกเนเจอร์', en: 'Signature', special: true },
        'Recommended': { id: 'recommended', ko: '추천', th: 'แนะนำ', en: 'Recommended', special: true },
        'Popular': { id: 'popular', ko: '인기', th: 'ยอดนิยม', en: 'Popular', special: true },
        'Stew/Soup': { id: 'stew', ko: '찜/국/탕', th: 'ตุ๋น/ซุป', en: 'Stew/Soup' },
        'Noodles': { id: 'noodles', ko: '면류', th: 'เมนูเส้น', en: 'Noodles' },
        'Bibimbab/Fried Rice': { id: 'rice', ko: '비빔밥/볶음밥', th: 'ข้าวยำ/ข้าวผัด', en: 'Bibimbab/Fried Rice' },
        'Stir-Fried': { id: 'stirfried', ko: '볶음', th: 'ผัด', en: 'Stir-Fried' },
        'Tteok': { id: 'tteok', ko: '떡류', th: 'ต็อก (เค้กข้าว)', en: 'Rice Cake Dishes' },
        'Korean Pancake': { id: 'pancake', ko: '전', th: 'แพนเค้กเกาหลี', en: 'Korean Pancake' },
        'Kimbab': { id: 'kimbab', ko: '김밥', th: 'คิมบับ', en: 'Kimbab' },
        'Salad': { id: 'salad', ko: '샐러드', th: 'สลัด', en: 'Salad' },
        'Haemul Jang': { id: 'haemuljang', ko: '해물장', th: 'แฮมุลจัง', en: 'Haemul Jang' },
        'Dumpling': { id: 'dumpling', ko: '만두', th: 'มันดู', en: 'Dumpling' },
        'SoyMilk Menu': { id: 'soymilk', ko: '콩물 메뉴', th: 'เมนูนมถั่วเหลือง', en: 'SoyMilk Menu' },
        'Side Dish': { id: 'side', ko: '사이드 메뉴', th: 'ไซด์ดิช', en: 'Side Dish' },
        'Topping': { id: 'topping', ko: '토핑', th: 'ท็อปปิ้ง', en: 'Topping' },
        'Beverage': { id: 'beverage', ko: '음료', th: 'เครื่องดื่ม', en: 'Beverage' },
        'Alcohol': { id: 'alcohol', ko: '주류', th: 'เครื่องดื่มแอลกอฮอล์', en: 'Alcohol' }
    },
    // 에까마이: 18개 (추천, 인기, 신메뉴 포함, 토핑 없음)
    ekamai: {
        'Signature': { id: 'signature', ko: '시그니처', th: 'ซิกเนเจอร์', en: 'Signature', special: true },
        'New Menu': { id: 'newmenu', ko: '신메뉴', th: 'เมนูใหม่', en: 'New Menu', special: true },
        'Recommended': { id: 'recommended', ko: '추천', th: 'แนะนำ', en: 'Recommended', special: true },
        'Popular': { id: 'popular', ko: '인기', th: 'ยอดนิยม', en: 'Popular', special: true },
        'Stew/Soup': { id: 'stew', ko: '찜/국/탕', th: 'ตุ๋น/ซุป', en: 'Stew/Soup' },
        'Noodles': { id: 'noodles', ko: '면류', th: 'เมนูเส้น', en: 'Noodles' },
        'Bibimbab/Fried Rice': { id: 'rice', ko: '비빔밥/볶음밥', th: 'ข้าวยำ/ข้าวผัด', en: 'Bibimbab/Fried Rice' },
        'Stir-Fried': { id: 'stirfried', ko: '볶음', th: 'ผัด', en: 'Stir-Fried' },
        'Tteok': { id: 'tteok', ko: '떡류', th: 'ต็อก (เค้กข้าว)', en: 'Rice Cake Dishes' },
        'Korean Pancake': { id: 'pancake', ko: '전', th: 'แพนเค้กเกาหลี', en: 'Korean Pancake' },
        'Kimbab': { id: 'kimbab', ko: '김밥', th: 'คิมบับ', en: 'Kimbab' },
        'Salad': { id: 'salad', ko: '샐러드', th: 'สลัด', en: 'Salad' },
        'Haemul Jang': { id: 'haemuljang', ko: '해물장', th: 'แฮมุลจัง', en: 'Haemul Jang' },
        'Dumpling': { id: 'dumpling', ko: '만두', th: 'มันดู', en: 'Dumpling' },
        'SoyMilk Menu': { id: 'soymilk', ko: '콩물 메뉴', th: 'เมนูนมถั่วเหลือง', en: 'SoyMilk Menu' },
        'Side Dish': { id: 'side', ko: '사이드 메뉴', th: 'ไซด์ดิช', en: 'Side Dish' },
        'Beverage': { id: 'beverage', ko: '음료', th: 'เครื่องดื่ม', en: 'Beverage' },
        'Alcohol': { id: 'alcohol', ko: '주류', th: 'เครื่องดื่มแอลกอฮอล์', en: 'Alcohol' }
    }
};

// 카테고리명에서 번호 제거 (예: "01. Signature" → "Signature")
function stripCategoryNumber(categoryName) {
    if (!categoryName) return categoryName;
    return categoryName.replace(/^\d+\.\s*/, '');
}

// 현재 지점의 카테고리 매핑 가져오기
function getCategoryMapping() {
    return categoryMappingByBranch[selectedBranch] || categoryMappingByBranch.phromphong;
}

// ========================================
// 📸 페이지-카테고리 매핑 (PDF 메뉴북 이미지)
// 총 16개 카테고리 + 디자인 요소 (표지/미슐랭)
// ========================================
const categoryPageMapping = {
    // 프롬퐁 지점 (Bookmagol Gourmet) - 28페이지
    phromphong: {
        // 디자인 요소 (표지, 미슐랭)
        cover: { pages: [1, 2], title: { ko: '소개', th: 'แนะนำ', en: 'Introduction' } },
        // 16개 카테고리
        signature: { pages: [3, 4], title: { ko: '시그니처', th: 'ซิกเนเจอร์', en: 'Signature' } },
        stew: { pages: [7, 9, 10, 11], title: { ko: '찜/국/탕', th: 'ตุ๋น/ซุป', en: 'Stew/Soup' } },
        noodles: { pages: [13, 14], title: { ko: '면류', th: 'เมนูเส้น', en: 'Noodles' } },
        rice: { pages: [12], title: { ko: '비빔밥/볶음밥', th: 'ข้าวยำ/ข้าวผัด', en: 'Bibimbab/Fried Rice' } },
        stirfried: { pages: [5, 6, 8], title: { ko: '볶음', th: 'ผัด', en: 'Stir-Fried' } },
        tteok: { pages: [15, 16], title: { ko: '떡류', th: 'ต็อก (เค้กข้าว)', en: 'Rice Cake Dishes' } },
        pancake: { pages: [19], title: { ko: '전', th: 'แพนเค้กเกาหลี', en: 'Korean Pancake' } },
        kimbab: { pages: [21, 22], title: { ko: '김밥', th: 'คิมบับ', en: 'Kimbab' } },
        salad: { pages: [26], title: { ko: '샐러드', th: 'สลัด', en: 'Salad' } },
        haemuljang: { pages: [20], title: { ko: '해물장', th: 'แฮมุลจัง', en: 'Haemul Jang' } },
        dumpling: { pages: [23, 24], title: { ko: '만두', th: 'มันดู', en: 'Dumpling' } },
        soymilk: { pages: [17, 18, 27], title: { ko: '콩물 메뉴', th: 'เมนูนมถั่วเหลือง', en: 'SoyMilk Menu' } },
        side: { pages: [25], title: { ko: '사이드 메뉴', th: 'ไซด์ดิช', en: 'Side Dish' } },
        topping: { pages: [15], title: { ko: '토핑', th: 'ท็อปปิ้ง', en: 'Topping' } },
        beverage: { pages: [28], title: { ko: '음료', th: 'เครื่องดื่ม', en: 'Beverage' } },
        alcohol: { pages: [28], title: { ko: '주류', th: 'เครื่องดื่มแอลกอฮอล์', en: 'Alcohol' } }
    },
    // 에까마이 지점 - 이미지 없음 (추후 추가)
    ekamai: {
        // 에까마이 메뉴 이미지가 없으므로 빈 배열
    }
};

// ========================================
// 상태 관리
// ========================================
let currentLang = 'ko';
let selectedBranch = null;
let selectedCategory = 'signature';  // 기본값: 시그니처
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
            selectedCategory = 'signature';  // 시그니처 탭이 먼저 표시되도록
            
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
    
    // 지점별 카테고리 매핑 가져오기
    const categoryMapping = getCategoryMapping();
    
    // 카테고리 이미지 패턴 (예: "09. Salad", "10. Haemul Jang" 또는 번호 없이 "Salad")
    const categoryNamePattern = /^\d{2}\.\s+/;
    
    // 카테고리명 목록 (번호 없는 버전)
    const categoryNames = Object.keys(categoryMapping);
    
    Object.keys(grouped).forEach(apiCategory => {
        // 노션 카테고리명에서 번호 제거 후 매핑
        const cleanCategory = stripCategoryNumber(apiCategory);
        const mapping = categoryMapping[cleanCategory];
        if (!mapping) {
            console.warn('Unknown category:', apiCategory, '→', cleanCategory);
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
        menuData[categoryId] = grouped[apiCategory].map(item => {
            const itemName = item.name || '';
            const cleanItemName = stripCategoryNumber(itemName);
            
            // 카테고리 이미지인지 확인:
            // 1. 이름이 "09. Salad" 패턴 또는 카테고리명과 일치
            // 2. 이미지가 있고 가격이 0
            const isCategoryByPattern = categoryNamePattern.test(itemName);
            const isCategoryByName = categoryNames.includes(cleanItemName);
            const isCategory = (isCategoryByPattern || isCategoryByName) && item.image && item.price === 0;
            
            return {
                id: item.id,
                name: {
                    ko: item.name_ko || item.name || '',
                    th: item.name_th || item.name || '',
                    en: item.name_en || item.name || ''
                },
                price: item.price || 0,
                image: item.image || null,
                images: item.images || [],  // 모든 이미지 배열 추가
                description: item.description ? {
                    ko: item.description,
                    th: item.description,
                    en: item.description
                } : null,
                recommended: item.recommended || false,
                isCategory: isCategory,  // 카테고리 이미지 여부
                categoryId: isCategory ? categoryId : null  // 클릭 시 이동할 카테고리
            };
        });
    });
    
    // 카테고리 정렬 (고정된 순서)
    const categoryOrder = [
        'signature',      // 시그니처
        'newmenu',        // 신메뉴
        'recommended',    // 추천
        'popular',        // 인기
        'stew',           // 찜/국/탕
        'noodles',        // 면류
        'rice',           // 비빔밥/볶음밥
        'stirfried',      // 볶음
        'tteok',          // 떡류
        'pancake',        // 전
        'kimbab',         // 김밥
        'salad',          // 샐러드
        'haemuljang',     // 해물장
        'dumpling',       // 만두
        'soymilk',        // 콩물 메뉴
        'side',           // 사이드 메뉴
        'topping',        // 토핑
        'beverage',       // 음료
        'alcohol'         // 주류
    ];
    
    categoryList.sort((a, b) => {
        const orderA = categoryOrder.indexOf(a.id);
        const orderB = categoryOrder.indexOf(b.id);
        // 목록에 없는 카테고리는 맨 뒤로
        return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
    });
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
    
    // 특별 카테고리 탭 아이콘
    const specialIcons = {
        'signature': '🏆',
        'recommended': '⭐',
        'popular': '🔥'
    };
    
    let html = '';
    
    // 특별 카테고리 버튼 (데이터에 있는 것만 표시)
    const specialCategoryIds = ['signature', 'recommended', 'popular'];
    specialCategoryIds.forEach(specialId => {
        const cat = categoryList.find(c => c.id === specialId);
        if (cat) {
            const isActive = selectedCategory === cat.id ? 'active' : '';
            const icon = specialIcons[cat.id] || '✨';
            html += `<button class="category-btn special-btn ${isActive}" 
                             data-category="${cat.id}">${icon} ${cat[currentLang]}</button>`;
        }
    });
    
    // 구분선 (특별 카테고리가 있을 때만)
    const hasSpecialCategories = categoryList.some(c => specialCategoryIds.includes(c.id));
    if (hasSpecialCategories) {
        html += `<span class="category-divider">|</span>`;
    }
    
    // 일반 카테고리 버튼
    categoryList.forEach(cat => {
        // 특별 카테고리는 이미 위에 표시했으므로 스킵
        if (specialCategoryIds.includes(cat.id)) return;
        
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
// 메뉴 렌더링 (하이브리드 모드)
// ========================================
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const t = translations[currentLang];
    
    let items = [];
    
    // 특별 카테고리 처리 (노션 카테고리에서 직접 가져오기)
    if (selectedCategory === 'signature') {
        // 시그니처: 01. Signature 카테고리의 모든 메뉴
        items = menuData['signature'] || [];
        renderHybridMode('signature', items, menuGrid, t);
    } else if (selectedCategory === 'recommended') {
        // 추천: 02. Recommended 카테고리의 모든 메뉴
        items = menuData['recommended'] || [];
        renderHybridMode('recommended', items, menuGrid, t);
    } else if (selectedCategory === 'popular') {
        // 인기: 03. Popular 카테고리의 모든 메뉴
        items = menuData['popular'] || [];
        renderHybridMode('popular', items, menuGrid, t);
    } else if (selectedCategory === 'all') {
        // 전체 보기: 기존 방식 (카드 + 리스트)
        Object.values(menuData).forEach(categoryItems => {
            items = items.concat(categoryItems);
        });
        renderMenuCards(items, menuGrid, t);
    } else {
        // 카테고리 선택: 하이브리드 모드 (이미지 갤러리 + 텍스트 리스트)
        items = menuData[selectedCategory] || [];
        renderHybridMode(selectedCategory, items, menuGrid, t);
    }
}

// ========================================
// 하이브리드 모드 렌더링 (이미지 + 텍스트 리스트)
// ========================================
function renderHybridMode(categoryId, items, container, t) {
    let html = '';
    
    // 1. 노션에서 가져온 카테고리 이미지 갤러리
    const categoryItems = items.filter(item => item.isCategory);
    const categoryImages = categoryItems.filter(item => item.image || (item.images && item.images.length > 0));
    const menuItemsWithImages = items.filter(item => !item.isCategory && item.image);
    
    // 모든 이미지 수집 (카테고리 아이템의 모든 이미지)
    let allCategoryImages = [];
    categoryItems.forEach(item => {
        if (item.images && item.images.length > 0) {
            // 여러 이미지가 있는 경우 모두 추가
            item.images.forEach((imgUrl, idx) => {
                // URL에서 페이지 번호 추출 (예: page_03.jpg → 3)
                const pageMatch = imgUrl.match(/page_(\d+)\./);
                const pageNum = pageMatch ? parseInt(pageMatch[1], 10) : 999;
                
                allCategoryImages.push({
                    url: imgUrl,
                    name: item.name[currentLang] || item.name.ko || '',
                    index: idx + 1,
                    pageNum: pageNum
                });
            });
        } else if (item.image) {
            // 단일 이미지만 있는 경우
            const pageMatch = item.image.match(/page_(\d+)\./);
            const pageNum = pageMatch ? parseInt(pageMatch[1], 10) : 999;
            
            allCategoryImages.push({
                url: item.image,
                name: item.name[currentLang] || item.name.ko || '',
                index: 1,
                pageNum: pageNum
            });
        }
    });
    
    // 페이지 번호 순서대로 정렬
    allCategoryImages.sort((a, b) => a.pageNum - b.pageNum);
    
    // 카테고리 이미지가 있으면 갤러리 표시
    if (allCategoryImages.length > 0) {
        const categoryMapping = getCategoryMapping();
        const categoryInfo = Object.values(categoryMapping).find(c => c.id === categoryId);
        const categoryTitle = categoryInfo ? categoryInfo[currentLang] : categoryId;
        
        html += `
            <div class="category-gallery" style="grid-column: 1 / -1;">
                <h3 class="gallery-title">📸 ${categoryTitle} ${currentLang === 'ko' ? '메뉴판' : currentLang === 'th' ? 'เมนู' : 'Menu'}</h3>
                <div class="gallery-grid">
        `;
        
        // 모든 카테고리 이미지 표시 (노션에서)
        allCategoryImages.forEach((imgData, index) => {
            html += `
                <div class="gallery-item" onclick="openNotionImageModal('${imgData.url}', '${imgData.name}')">
                    <img src="${imgData.url}" alt="${imgData.name}" loading="lazy"
                         onerror="this.parentElement.style.display='none';">
                    <div class="gallery-overlay">
                        <span class="gallery-zoom">🔍 ${currentLang === 'ko' ? '크게 보기' : currentLang === 'th' ? 'ขยาย' : 'Zoom'}</span>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    // 로컬 이미지 폴백 (노션 이미지가 없을 경우)
    if (allCategoryImages.length === 0) {
        const pageMapping = categoryPageMapping[selectedBranch];
        const categoryPages = pageMapping ? pageMapping[categoryId] : null;
        
        if (categoryPages && categoryPages.pages.length > 0) {
            const categoryTitle = categoryPages.title[currentLang] || categoryPages.title.ko;
            
            html += `
                <div class="category-gallery" style="grid-column: 1 / -1;">
                    <h3 class="gallery-title">📸 ${categoryTitle} ${currentLang === 'ko' ? '메뉴판' : currentLang === 'th' ? 'เมนู' : 'Menu'}</h3>
                    <div class="gallery-grid">
            `;
            
            categoryPages.pages.forEach((pageNum, index) => {
                const paddedNum = String(pageNum).padStart(2, '0');
                const imagePath = `images/pages_web/page_${paddedNum}.jpg`;
                
                html += `
                    <div class="gallery-item" onclick="openImageModal('${imagePath}', ${pageNum})">
                        <img src="${imagePath}" alt="Page ${pageNum}" loading="lazy">
                        <div class="gallery-overlay">
                            <span class="gallery-zoom">🔍 ${currentLang === 'ko' ? '크게 보기' : currentLang === 'th' ? 'ขยาย' : 'Zoom'}</span>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    }
    
    // 2. 메뉴 텍스트 리스트 (카테고리 이미지 제외, 실제 메뉴만)
    const realMenuItems = items.filter(item => !item.isCategory);
    
    if (realMenuItems.length > 0) {
        html += `
            <div class="menu-text-list" style="grid-column: 1 / -1;">
                <h3 class="list-title">📋 ${currentLang === 'ko' ? '메뉴 리스트' : currentLang === 'th' ? 'รายการเมนู' : 'Menu List'}</h3>
                <div class="menu-list">
        `;
        
        realMenuItems.forEach(item => {
            const name = item.name[currentLang] || item.name.ko || item.name.en;
            const nameSub = currentLang !== 'ko' ? item.name.ko : (item.name.en || '');
            const description = item.description ? (item.description[currentLang] || item.description.ko) : '';
            const recommendedMark = item.recommended ? '⭐ ' : '';
            const signatureBadge = item.signature ? `<span class="signature-badge">🔥 SIGNATURE</span>` : '';
            
            html += `
                <div class="menu-list-item ${item.recommended ? 'recommended' : ''} ${item.signature ? 'signature' : ''}">
                    <div class="menu-list-info">
                        <div class="menu-list-name">${recommendedMark}${name} ${signatureBadge}</div>
                        ${nameSub ? `<div class="menu-list-name-sub">${nameSub}</div>` : ''}
                        ${description ? `<div class="menu-list-description">${description}</div>` : ''}
                    </div>
                    <div class="menu-list-price">${formatPrice(item.price)}${t.currency}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    } else if (realMenuItems.length === 0 && allCategoryImages.length === 0) {
        // 이미지도 메뉴도 없을 때만 빈 상태 표시
        const pageMapping = categoryPageMapping[selectedBranch];
        const categoryPagesCheck = pageMapping ? pageMapping[categoryId] : null;
        
        if (!categoryPagesCheck) {
            html += `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">🍽️</div>
                    <p class="empty-state-text">${t.emptyState}</p>
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
}

// ========================================
// 특별 카테고리 렌더링 (추천/인기)
// ========================================
function renderSpecialCategoryView(categoryType, items, container, t) {
    const categoryMapping = getCategoryMapping();
    
    let html = '';
    
    // 헤더
    const headerInfo = {
        recommended: { icon: '⭐', ko: '추천 메뉴', th: 'เมนูแนะนำ', en: 'Recommended' },
        popular: { icon: '🔥', ko: '인기 메뉴', th: 'เมนูยอดนิยม', en: 'Popular' }
    };
    
    const header = headerInfo[categoryType] || headerInfo.recommended;
    const title = currentLang === 'ko' ? header.ko : currentLang === 'th' ? header.th : header.en;
    
    if (items.length === 0) {
        html = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">${header.icon}</div>
                <p class="empty-state-text">${t.emptyState}</p>
            </div>
        `;
        container.innerHTML = html;
        return;
    }
    
    html += `
        <div class="special-category-header" style="grid-column: 1 / -1; text-align: center; margin-bottom: 20px;">
            <h2 style="font-size: 1.8rem; margin: 0;">${header.icon} ${title}</h2>
            <p style="color: var(--text-secondary); margin-top: 5px;">${items.length}${currentLang === 'ko' ? '개 메뉴' : currentLang === 'th' ? ' เมนู' : ' items'}</p>
        </div>
    `;
    
    // 이미지가 있는 메뉴 카드 그리드
    const itemsWithImages = items.filter(item => item.image || (item.images && item.images.length > 0));
    const itemsWithoutImages = items.filter(item => !item.image && (!item.images || item.images.length === 0));
    
    if (itemsWithImages.length > 0) {
        html += `<div class="special-menu-grid" style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">`;
        
        itemsWithImages.forEach(item => {
            const name = item.name[currentLang] || item.name.ko || item.name.en;
            const nameSub = currentLang !== 'ko' ? item.name.ko : (item.name.en || '');
            const imageUrl = item.images && item.images.length > 0 ? item.images[0] : item.image;
            const description = item.description ? (item.description[currentLang] || item.description.ko || '') : '';
            
            html += `
                <div class="special-menu-card" onclick="openNotionImageModal('${imageUrl}', '${name.replace(/'/g, "\\'")}')">
                    <div class="special-menu-image" style="background-image: url('${imageUrl}'); height: 200px; background-size: cover; background-position: center; border-radius: 12px 12px 0 0;"></div>
                    <div class="special-menu-info" style="padding: 15px;">
                        <div class="special-menu-name" style="font-weight: 600; font-size: 1.1rem;">${header.icon} ${name}</div>
                        ${nameSub ? `<div class="special-menu-sub" style="font-size: 0.85rem; color: var(--text-secondary);">${nameSub}</div>` : ''}
                        ${description ? `<div class="special-menu-desc" style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">${description}</div>` : ''}
                        <div class="special-menu-price" style="font-weight: 700; color: var(--primary-color); margin-top: 10px;">${formatPrice(item.price)}${t.currency}</div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    // 이미지가 없는 메뉴 리스트
    if (itemsWithoutImages.length > 0) {
        html += `
            <div class="menu-text-list" style="grid-column: 1 / -1; margin-top: 20px;">
                <h3 class="list-title">📋 ${currentLang === 'ko' ? '메뉴 리스트' : currentLang === 'th' ? 'รายการเมนู' : 'Menu List'}</h3>
                <div class="menu-list">
        `;
        
        itemsWithoutImages.forEach(item => {
            const name = item.name[currentLang] || item.name.ko || item.name.en;
            const nameSub = currentLang !== 'ko' ? item.name.ko : (item.name.en || '');
            const description = item.description ? (item.description[currentLang] || item.description.ko) : '';
            
            html += `
                <div class="menu-list-item recommended">
                    <div class="menu-list-info">
                        <div class="menu-list-name">${header.icon} ${name}</div>
                        ${nameSub ? `<div class="menu-list-name-sub">${nameSub}</div>` : ''}
                        ${description ? `<div class="menu-list-description">${description}</div>` : ''}
                    </div>
                    <div class="menu-list-price">${formatPrice(item.price)}${t.currency}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// ========================================
// 카테고리 카드 렌더링 (전체 보기용 - 카테고리 이미지 그리드)
// ========================================
function renderMenuCards(items, container, t) {
    // 카테고리 이미지가 있는 아이템만 필터 (카테고리용)
    const categoryImages = items.filter(item => item.image && item.isCategory);
    // 일반 메뉴 아이템
    const menuItems = items.filter(item => !item.isCategory);
    
    let html = '';
    
    // 1. 카테고리 이미지 카드 (가격 없이, 클릭 시 해당 카테고리로 이동)
    if (categoryImages.length > 0) {
        html += `<div class="category-cards-grid" style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">`;
        
        categoryImages.forEach(item => {
            let name = item.name[currentLang] || item.name.ko || item.name.en;
            // 앞의 번호 제거 (예: "13. Side Dish" → "Side Dish")
            name = name.replace(/^\d+\.\s*/, '');
            const categoryId = item.categoryId || '';
            
            html += `
                <article class="category-card" onclick="selectCategoryFromCard('${categoryId}')" style="cursor: pointer;">
                    <div class="menu-image">
                        <img src="${item.image}" alt="${name}" 
                             onerror="this.parentElement.classList.add('placeholder'); this.parentElement.innerHTML='🍲';">
                    </div>
                    <div class="menu-info">
                        <h3 class="menu-name-ko">${name}</h3>
                        <p class="category-hint">${currentLang === 'ko' ? '클릭하여 메뉴 보기' : currentLang === 'th' ? 'คลิกเพื่อดูเมนู' : 'Click to view menu'}</p>
                    </div>
                </article>
            `;
        });
        
        html += `</div>`;
    }
    
    // 2. 일반 메뉴 아이템 (이미지 있는 것)
    const withImage = menuItems.filter(item => item.image);
    const withoutImage = menuItems.filter(item => !item.image);
    
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
    
    // 3. 이미지 없는 메뉴 → 리스트형
    if (withoutImage.length > 0) {
        if (withImage.length > 0 || categoryImages.length > 0) {
            html += `<div class="menu-section-divider" style="grid-column: 1 / -1;">📋 ${currentLang === 'ko' ? '기타 메뉴' : currentLang === 'th' ? 'เมนูอื่นๆ' : 'Other Menu'}</div>`;
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
    
    // 4. 아무것도 없으면 빈 상태
    if (html === '') {
        html = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🍽️</div>
                <p class="empty-state-text">${t.emptyState}</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// 카테고리 카드 클릭 시 해당 카테고리로 이동
function selectCategoryFromCard(categoryId) {
    if (!categoryId) return;
    
    selectedCategory = categoryId;
    
    // 카테고리 버튼 활성화
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === categoryId) {
            btn.classList.add('active');
        }
    });
    
    renderMenu();
    
    // 스크롤 to top of menu section
    document.getElementById('menuSection').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// ========================================
// 풀스크린 이미지 모달
// ========================================
function openImageModal(imagePath, pageNum) {
    // 이미 모달이 있으면 제거
    const existingModal = document.getElementById('imageModal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeImageModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeImageModal()">✕</button>
            <img src="${imagePath}" alt="Menu Page ${pageNum}">
            <div class="modal-nav">
                <button class="modal-nav-btn prev" onclick="navigateModal(-1)">‹</button>
                <span class="modal-page-info">Page ${pageNum}</span>
                <button class="modal-nav-btn next" onclick="navigateModal(1)">›</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 현재 페이지 번호 저장
    modal.dataset.currentPage = pageNum;
    
    // 애니메이션
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // ESC 키로 닫기
    document.addEventListener('keydown', handleModalKeydown);
}

// 노션 이미지용 모달 (실시간 URL)
function openNotionImageModal(imageUrl, title) {
    const existingModal = document.getElementById('imageModal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeImageModal()"></div>
        <div class="modal-content notion-image-modal">
            <button class="modal-close" onclick="closeImageModal()">✕</button>
            <img src="${imageUrl}" alt="${title}" onerror="this.src='images/placeholder.jpg';">
            <div class="modal-title">${title}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    document.addEventListener('keydown', handleModalKeydown);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    document.removeEventListener('keydown', handleModalKeydown);
}

function navigateModal(direction) {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const currentPage = parseInt(modal.dataset.currentPage);
    const pageMapping = categoryPageMapping[selectedBranch];
    const categoryPages = pageMapping ? pageMapping[selectedCategory] : null;
    
    if (!categoryPages) return;
    
    const pages = categoryPages.pages;
    const currentIndex = pages.indexOf(currentPage);
    let newIndex = currentIndex + direction;
    
    // 순환
    if (newIndex < 0) newIndex = pages.length - 1;
    if (newIndex >= pages.length) newIndex = 0;
    
    const newPage = pages[newIndex];
    const paddedNum = String(newPage).padStart(2, '0');
    const imagePath = `images/pages_web/page_${paddedNum}.jpg`;
    
    modal.dataset.currentPage = newPage;
    modal.querySelector('.modal-content img').src = imagePath;
    modal.querySelector('.modal-page-info').textContent = `Page ${newPage}`;
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') closeImageModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
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
    
    /* 카테고리 카드 스타일 */
    .category-card {
        background: var(--card-bg, #fff);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .category-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .category-card .menu-image {
        aspect-ratio: 4/3;
        overflow: hidden;
    }
    
    .category-card .menu-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }
    
    .category-card:hover .menu-image img {
        transform: scale(1.05);
    }
    
    .category-card .menu-info {
        padding: 15px;
        text-align: center;
    }
    
    .category-card .menu-name-ko {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 5px;
    }
    
    .category-hint {
        font-size: 0.85rem;
        color: var(--text-secondary, #888);
        margin: 0;
    }
    
    /* 노션 이미지 모달 스타일 */
    .notion-image-modal {
        max-width: 95vw;
        max-height: 95vh;
    }
    
    .notion-image-modal img {
        max-width: 100%;
        max-height: 85vh;
        object-fit: contain;
    }
    
    .modal-title {
        text-align: center;
        padding: 15px;
        font-size: 1.1rem;
        color: var(--text-primary, #333);
        background: rgba(255,255,255,0.9);
        border-radius: 0 0 12px 12px;
    }
    
    /* 갤러리 그리드 개선 */
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 15px;
        margin-top: 15px;
    }
    
    .gallery-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        aspect-ratio: 4/3;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }
    
    .gallery-item:hover img {
        transform: scale(1.05);
    }
    
    .gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        padding: 20px 15px 15px;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }
    
    .gallery-zoom {
        color: white;
        font-size: 0.9rem;
    }
    
    .gallery-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 10px;
        color: var(--text-primary, #333);
    }
    
    /* 메뉴 리스트 스타일 개선 */
    .menu-list {
        background: var(--card-bg, #fff);
        border-radius: 12px;
        padding: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .menu-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--border-light, #eee);
        transition: background 0.2s;
    }
    
    .menu-list-item:last-child {
        border-bottom: none;
    }
    
    .menu-list-item:hover {
        background: rgba(0,0,0,0.02);
    }
    
    .menu-list-name {
        font-weight: 600;
        font-size: 1rem;
    }
    
    .menu-list-name-sub {
        font-size: 0.85rem;
        color: var(--text-secondary, #888);
        margin-top: 2px;
    }
    
    .menu-list-price {
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--gold, #c59d5f);
        white-space: nowrap;
    }
`;
document.head.appendChild(style);
