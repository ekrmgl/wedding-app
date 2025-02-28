// pages/api/media/index.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/mongoose';
import WeddingSite from '../../../models/WeddingSite';
import Media from '../../../models/Media';
import mongoose from 'mongoose';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Oturum açmanız gerekiyor.' });
  }
  
  await dbConnect();
  
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
    });
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Dosya yüklenirken hata oluştu.' });
      }
      
      const { weddingSiteId, type, description, order } = fields;
      
      // Site kontrolü
      const site = await WeddingSite.findById(weddingSiteId);
      if (!site || site.userId.toString() !== session.user.id) {
        return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
      }
      
      const file = files.file;
      if (!file) {
        return res.status(400).json({ error: 'Dosya bulunamadı.' });
      }
      
      const fileUrl = `/uploads/${path.basename(file.filepath)}`;
      
      const media = await Media.create({
        weddingSiteId,
        type: type || 'image',
        url: fileUrl,
        description: description || '',
        order: order || 0,
      });
      
      return res.status(201).json(media);
    });
  } 
  
  else if (req.method === 'GET') {
    try {
      const { weddingSiteId } = req.query;
      
      const site = await WeddingSite.findById(weddingSiteId);
      if (!site || site.userId.toString() !== session.user.id) {
        return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
      }
      
      const media = await Media.find({ weddingSiteId }).sort({ order: 1 });
      return res.status(200).json(media);
    } catch (error) {
      return res.status(500).json({ error: 'Medya dosyaları alınamadı.' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}