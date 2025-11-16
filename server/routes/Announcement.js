import express from 'express';
import { createAnnouncement, getAnnouncements,getAnnouncementById ,getTodayAnnouncements,updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import authMiddleware from '../middleware/authMiddlware.js';

const AnnouncementRouter = express.Router();
// route for  announcements static
AnnouncementRouter.get('/today',authMiddleware,getTodayAnnouncements);
AnnouncementRouter.get('/', authMiddleware, getAnnouncements);
AnnouncementRouter.post('/', authMiddleware, createAnnouncement);


// route for  announcements dynamic
AnnouncementRouter.get('/:id', authMiddleware,getAnnouncementById)
AnnouncementRouter.put('/:id', authMiddleware, updateAnnouncement);
AnnouncementRouter.delete('/:id', authMiddleware, deleteAnnouncement);





export default AnnouncementRouter;