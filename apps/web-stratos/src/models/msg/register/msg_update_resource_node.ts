import * as R from 'ramda';
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

  public beneficiaryAddress: string;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.description = R.pathOr(
      { moniker: '', identity: '', website: '', securityContact: '', details: '' },
      ['description'],
      payload
    );
    this.networkAddress = R.pathOr('', ['networkAddress'], payload);
    this.ownerAddress = R.pathOr('', ['ownerAddress'], payload);
    this.nodeType = R.pathOr(0, ['nodeType'], payload);
    this.beneficiaryAddress = R.pathOr('', ['beneficiaryAddress'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgUpdateResourceNode {
    return {
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      description: {
        moniker: R.pathOr('', ['description', 'moniker'], json),
        identity: R.pathOr('', ['description', 'identity'], json),
        website: R.pathOr('', ['description', 'website'], json),
        securityContact: R.pathOr('', ['description', 'security_contact'], json),
        details: R.pathOr('', ['description', 'details'], json),
      },
      networkAddress: R.pathOr('', ['network_address'], json),
      ownerAddress: R.pathOr('', ['owner_address'], json),
      nodeType: R.pathOr(0, ['node_type'], json),
      beneficiaryAddress: R.pathOr("",['beneficiary_address'],json),
    };
  }
}

export default MsgUpdateResourceNode;
