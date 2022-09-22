import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITemplate } from 'src/interface/template.inteface';
import { CreateTemplateDto } from 'src/dto/create-template.dto';
import { UpdateTemplateDto } from 'src/dto/update-template.dto';
@Injectable()
export class TemplateService {

  constructor(@InjectModel('Template') private templateModel: Model<ITemplate>) { }

  createTemplate(createTemplateDto: CreateTemplateDto): Promise<ITemplate> {
    const newTemplate = new this.templateModel(createTemplateDto);
    return newTemplate.save();
  }

  async findAll(): Promise<ITemplate[]> {
    return await this.templateModel.find();
  }

  async findById(templateId: string): Promise<ITemplate> {
    const template = await this.templateModel.findById(templateId)
      .exec();

    if (!template) {
      throw new NotFoundException(`Template #${templateId} not found`);
    }

    return template;
  }

  async updateTemplate(templateId: any, updateTemplateDto: UpdateTemplateDto) {
    const template = await this.templateModel.findByIdAndUpdate(
      templateId,
      updateTemplateDto,
      { new: true }
    );

    if (!template) {
      throw new NotFoundException(`Template #${templateId} not found`);
    }
    return template;
  }

  deleteById(templateId: string) {
    this.templateModel.findByIdAndDelete(templateId, (err, doc) => {
      if (err) {
        throw new NotFoundException(`Template #${templateId} not found`);
      }
    })
  }
}
