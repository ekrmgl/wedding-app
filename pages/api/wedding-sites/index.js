// pages/api/wedding-sites/index.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/mongoose';
import WeddingSite from '../../../models/WeddingSite';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Oturum açmanız gerekiyor.' });
  }
  
  await dbConnect();
  
  // İstek tipine göre işlemler
  if (req.method === 'GET') {
    try {
      const userId = new mongoose.Types.ObjectId(session.user.id);
      const weddingSites = await WeddingSite.find({ userId });

      console.log(weddingSites);
      return res.status(200).json(weddingSites);
    } catch (error) {
      return res.status(500).json({ error: 'Düğün siteleri alınamadı.' });
    }
  } 
  
  else if (req.method === 'POST') {
    try {
      const { title, urlSlug } = req.body;
      const userId = new mongoose.Types.ObjectId(session.user.id);
      console.log(userId);
      // URL slug kontrolü
      const existingSlug = await WeddingSite.findOne({ urlSlug });
      if (existingSlug) {
        return res.status(400).json({ error: 'Bu URL zaten kullanılıyor.' });
      }
      
      // Yeni düğün sitesi oluşturma
      const newWeddingSite = await WeddingSite.create({
        userId,
        title,
        urlSlug,
        themeId: 'buxton', // Varsayılan tema
        themeColor: 'white', // Varsayılan renk
        isPublished: false,
        content: {
          welcomeMessage: 'Düğünümüze hoş geldiniz!',
          coupleNames: ['İsim 1', 'İsim 2'],
          weddingDate: new Date().toISOString().split('T')[0],
          heroLayout: 'slideshow',
          slideshowImages: [],
          galleryHeaderImage: '',
          galleryDescription: 'Fotoğraflarımız',
          galleryPhotos: [],
          galleryVideos: [],
          galleryVisible: true,
          showFeaturedGallery: true,
          schedule: [],
          scheduleHeaderImage: '',
          scheduleDescription: ''
        }
      });
      
      return res.status(201).json(newWeddingSite);
    } catch (error) {
      return res.status(500).json({ error: 'Düğün sitesi oluşturulamadı.' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}