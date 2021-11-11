import { Router, Request, Response } from 'express';
import { uploadSingle } from '../middlewares/upload';

const router = Router();

router.post('/image', uploadSingle, (req: Request, res: Response) => {
  res.json({ file: req.file?.path });
});

export default router;
