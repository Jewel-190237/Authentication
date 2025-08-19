import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync"
import { UserService } from "../user/user.service";
import { comparePassword, createToken } from "./auth.utils";
import { TTokenPayload } from "./auth.interface";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
export class AuthController {
   static loginAccess = catchAsync(async (req, res) => {
      const { body } = req.body;

      const user = await UserService.findUserByEmail(body.email)
      if (!user) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'User not found in this email, please register',
         );
      }

      if (user.is_deleted === true) {
         throw new AppError(404, 'Request failed', 'User not exists!');
      }

      const passwordMatch = await comparePassword(body.password, user.password)
      if (!passwordMatch) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'Password not matched, please input original password',
         );
      }

      const tokenPayload: TTokenPayload = {
         _id: user._id,
         name: user.name,
         email: user.email,
         phone: user.phone,
      };

      const accessToken = createToken(
         tokenPayload,
         config.jwt_access_secret as string,
         config.jwt_access_expires_in as string,
      )
      const refreshToken = createToken(
         tokenPayload,
         config.jwt_refresh_secret as string,
         config.jwt_refresh_expires_in as string,
      );

      sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'User logged in successfully',
         data: {
            user: {
               _id: user?._id,
               name: user?.name,
               email: user?.email,
               phone: user?.phone,
               role: user?.role,
            },
            accessToken,
            refreshToken,
         },
      });
   })
}