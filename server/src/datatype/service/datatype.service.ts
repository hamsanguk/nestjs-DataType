import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';
import { BytesLike } from 'ethers';

@Injectable()
export class DatatypeService {
  constructor(private readonly ethersService: EthersService) {}

  async positive(value?: number) {
    try {
      // Todo: value 유무에 따라 positiveNumber와 setPositiveNumber의 값을 리턴합니다.
      if (typeof value === 'number'){
        return await this.ethersService.setPositiveNumber(value);
      }else{
        return await this.ethersService.positiveNumber();
      }

    } catch (error) {
      console.log(error);
    }
  }

  async negative(value?: number) {
    try {
      // Todo: value 유무에 따라 negativeNumber와 setNegativeNumber의 값을 리턴합니다.
      if(typeof value === 'number'){
        return await this.ethersService.setNegativeNumber(value);        
      }else{
        return await this.ethersService.negativeNumber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async isActive() {
    try {
      // Todo: isActive의 값을 리턴합니다.
      return await this.ethersService.isActive();
    } catch (error) {
      console.log(error);
    }
  }

  async toggleActive() {
    try {
      // Todo: toggleActive의 값을 리턴합니다.
      return await this.ethersService.toggleActive();

    } catch (error) {
      console.log(error);
    }
  }

  async recipient() {
    try {
      // Todo: recipient의 값을 리턴합니다.
      return await this.ethersService.recipient();

    } catch (error) {
      console.log(error);
    }
  }

  async wallet(address?: string) {
    try {
      // Todo: address 유무에 따라 wallet과 setWallet의 값을 리턴합니다.
      if(typeof address === 'string'){
        return await this.ethersService.setWallet(address);
      }else{
        return await this.ethersService.wallet();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fixedData(data?: string) {
    try {
      if (data) {
        let bytesData: BytesLike;
  
        const isBytes = await this.ethersService.isBytesLike(data);
        if (isBytes) {
          // 바이트 형이면 그대로 패딩만 적용
          bytesData = await this.ethersService.zeroPadValue32(data);
        } else {
          // 문자열이면 bytes32로 인코딩 후 패딩
          const encoded = await this.ethersService.encodeBytes32String(data);
          bytesData = await this.ethersService.zeroPadValue32(encoded);
        }
  
        return await this.ethersService.setFixedData(bytesData);
      } else {
        return await this.ethersService.fixedData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  async dynamicData(data?: string) {
    try {
      if (data) {
        let bytesData: BytesLike;
  
        const isBytes = await this.ethersService.isBytesLike(data);
        if (isBytes) {
          bytesData = data;
        } else {
          bytesData = await this.ethersService.toUtf8Bytes(data);
        }
  
        return await this.ethersService.setDynamicData(bytesData);
      } else {
        return await this.ethersService.dynamicData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  async getDynamicDataLength() {
    try {
      // Todo: getDynamicDataLength의 값을 리턴합니다.
      return await this.ethersService.getDynamicDataLength();
    } catch (error) {
      console.error(error);
    }
  }

  async currentState(state?: number) {
    try {
      // Todo: state 유무에 따라 currentState와 setState의 값을 리턴합니다.
      if(typeof state === 'number'){
        return await this.ethersService.setState(state);
      }else{
        return await this.ethersService.currentState();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
async getDetails() {
    try {
      const details = await this.ethersService.getDetails();
      const parsed = JSON.parse(
        JSON.stringify(details, (key,value)=>
          typeof value === 'bigint' ? value.toString() : value)
      )
      return parsed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}