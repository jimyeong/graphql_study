import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscription",
    connectionParams: {
      authentication: "Bearer tokennnnnn",
    },
  })
);

export { wsLink };
