import { Router } from "express";
import { OTPRoutes } from "../modules/otp/otp.route";
const router = Router();

const moduleRouters = [
   {
      path: '/otp',
      route: OTPRoutes
   },

]

moduleRouters.forEach((route) => {
   router.use(route.path, route.route)
})

export default router