import { db } from '@/lib/db';
import { Mode } from '@prisma/client';
import { User } from 'next-auth';

export const getUserStats = async (user: User) => {
  const results = await db.userStats.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!results) {
    return {
      id: '',
      bench: 0,
      squat: 0,
      deadlift: 0,
      ohp: 0,
      mode: Mode.LBS,
      userId: user.id,
      updatedAt: new Date(),
    };
  }

  return results;
};
