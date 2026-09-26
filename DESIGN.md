# 디자인 기준

- 디자인 레퍼런스 ID: `seed-design`
- 기준: [당근 SEED Design](https://seed-design.io/)
- 적용 범위: 홈, 커리큘럼, 실습, 프롬프트, 이용 안내, 발표 슬라이드
- 이전 디자인 보존 커밋: `02932c9`

## 적용 원칙

소개보다 수업 자료 접근을 우선한다. 홈에서 1주차 실습, 슬라이드, 프롬프트로 바로 이동할 수 있도록 구성한다. 수업 순서와 필수·선택 미션의 구분은 유지한다. 준비하지 않은 교안을 완성된 것처럼 표시하지 않는다.

SEED의 역할 기반 색상과 컴포넌트 구조를 참고하되, 당근 로고·브랜드 자산은 사용하지 않는다. 공식 SEED 제품이 아니며 기존 React 컴포넌트와 CSS로 작성한 별도 구현이다. `@seed-design/react` 패키지를 설치한 것은 아니다.

## 색상

[공식 팔레트](https://seed-design.io/foundations/color/palette)와 [색상 역할](https://seed-design.io/foundations/color/color-role)을 기준으로 CSS 변수를 정의한다.

| 역할             | CSS 변수       | 값        |
| ---------------- | -------------- | --------- |
| 페이지 배경      | `--bg`         | `#f7f8f9` |
| 카드 배경        | `--surface`    | `#ffffff` |
| 기본 글자        | `--fg`         | `#1a1c20` |
| 보조 글자        | `--fg-muted`   | `#555d6d` |
| 주요 액션·브랜드 | `--brand`      | `#ff6600` |
| 브랜드 글자      | `--brand-fg`   | `#b93901` |
| 브랜드 약한 배경 | `--brand-weak` | `#fff2ec` |
| 완료 상태        | `--positive`   | `#00745f` |
| 입력 오류        | `--critical`   | `#ca1d13` |

작은 주황색 글자를 남용하지 않는다. 밝은 주황색 버튼에는 어두운 글자를 조합해 WCAG AA 일반 텍스트 대비를 확보한다. 색상만으로 상태를 전달하지 않고 라벨·아이콘을 함께 사용한다.

## 글자, 간격, 형태

- [타이포그래피](https://seed-design.io/foundations/typography): 16px 본문을 중심으로 12/13/14/18/20/24/26/28/32/40px 계층을 사용하며 실제 크기는 rem으로 정의한다. 발표 슬라이드에는 별도 큰 스케일을 적용한다.
- Pretendard 웹폰트를 자체 호스팅해 외부 폰트 서비스 없이 표시한다.
- [Radius](https://seed-design.io/foundations/radius): 컨트롤 8–12px, 카드 16px, 큰 영역 24px. 칩에만 pill 형태를 사용한다.
- [Action Button](https://seed-design.io/components/action-button): 주요 액션, 보조 액션, 텍스트 링크의 강조 수준을 구분한다. hover, pressed, disabled, focus 상태를 갖춘다.
- 입력란, 필터, 체크박스, 아코디언에 같은 색상·간격·모서리 규칙을 적용한다.

## 반응형과 동작

데스크톱에서는 실습 목차를 왼쪽에 고정하고, 모바일에서는 본문 위로 이동한다. 키보드 포커스, 복사 알림, 검색 빈 결과, 저장된 체크리스트, URL 유효성 검사를 유지한다. 모션 축소 설정을 존중한다. 320px부터 데스크톱까지 가로 넘침 없이 표시되어야 한다.
