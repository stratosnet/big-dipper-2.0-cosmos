import numeral from 'numeral';
import { Categories } from '../types';

class MsgUpdateEffectiveDeposit {
  public category: Categories;
  public type: string;
  public reporters: string[];
  public reporterOwner: string[];
  public networkAddress: string;
  public effectiveTokens: string | number;
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.reporters = payload.reporters;
    this.reporterOwner = payload.reporterOwner;
    this.networkAddress = payload.networkAddress;
    this.effectiveTokens = payload.effectiveTokens;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgUpdateEffectiveDeposit({
      json,
      type: json['@type'],
      reporters : json?.reporters,
      reporterOwner: json?.reporter_owner,
      networkAddress: json?.network_address,
      effectiveTokens: numeral(json?.effective_tokens ?? 0).value(),
    });
  }
}

export default MsgUpdateEffectiveDeposit;
