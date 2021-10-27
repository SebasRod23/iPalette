import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Palette from '../models/palette';

const hasAccess = (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.jwt.id;
  const paletteId = req.params.paletteId;

  Palette.findById(paletteId).then(
    (palette) => {
      if (!palette)
        return res.status(404).json({ message: 'Palette not found!' });
      if (palette.userId != userId)
        return res
          .status(403)
          .json({ message: 'You do not own this Palette!' });
      res.locals.palette = palette;
      next();
    },
    (error) => {
      return res.json(500).json({ message: error.message, error });
    },
  );
};

export default hasAccess;
