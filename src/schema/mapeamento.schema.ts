import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import MapeamentoItem from "./mapeamentoItem.schema";
@Schema()
export class Mapeamento {

   @Prop()
   templateId: string;
   
   @Prop({type:Object})
   template : any;

   @Prop({type:Object})
   mapeamentoItemStringfy : string

   mapeamentoItens : any[]

   
}
export const MapeamentoSchema = SchemaFactory.createForClass(Mapeamento);