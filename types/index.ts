// types/index.ts
export interface ThemeDecorations {
  top: string;        // Üst süsleme görseli URL'si
  bottom: string;     // Alt süsleme görseli URL'si
  type: 'botanical' | 'geometric' | 'minimal' | 'classic'; // Süsleme tipi
}

export interface ThemeColor {
  id: string;
  value: string;
  name?: string; // Renk adı (isteğe bağlı)
}

export interface Theme {
  id: string;
  name: string;
  image: string;
  colorOptions: ThemeColor[];
  hasMultiPage: boolean;
  // Yeni eklenen alan
  fontFamily?: string; // Opsiyonel yaparak geriye dönük uyumluluğu koruyoruz
  decorations?: ThemeDecorations; // Opsiyonel yaparak geriye dönük uyumluluğu koruyoruz
}

export interface ThemeSelection {
  themeId: string;
  colorId: string;
}

// WebsiteContent tanımlaması da burada olabilir
export interface WebsiteContent {
  title: string;
  coupleNames: string[];
  headerImage: string;
  welcomeMessage: string;
  heroLayout: string;
  slideshowImages: string[];
  weddingDate: string;
  scheduleHeaderImage: string;
  scheduleDescription: string;
  schedule: Array<{
    type: string;
    name: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
    venueName: string;
    streetAddress?: string;
    aptFloor?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country: string;
    isPublic: boolean;
    allowRsvp: boolean;
  }>;
  // Diğer alanlar...
}

// HeroLayoutType enum'ı
export enum HeroLayoutType {
  NONE = "none",
  OVERLAPPING_SQUARES = "overlapping-squares",
  SIDE_BY_SIDE = "side-by-side",
  SLIDESHOW = "slideshow",
  MARQUEE = "marquee"
}