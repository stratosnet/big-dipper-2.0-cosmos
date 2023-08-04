import {
  BigNumber, ethers,
} from 'ethers';
import { toBech32 } from '@cosmjs/encoding';
import { chainConfig } from '@src/configs';
import { Categories } from '../types';

class MsgEthereumTx {
  public category: Categories;
  public type: string;
  public data: any;
  public size: int;
  public hash: string;
  public from: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'evm';
    this.type = payload.type;
    this.data = payload.data;
    this.size = payload.size;
    this.hash = payload.hash;
    this.from = payload.from;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgEthereumTx({
      json,
      type: json['@type'],
      data: json?.data,
      size: json?.size,
      hash: json?.hash,
      from: json?.from,
    });
  }

  static getBech32Address(value: string): string {
    return toBech32(chainConfig.prefix.account, ethers.utils.arrayify(value));
  }

  public asEthereumTx(): ethers.utils.UnsignedTransaction {
    const baseTx = {
      to: this?.data?.to || null,
      nonce: +this?.data?.nonce,
      data: null,
      value: null,
      gasLimit: +this?.data?.gas,
      chainId: chainConfig.evm.chainId,
    };

    if (this?.data?.data) {
      baseTx.data = ethers.utils.hexlify(ethers.utils.base64.decode(this.data.data));
    }
    if (this?.data?.value) {
      baseTx.value = BigNumber.from(this.data.value);
    }
    if (this?.data?.gas_price) {
      baseTx.gasPrice = BigNumber.from(this.data.gas_price);
    }
    if (this?.data?.chain_id) {
      baseTx.chainId = +this.data.chain_id;
    }

    if (this.data['@type'] === '/stratos.evm.v1.DynamicFeeTx') {
      baseTx.type = 2;
      baseTx.maxPriorityFeePerGas = BigNumber.from(this.data?.gas_tip_cap);
      baseTx.maxFeePerGas = BigNumber.from(this.data?.gas_fee_cap);
    }

    return baseTx;
  }

  public getSender(): string {
    const sig = {
      r: ethers.utils.hexlify(ethers.utils.base64.decode(this?.data?.r)),
      s: ethers.utils.hexlify(ethers.utils.base64.decode(this?.data?.s)),
      v: parseInt(ethers.utils.hexlify(ethers.utils.base64.decode(this?.data?.v)), 16),
    };
    const unsignedTx = ethers.utils.serializeTransaction(this.asEthereumTx());
    const preimage = ethers.utils.keccak256(unsignedTx);
    const from = ethers.utils.recoverAddress(preimage, sig);
    return from;
  }
}

export default MsgEthereumTx;
