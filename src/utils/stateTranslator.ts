import { State } from './states';

class StateTranslator {
  private static statesTranslate: Record<string, State> = {
    'Acre': State.Acre,
    'Alagoas': State.Alagoas,
    'Amapá': State.Amapá,
    'Amazonas': State.Amazonas,
    'Bahia': State.Bahia,
    'Ceará': State.Ceará,
    'Distrito Federal': State.DistritoFederal,
    'Espírito Santo': State.EspíritoSanto,
    'Goiás': State.Goiás,
    'Maranhão': State.Maranhão,
    'Mato Grosso': State.MatoGrosso,
    'Mato Grosso do Sul': State.MatoGrossoDoSul,
    'Minas Gerais': State.MinasGerais,
    'Pará': State.Pará,
    'Paraíba': State.Paraíba,
    'Paraná': State.Paraná,
    'Pernambuco': State.Pernambuco,
    'Piauí': State.Piauí,
    'Rio de Janeiro': State.RioDeJaneiro,
    'Rio Grande do Norte': State.RioGrandeDoNorte,
    'Rio Grande do Sul': State.RioGrandeDoSul,
    'Rondônia': State.Rondônia,
    'Roraima': State.Roraima,
    'Santa Catarina': State.SantaCatarina,
    'São Paulo': State.SãoPaulo,
    'Sergipe': State.Sergipe,
    'Tocantins': State.Tocantins,
  };

  static getAcronym(state: string): State | null {
    const acronym = this.statesTranslate[state];
    return acronym || null;
  }
}

export { StateTranslator };