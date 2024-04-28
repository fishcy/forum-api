import attentionDao from "../dao/attentionDao";
import { Attention } from "../models/attention";

export const createAttention = async (fansId: string, followeeId: string) => {
  return await attentionDao.createAttention(new Attention(fansId, followeeId));
};

export const findAllAttentionRecord = async (
  fansId: string,
  followeeId: string
) => {
  return await attentionDao.findAttention({
    fansId,
    followeeId,
  });
};

export const findAttentionRecord = async (
  fansId: string,
  followeeId: string
) => {
  return await attentionDao.findAttention({
    fansId,
    followeeId,
    isCancel: 0,
  });
};

export const countFansByFolloweeId = async (followeeId: string) => {
  return await attentionDao.countAttentionRecord({ followeeId, isCancel: 0 });
};

export const findFansByFolloweeId = async (followeeId: string) => {
  return await attentionDao.findAttention({ followeeId, isCancel: 0 });
};

export const countFolloweeByFansId = async (fansId: string) => {
  return await attentionDao.countAttentionRecord({ fansId, isCancel: 0 });
};

export const findFolloweeByFansId = async (fansId: string) => {
  return await attentionDao.findAttention({ fansId, isCancel: 0 });
};

export const cancelFollow = async (fansId: string, followeeId: string) => {
  return await attentionDao.updateAttention(
    {
      fansId,
      followeeId,
    },
    {
      $set: {
        isCancel: 1,
      },
    }
  );
};

export const follow = async (fansId: string, followeeId: string) => {
  return await attentionDao.updateAttention(
    {
      fansId,
      followeeId,
    },
    {
      $set: {
        isCancel: 0,
      },
    }
  );
};
