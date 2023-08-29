import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgCreateMetaNode {
  public category: Categories;
  public type: string;
  public networkAddress: string;
  public pubKey: {
    type: string;
    key: string;
  };
  public value: MsgCoin;
  public ownerAddress: string;
  public description: {
    moniker: string;
    identity: string;
    website: string;
    securityContact: string;
    details: string;
  };
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.networkAddress = payload.networkAddress;
    this.pubKey = payload.pubKey;
    this.value = payload.value;
    this.ownerAddress = payload.ownerAddress;
    this.description = payload.description;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgCreateMetaNode({
      json,
      type: json['@type'],
      networkAddress: json?.network_address,
      pubKey: {
        type: json?.pubkey?.['@type'],
        key: json?.pubkey?.key,
      },
      value: {
        denom: json?.value?.denom,
        amount: R.pathOr('0', ['value', 'amount'], json),
      },
      ownerAddress: json?.owner_address,
      description: {
        moniker: json?.description?.moniker,
        identity: json?.description?.identity,
        website: json?.description?.website,
        securityContact: json?.description?.security_contact,
        details: json?.description?.details,
      },
    });
  }
}

export default MsgCreateMetaNode;
