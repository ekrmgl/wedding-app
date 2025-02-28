// pages/api/wedding-sites/[id].js
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
  
  const { id } = req.query;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Geçersiz site ID' });
  }
  
  await dbConnect();
  
  // Düğün sitesini bul
  const weddingSite = await WeddingSite.findById(id);
  
  if (!weddingSite) {
    return res.status(404).json({ error: 'Düğün sitesi bulunamadı.' });
  }
  
  // Kullanıcının kendi sitesine erişip erişemeyeceğini kontrol et
  if (weddingSite.userId.toString() !== session.user.id) {
    return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
  }
  
  // İstek tipine göre işlem
  if (req.method === 'GET') {
    return res.status(200).json(weddingSite);
  } 
  
  else if (req.method === 'PUT') {
    try {
      const { title, themeId, themeColor, isPublished, content } = req.body;
      
      // Güncelleme için hazırlık
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (themeId !== undefined) updates.themeId = themeId;
      if (themeColor !== undefined) updates.themeColor = themeColor;
      if (isPublished !== undefined) updates.isPublished = isPublished;
      if (content !== undefined) updates.content = content;
      
      // Düğün sitesini güncelle
      const updatedWeddingSite = await WeddingSite.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      );
      
      return res.status(200).json(updatedWeddingSite);
    } catch (error) {
      return res.status(500).json({ error: 'Düğün sitesi güncellenemedi.' });
    }
  } 
  
  else if (req.method === 'DELETE') {
    try {
      await WeddingSite.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Düğün sitesi silindi.' });
    } catch (error) {
      return res.status(500).json({ error: 'Düğün sitesi silinemedi.' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}