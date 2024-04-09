import { ImageResponse } from '@vercel/og';
import Image from 'next/image'; // Import Image component from next/image

export const config = {
  runtime: 'experimental-edge',
};

// Give your function a name
export default function ImageHandler(req) {
  const { searchParams } = req.nextUrl;
  const image = searchParams.get('images');
  console.log(searchParams);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Use Image component instead of <img> */}
        <Image
          alt="background image that will be shared"
          src={image}
          layout="fill" // Maintain the aspect ratio and fill the container
          objectFit="cover" // Similar to backgroundSize: cover
          objectPosition="center" // Similar to backgroundPosition: center
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  ); 
}
