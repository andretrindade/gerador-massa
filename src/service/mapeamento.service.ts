
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

  async createMapeamento(
    createMapeamentoDto: CreateMapeamentoDto,
  ): Promise<IMapeamento> {
    let itensMapeados = this.realizaMapeamentoDeObjeto(
      createMapeamentoDto.template.template
    );


    let mapeamento: CreateMapeamentoDto = {
      template: createMapeamentoDto.template,
      templateId: createMapeamentoDto.templateId,
      mapeamentoItemStringfy: JSON.stringify(itensMapeados),
    };

    const newMapeamento = await new this.mapeamentoModel(mapeamento);
    return newMapeamento.save();
  }

  async updateMapeamento(
    mapeamentoId: string,
    updateMapeamentoDto: UpdateMapeamentoDto,
  ): Promise<IMapeamento> {

    let mapeamento = { mapeamentoItemStringfy : JSON.stringify(updateMapeamentoDto.mapeamentoItens)};

    const existingMapeamento = await this.mapeamentoModel.findByIdAndUpdate(
      mapeamentoId,
      mapeamento,
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
    let mapeamentos :  MapeamentoItem []= [];
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
            mapeamentoArray.forEach((x, index)=> { x.mapeamentoItemId = index+ 1});
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

    mapeamentos.forEach((x, index)=> { x.mapeamentoItemId = index + 1});

    return mapeamentos;
  }
}
