import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

import UserService from '../services/users.service';
class AuthController {
  public authService = new AuthService();
  public userService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { ...findUser, password: null }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public googleAuthSuccess = async (req: Request, res: Response, next: NextFunction) => {
    const userData: any = req.body;
    try {
      const userObj = await this.userService.findUserByIdAndSub(userData.nid, userData.sid);
      const { cookie, findUser } = await this.authService.login(userObj, true);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { ...findUser, password: null }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userData: User = req.user;

    try {
      await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
