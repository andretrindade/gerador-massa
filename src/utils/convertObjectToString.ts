export default class ConvertObjectToString{
    


    public static converter(object : any){
        let elementos = this.recuperaNomeCamposTemplate(object, "");
        return elementos
    }


   public static recuperaNomeCamposTemplate(object: any, path: string): string[] {
        let nomes = Object.keys(object);
        let nomeCampo = [];
        nomes.forEach((x) => {
          let pathTemp = path + '.' + x;
          let nomeRetorno = pathTemp;
    
          if (typeof object[x] == 'object') {
            let nomeTemp = this.recuperaNomeCamposTemplate(object[x], pathTemp);
            nomeCampo.push(...nomeTemp);
          } else {
            nomeCampo.push(nomeRetorno);
          }
        });
        return nomeCampo;
      }
    

}