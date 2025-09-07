import { HttpStatusCode } from "axios"
import AppError from "../../errors/AppError"
import { catchAsync } from "../../utils/catchAsync"
import { UserService } from "../user/user.service"
import { comparePassword, createToken } from "./auth.utils"
import { TTokenPayload } from "./auth.interface"
import config from "../../config"
import sendResponse from "../../utils/sendResponse"
import httpStatus from 'http-status';
import { TOTP } from "../otp/otp.interface"
import { OTPService } from "../otp/otp.service"
import dayjs from "dayjs"
import { AuthService } from "./auth.service"

export class AuhtController {
  static login = catchAsync(async (req, res) => {
    const { body } = req.body
    const user = await UserService.findUserByIdentifier(body.identifier)
    if (!user) {
      throw new AppError(
        HttpStatusCode.NotFound,
        'Request Failed',
        'User not found in this email, please register',
      );
    }

    if (user.is_deleted === true) {
      throw new AppError(
        HttpStatusCode.NotFound,
        'Request failed',
        'User not exists!');
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
      identifier: user.identifier,
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

  static forgetPasswordOTPVerify = catchAsync(async (req, res) => {
    const { body } = req.body;
    const { id } = req.params

    const query = {
      identifier: body.identifier,
      otp: body.otp
    }

    let code: TOTP | null;
    let user: any

    user = await UserService.findUserById(id)
    if (!user) {
      throw new AppError(
        400,
        'Request Failed',
        'Usser Not Found in this identifier',
      );
    }

    code = await OTPService.findOTPByIdentifier(query)
    if (!code) {
      throw new AppError(
        HttpStatusCode.BadRequest,
        'verification failed',
        'invalid or expire otp'
      )
    }

    const startTime = dayjs(code.createdAt)
    const endTime = dayjs(Date.now())

    const expireTimeInMinutes = endTime.diff(startTime, 'minutes')

    if (expireTimeInMinutes >= 2) {
      throw new AppError(
        400,
        'Invalid request',
        'OTP expired! Please try again.',
      );
    }

    if (code && code.attempts > 0 && code.otp === body.otp) {
      const tokenPayload: TTokenPayload = {
        _id: user._id,
        name: user.name,
        identifier: user.identifier,
      };

      const accessToken = createToken(
        tokenPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
      )

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "OTP Verified Successfully",
        data: accessToken
      })
    }
  })

  static setPasswordForForgetPassword = catchAsync(async (req, res) => {
    const { body } = req.body
    const { id } = req.params

    const user = await UserService.findUserById(id)
    if (!user) {
      throw new AppError(
        400,
        'Request Failed',
        'Usser Not Found in this identifier',
      );
    }

    await AuthService.forgetPassword(body, id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password updated Successfully',
      data: null,
    });

  })

  static resetPassword = catchAsync(async (req, res) => {
    const { body } = req.body;
    const { _id, password } = res.locals.user

    const isPasswordMatched = await comparePassword(body.old_password, password)
    
    if (!isPasswordMatched) {
      throw new AppError(
        HttpStatusCode.BadRequest,
        'Request Failed',
        'Password not matched! Please try again.',
      );
    }

    const user = await UserService.findUserById(_id)
    if (!user) {
      throw new AppError(
        400,
        'Request Failed',
        'Usser Not Found in this identifier',
      );
    }

    await AuthService.forgetPassword(body, _id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password updated Successfully',
      data: null,
    });
  })
}