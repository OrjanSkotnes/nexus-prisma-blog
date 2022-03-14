import { ApolloServer } from "apollo-server";
import { context } from "./utils/context";
import { schema } from "./schema";

export const server = new ApolloServer({ schema, context });
