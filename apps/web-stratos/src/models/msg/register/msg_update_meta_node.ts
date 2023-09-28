import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgUpdateMetaNode {
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
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgUpdateMetaNode {
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
    };
  }
}

export default MsgUpdateMetaNode;
