import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { Member } from '../mysql';
import { CcrApiError } from '../errors';
import { logger } from '../logger';
import { generateJwt } from './utils';

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
      const newMember = await memberRepo.save(rawMember);
      log.debug(`member inserted, id: ${newMember.id}`);

      // TODO: issue refresh token
      return {
        refreshToken: '',
        accessToken: generateJwt(newMember)
      };

    } catch (err) {
      if (err.message.includes('Duplicate entry')) {
        throw new CcrApiError(`login id duplicated: ${loginId}`, 'LOGIN_ID_DUPLICATED');
      }
      throw err;
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