
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMapeamentoDto } from 'src/dto/create-mapeamento.dto';
import { UpdateMapeamentoDto } from 'src/dto/update-mapeamento.dto';
import { IMapeamento } from 'src/interface/mapeamento.interface';
import MapeamentoItem from '../schema/mapeamentoItem.schema';
import {TipoMapeamentoItemEnum} from '../enuns/TipoMapeamentoItemEnum'
@Injectable()
export class MapeamentoService {
  constructor(
    @InjectModel('Mapeamento') private mapeamentoModel: Model<IMapeamento>,
  ) {}


  template: any = {
    id: 1,
    descricao: '[2.0.0] [post] [response] [201] consent/consent/',
    dataExemplo: {
     
      "data": {
        "consentId": "urn:bb:BB96825411",
        "creationDateTime": "2022-08-01T09:35:00Z",
        "status": "AUTHORISED",
        "statusUpdateDateTime": "2022-08-01T09:35:00Z",
        "permissions": [
            "ACCOUNTS_READ",
            "ACCOUNTS_BALANCES_READ",
            "ACCOUNTS_TRANSACTIONS_READ",
            "ACCOUNTS_OVERDRAFT_LIMITS_READ",
            "CREDIT_CARDS_ACCOUNTS_READ",
            "CREDIT_CARDS_ACCOUNTS_BILLS_READ",
            "CREDIT_CARDS_ACCOUNTS_LIMITS_READ",
            "RESOURCES_READ"
        ],
        "expirationDateTime": "2023-08-01T10:35:00Z",
        "links": {
            "self": "https://opendata.api.bb.com.br/open-banking/consents/v1/consents/urn:bb:BB96925654"
        },
        "meta": {
            "totalRecords": 1,
            "totalPages": 1,
            "requestDateTime": "2022-08-03T10:42:00Z"
        },
        "payment": [{
          "amount": '100000.12',
          "currency": 'BRL',
        }],
    },
  }
};

  async createMapeamento(
    createMapeamentoDto: CreateMapeamentoDto,
  ): Promise<IMapeamento> {
    let itensMapeados = this.realizaMapeamentoDeObjeto(
      this.template.dataExemplo
    );


    let mapeamento: CreateMapeamentoDto = {
      template: '[2.0.0] [post] [request] payment/consent/',
      templateId: '1',
      mapeamentoItemStringfy: JSON.stringify(itensMapeados),
    };

    const newMapeamento = await new this.mapeamentoModel(mapeamento);
    return newMapeamento.save();
  }

  async updateMapeamento(
    mapeamentoId: string,
    updateMapeamentoDto: UpdateMapeamentoDto,
  ): Promise<IMapeamento> {
    const existingMapeamento = await this.mapeamentoModel.findByIdAndUpdate(
      mapeamentoId,
      updateMapeamentoDto,
      { new: true },
    );
    if (!existingMapeamento) {
      throw new NotFoundException(`Mapeamento #${mapeamentoId} not found`);
    }
    return existingMapeamento;
  }

  async getAllMapeamentos(): Promise<IMapeamento[]> {
    const mapeamentoData = await this.mapeamentoModel.find();
    if (!mapeamentoData || mapeamentoData.length == 0) {
      throw new NotFoundException('Mapeamentos data not found!');
    }

    return mapeamentoData;
  }

  async getMapeamento(mapeamentoId: string): Promise<any> {
    const existingMapeamento = await this.mapeamentoModel
      .findById(mapeamentoId)
      .exec();
    if (!existingMapeamento) {
      throw new NotFoundException(`Mapeamento #${mapeamentoId} not found`);
    }

    let data = {
       template : existingMapeamento.template,
       _id : existingMapeamento._id,
       templateId : existingMapeamento.templateId,
       mapeamentoItens: JSON.parse(existingMapeamento.mapeamentoItemStringfy)
    }
    return data;
  }

  async deleteMapeamento(mapeamentoId: string): Promise<IMapeamento> {
    const deletedMapeamento = await this.mapeamentoModel.findByIdAndDelete(
      mapeamentoId,
    );
    if (!deletedMapeamento) {
      throw new NotFoundException(`Mapeamento #${mapeamentoId} not found`);
    }
    return deletedMapeamento;
  }

  public realizaMapeamentoDeObjeto(object : any){
    let elementos = this.montaMapeamentoDeItemPorTemplate(object, null);
    return elementos;
}


public montaMapeamentoDeItemPorTemplate(object: any, mapemantoItem: MapeamentoItem): MapeamentoItem[] {
    let nomes = Object.keys(object);
    let mapeamentos :  any []= [];
    let mapemantoItemTemp = mapemantoItem ?? new MapeamentoItem();
    nomes.forEach((x) => {
      let mapeamento : MapeamentoItem =  Object.create(mapemantoItemTemp);

      mapeamento.pathTemplate = mapemantoItemTemp.pathTemplate ? `${mapemantoItemTemp.pathTemplate}.${x}`  : x;
      mapeamento.tipoMapeamentoItem = TipoMapeamentoItemEnum.object;
      if (typeof object[x] == 'object') {
        if(Array.isArray(object[x])){
          mapeamento.tipoMapeamentoItem = TipoMapeamentoItemEnum.arrayString;

          if(typeof object[x][0] == 'object'){
            mapeamento.tipoMapeamentoItem = TipoMapeamentoItemEnum.arrayObject;

            let mapeamentoArray = this.montaMapeamentoDeItemPorTemplate(object[x][0], mapeamento);
            mapeamento.subMapeamentoItem = mapeamentoArray;
          }

          mapeamentos.push(mapeamento);

        }else{
          let novoMapeamento = this.montaMapeamentoDeItemPorTemplate(object[x], mapeamento);
          mapeamentos.push(...novoMapeamento);
        }
      } else {
        mapeamentos.push(mapeamento);
      }
    });
    return mapeamentos;
  }
}
