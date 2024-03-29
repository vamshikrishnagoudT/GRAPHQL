// index.ts
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { AccountResolver } from "./resolvers/AccountResolver";
import { InviteResolver } from "./resolvers/InviteResolver";
import { UserResolver } from "./resolvers/UserResolver";

async function main() {
  await createConnection({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: ["./entities/*.ts"],
  });

  const schema = await buildSchema({
    resolvers: [AccountResolver, InviteResolver, UserResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

main();
