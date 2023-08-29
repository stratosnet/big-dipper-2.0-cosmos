import type { Categories } from '@/models/msg/types';

class MsgMetaNodeRegistrationVote {
  public category: Categories;
  public type: string;
  public candidateNetworkAddress: string;
  public candidateOwnerAddress: string;
  public opinion: boolean;
  public voterNetworkAddress: string;
  public voterOwnerAddress: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'register';
    this.type = payload.type;
    this.candidateNetworkAddress = payload.candidateNetworkAddress;
    this.candidateOwnerAddress = payload.candidateOwnerAddress;
    this.opinion = payload.opinion;
    this.voterNetworkAddress = payload.voterNetworkAddress;
    this.voterOwnerAddress = payload.voterOwnerAddress;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgMetaNodeRegistrationVote({
      json,
      type: json['@type'],
      candidateNetworkAddress: json?.candidate_network_address,
      candidateOwnerAddress: json?.candidate_owner_address,
      opinion: json?.opinion,
      voterNetworkAddress: json?.voter_network_address,
      voterOwnerAddress: json?.voter_owner_address,
    });
  }
}

export default MsgMetaNodeRegistrationVote;
