import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'experimental-edge',
};
 
export default function (req) {
  const { searchParams } = new URL(req.url)
  const image = searchParams.get('images')
  console.log("image")
  return new ImageResponse(
    (
      <div
        style={{
          fontSize:128,
          background:'white',
          width:'100%',
          height:'100%',
          display:'flex',
          textAlign:'center',
          alignItems:'center',
          justifyContent:'center',
        }}
      >
        <img
          alt="background image that will be shared"
          src={image}
          style={{
            width:"100%",
            height:"100%",
            backgroundPosition:"center",
            backgroundSize: "cover",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}