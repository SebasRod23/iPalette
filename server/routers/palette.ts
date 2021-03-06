import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import hasAccess from '../middlewares/hasAccess';
import hasJWT from '../middlewares/hasJWT';
import Palette, { iPalette } from '../models/palette';

const router = Router();

router.get('/', hasJWT, async (req: Request, res: Response) => {
  await Palette.find({ userId: res.locals.jwt.id }).then(
    (palettes) => {
      return res.status(200).json(palettes);
    },
    (error) => {
      return res.status(500).json({ message: error.message, error });
    },
  );
});

router.post(
  '/add',
  hasJWT,
  body('name').isString(),
  body('colors').isArray(),
  body('colors.*').matches('^#[0-9a-f]{6}$'),
  body('description').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
    const { name, colors, description } = req.body;

    const palette = new Palette({
      userId: res.locals.jwt.id,
      name: name,
      colors: colors,
      description: description,
    });

    palette.save().then(
      () => {
        return res.status(201).json({ message: 'New Palette added!' });
      },
      (error) => {
        console.log(error);
        return res.status(500).json({ message: error.message, error });
      },
    );
  },
);

router.get(
  '/:paletteId',
  hasJWT,
  hasAccess,
  async (req: Request, res: Response) => {
    const palette = res.locals.palette;
    return res.status(200).json(palette);
  },
);

router.post(
  '/:paletteId/update',
  hasJWT,
  hasAccess,
  body('name').isString(),
  body('colors').isArray(),
  body('colors.*').matches('^#[0-9a-f]{6}$'),
  body('description').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }

    const { name, colors, description } = req.body;
    const palette: iPalette = res.locals.palette;

    palette
      .update({
        name: name,
        colors: colors,
        description: description,
      })
      .then(
        () => {
          return res
            .status(201)
            .json({ message: 'Palette successfully updated!' });
        },
        (error) => {
          console.log(error);
          return res.status(500).json({ message: error.message, error });
        },
      );
  },
);

router.post(
  '/:paletteId/delete',
  hasJWT,
  hasAccess,
  async (req: Request, res: Response) => {
    const palette: iPalette = res.locals.palette;

    palette.delete().then(() => {
      return res.status(201).json({ message: 'Palette successfully deleted!' });
    });
  },
);

export default router;
