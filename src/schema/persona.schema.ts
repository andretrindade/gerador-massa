import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Persona {
   @Prop({type:Object})
   persona: any;
   
}
export const PersonaSchema = SchemaFactory.createForClass(Persona);