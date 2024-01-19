import { ProducerRepository } from "../../src/repositories/producerRepository";
import { prismaMock } from "../../singleton";

describe("Producer Repository", () => {
  let producerRepository: ProducerRepository;
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

  beforeEach(() => {
    producerRepository = new ProducerRepository();
  });

  it("should get all producers", async () => {
    prismaMock.producer.findMany.mockResolvedValueOnce([producerMock]);

    const producers = await producerRepository.getAll();

    expect(producers).toEqual([producerMock]);
    expect(prismaMock.producer.findMany).toHaveBeenCalledWith();
  });

  it("should get producer by id", async () => {
    prismaMock.producer.findUnique.mockResolvedValueOnce(producerMock);

    const producer = await producerRepository.getById(1);

    expect(producer).toEqual(producerMock);
    expect(prismaMock.producer.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it("should create a producer", async () => {
    prismaMock.producer.create.mockResolvedValueOnce(producerMock);

    const producer = await producerRepository.create(producerMock);

    expect(producer).toEqual(producerMock);
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: producerMock,
    });
  });

  it("should update a producer", async () => {
    prismaMock.producer.update.mockResolvedValueOnce(producerMock);

    const producer = await producerRepository.update(1, producerMock);

    expect(producer).toEqual(producerMock);
    expect(prismaMock.producer.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: producerMock,
    });
  });

  it("should delete a producer", async () => {
    prismaMock.producer.delete.mockResolvedValueOnce(producerMock);

    const producer = await producerRepository.delete(1);

    expect(producer).toEqual(producerMock);
    expect(prismaMock.producer.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it("should get total farmers", async () => {
    const totalFarmersMock = 1;

    prismaMock.producer.count.mockResolvedValueOnce(totalFarmersMock);

    const totalFarmers = await producerRepository.totalFarmers();

    expect(totalFarmers).toEqual(totalFarmersMock);
    expect(prismaMock.producer.count).toHaveBeenCalledWith();
  });

  it("should get total area", async () => {
    const totalAreaMock = {
      _sum: {
        totalArea: 100,
      },
      _count: {},
      _avg: {},
      _min: {},
      _max: {},
    };

    prismaMock.producer.aggregate.mockResolvedValueOnce(totalAreaMock);

    const totalArea = await producerRepository.totalArea();

    expect(totalArea).toEqual(totalAreaMock);
    expect(prismaMock.producer.aggregate).toHaveBeenCalledWith({
      _sum: {
        totalArea: true,
      },
    });
  });

  it("should get total area harvested", async () => {
    const totalAreaHarvestedMock = {
      _sum: {
        areaHarvested: 100,
      },
      _count: {},
      _avg: {},
      _min: {},
      _max: {},
    };

    prismaMock.producer.aggregate.mockResolvedValueOnce(totalAreaHarvestedMock);

    const totalAreaHarvested = await producerRepository.totalAreaHarvested();

    expect(totalAreaHarvested).toEqual(totalAreaHarvestedMock);
    expect(prismaMock.producer.aggregate).toHaveBeenCalledWith({
      _sum: {
        areaHarvested: true,
      },
    });
  });

  it("should get total area planted", async () => {
    const totalAreaPlantedMock = {
      _sum: {
        areaPlanted: 100,
      },
      _count: {},
      _avg: {},
      _min: {},
      _max: {},
    };

    prismaMock.producer.aggregate.mockResolvedValueOnce(totalAreaPlantedMock);

    const totalAreaPlanted = await producerRepository.totalAreaPlanted();

    expect(totalAreaPlanted).toEqual(totalAreaPlantedMock);
    expect(prismaMock.producer.aggregate).toHaveBeenCalledWith({
      _sum: {
        areaPlanted: true,
      },
    });
  });
});
