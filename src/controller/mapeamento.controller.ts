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
import { CreateMapeamentoDto } from 'src/dto/create-mapeamento.dto';
import { UpdateMapeamentoDto } from 'src/dto/update-mapeamento.dto';
import { MapeamentoService } from 'src/service/mapeamento.service';
  @Controller('mapeamento')
  export class MapeamentoController {
    constructor(private readonly mapeamentoService: MapeamentoService) {}
    @Post()
    async createMapeamento(
      @Res() response,
      @Body() createMapeamentoDto: CreateMapeamentoDto,
    ) {
      try {
        const data = await this.mapeamentoService.createMapeamento(
          createMapeamentoDto,
        );
        return response.status(HttpStatus.CREATED).json({
          message: 'Mapeamento has been created successfully',
          data,
        });
      } catch (err) {
        console.log(err)
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: Mapeamento not created!',
          error: 'Bad Request',
        });
      }
    }
    
    @Put('/:id')
    async updateMapeamento(
      @Res() response,
      @Param('id') mapeamentoId: string,
      @Body() updateMapeamentoDto: UpdateMapeamentoDto,
    ) {
      try {
        const data = await this.mapeamentoService.updateMapeamento(
          mapeamentoId,
          updateMapeamentoDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'Mapeamento has been successfully updated',
          data,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }
  
    @Get()
    async getMapeamentos(@Res() response) {
      try {
        const data = await this.mapeamentoService.getAllMapeamentos();
        return response.status(HttpStatus.OK).json({
          message: 'All mapeamentos data found successfully',
          data,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }
  
    @Get('/:id')
    async getMapeamento(@Res() response, @Param('id') mapeamentoId: string) {
      try {
        const data = await this.mapeamentoService.getMapeamento(mapeamentoId);
        return response.status(HttpStatus.OK).json({
          message: 'Mapeamento found successfully',
          data,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }
  }
  