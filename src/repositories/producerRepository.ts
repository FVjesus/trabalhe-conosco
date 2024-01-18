import { Producer } from "../models/producer";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export class ProducerRepository {
  async getAll(): Promise<Producer[]> {
    const producers = db.producer.findMany();
    return producers;
  }

  async getById(id: number): Promise<Producer | null> {
    const producer = db.producer.findUnique({
      where: {
        id: id,
      },
    });
    return producer;
  }

  async create(producer: Producer): Promise<Producer> {
    const newProducer = db.producer.create({
      data: producer,
    });
    return newProducer;
  }

  async update(producer: Producer): Promise<Producer> {
    const updatedProducer = db.producer.update({
      where: {
        id: producer.id,
      },
      data: producer,
    });
    return updatedProducer;
  }

  async delete(id: number): Promise<Producer> {
    const deletedProducer = db.producer.delete({
      where: {
        id: id,
      },
    });
    return deletedProducer;
  }

  async totalFarmers(): Promise<number> {
    const totalFarmers = db.producer.count();
    return totalFarmers;
  }

  async totalFarmersPerState(): Promise<any> {
    const totalFarmersByState = db.producer.groupBy({
      by: ["state"],
      _count: true,
    });
    return totalFarmersByState;
  }

  async totalArea(): Promise<any> {
    const totalArea = db.producer.aggregate({
      _sum: {
        totalArea: true,
      },
    });
    return totalArea;
  }

  async totalAreaHarvested(): Promise<any> {
    const totalAreaHarvested = db.producer.aggregate({
      _sum: {
        areaHarvested: true,
      },
    });
    return totalAreaHarvested;
  }

  async totalAreaPlanted(): Promise<any> {
    const totalAreaPlanted = db.producer.aggregate({
      _sum: {
        areaPlanted: true,
      },
    });
    return totalAreaPlanted;
  }

  async totalAreaPerState(): Promise<any> {
    const totalFarmersPerState = db.producer.groupBy({
      by: ["state"],
      _sum: {
        totalArea: true,
      },
    });
    return totalFarmersPerState;
  }

  async totalAreaPerCulture(): Promise<any> {
    const totalAreaPerCulture = db.producer.groupBy({
      by: ["culture"],
      _sum: {
        totalArea: true,
      },
    });
    return totalAreaPerCulture;
  }
}
