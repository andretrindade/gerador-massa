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
import { CreateCenarioDto } from 'src/dto/create-cenario.dto';
import { UpdateCenarioDto } from 'src/dto/update-cenario.dto';
import { CenarioService } from 'src/service/cenario.service';
@Controller('cenario')
export class CenarioController {
  constructor(private readonly cenarioService: CenarioService) {}
  @Post()
  async createCenario(
    @Res() response,
    @Body() createCenarioDto: CreateCenarioDto,
  ) {
    try {
      const data = await this.cenarioService.createCenario(
        createCenarioDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Cenario has been created successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Cenario not created!',
        error: 'Bad Request',
      });
    }
  }
  
  @Put('/:id')
  async updateCenario(
    @Res() response,
    @Param('id') cenarioId: string,
    @Body() updateCenarioDto: UpdateCenarioDto,
  ) {
    try {
      const data = await this.cenarioService.updateCenario(
        cenarioId,
        updateCenarioDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Cenario has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getCenarios(@Res() response) {
    try {
      const data = await this.cenarioService.getAllCenarios();
      return response.status(HttpStatus.OK).json({
        message: 'All cenarios data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get('/:id')
  async getCenario(@Res() response, @Param('id') cenarioId: string) {
    try {
      const data = await this.cenarioService.getCenario(cenarioId);
      return response.status(HttpStatus.OK).json({
        message: 'Cenario found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

 
}
