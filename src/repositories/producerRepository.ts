import { db } from "../db";
import { Producer } from "../models/producer";

export class ProducerRepository {
  async getAll(): Promise<Producer[]> {
    const producers = await db.any("SELECT * FROM producers");
    return producers;
  }

  async getById(id: number): Promise<Producer> {
    const producer = await db.one("SELECT * FROM producers WHERE id = $1", id);
    return producer;
  }

  async create(producer: Producer): Promise<Producer> {
    const newProducer = await db.one(
      "INSERT INTO producers (name) VALUES (${name}) RETURNING *",
      producer
    );
    return newProducer;
  }

  async update(producer: Producer): Promise<Producer> {
    const updatedProducer = await db.one(
      "UPDATE producers SET name = ${name} WHERE id = ${id} RETURNING *",
      producer
    );
    return updatedProducer;
  }

  async delete(id: number): Promise<Producer> {
    const deletedProducer = await db.one(
      "DELETE FROM producers WHERE id = $1 RETURNING *",
      id
    );
    return deletedProducer;
  }
}