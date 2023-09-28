import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgCreateResourceNode {
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

  public nodeType: number;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.networkAddress = R.pathOr('', ['networkAddress'], payload);
    this.pubKey = R.pathOr({ type: '', key: '' }, ['pubKey'], payload);
    this.value = R.pathOr({ denom: '', amount: '0' }, ['value'], payload);
    this.ownerAddress = R.pathOr('', ['ownerAddress'], payload);
    this.description = R.pathOr(
      { moniker: '', identity: '', website: '', securityContact: '', details: '' },
      ['description'],
      payload
    );
    this.nodeType = R.pathOr(0, ['nodeType'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object) {
    return new MsgCreateResourceNode({
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      networkAddress: R.pathOr('', ['network_address'], json),
      pubKey: {
        type: R.pathOr('', ['pubkey', '@type'], json),
        key: R.pathOr('', ['pubkey', 'key'], json),
      },
      value: {
        denom: R.pathOr('', ['value', 'denom'], json),
        amount: R.pathOr('0', ['value', 'amount'], json),
      },
      ownerAddress: R.pathOr('', ['owner_address'], json),
      description: {
        moniker: R.pathOr('', ['description', 'moniker'], json),
        identity: R.pathOr('', ['description', 'identity'], json),
        website: R.pathOr('', ['description', 'website'], json),
        securityContact: R.pathOr('', ['description', 'security_contact'], json),
        details: R.pathOr('', ['description', 'details'], json),
      },
      nodeType: R.pathOr(0, ['node_type'], json),
    });
  }
}

export default MsgCreateResourceNode;
