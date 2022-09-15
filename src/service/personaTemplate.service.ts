import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { stringify } from 'querystring';
import { CreatePersonaTemplateDto } from 'src/dto/create-personaTemplate.dto';
import { UpdatePersonaTemplateDto } from 'src/dto/update-personaTemplate.dto';
import { IPersonaTemplate } from 'src/interface/personaTemplate.interface';
import PersonaTemplateItem from 'src/schema/mapeamentoItem.schema';
import ConvertObjectToString from 'src/utils/convertObjectToString';
@Injectable()
export class PersonaTemplateService {
  constructor(
    @InjectModel('PersonaTemplate') private personaTemplateModel: Model<IPersonaTemplate>,
  ) {}


  async createPersonaTemplate(
    createPersonaTemplateDto: CreatePersonaTemplateDto,
  ): Promise<IPersonaTemplate> {

    const newPersonaTemplate = await new this.personaTemplateModel(createPersonaTemplateDto);
    return newPersonaTemplate.save();
  }

  async updatePersonaTemplate(
    personaId: string,
    updatePersonaTemplateDto: UpdatePersonaTemplateDto,
  ): Promise<IPersonaTemplate> {
    const existingPersonaTemplate = await this.personaTemplateModel.findByIdAndUpdate(
      personaId,
      updatePersonaTemplateDto,
      { new: true },
    );
    if (!existingPersonaTemplate) {
      throw new NotFoundException(`PersonaTemplate #${personaId} not found`);
    }
    return existingPersonaTemplate;
  }


  async getPersonaTemplate(): Promise<IPersonaTemplate> {
    const existingPersona = await this.personaTemplateModel.findOne().exec();

    if (!existingPersona) {
      throw new NotFoundException(`Persona  not found`);
    }
    
    return  existingPersona;
  }

}
