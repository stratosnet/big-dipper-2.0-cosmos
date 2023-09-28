import * as R from 'ramda';
import numeral from 'numeral';
import type { Categories } from '@/models/msg/types';

type SingleWalletVolume = {
  walletAddress: string;
  volume: string;
};

type BLSSignatureInfo = {
  pubKeys: string[];
  signature: string;
  txData: string;
};

class MsgVolumeReport {
  public category: Categories;

  public type: string;

  public walletVolumes: SingleWalletVolume[];

  public reporter: string;

  public epoch: string | number;

  public reportReference: string;

  public reporterOwner: string;

  public blsSignature: BLSSignatureInfo;

  public json: object;

  constructor(payload: object) {
    this.category = 'pot';
    this.type = R.pathOr('', ['type'], payload);
    this.walletVolumes = R.pathOr<MsgVolumeReport['walletVolumes']>([], ['walletVolumes'], payload);
    this.reporter = R.pathOr('', ['reporter'], payload);
    this.epoch = R.pathOr('', ['epoch'], payload);
    this.reportReference = R.pathOr('', ['reportReference'], payload);
    this.reporterOwner = R.pathOr('', ['reporterOwner'], payload);
    this.blsSignature = R.pathOr(
      { pubKeys: [], signature: '', txData: '' },
      ['blsSignature'],
      payload
    );
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgVolumeReport {
    return {
      category: 'pot',
      json,
      type: R.pathOr('', ['@type'], json),
      walletVolumes: R.pathOr([], ['wallet_volumes'], json).map(
        (signleWalletVolume?: { walletAddress: string; volume: string }) => ({
          walletAddress: signleWalletVolume?.walletAddress ?? '',
          volume: signleWalletVolume?.volume ?? '',
        })
      ),
      reporter: R.pathOr('', ['reporter'], json),
      epoch: numeral(R.pathOr('0', ['epoch'], json)).value() ?? '0',
      reportReference: R.pathOr('', ['report_reference'], json),
      reporterOwner: R.pathOr('', ['reporter_owner'], json),
      blsSignature: {
        pubKeys: R.pathOr([], ['pub_keys'], json),
        signature: R.pathOr('', ['signature'], json),
        txData: R.pathOr('', ['tx_data'], json),
      },
    };
  }
}

export default MsgVolumeReport;
