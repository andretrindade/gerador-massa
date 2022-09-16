import { Document } from 'mongoose';
import MapeamentoTemplatePersonaCenarioItem from 'src/schema/MapeamentoTemplatePersonaCenarioItem.schema';
export interface ICenario extends Document{
    readonly descricao: string;

    readonly templateId : any;
    
    readonly mapeamentoId : any;

    readonly personaId : string;

    readonly templateDescricao : any;

    readonly persona: any;

    readonly mapeamentoTemplatePersonaCenarioItens : MapeamentoTemplatePersonaCenarioItem[]
}