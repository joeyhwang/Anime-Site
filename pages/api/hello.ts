import handler from './handler';

export default handler.get(async (req, res) => {
  console.log(typeof req.query.url);
  const reqUrl = req.query.url as string;
  const resp = await fetch(
    reqUrl,
    {
      method: 'get',
      headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.CLIENT_ID }),
    },
  );
  const data = await resp.json();
  res.status(200).json({ data });
});
