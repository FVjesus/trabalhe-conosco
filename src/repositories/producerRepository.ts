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
}
