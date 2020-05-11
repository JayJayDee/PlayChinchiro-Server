import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CcrValidationError } from '../../errors';

export async function validateObject<T>(
    payload: {[key: string]: any},
    Clazz: new() => T
  ) {
    const tranformed = plainToClass(Clazz, payload);
    const errors = await validate(tranformed);
    if (errors.length > 0) {
      throw new CcrValidationError(errors[0].toString());
    }
  }
