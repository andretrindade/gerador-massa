import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import MapeamentoItem from "src/schema/mapeamentoItem.schema";
export class CreateMapeamentoDto {

     readonly templateId: string;

     readonly template : any;

     readonly mapeamentoItemStringfy : string 

}