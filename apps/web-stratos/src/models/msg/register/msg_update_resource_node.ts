import type { Categories } from '@/models/msg/types';

class MsgUpdateResourceNode {
  public category: Categories;
  public type: string;
  public description: {
    moniker: string;
    identity: string;
    website: string;
    securityContact: string;
    details: string;
  };
  public networkAddress: string;
  public ownerAddress: string;
  public nodeType: number;
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.description = payload.description;
    this.networkAddress = payload.networkAddress;
    this.ownerAddress = payload.ownerAddress;
    this.nodeType = payload.nodeType;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgUpdateResourceNode({
      json,
      type: json['@type'],
      description: {
        moniker: json?.description?.moniker,
        identity: json?.description?.identity,
        website: json?.description?.website,
        securityContact: json?.description?.security_contact,
        details: json?.description?.details,
      },
      networkAddress: json?.network_address,
      ownerAddress: json?.owner_address,
      nodeType: json?.node_type,
    });
  }
}

export default MsgUpdateResourceNode;
