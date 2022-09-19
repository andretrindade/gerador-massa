import { TipoMapeamentoItemEnum } from "../enuns/TipoMapeamentoItemEnum";

export default class MapeamentoItem {

   mapeamentoItemId : number;
   pathTemplate : string; 
   pathPersona: string;
   tipoMapeamentoItem : TipoMapeamentoItemEnum;
   subMapeamentoItem : MapeamentoItem[]
}