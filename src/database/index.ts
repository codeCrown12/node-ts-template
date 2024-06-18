import { PrismaClient } from '@prisma/client';

class Prisma {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect() {
    await this.client.$connect();
  }

  async disconnect() {
    await this.client.$disconnect();
  }

  getClient() {
    return this.client;
  }
}

export default new Prisma();
