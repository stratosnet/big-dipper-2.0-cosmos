import numeral from 'numeral';
import { Categories } from '../types';

class MsgVolumeReport {
  public category: Categories;
  public type: string;
  public walletVolumes: SingleWalletVolume[];
  public reporter: string[];
  public epoch: string | number;
  public reportReference: string;
  public reporterOwner: string;
  public blsSignature: BLSSignatureInfo;
  public json: any;

  constructor(payload: any) {
    this.category = 'pot';
    this.type = payload.type;
    this.walletVolumes = payload.walletVolumes;
    this.reporter = payload.reporter;
    this.epoch = payload.epoch;
    this.reportReference = payload.reportReference;
    this.blsSignature = payload.blsSignature
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgVolumeReport({
      json,
      type: json['@type'],
      walletVolumes: json?.wallet_volumes.map((x) => {
        return ({
            walletAddress: x?.wallet_address,
            volume: numeral(x?.volume ?? 0).value(),
        })
      }) ,
      reporter: json?.reporter,
      epoch: numeral(json?.epoch ?? 0).value(),
      reportReference: json?.report_reference,
      reporterOwner: json?.reporter_owner,
      blsSignature: json?.bls_signature.map((x) => {
        return ({
            pubKeys: x?.pub_keys,
            signature: x?.signature,
            txData: x?.tx_data,
        })
      }),
    });
  }
}

export default MsgVolumeReport;

type SingleWalletVolume = {
    walletAddress: string;
    volume: string | number;
}

type BLSSignatureInfo = {
    pubKeys: string[];
    signature: string;
    txData: string;
}