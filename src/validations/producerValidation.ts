import { cpf, cnpj } from "cpf-cnpj-validator";
import { Producer } from "../models/producer";

export class ProducerValidation {
  static validateProducer(producer: Producer): void {
    if (
      !this.validateArea(
        producer.areaPlanted,
        producer.areaHarvested,
        producer.totalArea
      )
    ) {
      throw new Error(
        "A soma das áreas (areaPlanted + areaHarvested) deve ser menor ou igual à totalArea."
      );
    }

    if (!this.validateDocument(producer.document)) {
      throw new Error("CPF/CNPJ inválido");
    }

    if (producer.city === "") {
      throw new Error("Cidade inválida");
    }
    
    if (producer.state === "") {
      throw new Error("Estado inválido");
    }

    if (producer.culture.length === 0) {
      throw new Error("A fazenda deve ter pelo menos uma cultura.");
    }
  }

  private static validateArea(
    areaPlanted: number,
    areaHarvested: number,
    areaTotal: number
  ): boolean {
    return areaPlanted + areaHarvested <= areaTotal;
  }

  private static validateDocument(document: string): boolean {
    return cpf.isValid(document) || cnpj.isValid(document);
  }
}
