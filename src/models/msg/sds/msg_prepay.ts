import * as R from 'ramda';
import { Categories } from '../types';

class MsgPrepay {
  public category: Categories;
  public type: string;
  public sender: string;
  public beneficiary: string;
  public amount: MsgCoin[];
  public json: any;

  constructor(payload: any) {
    this.category = 'sds';
    this.type = payload.type;
    this.sender = payload.sender;
    this.beneficiary = payload.beneficiary;
    this.amount = payload.amount;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgPrepay({
      json,
      type: json['@type'],
      sender : json?.sender,
      beneficiary: json?.beneficiary,
      amount: json?.amount.map((x) => {
        return ({
          denom: x?.denom,
          amount: R.pathOr('0', ['amount'], x),
        });
      }),
    });
  }
}

export default MsgPrepay;
