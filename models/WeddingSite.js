// models/WeddingSite.js
import mongoose from 'mongoose';

const GalleryPhotoSchema = new mongoose.Schema({
  id: String,
  url: String,
  description: String
});

const GalleryVideoSchema = new mongoose.Schema({
  id: String,
  url: String,
  caption: String,
  provider: {
    type: String,
    enum: ['youtube', 'vimeo'],
    default: 'youtube'
  }
});

const ScheduleEventSchema = new mongoose.Schema({
  id: String,
  type: String,
  name: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  venueName: String,
  streetAddress: String,
  aptFloor: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  isPublic: {
    type: Boolean,
    default: true
  },
  allowRsvp: {
    type: Boolean,
    default: true
  }
});

const ContentSchema = new mongoose.Schema({
  welcomeMessage: String,
  coupleNames: [String],
  weddingDate: String,
  heroLayout: String,
  slideshowImages: [String],
  galleryHeaderImage: String,
  galleryDescription: String,
  galleryPhotos: [GalleryPhotoSchema],
  galleryVideos: [GalleryVideoSchema],
  galleryVisible: {
    type: Boolean,
    default: true
  },
  showFeaturedGallery: {
    type: Boolean,
    default: true
  },
  schedule: [ScheduleEventSchema],
  scheduleHeaderImage: String,
  scheduleDescription: String
});

const WeddingSiteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  urlSlug: {
    type: String,
    required: true,
    unique: true
  },
  themeId: String,
  themeColor: String,
  isPublished: {
    type: Boolean,
    default: false
  },
  content: ContentSchema
}, { timestamps: true });

export default mongoose.models.WeddingSite || mongoose.model('WeddingSite', WeddingSiteSchema);