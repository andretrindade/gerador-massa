import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreatePersonaDto } from 'src/dto/create-persona.dto';
import { UpdatePersonaDto } from 'src/dto/update-persona.dto';
import { PersonaService } from 'src/service/persona.service';
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}
  @Post()
  async createPersona(
    @Res() response,
    @Body() createPersonaDto: CreatePersonaDto,
  ) {
    try {
      const newPersona = await this.personaService.createPersona(
        createPersonaDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Persona has been created successfully',
        newPersona,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Persona not created!',
        error: 'Bad Request',
      });
    }
  }
  
  @Put('/:id')
  async updatePersona(
    @Res() response,
    @Param('id') personaId: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    try {
      const existingPersona = await this.personaService.updatePersona(
        personaId,
        updatePersonaDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Persona has been successfully updated',
        existingPersona,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getPersonas(@Res() response) {
    try {
      const personaData = await this.personaService.getAllPersonas();
      return response.status(HttpStatus.OK).json({
        message: 'All personas data found successfully',
        personaData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getPersona(@Res() response, @Param('id') personaId: string) {
    try {
      const existingPersona = await this.personaService.getPersona(personaId);
      return response.status(HttpStatus.OK).json({
        message: 'Persona found successfully',
        existingPersona,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
