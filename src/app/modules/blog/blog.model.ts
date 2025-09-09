import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Blog slug is required"],
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Blog author is required"],
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);
blogSchema.plugin(aggregatePaginate)
export const Blog = model<TBlog>("Blog", blogSchema);
