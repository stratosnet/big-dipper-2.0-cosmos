import * as R from 'ramda';
import { Categories } from '../types';

class MsgWithdraw {
  public category: Categories;
  public type: string;
  public amount: MsgCoin[];
  public walletAddress: string;
  public targetAddress: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'pot';
    this.type = payload.type;
    this.amount = payload.amount;
    this.walletAddress = payload.walletAddress;
    this.targetAddress = payload.targetAddress;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgWithdraw({
      json,
      type: json['@type'],
      amount: json?.amount.map((x) => {
        return ({
          denom: x?.denom,
          amount: R.pathOr('0', ['amount'], x),
        });
      }),
      walletAddress: json.wallet_address,
      targetAddress: json.target_address,
    });
  }
}

export default MsgWithdraw;
