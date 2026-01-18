export interface Invitation {
  weddingId: number;
  weddingTitle: string;
  mainImageUrl: string;
}

export interface InvitationDetail {
  weddingTitle: string;
  sections?: Sections;
  sectionSettings?: SectionSettingItem[];
}

export interface Sections {
  main?: MainSection;
  shareLink?: ShareLinkSection;
  weddingInfo?: WeddingInfoSectionType;
  invitationMessage?: InvitationMessageSectionType;
  coupleIntro?: CoupleIntroSectionType;
  parentsIntro?: ParentsIntroSectionType;
  accountInfo?: AccountInfoSectionType;
  locationInfo?: LocationInfoSectionType;
  themeFont?: ThemeFontSectionType;
  loadingScreen?: LoadingScreenSectionType;
  gallery?: GallerySectionType;
  flipbook?: FlipbookSectionType | null; // sectionSettings에 있으므로 optional 처리
}

export interface MainSection {
  posterStyle?: string;
}

export interface ShareLinkSection {
  shareTitle?: string;
}

export interface WeddingInfoSectionType {
  groomLastName?: string;
  groomFirstName?: string;
  brideLastName?: string;
  brideFirstName?: string;
  nameOrderType?: string;
  weddingYear?: string;
  weddingMonth?: string;
  weddingDay?: string;
  weddingTimePeriod?: string;
  weddingHour?: string;
  weddingMinute?: string;
  weddingHallName?: string;
  weddingHallFloor?: string;
  groomFatherName?: string;
  groomFatherDeceased?: boolean;
  groomMotherName?: string;
  groomMotherDeceased?: boolean;
  groomRankName?: string;
  brideFatherName?: string;
  brideFatherDeceased?: boolean;
  brideMotherName?: string;
  brideMotherDeceased?: boolean;
  brideRankName?: string;
}

export interface InvitationMessageSectionType {
  title?: string;
  message?: string;
}

export interface CoupleIntroSectionType {
  title?: string;
  groomIntro?: string;
  brideIntro?: string;
}

export interface ParentsIntroSectionType {
  title?: string;
  message?: string;
}

export interface AccountInfoSectionType {
  title?: string;
  message?: string;

  groomBankName?: string;
  groomNumber?: string;
  groomHolder?: string;

  groomFatherBankName?: string;
  groomFatherNumber?: string;
  groomFatherHolder?: string;

  groomMotherBankName?: string;
  groomMotherNumber?: string;
  groomMotherHolder?: string;

  brideBankName?: string;
  brideNumber?: string;
  brideHolder?: string;

  brideFatherBankName?: string;
  brideFatherNumber?: string;
  brideFatherHolder?: string;

  brideMotherBankName?: string;
  brideMotherNumber?: string;
  brideMotherHolder?: string;
}

// Location Info Section
export interface LocationInfoSectionType {
  address?: string;
  addressDetail?: string;
  guideMessage?: string;

  transport1Title?: string;
  transport1Message?: string;

  transport2Title?: string;
  transport2Message?: string;

  transport3Title?: string | null;
  transport3Message?: string | null;
}

export interface ThemeFontSectionType {
  fontName?: string;
  fontSize?: number;
  backgroundColor?: string;
  accentColor?: string;
  zoomPreventYn?: boolean;
}

export interface LoadingScreenSectionType {
  design?: string;
}

export interface GallerySectionType {
  title?: string;
}

export interface FlipbookSectionType {
  b?: null;
}

export interface SectionSettingItem {
  sectionKey?: string;
  isVisible?: boolean;
  displayOrder?: number;
}
