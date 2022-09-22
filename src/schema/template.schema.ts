import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

@Schema()
export class Template {
    @Prop()
    readonly api: string;
    @Prop()
    readonly endpoint: string;
    @Prop()
    readonly version: string;
    @Prop()
    readonly method: string;
    @Prop()
    readonly location: string;
    @Prop({ type: Object })
    readonly template: any;
}
export const TemplateSchema = SchemaFactory.createForClass(Template);