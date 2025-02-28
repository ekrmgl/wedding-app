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
// HeroLayoutType enum'ı
export enum HeroLayoutType {
  NONE = "none",
  OVERLAPPING_SQUARES = "overlapping-squares",
  SIDE_BY_SIDE = "side-by-side",
  SLIDESHOW = "slideshow",
  MARQUEE = "marquee"
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  emailVerified?: Date;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  description: string;
}

export interface GalleryVideo {
  id: string;
  url: string;
  caption: string;
  provider: 'youtube' | 'vimeo';
}

export interface ScheduleEvent {
  id: string;
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
}

export interface WebsiteContent {
  welcomeMessage: string;
  coupleNames: string[];
  weddingDate: string;
  heroLayout: string;
  slideshowImages: string[];
  galleryHeaderImage: string;
  galleryDescription: string;
  galleryPhotos: GalleryPhoto[];
  galleryVideos: GalleryVideo[];
  galleryVisible: boolean;
  showFeaturedGallery: boolean;
  schedule: ScheduleEvent[];
  scheduleHeaderImage: string;
  scheduleDescription: string;
}

export interface WeddingSite {
  _id: string;
  userId: string;
  title: string;
  urlSlug: string;
  themeId: string;
  themeColor: string;
  isPublished: boolean;
  content: WebsiteContent;
  createdAt: string;
  updatedAt: string;
}