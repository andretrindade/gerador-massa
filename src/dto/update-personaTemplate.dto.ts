import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaTemplateDto } from './create-personaTemplate.dto';


export class UpdatePersonaTemplateDto extends PartialType(CreatePersonaTemplateDto) {}
