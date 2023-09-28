import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgRemoveMetaNode {
  public category: Categories;

  public type: string;

  public metaNodeAddress: string;

  public ownerAddress: string;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.metaNodeAddress = R.pathOr('', ['metaNodeAddress'], payload);
    this.ownerAddress = R.pathOr('', ['ownerAddress'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgRemoveMetaNode {
    return {
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      metaNodeAddress: R.pathOr('', ['meta_node_address'], json),
      ownerAddress: R.pathOr('', ['owner_address'], json),
    };
  }
}

export default MsgRemoveMetaNode;
