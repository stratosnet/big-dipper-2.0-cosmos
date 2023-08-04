import * as R from 'ramda';
import { Categories } from '../types';

class MsgFoundationDeposit {
  public category: Categories;
  public type: string;
  public fromAddress: string;
  public amount: MsgCoin[];
  public json: any;

  constructor(payload: any) {
    this.category = 'pot';
    this.type = payload.type;
    this.fromAddress = payload.fromAddress;
    this.amount = payload.amount;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgFoundationDeposit({
      json,
      type: json['@type'],
      fromAddress: json.from,
      amount: json?.amount.map((x) => {
        return ({
          denom: x?.denom,
          amount: R.pathOr('0', ['amount'], x),
        });
      }),
    });
  }
}

export default MsgFoundationDeposit;
