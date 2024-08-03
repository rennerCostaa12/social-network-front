export interface EmoticonsProps {
  id: number;
  image: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
  categories_emoji: {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
  };
}

export interface TakePhotoEmoticonProps {
  data: EmoticonsProps[];
}
