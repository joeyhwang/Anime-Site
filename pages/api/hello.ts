import handler from './handler';

export default handler.get(async (req, res) => {
  const reqUrl = req.query.url as string;
  if (process.env.CLIENT_ID) {
    const resp = await fetch(
      reqUrl,
      {
        method: 'get',
        headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.CLIENT_ID }),
      },
    );
    const data = await resp.json();
    res.status(200).json({ data });
  }
});
