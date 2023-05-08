export default async function handler(req, res) {
  const { data } = req.query;
  const imageUrl = `https://job-frontend-main.vercel.app/api/og?images=${image}`
  res.status(200).send(imageUrl);
}