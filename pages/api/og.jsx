import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'experimental-edge',
};
 
export default function (req) {
  const { searchParams } = req.nextUrl;
  const image = searchParams.get('images')
  console.log(image)

  if(!image) {
    return new ImageResponse(
      <img
        alt="background image that will be shared"
        src="https://cdn.pixabay.com/photo/2023/04/06/01/26/heart-7902540_960_720.jpg"
        style={{
          width:"100%",
          height:"100%",
          backgroundPosition:"center",
          backgroundSize: "cover",
        }}
      />
      ,{
      width:1200,
      height:630,
    });
  }
  
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