import type { Categories } from '@/models/msg/types';

class MsgFileUpload {
  public category: Categories;
  public type: string;
  public fileHash: string;
  public fromAddress: string;
  public reporter: string;
  public uploader: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'sds';
    this.type = payload.type;
    this.fileHash = payload.fileHash;
    this.fromAddress = payload.fromAddress;
    this.reporter = payload.reporter;
    this.uploader = payload.uploader;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgFileUpload({
      json,
      type: json['@type'],
      fileHash: json?.file_hash,
      fromAddress: json?.from,
      reporter: json?.reporter,
      uploader: json?.uploader,
    });
  }
}

export default MsgFileUpload;
