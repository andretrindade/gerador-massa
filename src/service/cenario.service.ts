import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCenarioDto } from 'src/dto/create-cenario.dto';
import { Model } from 'mongoose';
import { UpdateCenarioDto } from 'src/dto/update-cenario.dto';
import { ICenario } from 'src/interface/cenario.interface';
@Injectable()
export class CenarioService {
  constructor(@InjectModel('Cenario') private cenarioModel: Model<ICenario>) {}
  async createCenario(createCenarioDto: CreateCenarioDto): Promise<ICenario> {

    createCenarioDto.mapeamentoTemplatePersonaCenarioItens.forEach(x=> {x.mapeamentoTemplatePersonaCenarioItensId = x.mapeamentoItem.mapeamentoItemId});

    const newCenario = await new this.cenarioModel(createCenarioDto);
    return newCenario.save();
  }

  async updateCenario(
    cenarioId: string,
    updateCenarioDto: UpdateCenarioDto,
  ): Promise<ICenario> {
    const existingCenario = await this.cenarioModel.findByIdAndUpdate(
      cenarioId,
      updateCenarioDto,
      { new: true },
    );
    if (!existingCenario) {
      throw new NotFoundException(`Cenario #${cenarioId} not found`);
    }
    return existingCenario;
  }

  async getAllCenarios(): Promise<ICenario[]> {
    const cenarioData = await this.cenarioModel.find();
    if (!cenarioData || cenarioData.length == 0) {
      throw new NotFoundException('Cenarios data not found!');
    }
    return cenarioData;
  }

  async getCenario(cenarioId: string): Promise<ICenario> {
    const existingCenario = await this.cenarioModel.findById(cenarioId).exec();
    if (!existingCenario) {
      throw new NotFoundException(`Cenario #${cenarioId} not found`);
    }
    return existingCenario;
  }

  async deleteCenario(cenarioId: string): Promise<ICenario> {
    const deletedCenario = await this.cenarioModel.findByIdAndDelete(cenarioId);
    if (!deletedCenario) {
      throw new NotFoundException(`Cenario #${cenarioId} not found`);
    }
    return deletedCenario;
  }
}
