import { PrismaClient } from "@prisma/client";
import { ServerInfo } from "apollo-server";
import { execSync } from "child_process";
import getPort, { makeRange } from "get-port";
import { GraphQLClient } from "graphql-request";
import { join } from "path";
import { Database } from "sqlite3";
import { db } from "../src/db/db";
import { server } from "../src/server";

type TestContext = {
  client: GraphQLClient;
  db: PrismaClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    const db = await prismaCtx.before();

    Object.assign(ctx, {
      client,
      db,
    });
  });

  afterEach(async () => {
    await graphqlCtx.after();
    await prismaCtx.after();
  });

  return ctx;
}

function graphqlTestContext() {
  let serverInstance: ServerInfo | null = null;

  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) });
      serverInstance = await server.listen({ port });

      return new GraphQLClient(`http://localhost:${port}`);
    },
    async after() {
      serverInstance?.server.close();
    },
  };
}

function prismaTestContext() {
  const prismaBinary = join(__dirname, "..", "node_modules", ".bin", "prisma");
  let prismaClient: null | PrismaClient = null;

  return {
    async before() {
      // Run the migrations to ensure our schema has the required structure
      execSync(`${prismaBinary} db push`);

      // Construct a new Prisma Client connected to the generated schema
      prismaClient = new PrismaClient();

      return prismaClient;
    },
    async after() {
      // Drop the schema after the tests have completed
      const client = new Database(":memory:");

      await client.close();

      // Release the Prisma Client connection
      await prismaClient?.$disconnect();
    },
  };
}
