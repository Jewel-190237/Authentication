import { Router } from "express";
import { ContactRoutes } from "../modules/contact/contact.route";

const router = Router();


const moduleRouters = [
   {
      path: '/contact',
      route: ContactRoutes
   }
]

moduleRouters.forEach((route)=>{
   router.use(route.path, route.route)
})

export default router