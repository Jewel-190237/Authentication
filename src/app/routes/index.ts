import { Router } from "express";
import { OTPRoutes } from "../modules/otp/otp.route";
import { UserRoutes } from "../modules/user/user.route";
const router = Router();

const moduleRouters = [
   {
      path: '/otp',
      route: OTPRoutes
   },
   {
      path: '/user',
      route: UserRoutes
   },

]

moduleRouters.forEach((route) => {
   router.use(route.path, route.route)
})

export default router