import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import MapeamentoItem from "./mapeamentoItem.schema";
@Schema()
export class PersonaTemplate {

   @Prop()
   path : string[];
   
}
export const PersonaTemplateSchema = SchemaFactory.createForClass(PersonaTemplate);