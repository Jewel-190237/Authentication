import { Router } from "express";
import auth from "../../middleware/auth";
import validate from "../../middleware/validate";
import { BlogValidation } from "./blog.validation";
import { BlogController } from "./blog.controller";
import { USER_ROLE_ENUM } from "../../utils/constants";

const routes = Router()

routes.post(
    '/create',
    auth(...USER_ROLE_ENUM),
    validate(BlogValidation.createBlogValidationSchema),
    BlogController.createBlog
)

routes.get(
    '/get-all-blog',
    BlogController.getAllBlog
)

export const BlogRoutes = routes