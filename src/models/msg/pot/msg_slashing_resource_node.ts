import numeral from 'numeral';
import { Categories } from '../types';

class MsgSlashingResourceNode {
  public category: Categories;
  public type: string;
  public reporters: string[];
  public reporterOwner: string[];
  public networkAddress: string;
  public walletAddress: string;
  public slashing: string | number;
  public suspend: boolean;
  public json: any;

  constructor(payload: any) {
    this.category = 'pot';
    this.type = payload.type;
    this.reporters = payload.reporters;
    this.reporterOwner = payload.reporterOwner;
    this.networkAddress = payload.networkAddress;
    this.walletAddress = payload.walletAddress;
    this.slashing = payload.slashing;
    this.suspend = payload.suspend;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgSlashingResourceNode({
      json,
      type: json['@type'],
      reporters : json.reporters,
      reporterOwner: json.reporter_owner,
      networkAddress: json.network_address,
      walletAddress: json.wallet_address,
      slashing: numeral(json.slashing ?? 0).value(),
      suspend:json.suspend,
    });
  }
}

export default MsgSlashingResourceNode;
