import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import MapeamentoTemplatePersonaCenarioItem from "./MapeamentoTemplatePersonaCenarioItem.schema";
@Schema()
export class Cenario {
   @Prop()
   descricao: string;

   @Prop()
   templateId: string;

   @Prop()
   mapeamentoId: string;

   @Prop()
   templateDescricao:string;

   @Prop()
   personaId : string;

   @Prop({type:Object})
   persona : any;
   
   @Prop()
   mapeamentoTemplatePersonaCenarioItens : MapeamentoTemplatePersonaCenarioItem[];
  
}


export const CenarioSchema = SchemaFactory.createForClass(Cenario);