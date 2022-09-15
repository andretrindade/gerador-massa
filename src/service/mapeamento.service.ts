import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { stringify } from 'querystring';
import { CreateMapeamentoDto } from 'src/dto/create-mapeamento.dto';
import { UpdateMapeamentoDto } from 'src/dto/update-mapeamento.dto';
import { IMapeamento } from 'src/interface/mapeamento.interface';
import MapeamentoItem from 'src/schema/mapeamentoItem.schema';
import ConvertObjectToString from 'src/utils/convertObjectToString';
@Injectable()
export class MapeamentoService {
  constructor(
    @InjectModel('Mapeamento') private mapeamentoModel: Model<IMapeamento>,
  ) {}

  template: any = {
    id: 1,
    descricao: '[2.0.0] [post] [request] payment/consent/',
    dataExemplo: {
      data: {
        endToEndId: 'E9040088820210128000800123873170',
        localInstrument: 'DICT',
        payment: {
          amount: '100000.12',
          currency: 'BRL',
        },
        remittanceInformation: 'Pagamento da nota XPTO035-002.',
      },
    },
  };

  async createMapeamento(
    createMapeamentoDto: CreateMapeamentoDto,
  ): Promise<IMapeamento> {
    let nomesDosCamposEmArrayObjects = ConvertObjectToString.converter(
      this.template.dataExemplo
    );

    let mapeamentoItens = nomesDosCamposEmArrayObjects.map(
      (s: any, index: number) => {
        let mapeamentoItem: MapeamentoItem = {
          mapeamentoItemId: index + 1,
          pathTemplate: s.slice(1),
          pathPersona: '',
        };

        return mapeamentoItem;
      },
    );

    let mapeamento: CreateMapeamentoDto = {
      template: '[2.0.0] [post] [request] payment/consent/',
      templateId: '1',
      mapeamentoItens: mapeamentoItens,
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
    const personaData = await this.mapeamentoModel.find();
    if (!personaData || personaData.length == 0) {
      throw new NotFoundException('Mapeamentos data not found!');
    }
    return personaData;
  }

  async getMapeamento(mapeamentoId: string): Promise<IMapeamento> {
    const existingMapeamento = await this.mapeamentoModel
      .findById(mapeamentoId)
      .exec();
    if (!existingMapeamento) {
      throw new NotFoundException(`Mapeamento #${mapeamentoId} not found`);
    }
    return existingMapeamento;
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
}
