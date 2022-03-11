require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import "reflect-metadata";
import { Context } from "./types/context";
import refreshTokenRouter from "./routes/refreshToken";
import cookieParser from "cookie-parser";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core/dist/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "auth-tutorial",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = express();

  app.use(cookieParser());
  app.use("/refresh_token", refreshTokenRouter);

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [UserResolver],
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    context: ({ req, res }): Pick<Context, "req" | "res"> => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void)
  );

  console.log(
    `Server start at port ${PORT} and playground graphql on http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};
main().catch((err) => console.log("err", err));
