import { z } from "astro:content";

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const featuredImageSchema = z.object({
  thumbnail: imageSchema,
  medium: imageSchema,
  medium_large: imageSchema,
  large: imageSchema,
  full: imageSchema,
});

export const BaseWPSchema = z.object({
  id: z.number(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }),
  featured_images: featuredImageSchema,
  acf: z.object({
    subtitle: z.string(),
  }),
});

const proccessSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

export const ProcessSchema = BaseWPSchema.extend({
  acf: z
    .object({
      subtitle: z.string(),
    })
    .catchall(proccessSchema),
});

const CategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

const CategoriesSchema = z.array(CategorySchema);

export const PostSchema = BaseWPSchema.omit({
  acf: true,
}).extend({
  date: z.string(),
  category_details: CategoriesSchema,
});

export const PostsShema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
