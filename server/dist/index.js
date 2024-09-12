import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
// import { resolvers } from "./resolvers/resolvers";
// import { typeDefs } from "./typeDefs";
import { WebSocketServer } from "ws";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
// Schema definition
// A number that we'll increment over time to simulate subscription events
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);
// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscription",
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});
await server.start();
app.use("/graphql", cors(), express.json(), expressMiddleware(server));
const port = 4000;
httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
