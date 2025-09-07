import { z } from "zod";

export const createBlogValidationSchema = z.object({
   body: z.object({
      title: z.string({
         required_error: "Blog title is required",
         invalid_type_error: "Blog title must be a string",
      }).min(3, { message: "Title must be at least 3 characters long" }),

      slug: z.string({
         required_error: "Slug is required",
         invalid_type_error: "Slug must be a string",
      }),

      content: z.string({
         required_error: "Blog content is required",
         invalid_type_error: "Content must be a string",
      }).min(10, { message: "Content must be at least 10 characters long" }),

      author: z.string({
         required_error: "Author ID is required",
         invalid_type_error: "Author ID must be a string",
      }),

      image: z.string().url("Image must be a valid URL").optional(),

      tags: z.array(z.string()).optional(),

      category: z.string().optional(),

      isPublished: z.boolean().optional(),
   }),
});

export const BlogValidation = {
   createBlogValidationSchema,
};
