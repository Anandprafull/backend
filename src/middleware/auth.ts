import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // Implement JWT verification here
    const user = await User.findById(token);
    
    if (!user) {
      throw new Error();
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication required' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).user?.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};