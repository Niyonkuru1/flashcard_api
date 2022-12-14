import { ApolloServer } from "apollo-server";
import { context } from "./context"; 
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"; 

import { schema } from "./schema";
export const server = new ApolloServer({
  schema,
  context,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const port = process.env.PORT || 4000;

server.listen({port}).then(({url})=> console.log(`The server started at ${url}`));