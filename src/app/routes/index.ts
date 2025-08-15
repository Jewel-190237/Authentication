import { Router } from "express";
import { ContactRoutes } from "../modules/contact/contact.route";
import { OTPRoutes } from "../modules/otp/otp.route";

const router = Router();


const moduleRouters = [
   {
      path: '/contact',
      route: ContactRoutes
   },
   {
      path: '/otp',
      route: OTPRoutes
   }
]

moduleRouters.forEach((route)=>{
   router.use(route.path, route.route)
})

export default router