import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgUpdateResourceNodeDeposit {
  public category: Categories;

  public type: string;

  public networkAddress: string;

  public ownerAddress: string;

  public depositDelta: MsgCoin;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.networkAddress = R.pathOr('', ['networkAddress'], payload);
    this.ownerAddress = R.pathOr('', ['ownerAddress'], payload);
    this.depositDelta = R.pathOr({ denom: '', amount: '0' }, ['depositDelta'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgUpdateResourceNodeDeposit {
    return {
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      networkAddress: R.pathOr('', ['network_address'], json),
      ownerAddress: R.pathOr('', ['owner_address'], json),
      depositDelta: {
        denom: R.pathOr('', ['deposit_delta', 'denom'], json),
        amount: R.pathOr('0', ['deposit_delta', 'amount'], json),
      },
    };
  }
}

export default MsgUpdateResourceNodeDeposit;
