import * as R from 'ramda';
import numeral from 'numeral';
import type { Categories } from '@/models/msg/types';

class MsgUpdateEffectiveDeposit {
  public category: Categories;

  public type: string;

  public reporters: string[];

  public reporterOwner: string[];

  public networkAddress: string;

  public effectiveTokens: string | number;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.reporters = R.pathOr<MsgUpdateEffectiveDeposit['reporters']>([], ['reporters'], payload);
    this.reporterOwner = R.pathOr<MsgUpdateEffectiveDeposit['reporterOwner']>(
      [],
      ['reporterOwner'],
      payload
    );
    this.networkAddress = R.pathOr('', ['networkAddress'], payload);
    this.effectiveTokens = R.pathOr('', ['effectiveTokens'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgUpdateEffectiveDeposit {
    return {
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      reporters: R.pathOr<MsgUpdateEffectiveDeposit['reporters']>([], ['reporters'], json),
      reporterOwner: R.pathOr<MsgUpdateEffectiveDeposit['reporterOwner']>(
        [],
        ['reporter_owner'],
        json
      ),
      networkAddress: R.pathOr('', ['network_address'], json),
      effectiveTokens: numeral(R.pathOr('0', ['effective_tokens'], json)).value() ?? '0',
    };
  }
}

export default MsgUpdateEffectiveDeposit;
