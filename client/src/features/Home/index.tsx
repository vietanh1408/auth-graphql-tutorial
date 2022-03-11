import React from "react";
import { useUsersQuery } from "src/generated/graphql";

const Home: React.FC = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "no-cache" });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ul>
      {data?.users.map((user) => {
        return <li key={user.id}>{user.username}</li>;
      })}
    </ul>
  );
};

export default Home;
