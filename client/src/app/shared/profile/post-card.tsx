import Image from 'next/image';
import { PiImagesSquareBold, PiVideoCameraFill } from 'react-icons/pi';

type POST_TYPE = 'image' | 'gallery' | 'video';

type PostCard = {
  type: POST_TYPE;
  thumbnail: string | string[];
};

export default function PostCard({ type, thumbnail }: PostCard) {
  return (
    <div className="group group relative aspect-square h-full w-full cursor-pointer overflow-hidden bg-gray-100">
      <Image
        alt={'Post'}
        src={thumbnail as string}
        fill
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {type === 'video' && (
        <PiVideoCameraFill className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-gray-200 p-2 text-xl text-gray-1000" />
      )}

      {type === 'gallery' && (
        <PiImagesSquareBold className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-gray-200 p-2 text-xl text-gray-1000" />
      )}
    </div>
  );
}
