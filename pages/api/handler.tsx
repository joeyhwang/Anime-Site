import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export default nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});
