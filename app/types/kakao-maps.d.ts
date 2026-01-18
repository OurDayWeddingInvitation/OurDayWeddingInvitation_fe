declare global {
  interface KakaoMapLatLng {
    getLat(): number;
    getLng(): number;
  }

  interface KakaoMapOptions {
    center: KakaoMapLatLng;
    level?: number;
    draggable?: boolean;
    scrollwheel?: boolean;
  }

  interface KakaoMarkerOptions {
    position: KakaoMapLatLng;
    map?: unknown;
    title?: string;
  }

  interface KakaoMapInstance {
    setZoomable(arg0: boolean): unknown;
    setDraggable(arg0: boolean): unknown;
    setCenter: (latlng: KakaoMapLatLng) => void;
    setLevel: (level: number) => void;
  }

  interface KakaoMarkerInstance {
    setMap: (map: KakaoMapInstance | null) => void;
  }

  interface KakaoMapsStatic {
    load(initMap: () => void): unknown;
    Map: new (
      container: HTMLElement,
      options: KakaoMapOptions
    ) => KakaoMapInstance;
    Marker: new (options: KakaoMarkerOptions) => KakaoMarkerInstance;
    LatLng: new (lat: number, lng: number) => KakaoMapLatLng;
  }

  interface Window {
    kakao: {
      maps: KakaoMapsStatic;
    };
  }
}

export {};
