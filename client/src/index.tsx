import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
