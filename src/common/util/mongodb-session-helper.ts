import { ClientSession, startSession } from 'mongoose';

export const withSession = async <T>(callback: (session: ClientSession) => Promise<T>) => {
  const session = await startSession();
  let data: T;
  try {
    await session.withTransaction(async () => {
      data = await callback(session);
    });
    session.endSession();
    return data;
  } catch (error) {
    session.endSession();
    throw error;
  }
};
