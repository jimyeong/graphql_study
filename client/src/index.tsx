import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { wsLink } from "./Links/Subscription";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  from,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  link: from([wsLink]),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const ApolloApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
root.render(ApolloApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
