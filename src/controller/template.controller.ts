import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateTemplateDto } from 'src/dto/create-template.dto';
import { UpdateTemplateDto } from 'src/dto/update-template.dto';
import { TemplateService } from 'src/service/template.service';

@Controller('template')
export class TemplateController {

    constructor(private readonly templateService: TemplateService) { }

    @Post()
    @HttpCode(201)
    async createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
        try {
            const data = await this.templateService.createTemplate(createTemplateDto);
            return {
                message: 'Template has been created successfully',
                data
            }
        } catch (err) {
            return HttpException.createBody({
                statusCode: 400,
                message: 'Error: Template not created!',
                error: 'Bad Request'
            });
        }
    }

    @Get()
    async findAll() {
        try {
            const data = await this.templateService.findAll();
            return {
                message: 'Templates found successfully',
                data
            }
        } catch (err) {
            return HttpException.createBody({
                statusCode: err.status,
                error: err.response
            })
        }
    }

    @Get("/:id")
    async findById(@Param("id") templateId: string) {
        try {
            const template = await this.templateService.findById(templateId);
            return {
                message: 'Templates found successfully',
                template
            }
        } catch (err) {
            return HttpException.createBody({
                statusCode: err.status,
                error: err.response
            })
        }
    }

    @Put('/:id')
    async updateTemplate(@Param('id') templateId: string, @Body() updateTemplateDto: UpdateTemplateDto) {
        try {
            let teste = updateTemplateDto;
            const template = await this.templateService.updateTemplate(
                templateId,
                updateTemplateDto
            );
            return {
                message: 'Template has been successfully updated',
                template
            };
        } catch (err) {
            return HttpException.createBody({
                statusCode: err.status,
                error: err.response
            })
        }
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteById(@Param('id') templateId: string) {
        this.templateService.deleteById(templateId)
    }
}
