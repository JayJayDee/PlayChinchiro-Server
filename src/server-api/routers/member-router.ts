import { Router } from 'express';
import { IsDefined } from 'class-validator';

import { wrapAsync } from '../handlers';
import { validateObject } from '../utils';
import { memberService } from '../../services';

export const memberRouter = () => {
  const router = Router();
  router.post('/member', createMember());
  return router;
};

class CreateMemberParam {
  @IsDefined()
  public loginId: string;

  @IsDefined()
  public nick: string;

  @IsDefined()
  public password: string;
}
const createMember = () =>
  wrapAsync(async (req, res) => {
    const param = req.body;
    await validateObject(param, CreateMemberParam);

    const { loginId, password, nick } = param;
    const member = await memberService.createMember({
      loginId,
      password,
      nick
    });

    res.status(200).json({ member });
  });
