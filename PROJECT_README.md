# 북막골 온라인 메뉴판 프로젝트

## 📋 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Bookmakgol Online Menu |
| **목적** | 북막골 레스토랑 온라인 메뉴판 |
| **지점** | 에까마이 (대중화) / 프롬퐁 (프리미엄) |
| **라이브 URL** | https://dylankwak57.github.io/bookmakgol-menu/ |
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
- **카테고리:** 18개 (특별 카테고리 포함)

---

## 📁 폴더 구조

```
bookmakgol_menu/
├── index.html              # 메인 메뉴판 페이지
├── css/
│   └── style.css           # 스타일 (북막골 디자인 시스템)
├── js/
│   └── menu.js             # 메뉴 데이터 & 기능
├── images/
│   └── pages_web/          # 메뉴 이미지 (로컬 백업용)
│       └── page_01~28.jpg
├── PROJECT_README.md       # 이 문서
├── MENU_SUMMARY.md         # 메뉴 요약
└── Bookmakgol_Menu_API.json # n8n 워크플로우 백업
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
| **Image** | Files | 메뉴 이미지 (여러 개 가능) |
| **Active** | Checkbox | 메뉴판 표시 여부 |

---

## 🗂️ 카테고리 목록

> ⚠️ **노션 카테고리 번호 제거 완료** (2026-01-21)
> 코드에서 `stripCategoryNumber()` 함수로 번호 있든 없든 자동 처리

### ⭐ 특별 카테고리 (상단 고정)

| 카테고리 | 아이콘 | 한국어 | 태국어 | 설명 |
|---------|-------|-------|-------|------|
| **Signature** | 🏆 | 시그니처 | ซิกเนเจอร์ | 대표 메뉴 |
| **Recommended** | ⭐ | 추천 | แนะนำ | MUST TRY 추천 메뉴 |
| **Popular** | 🔥 | 인기 | ยอดนิยม | BEST SELLER 인기 메뉴 |

### 📋 일반 카테고리 (Phromphong 기준, 18개)

| 카테고리 | 한국어 | 태국어 |
|---------|-------|-------|
| Stew/Soup | 찜/국/탕 | ตุ๋น/ซุป |
| Noodles | 면류 | เมนูเส้น |
| Bibimbab/Fried Rice | 비빔밥/볶음밥 | ข้าวยำ/ข้าวผัด |
| Stir-Fried | 볶음 | ผัด |
| Tteok | 떡볶이 | ต๊อกบกกี |
| Korean Pancake | 전 | แพนเค้ก |
| Kimbab | 김밥 | คิมบับ |
| Salad | 샐러드 | สลัด |
| Haemul Jang | 해물장 | แฮมุลจัง |
| Dumpling | 만두 | มันดู |
| SoyMilk Menu | 콩물 메뉴 | เมนูน้ำเต้าหู้ |
| Side Dish | 사이드 메뉴 | เมนูเคียง |
| Topping | 토핑 | ท็อปปิ้ง |
| Beverage | 음료 | เครื่องดื่ม |
| Alcohol | 주류 | เครื่องดื่มแอลกอฮอล์ |

---

## 🔗 n8n API 연동

### API 엔드포인트
- **통합 API:** `https://dylan-automation.app.n8n.cloud/webhook/bookmakgol-menu`
- **지점 파라미터:** `?branch=phromphong` 또는 `?branch=ekamai`

### 워크플로우: Bookmakgol Menu API
- **위치:** n8n Cloud
- **기능:** 노션 데이터베이스 실시간 조회 및 JSON 변환
- **지점 분기:** IF 노드로 branch 파라미터 체크 후 해당 DB 조회

### API 응답 형식
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "id": "page-id",
      "name": "불고기",
      "name_ko": "불고기",
      "name_th": "บุลโกกิ",
      "name_en": "Bulgogi",
      "category": "01. Signature",
      "price": 350,
      "description": "...",
      "image": "https://...",
      "images": ["https://...", "https://..."],
      "active": true
    }
  ],
  "grouped": { ... }
}
```

### 이미지 처리
- **노션 이미지 URL:** 임시 URL (만료됨) → API 호출 시 항상 최신 URL 반환
- **여러 이미지 지원:** `images` 배열로 한 카테고리에 여러 이미지 표시
- **페이지 번호 정렬:** URL에서 `page_XX` 추출하여 순서대로 표시

---

## 🎨 디자인 시스템

### 색상 팔레트
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
    
    /* 특별 카테고리 버튼 */
    --special-btn-gradient: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}
```

### 폰트
- **메인:** Noto Sans KR (Google Fonts)

### 특별 카테고리 버튼 스타일
- **배경:** 오렌지 그라데이션
- **활성화:** 진한 오렌지
- **구분선:** `|` 로 일반 카테고리와 구분

---

## 📱 메뉴판 기능

### 구현 완료 ✅
- [x] 지점 선택 (에까마이/프롬퐁)
- [x] **시그니처 탭 기본 표시** (지점 선택 시 자동)
- [x] 특별 카테고리 탭 (시그니처/추천/인기)
- [x] 카테고리 탭 (가로 스크롤, 구분선 포함)
- [x] 하이브리드 모드 (이미지 갤러리 + 카드)
- [x] 노션 이미지 실시간 표시
- [x] 여러 이미지 지원 (한 카테고리에 다수 이미지)
- [x] 이미지 페이지 번호순 정렬
- [x] 전체화면 이미지 모달
- [x] 다국어 지원 (한국어/태국어/영어)
- [x] 반응형 디자인
- [x] 예약 페이지 링크

### 미래 개선사항 ⏳
- [x] GitHub Pages 배포 ✅
- [ ] 이미지 로딩 최적화 (lazy loading)
- [ ] 검색 기능
- [ ] 에까마이 지점 노션 데이터 추가

---

## 📊 UX 흐름

```
1. 메뉴판 접속
   ↓
2. 지점 선택 (에까마이 / 프롬퐁)
   ↓
3. 🏆 시그니처 탭 자동 표시 (기본값)
   ↓
4. 특별 탭 선택 가능:
   - 🏆 시그니처: 대표 메뉴
   - ⭐ 추천: MUST TRY 메뉴
   - 🔥 인기: BEST SELLER 메뉴
   ↓
5. 일반 카테고리 탭 선택
   ↓
6. 이미지 갤러리 + 메뉴 정보 표시
```

---

## 📝 노션 관리 가이드

### 메뉴 추가하기

1. **Name:** 대표 메뉴명 입력 (필수)
2. **Category:** 카테고리 선택 (필수)
   - `Signature` → 시그니처 메뉴
   - `Recommended` → 추천 메뉴 (MUST TRY)
   - `Popular` → 인기 메뉴 (BEST SELLER)
   - `Stew/Soup` ~ → 일반 카테고리
3. **Image:** 메뉴판 이미지 업로드 (필수, 여러 개 가능)
4. **Active:** 표시하려면 체크 ✅ (필수)

> 💡 **선택 필드:** Name_KO, Name_TH, Name_EN, Price, Description
> 이미지 기반 메뉴판이므로 이름/가격 필드는 선택사항

### 이미지 업로드 팁
- **파일명:** `page_XX.jpg` 형식 권장 (정렬용)
- **한 카테고리에 여러 이미지:** 같은 카테고리 항목에 여러 이미지 첨부
- **자동 정렬:** 파일명의 숫자로 순서 결정

---

## 📅 작업 이력

| 날짜 | 작업 내용 |
|------|----------|
| 2026-01-20 | 프로젝트 초기 설정 |
| 2026-01-20 | 구글 드라이브 폴더 구조 생성 |
| 2026-01-20 | 메뉴판 기본 HTML/CSS/JS 구현 |
| 2026-01-20 | 혼합 레이아웃 (카드형 + 리스트형) 구현 |
| 2026-01-20 | Notion DB 2개 생성 (Ekamai/Phromphong) |
| 2026-01-21 | n8n API 워크플로우 생성 |
| 2026-01-21 | 노션 실시간 메뉴 데이터 연동 |
| 2026-01-21 | 노션 이미지 실시간 표시 구현 |
| 2026-01-21 | 여러 이미지 지원 (images 배열) |
| 2026-01-21 | 이미지 페이지 번호순 정렬 |
| 2026-01-21 | 특별 카테고리 추가 (시그니처/추천/인기) |
| 2026-01-21 | "전체" 카테고리 제거 |
| 2026-01-21 | 특별 카테고리 버튼 스타일링 |
| 2026-01-21 | **지점 선택 시 시그니처 탭 기본 표시** |
| 2026-01-21 | 카테고리 번호 제거 대응 (`stripCategoryNumber()`) |
| 2026-01-21 | 카테고리 고정 순서 정렬 추가 |
| 2026-01-21 | Side Dish 번역 수정 (반찬 → 사이드 메뉴) |
| 2026-01-21 | Noodles 태국어 수정 (เส้น → เมนูเส้น) |
| 2026-01-21 | 지점 선택 섹션 "1" 번호 제거 |
| 2026-01-21 | **GitHub Pages 배포** |
| 2026-01-21 | JS 캐시 버스팅 추가 (`?v=3`) |
| 2026-01-21 | n8n 워크플로우 통합 (branch 파라미터) |
| 2026-01-21 | 에까마이 노션 DB Category 필드 재설정 (번호 제거) |

---

## 📞 연락처

- **개발:** Dylan
- **클라이언트:** 북막골 레스토랑

---

## 📚 참고 자료

- [Shichi 메뉴 (참조 디자인)](https://www.shichi.co.th/starters)
- [북막골 예약 시스템](https://dylankwak57.github.io/bookmakgol-reservation/)
- [Notion API 문서](https://developers.notion.com/)
- [n8n 문서](https://docs.n8n.io/)
