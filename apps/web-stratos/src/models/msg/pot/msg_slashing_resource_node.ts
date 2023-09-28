import * as R from 'ramda';
import numeral from 'numeral';
import type { Categories } from '@/models/msg/types';

class MsgSlashingResourceNode {
  public category: Categories;

  public type: string;

  public reporters: string[];

  public reporterOwner: string[];

  public networkAddress: string;

  public walletAddress: string;

  public slashing: string | number;

  public suspend: boolean;

  public json: object;

  constructor(payload: object) {
    this.category = 'pot';
    this.type = R.pathOr('', ['type'], payload);
    this.reporters = R.pathOr<MsgSlashingResourceNode['reporters']>([], ['reporters'], payload);
    this.reporterOwner = R.pathOr<MsgSlashingResourceNode['reporterOwner']>(
      [],
      ['reporterOwner'],
      payload
    );
    this.networkAddress = R.pathOr('', ['networkAddress'], payload);
    this.walletAddress = R.pathOr('', ['walletAddress'], payload);
    this.slashing = R.pathOr('', ['slashing'], payload);
    this.suspend = R.pathOr(false, ['suspend'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgSlashingResourceNode {
    return {
      category: 'pot',
      json,
      type: R.pathOr('', ['@type'], json),
      reporters: R.pathOr<MsgSlashingResourceNode['reporters']>([], ['reporters'], json),
      reporterOwner: R.pathOr<MsgSlashingResourceNode['reporterOwner']>(
        [],
        ['reporter_owner'],
        json
      ),
      networkAddress: R.pathOr('', ['network_address'], json),
      walletAddress: R.pathOr('', ['wallet_address'], json),
      slashing: numeral(R.pathOr('0', ['slashing'], json)).value() ?? '0',
      suspend: R.pathOr(false, ['suspend'], json),
    };
  }
}

export default MsgSlashingResourceNode;
