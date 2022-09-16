import MapeamentoTemplatePersonaCenarioItem from "src/schema/MapeamentoTemplatePersonaCenarioItem.schema";
export class CreateCenarioDto {

     readonly descricao: string;

     readonly templateId : string;
     
     readonly mapeamentoId : string;

     readonly templateDescricao : string;
     readonly personaId : string;
     readonly persona : any;

     readonly mapeamentoTemplatePersonaCenarioItens : MapeamentoTemplatePersonaCenarioItem[]

}