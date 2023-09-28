import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgWithdraw {
  public category: Categories;

  public type: string;

  public amount: MsgCoin[];

  public walletAddress: string;

  public targetAddress: string;

  public json: object;

  constructor(payload: object) {
    this.category = 'pot';
    this.type = R.pathOr('', ['type'], payload);
    this.amount = R.pathOr<MsgWithdraw['amount']>([], ['amount'], payload);
    this.walletAddress = R.pathOr('', ['walletAddress'], payload);
    this.targetAddress = R.pathOr('', ['targetAddress'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgWithdraw {
    return {
      category: 'pot',
      json,
      type: R.pathOr('', ['@type'], json),
      amount: R.pathOr<MsgWithdraw['amount']>([], ['amount'], json).map((x) => ({
        denom: x?.denom ?? '',
        amount: x?.amount ?? '0',
      })),
      walletAddress: R.pathOr('', ['wallet_address'], json),
      targetAddress: R.pathOr('', ['target_address'], json),
    };
  }
}

export default MsgWithdraw;
