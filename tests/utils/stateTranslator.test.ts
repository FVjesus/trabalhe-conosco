import { StateTranslator } from "../../src/utils/stateTranslator";

describe('StateTranslator', () => {
  it('should get the correct acronym for a given state', () => {
    const acronym = StateTranslator.getAcronym('São Paulo');
    expect(acronym).toEqual('SP');
  });

  it('should return null for an unknown state', () => {
    const acronym = StateTranslator.getAcronym('Unknown State');
    expect(acronym).toBeNull();
  });
});