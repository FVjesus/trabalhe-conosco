import { Prisma } from "@prisma/client";
import { Producer } from "../models/producer";
import { ProducerRepository } from "../repositories/producerRepository";
import { ProducerValidation } from "../validations/producerValidation";
import { StateTranslator } from "../utils/stateTranslator";

class ProducerService {
  private producerRepository: ProducerRepository;

  constructor() {
    this.producerRepository = new ProducerRepository();
  }

  async getAll(): Promise<Producer[]> {
    const producers = await this.producerRepository.getAll();
    return producers;
  }

  async getById(id: number): Promise<Producer | null> {
    const producer = await this.producerRepository.getById(id);
    if (!producer) {
      throw { status: 400, message: "Id não encontrado" };
    }
    return producer;
  }

  async create(producer: Producer): Promise<Producer> {
    try {
      ProducerValidation.validateProducer(producer);

      if (producer.state) {
        const acronym = StateTranslator.getAcronym(producer.state);
        if (acronym) {
          producer.state = acronym;
        }
      }

      const newProducer = await this.producerRepository.create(producer);
      return newProducer;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw { status: 400, message: "CPF/CNPJ já cadastrado" };
      }

      throw error;
    }
  }

  async update(id: number, producer: Producer): Promise<Producer> {
    try {
      ProducerValidation.validateProducer(producer);

      if (producer.state) {
        const acronym = StateTranslator.getAcronym(producer.state);
        if (acronym) {
          producer.state = acronym;
        }
      }

      const updatedProducer = await this.producerRepository.update(
        id,
        producer
      );
      return updatedProducer;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw { status: 400, message: "Id não encontrado" };
      }

      throw error;
    }
  }

  async delete(id: number): Promise<Producer> {
    try {
      const deletedProducer = await this.producerRepository.delete(id);
      return deletedProducer;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw { status: 400, message: "Id não encontrado" };
      }

      throw error;
    }
  }

  async dashboard(): Promise<any> {
    const [
      totalFarmers,
      totalArea,
      totalArePerState,
      totalFarmerPerState,
      totalAreaPerCulture,
      totalAreaHarvested,
      totalAreaPlanted,
    ] = await Promise.all([
      this.producerRepository.totalFarmers(),
      this.producerRepository.totalArea(),
      this.producerRepository.totalAreaPerState(),
      this.producerRepository.totalFarmersPerState(),
      this.producerRepository.totalAreaPerCulture(),
      this.producerRepository.totalAreaHarvested(),
      this.producerRepository.totalAreaPlanted(),
    ]);

    const areaPerState: Record<string, number> = totalArePerState.reduce(
      (acc: Record<string, number>, item: any) => {
        acc[item.state] = item._sum.totalArea / totalArea._sum.totalArea;
        return acc;
      },
      {}
    );

    const dashboard = {
      totalFarmers,
      totalFarmerPerState,
      totalArea: totalArea?._sum?.totalArea || 0,
      totalAreaHarvested: totalAreaHarvested?._sum?.areaHarvested || 0,
      totalAreaPlanted: totalAreaPlanted?._sum?.areaPlanted || 0,
      totalArePerState,
      areaPerState,
      totalAreaPerCulture,
      areaUsage: {
        used:
          (totalAreaHarvested?._sum?.areaHarvested || 0) +
          (totalAreaPlanted?._sum?.areaPlanted || 0),
        total: totalArea?._sum?.totalArea || 0,
      },
    };

    return dashboard;
  }
}

const producerService = new ProducerService();
export { producerService };
