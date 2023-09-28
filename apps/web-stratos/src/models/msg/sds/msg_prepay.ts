import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgPrepay {
  public category: Categories;

  public type: string;

  public sender: string;

  public beneficiary: string;

  public amount: MsgCoin[];

  public json: object;

  constructor(payload: object) {
    this.category = 'sds';
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload);
    this.beneficiary = R.pathOr('', ['beneficiary'], payload);
    this.amount = R.pathOr<MsgPrepay['amount']>([], ['amount'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgPrepay {
    return {
      category: 'sds',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      beneficiary: R.pathOr('', ['beneficiary'], json),
      amount: R.pathOr<MsgPrepay['amount']>([], ['amount'], json).map((x) => ({
        denom: x?.denom ?? '',
        amount: x?.amount ?? '0',
      })),
    };
  }
}

export default MsgPrepay;
