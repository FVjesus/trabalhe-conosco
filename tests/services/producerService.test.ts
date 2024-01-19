import { ProducerRepository } from "../../src/repositories/producerRepository";
import { producerService } from "../../src/services/producerService";
import { prismaMock } from "../../singleton";

describe("producerService", () => {
  const producerMock = {
    id: 1,
    document: "04095791063",
    producerName: "Trajano",
    farmName: "Fazenda Trajano",
    city: "Sete Lagoas",
    state: "MG",
    totalArea: 100,
    areaPlanted: 50,
    areaHarvested: 50,
    culture: ["Soja"],
  };

  it("Should get all producers", async () => {
    prismaMock.producer.findMany.mockResolvedValueOnce([producerMock]);

    const producers = await producerService.getAll();

    expect(producers).toEqual([producerMock]);
  });

  it("Should get producer by id", async () => {
    prismaMock.producer.findUnique.mockResolvedValueOnce(producerMock);

    const producer = await producerService.getById(1);

    expect(producer).toEqual(producerMock);
  });

  it("Should create a producer", async () => {
    prismaMock.producer.create.mockResolvedValueOnce(producerMock);

    const producer = await producerService.create(producerMock);

    expect(producer).toEqual(producerMock);
  });

  it("Should update a producer", async () => {
    prismaMock.producer.update.mockResolvedValueOnce(producerMock);

    const producer = await producerService.update(1, producerMock);

    expect(producer).toEqual(producerMock);
  });

  it("Should delete a producer", async () => {
    prismaMock.producer.delete.mockResolvedValueOnce(producerMock);

    await producerService.delete(1);

    expect(prismaMock.producer.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });
});
