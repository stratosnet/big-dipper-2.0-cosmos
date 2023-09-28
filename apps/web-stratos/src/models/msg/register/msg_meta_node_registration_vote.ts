import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgMetaNodeRegistrationVote {
  public category: Categories;

  public type: string;

  public candidateNetworkAddress: string;

  public candidateOwnerAddress: string;

  public opinion: boolean;

  public voterNetworkAddress: string;

  public voterOwnerAddress: string;

  public json: object;

  constructor(payload: object) {
    this.category = 'register';
    this.type = R.pathOr('', ['type'], payload);
    this.candidateNetworkAddress = R.pathOr('', ['candidateNetworkAddress'], payload);
    this.candidateOwnerAddress = R.pathOr('', ['candidateOwnerAddress'], payload);
    this.opinion = R.pathOr(false, ['opinion'], payload);
    this.voterNetworkAddress = R.pathOr('', ['voterNetworkAddress'], payload);
    this.voterOwnerAddress = R.pathOr('', ['voterOwnerAddress'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgMetaNodeRegistrationVote {
    return {
      category: 'register',
      json,
      type: R.pathOr('', ['@type'], json),
      candidateNetworkAddress: R.pathOr('', ['candidate_network_address'], json),
      candidateOwnerAddress: R.pathOr('', ['candidate_owner_address'], json),
      opinion: R.pathOr(false, ['opinion'], json),
      voterNetworkAddress: R.pathOr('', ['voter_network_address'], json),
      voterOwnerAddress: R.pathOr('', ['voter_owner_address'], json),
    };
  }
}

export default MsgMetaNodeRegistrationVote;
