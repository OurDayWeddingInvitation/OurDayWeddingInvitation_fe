export interface InvitationMenuItem {
  id: string; // 고유 아이디
  label: string; // 화면에 표시할 메뉴명
  movable?: boolean; // 순서 변경 가능 여부
  toggle: boolean; // 토글 고정메뉴 여부
}

export const invitationMenu: InvitationMenuItem[] = [
  { id: "main", label: "메인 사진", movable: false, toggle: true },
  { id: "basicInfo", label: "예식 기본 정보", movable: false, toggle: true },
  { id: "parentsInfo", label: "양가 혼주 정보", movable: false, toggle: true },
  { id: "shareScreen", label: "카톡 공유 화면", movable: true, toggle: false },
  { id: "colorFont", label: "컬러 & 폰트", movable: true, toggle: false },
  { id: "preview", label: "미리보기 화면", movable: true, toggle: false },
  { id: "invitationText", label: "초대 문구", movable: true, toggle: false },
  { id: "brideGroomIntro", label: "신랑 & 신부 소개", movable: true, toggle: false },
  { id: "parentsIntro", label: "부모님 소개", movable: true, toggle: false },
  { id: "gallery", label: "갤러리", movable: true, toggle: false },
  { id: "plipImage", label: "플립북 이미지", movable: true, toggle: false },
  { id: "accountInfo", label: "계좌번호", movable: true, toggle: false },
  { id: "directions", label: "오시는 길", movable: true, toggle: false }
];
