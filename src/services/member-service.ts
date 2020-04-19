import { getRepository } from 'typeorm';

import { Member } from '../mysql';
import { CcrApiError } from '../errors';
import { logger } from '../logger';

const log = logger({ tag: 'member-service' });

type CreateMemberParam = {
  loginId: string;
  password: string;
  nick: string;
};
export const createMember =
  async ({ loginId, password, nick }: CreateMemberParam) => {
    const memberRepo = getRepository(Member);

    // 1. insert member record into DB.
    const regDate = new Date();
    const rawMember = memberRepo.create({
      loginId, password, nick, regDate
    });

    try {
      const { id } = await memberRepo.save(rawMember);
      log.debug(`member inserted, id: ${id}`);

    } catch (err) {
      if (err.message.includes('duplica')) {
        throw new CcrApiError('LOGIN_ID_DUPLICATED');
      }
    }

    // TODO: issue refresh token & access token
    return {
      refreshToken: '',
      accessToken: ''
    }
  };

export const getMember =
  async ({ memberId }: { memberId: number }) => {
    const memberRepo = getRepository(Member);
    const member = await memberRepo.findOne({
      where: {
        id: memberId
      },
      relations: [ 'joinedRoom' ]
    });
    return member;
  };