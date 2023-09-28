import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgRemoveResourceNode {
  public category: Categories;

  public type: string;

  public resourceNodeAddress: string;

  public ownerAddress: string;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.resourceNodeAddress = R.pathOr('', ['resourceNodeAddress'], payload);
    this.ownerAddress = R.pathOr('', ['ownerAddress'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgRemoveResourceNode {
    return {
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      resourceNodeAddress: R.pathOr('', ['resource_node_address'], json),
      ownerAddress: R.pathOr('', ['owner_address'], json),
    };
  }
}

export default MsgRemoveResourceNode;
