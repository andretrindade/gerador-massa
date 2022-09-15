import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import MapeamentoItem from "src/schema/mapeamentoItem.schema";
export class CreatePersonaTemplateDto {

     readonly path: string[];

}