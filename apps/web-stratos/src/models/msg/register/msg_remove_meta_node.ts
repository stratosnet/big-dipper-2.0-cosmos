import type { Categories } from '@/models/msg/types';

class MsgRemoveMetaNode {
  public category: Categories;
  public type: string;
  public metaNodeAddress: string;
  public ownerAddress: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.metaNodeAddress = payload.metaNodeAddress;
    this.ownerAddress = payload.ownerAddress;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgRemoveMetaNode({
      json,
      type: json['@type'],
      metaNodeAddress: json?.meta_node_address,
      ownerAddress: json?.owner_address,
    });
  }
}

export default MsgRemoveMetaNode;
