import { Router } from "express";
import { ContactRoutes } from "../modules/contact/contact.route";
import { OTPRoutes } from "../modules/otp/otp.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();


const moduleRouters = [
   {
      path: '/contact',
      route: ContactRoutes
   },
   {
      path: '/otp',
      route: OTPRoutes
   },
   {
      path: '/user',
      route: UserRoutes
   },
   {
      path: '/auth',
      route: AuthRoutes
   }
]

moduleRouters.forEach((route) => {
   router.use(route.path, route.route)
})

export default router