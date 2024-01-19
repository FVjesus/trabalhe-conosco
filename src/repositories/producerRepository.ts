import { Producer } from "../models/producer";
import prisma from '../client'
export class ProducerRepository {
  async getAll(): Promise<Producer[]> {
    const producers = prisma.producer.findMany();
    return producers;
  }

  async getById(id: number): Promise<Producer | null> {
    const producer = prisma.producer.findUnique({
      where: {
        id: id,
      },
    });
    return producer;
  }

  async create(producer: Omit<Producer, "id">): Promise<Producer> {
    const newProducer = prisma.producer.create({
      data: producer,
    });
    return newProducer;
  }

  async update(id: number, producer: Producer): Promise<Producer> {
    const updatedProducer = prisma.producer.update({
      where: {
        id: id,
      },
      data: producer,
    });
    return updatedProducer;
  }

  async delete(id: number): Promise<Producer> {
    const deletedProducer = prisma.producer.delete({
      where: {
        id: id,
      },
    });
    return deletedProducer;
  }

  async totalFarmers(): Promise<number> {
    const totalFarmers = prisma.producer.count();
    return totalFarmers;
  }

  async totalFarmersPerState(): Promise<any> {
    const totalFarmersByState = prisma.producer.groupBy({
      by: ["state"],
      _count: true,
    });
    return totalFarmersByState;
  }

  async totalArea(): Promise<any> {
    const totalArea = prisma.producer.aggregate({
      _sum: {
        totalArea: true,
      },
    });
    return totalArea;
  }

  async totalAreaHarvested(): Promise<any> {
    const totalAreaHarvested = prisma.producer.aggregate({
      _sum: {
        areaHarvested: true,
      },
    });
    return totalAreaHarvested;
  }

  async totalAreaPlanted(): Promise<any> {
    const totalAreaPlanted = prisma.producer.aggregate({
      _sum: {
        areaPlanted: true,
      },
    });
    return totalAreaPlanted;
  }

  async totalAreaPerState(): Promise<any> {
    const totalFarmersPerState = prisma.producer.groupBy({
      by: ["state"],
      _sum: {
        totalArea: true,
      },
    });
    return totalFarmersPerState;
  }

  async totalAreaPerCulture(): Promise<any> {
    const totalAreaPerCulture = prisma.producer.groupBy({
      by: ["culture"],
      _sum: {
        totalArea: true,
      },
    });
    return totalAreaPerCulture;
  }
}
