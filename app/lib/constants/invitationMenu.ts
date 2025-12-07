export interface InvitationMenuItem {
  id: string; // 고유 아이디
  label: string; // 화면에 표시할 메뉴명
  movable?: boolean; // 순서 변경 가능 여부
  toggle: boolean; // 토글 고정메뉴 여부
  isVisible: boolean; // 메뉴 보여주는 여부
}

export const invitationMenu: InvitationMenuItem[] = [
  { id: "colorFont", label: "컬러 & 폰트", movable: false, toggle: true, isVisible: true },
  { id: "weddingInfo", label: "예식 기본 정보", movable: false, toggle: true, isVisible: true },
  { id: "loadingScreen", label: "로딩화면", movable: false, toggle: false, isVisible: true },
  { id: "mainImage", label: "메인 사진", movable: false, toggle: false, isVisible: true },
  { id: "invitationText", label: "초대 문구", movable: true, toggle: false, isVisible: true },
  { id: "coupleIntro", label: "신랑 & 신부 소개", movable: true, toggle: false, isVisible: true },
  { id: "parentsIntro", label: "부모님 소개", movable: true, toggle: false, isVisible: true },
  { id: "gallery", label: "갤러리", movable: true, toggle: false, isVisible: true },
  { id: "flipImage", label: "플립북 이미지", movable: true, toggle: false, isVisible: true },
  { id: "accountInfo", label: "계좌번호", movable: true, toggle: false, isVisible: true },
  { id: "locationInfo", label: "오시는 길", movable: true, toggle: false, isVisible: true },
  { id: "shareThumbnail", label: "공유 썸네일", movable: false, toggle: true, isVisible: true }
];
