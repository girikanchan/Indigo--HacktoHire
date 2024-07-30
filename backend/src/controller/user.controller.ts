import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/user';
import config from '../../config'
import CustomError from '../utils/customError';

const JWT_SECRET = config.SECRET_KEY;

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, avatar, contactNo, userType } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      avatar,
      contactNo,
      userType,
      status: true,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateUser = async (req: Request, res: Response, next:NextFunction) => {
  const { userId } = req.params;
  const { name, email, avatar, contactNo, userType, status } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    user.contactNo = contactNo || user.contactNo;
    user.userType = userType || user.userType;
    user.status = status !== undefined ? status : user.status;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user: user.toJSON() });
  } catch (error) {
    next(error)
  }
};

export const findUserEmail = async (userId: string, next: NextFunction) => {
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      return user.email;
    }
  } catch (error) {
    next(error);
  }
};