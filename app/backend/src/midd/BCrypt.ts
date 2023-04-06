import * as bcrypt from 'bcryptjs';

export default class bCryptMid {
  private static saltRounds = 10;

  public static hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  public static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
