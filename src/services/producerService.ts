import { Prisma } from "@prisma/client";
import { Producer } from "../models/producer";
import { ProducerRepository } from "../repositories/producerRepository";
import { ProducerValidation } from "../validations/producerValidation";

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
    return producer;
  }

  async create(producer: Producer): Promise<Producer> {
    try {
      ProducerValidation.validateProducer(producer);
      const newProducer = await this.producerRepository.create(producer);
      return newProducer;
    } catch (error) {
      
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("Documento já cadastrado");
      }

      throw error;
    }
  }

  async update(producer: Producer): Promise<Producer> {
    ProducerValidation.validateProducer(producer);
    const updatedProducer = await this.producerRepository.update(producer);
    return updatedProducer;
  }

  async delete(id: number): Promise<Producer> {
    const deletedProducer = await this.producerRepository.delete(id);
    return deletedProducer;
  }

  async dashboard(): Promise<any> {
    const [
      totalFarmers,
      totalArea,
      totalArePerState,
      totalFarmerPerState,
      totalAreaPerCulture,
      totalAreaHarvested,
      totalAreaPlanted
    ] = await Promise.all([
      this.producerRepository.totalFarmers(),
      this.producerRepository.totalArea(),
      this.producerRepository.totalAreaPerState(),
      this.producerRepository.totalFarmersPerState(),
      this.producerRepository.totalAreaPerCulture(),
      this.producerRepository.totalAreaHarvested(),
      this.producerRepository.totalAreaPlanted()
    ]);
  
    const areaPerState: Record<string, number> = totalArePerState.reduce((acc: Record<string, number>, item: any) => {
      acc[item.state] = (item._sum.totalArea / totalArea._sum.totalArea);
      return acc;
    }, {});
  
    const dashboard = {
      totalFarmers,
      totalFarmerPerState,
      totalArea: totalArea?._sum?.totalArea || 0,
      totalAreaHarvested: totalAreaHarvested?._sum?.areaHarvested || 0,
      totalAreaPlanted: totalAreaPlanted?._sum?.areaPlanted || 0,
      totalArePerState,
      areaPerState,
      totalAreaPerCulture
    };
  
    return dashboard;
  }
}

const producerService = new ProducerService();
export { producerService };
