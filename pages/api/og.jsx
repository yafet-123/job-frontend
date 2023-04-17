import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'experimental-edge',
};
 
export default function (req) {
  const { searchParams } = new URL(req.url)
  const image = searchParams.get('images')
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          alt="background image that will be shared"
          src={image}
          className = "w-full h-full bg-cover"
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}