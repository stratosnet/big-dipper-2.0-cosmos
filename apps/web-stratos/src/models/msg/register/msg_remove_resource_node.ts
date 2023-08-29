import type { Categories } from '@/models/msg/types';

class MsgRemoveResourceNode {
  public category: Categories;
  public type: string;
  public resourceNodeAddress: string;
  public ownerAddress: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.resourceNodeAddress = payload.resourceNodeAddress;
    this.ownerAddress = payload.ownerAddress;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgRemoveResourceNode({
      json,
      type: json['@type'],
      resourceNodeAddress: json?.resource_node_address,
      ownerAddress: json?.owner_address,
    });
  }
}

export default MsgRemoveResourceNode;
