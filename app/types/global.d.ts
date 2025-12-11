interface DaumPostcodeAddress {
  zonecode: string;
  address: string;
  addressType: "R" | "J";
  bname: string;
  buildingName: string;
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeAddress) => void;
  onclose?: (state: { layer: boolean }) => void;
  width?: string;
  height?: string;
  animation?: boolean;
}

interface DaumPostcodeConstructor {
  new (options: DaumPostcodeOptions): {
    open: () => void;
    embed: (element: HTMLElement) => void;
    // 필요하면 다른 메서드 추가
  };
}

interface Daum {
  Postcode: DaumPostcodeConstructor;
}

interface Window {
  daum: Daum;
}
