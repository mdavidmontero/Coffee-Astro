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
  slug: z.string(),
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

const gallerySchema = z.object({
  large: imageSchema,
  full: imageSchema,
});

export const GalleryPageSchema = BaseWPSchema.extend({
  gallery: z.array(gallerySchema),
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

const MenuItemSchema = BaseWPSchema.pick({
  title: true,
  featured_images: true,
}).extend({
  acf: z.object({
    description: z.string(),
    price: z.coerce.number(),
  }),
});

export const MenuItemsSchema = z.array(MenuItemSchema);

const MarkerSchema = z.object({
  label: z.string(),
  lat: z.number(),
  lng: z.number(),
});

const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number(),
  markers: z.array(MarkerSchema),
});

export const ContactPageSchema = BaseWPSchema.extend({
  acf: z
    .object({
      subtitle: z.string(),
    })
    .catchall(LocationSchema),
});

export type Post = z.infer<typeof PostSchema>;
export type Gallery = z.infer<typeof gallerySchema>;
export type FeaturedImages = z.infer<typeof featuredImageSchema>;
export type Location = z.infer<typeof LocationSchema>;
