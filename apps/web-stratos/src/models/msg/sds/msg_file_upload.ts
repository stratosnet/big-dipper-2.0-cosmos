import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgFileUpload {
  public category: Categories;

  public type: string;

  public fileHash: string;

  public fromAddress: string;

  public reporter: string;

  public uploader: string;

  public json: object;

  constructor(payload: object) {
    this.category = 'sds';
    this.type = R.pathOr('', ['type'], payload);
    this.fileHash = R.pathOr('', ['fileHash'], payload);
    this.fromAddress = R.pathOr('', ['fromAddress'], payload);
    this.reporter = R.pathOr('', ['reporter'], payload);
    this.uploader = R.pathOr('', ['uploader'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgFileUpload {
    return {
      category: 'sds',
      json,
      type: R.pathOr('', ['@type'], json),
      fileHash: R.pathOr('', ['file_hash'], json),
      fromAddress: R.pathOr('', ['from'], json),
      reporter: R.pathOr('', ['reporter'], json),
      uploader: R.pathOr('', ['uploader'], json),
    };
  }
}

export default MsgFileUpload;
