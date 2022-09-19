import { Model } from "mongoose";
import { TipoMapeamentoItemEnum } from "../enuns/TipoMapeamentoItemEnum";
import { IMapeamento } from "src/interface/mapeamento.interface";
import { MapeamentoService } from "./mapeamento.service";

describe('Mapemanto Service', () => {
  let mapeamentoService: MapeamentoService;

  beforeEach(() => {
  });

  describe('montaMapeamentoDeItemPorTemplate', () => {
    it('deve retornar array de mapeamento com subItem de mapeamento', async () => {
      let mapeamentoModel: Model<IMapeamento>;
       mapeamentoService = new MapeamentoService(mapeamentoModel);

      const template: any =  {

          data: {
            endToEndId: 'E9040088820210128000800123873170',
            localInstrument: 'DICT',
            payment: {
              amount: '100000.12',
              currency: 'BRL',
            },
            remittanceInformation: 'Pagamento da nota XPTO035-002.',
          },
       
      };

       let mapeamentos = mapeamentoService.montaMapeamentoDeItemPorTemplate(template, null);

      expect(mapeamentos.length).toBe(5);
      expect(mapeamentos[0].pathTemplate).toBe("data.endToEndId");
      expect(mapeamentos[1].pathTemplate).toBe("data.localInstrument");
      expect(mapeamentos[2].pathTemplate).toBe("data.payment.amount");
      expect(mapeamentos[3].pathTemplate).toBe("data.payment.currency");
      expect(mapeamentos[4].pathTemplate).toBe("data.remittanceInformation");

    });

    it('deve retornar array de mapeamento com subItem em array', async () => {
      let mapeamentoModel: Model<IMapeamento>;
       mapeamentoService = new MapeamentoService(mapeamentoModel);

      const template: any =  {

          data: {
            endToEndId: 'E9040088820210128000800123873170',
            localInstrument: 'DICT',
            payment: [{
              amount: '100000.12',
              currency: 'BRL',
            }],
          },
       
      };

       let mapeamentos = mapeamentoService.montaMapeamentoDeItemPorTemplate(template, null);

      expect(mapeamentos.length).toBe(3);
      expect(mapeamentos[0].pathTemplate).toBe("data.endToEndId");
      expect(mapeamentos[1].pathTemplate).toBe("data.localInstrument");
      expect(mapeamentos[2].pathTemplate).toBe("data.payment");
      let mapeamentoTypeArray = mapeamentos[2];
      expect(mapeamentoTypeArray.tipoMapeamentoItem).toBe(TipoMapeamentoItemEnum.arrayObject);

      expect(mapeamentoTypeArray.subMapeamentoItem.length).toBe(2);

    });

    it('deve retornar array de mapeamento Consent', async () => {
      let mapeamentoModel: Model<IMapeamento>;
       mapeamentoService = new MapeamentoService(mapeamentoModel);

      const template: any =  {

        "data": {
          "consentId": "urn:bb:BB96825411",
          "creationDateTime": "2022-08-01T09:35:00Z",
          "status": "AUTHORISED",
          "statusUpdateDateTime": "2022-08-01T09:35:00Z",
          "permissions": [
              "ACCOUNTS_READ",
              "ACCOUNTS_BALANCES_READ",
              "ACCOUNTS_TRANSACTIONS_READ",
              "ACCOUNTS_OVERDRAFT_LIMITS_READ",
              "CREDIT_CARDS_ACCOUNTS_READ",
              "CREDIT_CARDS_ACCOUNTS_BILLS_READ",
              "CREDIT_CARDS_ACCOUNTS_LIMITS_READ",
              "RESOURCES_READ"
          ],
          "expirationDateTime": "2023-08-01T10:35:00Z",
          "links": {
              "self": "https://opendata.api.bb.com.br/open-banking/consents/v1/consents/urn:bb:BB96925654"
          },
          "meta": {
              "totalRecords": 1,
              "totalPages": 1,
              "requestDateTime": "2022-08-03T10:42:00Z"
          }
      }
       
      };

       let mapeamentos = mapeamentoService.montaMapeamentoDeItemPorTemplate(template, null);

      expect(mapeamentos.length).toBe(10);
      expect(mapeamentos[0].pathTemplate).toBe("data.consentId");
      expect(mapeamentos[1].pathTemplate).toBe("data.creationDateTime");
      expect(mapeamentos[2].pathTemplate).toBe("data.status");
      expect(mapeamentos[3].pathTemplate).toBe("data.statusUpdateDateTime");
      expect(mapeamentos[4].pathTemplate).toBe("data.permissions");
      expect(mapeamentos[5].pathTemplate).toBe("data.expirationDateTime");
      expect(mapeamentos[6].pathTemplate).toBe("data.links.self");
      expect(mapeamentos[7].pathTemplate).toBe("data.meta.totalRecords");
      expect(mapeamentos[8].pathTemplate).toBe("data.meta.totalPages");
      expect(mapeamentos[9].pathTemplate).toBe("data.meta.requestDateTime");

      let mapeamentoTypeArray = mapeamentos[4];
      expect(mapeamentoTypeArray.tipoMapeamentoItem).toBe(TipoMapeamentoItemEnum.arrayString);

      expect(mapeamentoTypeArray.subMapeamentoItem).toBe(undefined);

    });
  });
});