import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email;

  if (email) {
    const admin = await prisma.admin.findUnique({
      where: { email: email as string },
    });
    res.json({ isAdmin: !!admin });
  } else {
    res.status(400).send('Email is required');
  }
}
