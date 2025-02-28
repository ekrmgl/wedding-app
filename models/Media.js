// models/Media.js
import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  weddingSiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WeddingSite',
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: String,
  thumbnailUrl: String,
  order: Number
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);