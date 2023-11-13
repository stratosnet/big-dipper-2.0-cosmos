import { BigNumber, ethers } from 'ethers';
import { toBech32 } from '@cosmjs/encoding';
import chainConfig from '@/chainConfig';
import { Categories } from '../types';

const { prefix, evm } = chainConfig();

class MsgEthereumTx {
  public category: Categories;

  public type: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;

  public size: int;

  public hash: string;

  public from: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public json: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(payload: any) {
    this.category = 'evm';
    this.type = payload.type;
    this.data = payload.data;
    this.size = payload.size;
    this.hash = payload.hash;
    this.from = payload.from;
    this.json = payload.json;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(json: any) {
    return new MsgEthereumTx({
      json,
      // type: json['@type'],
      type: '/stratos.evm.v1.MsgEvmTx', // NOTE: For removing ethereum name from type
      data: json?.data,
      size: json?.size,
      hash: json?.hash,
      from: json?.from,
    });
  }

  static getBech32Address(value: string): string {
    return toBech32(prefix.account, ethers.utils.arrayify(value));
  }

  public asEthereumTx(): ethers.utils.UnsignedTransaction {
    const baseTx = {
      to: this?.data?.to || null,
      // eslint-disable-next-line no-unsafe-optional-chaining
      nonce: +this?.data?.nonce,
      data: null,
      value: null,
      // eslint-disable-next-line no-unsafe-optional-chaining
      gasLimit: +this?.data?.gas,
      chainId: evm?.chainId ?? 1,
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
