# 북막골 온라인 메뉴판 프로젝트

## 📋 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Bookmakgol Online Menu |
| **목적** | 북막골 레스토랑 온라인 메뉴판 |
| **지점** | 에까마이 (대중화) / 프롬퐁 (프리미엄) |
| **참조 디자인** | https://www.shichi.co.th/starters |
| **예약 시스템** | https://dylankwak57.github.io/bookmakgol-reservation/ |

---

## 🏪 지점 정보

### Ekamai (에까마이) - Bookmakgol
- **컨셉:** 대중화 메뉴
- **위치:** BTS 에까마이역 4번 출구
- **카테고리:** 15개 (Topping 제외)

### Phromphong (프롬퐁) - Bookmakgol Gourmet
- **컨셉:** 프리미엄 메뉴
- **위치:** 수쿰윗 소이 24
- **카테고리:** 16개 (Topping 포함)

---

## 📁 폴더 구조

```
bookmakgol_menu/
├── index.html              # 메인 메뉴판 페이지
├── css/
│   └── style.css           # 스타일 (북막골 디자인 시스템)
├── js/
│   └── menu.js             # 메뉴 데이터 & 기능
├── images/                 # 메뉴 이미지 (추후 추가)
│   ├── phromphong/
│   └── ekamai/
├── PROJECT_README.md       # 이 문서
└── bookmakgol_reservation_index.html  # 예약 시스템 참조
```

---

## 🗄️ Notion 데이터베이스

### DB 1: Bookmakgol Menu - Ekamai
- **URL:** https://www.notion.so/2eea2fb1c15d81888bbbc6049ae87693
- **ID:** `2eea2fb1-c15d-8188-8bbb-c6049ae87693`

### DB 2: Bookmakgol Menu - Phromphong
- **URL:** https://www.notion.so/2eea2fb1c15d810bbfdfd485e8eb7b1b
- **ID:** `2eea2fb1-c15d-810b-bfdf-d485e8eb7b1b`

### 필드 구조

| 필드 | 타입 | 설명 |
|------|------|------|
| **Name** | Title | 대표 메뉴명 |
| **Name_KO** | Text | 한국어 이름 |
| **Name_TH** | Text | 태국어 이름 |
| **Name_EN** | Text | 영어 이름 |
| **Category** | Select | 카테고리 |
| **Price** | Number | 가격 (숫자만) |
| **Description** | Text | 메뉴 설명 |
| **Image** | Files | 메뉴 이미지 |
| **Recommended** | Checkbox | ⭐ 추천 메뉴 |
| **Active** | Checkbox | 메뉴판 표시 여부 |

---

## 🗂️ 카테고리 목록

### Ekamai (15개)
```
01. Special Recommendation (추천 메뉴)
02. Set Menu (세트 메뉴)
03. Appetizer (전채)
04. Salad (샐러드)
05. Soup & Jjigae (국/찌개)
06. Noodles (면류)
07. Rice (밥류)
08. Meat (육류)
09. Seafood (해산물)
10. Grilled (구이류)
11. Side Dish (반찬)
12. Lunch (점심 메뉴)
13. Beverage (음료)
14. Alcohol (주류)
15. Dessert (디저트)
```

### Phromphong (16개)
```
01. Special Recommendation (추천 메뉴)
02. Set Menu (세트 메뉴)
03. Appetizer (전채)
04. Salad (샐러드)
05. Soup & Jjigae (국/찌개)
06. Noodles (면류)
07. Rice (밥류)
08. Meat (육류)
09. Seafood (해산물)
10. Grilled (구이류)
11. Side Dish (반찬)
12. Topping (토핑) ← 프롬퐁만!
13. Lunch (점심 메뉴)
14. Beverage (음료)
15. Alcohol (주류)
16. Dessert (디저트)
```

---

## 📸 구글 드라이브 이미지 폴더

**메인 폴더:** https://drive.google.com/drive/folders/1pQuMZjXGG80i7aMD0l8ZPFfxRI3gMrY7

### 폴더 구조
```
Bookmakgol Menu Pic/
├── Phromphong (Bookmagol Gourmet)/
│   ├── 01. Special Recommendation/
│   ├── 02. Set Menu/
│   ├── ... (16개 카테고리)
│   └── 16. Dessert/
│
└── Ekamai (Bookmagol)/
    ├── 01. Special Recommendation/
    ├── 02. Set Menu/
    ├── ... (15개 카테고리, Topping 제외)
    └── 15. Dessert/
```

### 이미지 업로드 가이드
- **파일명:** 영문 또는 숫자 (예: bulgogi.jpg, menu_01.png)
- **형식:** JPG, PNG, WebP
- **권장 크기:** 800x800px 이상
- **용량:** 2MB 이하 권장

---

## 🎨 디자인 시스템

### 색상 팔레트 (북막골 예약 시스템 기반)
```css
:root {
    /* 배경 */
    --bg-gradient: linear-gradient(to bottom, #b0b0b0 0%, #9a9a9a 100%);
    --bg-card: rgba(255, 255, 255, 0.5);
    
    /* 텍스트 */
    --text-primary: #2d2d2d;
    --text-secondary: #3a3a3a;
    
    /* 버튼 */
    --btn-primary: #4a4a4a;
    --btn-hover: #3a3a3a;
    
    /* 보더 */
    --border-light: #d0d0d0;
}
```

### 폰트
- **메인:** Noto Sans KR (Google Fonts)

---

## 📱 메뉴판 기능

### 구현 완료 ✅
- [x] 지점 선택 (에까마이/프롬퐁)
- [x] 카테고리 탭 (가로 스크롤)
- [x] 메뉴 카드 (2열 그리드) - 이미지 있는 메뉴
- [x] 메뉴 리스트 (1열) - 이미지 없는 메뉴
- [x] 다국어 지원 (한국어/태국어/영어)
- [x] 반응형 디자인
- [x] 예약 페이지 링크

### 구현 예정 ⏳
- [ ] Notion API 연동 (실시간 메뉴 데이터)
- [ ] 이미지 로딩 최적화
- [ ] GitHub Pages 배포

---

## 🔗 연동 구조

```
┌─────────────────┐         ┌─────────────────┐
│   Notion DB     │  ──→    │   메뉴판        │
│  (메뉴 관리)     │  API    │  (자동 업데이트) │
└─────────────────┘         └─────────────────┘
         │
         │ 이미지 링크
         ↓
┌─────────────────┐
│  Google Drive   │
│  (이미지 저장)   │
└─────────────────┘
```

---

## 📝 메뉴 입력 가이드 (북막골 담당자용)

### Notion에서 메뉴 추가하기

1. **Name:** 대표 메뉴명 입력 (예: 불고기)
2. **Name_KO:** 한국어 이름 (예: 불고기)
3. **Name_TH:** 태국어 이름 (예: บุลโกกิ)
4. **Name_EN:** 영어 이름 (예: Bulgogi)
5. **Category:** 카테고리 선택
6. **Price:** 가격 (숫자만, 예: 350)
7. **Description:** 메뉴 설명 (선택사항)
8. **Image:** 이미지 업로드 또는 링크
9. **Recommended:** 추천 메뉴면 체크 ⭐
10. **Active:** 메뉴판에 표시하려면 체크 ✅

### 이미지 없는 메뉴
- Image 필드를 **비워두면** 자동으로 리스트형으로 표시됩니다.
- 토핑, 음료, 사이드 등에 적합

---

## 🚀 배포 계획

1. **개발 환경:** 로컬 (file://)
2. **테스트:** GitHub Pages (테스트 브랜치)
3. **운영:** GitHub Pages (main 브랜치)

### 예상 URL
- 메뉴판: `https://dylankwak57.github.io/bookmakgol-menu/`
- 예약: `https://dylankwak57.github.io/bookmakgol-reservation/`

---

## 📅 작업 이력

| 날짜 | 작업 내용 |
|------|----------|
| 2026-01-20 | 프로젝트 초기 설정 |
| 2026-01-20 | 구글 드라이브 폴더 구조 생성 |
| 2026-01-20 | 메뉴판 기본 HTML/CSS/JS 구현 |
| 2026-01-20 | 혼합 레이아웃 (카드형 + 리스트형) 구현 |
| 2026-01-20 | Notion DB 2개 생성 (Ekamai/Phromphong) |

---

## 📞 연락처

- **개발:** Dylan
- **클라이언트:** 북막골 레스토랑

---

## 📚 참고 자료

- [Shichi 메뉴 (참조 디자인)](https://www.shichi.co.th/starters)
- [북막골 예약 시스템](https://dylankwak57.github.io/bookmakgol-reservation/)
- [Notion API 문서](https://developers.notion.com/)
- [Google Drive API 문서](https://developers.google.com/drive/api)
