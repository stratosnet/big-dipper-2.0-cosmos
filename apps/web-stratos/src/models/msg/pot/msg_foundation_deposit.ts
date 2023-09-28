import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgFoundationDeposit {
  public category: Categories;

  public type: string;

  public fromAddress: string;

  public amount: MsgCoin[];

  public json: object;

  constructor(payload: object) {
    this.category = 'pot';
    this.type = R.pathOr('', ['type'], payload);
    this.fromAddress = R.pathOr('', ['fromAddress'], payload);
    this.amount = R.pathOr<MsgFoundationDeposit['amount']>([], ['amount'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgFoundationDeposit {
    return {
      category: 'pot',
      json,
      type: R.pathOr('', ['@type'], json),
      fromAddress: R.pathOr('', ['from'], json),
      amount: R.pathOr<MsgFoundationDeposit['amount']>([], ['amount'], json).map((x) => ({
        denom: x?.denom ?? '',
        amount: x?.amount ?? '0',
      })),
    };
  }
}

export default MsgFoundationDeposit;
