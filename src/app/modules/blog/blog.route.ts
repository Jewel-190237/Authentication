import { Router } from 'express';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import { USER_ROLE_ENUM } from '../../utils/constants';

const routes = Router();

routes.post(
    '/create',
    auth(...USER_ROLE_ENUM),
    validate(BlogValidation.createBlogValidationSchema),
    BlogController.createBlog,
);

routes.get('/get-all-blog', BlogController.getAllBlog);

routes.put(
    '/update-blog/:_id',
    auth(...USER_ROLE_ENUM),
    validate(BlogValidation.updateBlogValidationSchema),
    BlogController.updateBlog,
);

routes.delete(
    '/delete-blog/:_id',
    auth(...USER_ROLE_ENUM),
    BlogController.deleteBlog,
);

export const BlogRoutes = routes;
