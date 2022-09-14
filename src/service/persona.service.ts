import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonaDto } from 'src/dto/create-persona.dto';
import { IPersona } from 'src/interface/persona.interface';
import { Model } from 'mongoose';
import { UpdatePersonaDto } from 'src/dto/update-persona.dto';
@Injectable()
export class PersonaService {
  constructor(@InjectModel('Persona') private personaModel: Model<IPersona>) {}
  async createPersona(createPersonaDto: CreatePersonaDto): Promise<IPersona> {
    const newPersona = await new this.personaModel(createPersonaDto);
    return newPersona.save();
  }

  async updatePersona(
    personaId: string,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<IPersona> {
    const existingPersona = await this.personaModel.findByIdAndUpdate(
      personaId,
      updatePersonaDto,
      { new: true },
    );
    if (!existingPersona) {
      throw new NotFoundException(`Persona #${personaId} not found`);
    }
    return existingPersona;
  }

  async getAllPersonas(): Promise<IPersona[]> {
    const personaData = await this.personaModel.find();
    if (!personaData || personaData.length == 0) {
      throw new NotFoundException('Personas data not found!');
    }
    return personaData;
  }

  async getPersona(personaId: string): Promise<IPersona> {
    const existingPersona = await this.personaModel.findById(personaId).exec();
    if (!existingPersona) {
      throw new NotFoundException(`Persona #${personaId} not found`);
    }
    return existingPersona;
  }

  async deletePersona(personaId: string): Promise<IPersona> {
    const deletedPersona = await this.personaModel.findByIdAndDelete(personaId);
    if (!deletedPersona) {
      throw new NotFoundException(`Persona #${personaId} not found`);
    }
    return deletedPersona;
  }
}
