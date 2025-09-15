import { Router } from "express";
import { OTPRoutes } from "../modules/otp/otp.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ProductRoutes } from "../modules/product/product.route";
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
   {
      path: '/auth',
      route: AuthRoutes
   },
   {
      path: '/blog',
      route: BlogRoutes
   },
   {
      path: '/product',
      route: ProductRoutes
   },

]

moduleRouters.forEach((route) => {
   router.use(route.path, route.route)
})

export default router