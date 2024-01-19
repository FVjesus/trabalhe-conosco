import { Producer } from "../../src/models/producer";
import { ProducerValidation } from "../../src/validations/producerValidation";

describe("ProducerValidation", () => {
  describe("validateProducer", () => {
    it("should not throw errors for valid producer", () => {
      const validProducer: Producer = {
        id: 1,
        producerName: "Example Producer",
        farmName: "Example Farm",
        areaPlanted: 500,
        areaHarvested: 300,
        totalArea: 800,
        document: "30532450000196",
        city: "Example City",
        state: "SP",
        culture: ["Soja"],
      };

      expect(() =>
        ProducerValidation.validateProducer(validProducer)
      ).not.toThrow();
    });

    it("should throw error for invalid area", () => {
      const invalidProducer: Producer = {
        id: 1,
        producerName: "Example Producer",
        farmName: "Example Farm",
        areaPlanted: 500,
        areaHarvested: 400,
        totalArea: 800,
        document: "12345678909",
        city: "Example City",
        state: "SP",
        culture: ["Soja"],
      };

      expect(() =>
        ProducerValidation.validateProducer(invalidProducer)
      ).toThrow();
    });

    it("should throw error for invalid document", () => {
      const invalidProducer: Producer = {
        id: 1,
        producerName: "Example Producer",
        farmName: "Example Farm",
        areaPlanted: 500,
        areaHarvested: 300,
        totalArea: 800,
        document: "invalid-document",
        city: "Example City",
        state: "SP",
        culture: ["Soja"],
      };

      expect(() =>
        ProducerValidation.validateProducer(invalidProducer)
      ).toThrow();
    });

    it("should throw error for empty city", () => {
      const invalidProducer: Producer = {
        id: 1,
        producerName: "Example Producer",
        farmName: "Example Farm",
        areaPlanted: 500,
        areaHarvested: 300,
        totalArea: 800,
        document: "12345678909",
        city: "",
        state: "SP",
        culture: ["Soja"],
      };

      expect(() =>
        ProducerValidation.validateProducer(invalidProducer)
      ).toThrow();
    });

    it("should throw error for empty state", () => {
      const invalidProducer: Producer = {
        id: 1,
        producerName: "Example Producer",
        farmName: "Example Farm",
        areaPlanted: 500,
        areaHarvested: 300,
        totalArea: 800,
        document: "12345678909",
        city: "Example City",
        state: "",
        culture: ["Soja"],
      };

      expect(() =>
        ProducerValidation.validateProducer(invalidProducer)
      ).toThrow();
    });

    it("should throw error for no cultures", () => {
      const invalidProducer: Producer = {
        id: 1,
        producerName: "Example Producer",
        farmName: "Example Farm",
        areaPlanted: 500,
        areaHarvested: 300,
        totalArea: 800,
        document: "12345678909",
        city: "Example City",
        state: "SP",
        culture: [],
      };

      expect(() =>
        ProducerValidation.validateProducer(invalidProducer)
      ).toThrow();
    });
  });

  describe("validateArea", () => {
    it("should return true for valid area", () => {
      const isValid = ProducerValidation["validateArea"](500, 300, 800);
      expect(isValid).toBe(true);
    });

    it("should return false for invalid area", () => {
      const isValid = ProducerValidation["validateArea"](500, 400, 800);
      expect(isValid).toBe(false);
    });
  });

  describe("validateDocument", () => {
    it("should return true for valid document (CPF)", () => {
      const isValid = ProducerValidation["validateDocument"]("84683634058");
      expect(isValid).toBe(true);
    });

    it("should return true for valid document (CNPJ)", () => {
      const isValid = ProducerValidation["validateDocument"]("30532450000196");
      expect(isValid).toBe(true);
    });

    it("should return false for invalid document", () => {
      const isValid =
        ProducerValidation["validateDocument"]("invalid-document");
      expect(isValid).toBe(false);
    });
  });
});
