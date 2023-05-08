export default async function handler(req, res) {
  const {image}= req.query;
  const imageUrl = `https://job-frontend-main.vercel.app/api/og?image=${image}`
  res.status(200).send(imageUrl);
}