import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgUpdateResourceNodeDeposit {
  public category: Categories;
  public type: string;
  public networkAddress: string;
  public ownerAddress: string;
  public depositDelta: MsgCoin;
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.networkAddress = payload.networkAddress;
    this.ownerAddress = payload.ownerAddress;
    this.depositDelta = payload.depositDelta;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgUpdateResourceNodeDeposit({
      json,
      type: json['@type'],
      networkAddress: json?.network_address,
      ownerAddress: json?.owner_address,
      depositDelta: {
        denom: json?.deposit_delta?.denom,
        amount: R.pathOr('0', ['deposit_delta', 'amount'], json),
      },
    });
  }
}

export default MsgUpdateResourceNodeDeposit;
