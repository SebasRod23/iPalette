import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import User from '../models/user';

const router = Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('username').isString(),
  body('password').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      console.log(validationResult(req));
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
    const { email, username, password } = req.body;

    bcrypt.hash(password, 16, (error, hash) => {
      if (error) return res.status(500).json({ message: error.message, error });

      const user = new User({
        email,
        username,
        password: hash,
      });
      user.save().then(
        () => {
          return res.status(201).json({ message: 'User created' });
        },
        (error) => console.log(error),
      );
    });
  },
);

export default router;
