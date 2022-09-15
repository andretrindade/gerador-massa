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
import { CreatePersonaTemplateDto } from 'src/dto/create-personaTemplate.dto';
import { UpdatePersonaTemplateDto } from 'src/dto/update-personaTemplate.dto';
import { PersonaTemplateService } from 'src/service/personaTemplate.service';
@Controller('persona-template')
export class PersonaTemplateController {
  constructor(private readonly personaTemplateService: PersonaTemplateService) {}
  @Post()
  async createPersonaTemplate(
    @Res() response,
    @Body() createPersonaTemplateDto: CreatePersonaTemplateDto,
  ) {
    try {
      const data = await this.personaTemplateService.createPersonaTemplate(
        createPersonaTemplateDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'PersonaTemplate has been created successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: PersonaTemplate not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updatePersona(
    @Res() response,
    @Param('id') personaId: string,
    @Body() updatePersonaDto: UpdatePersonaTemplateDto,
  ) {
    try {
      const data = await this.personaTemplateService.updatePersonaTemplate(
        personaId,
        updatePersonaDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Persona has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get('template')
  async getPersonaTemplate(@Res() response) {
    try {
      const data = await this.personaTemplateService.getPersonaTemplate();
      return response.status(HttpStatus.OK).json({
        message: 'Persona found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }



 
}
