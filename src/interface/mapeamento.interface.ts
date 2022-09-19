import { Document } from 'mongoose';
import MapeamentoItem from 'src/schema/mapeamentoItem.schema';
export interface IMapeamento extends Document{
    readonly templateId: string;
    
    readonly template : any;
 
    readonly mapeamentoItemStringfy : string
}