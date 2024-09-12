import React from "react";
import { useQuery, useSubscription, gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation createPost($author: String!, $comment: String!) {
    createPost(author: $author, comment: $comment) {
      author
      comment
    }
  }
`;

const SUBSCRIPTION_UPDATED = gql`
  subscription postFeed {
    postCreated {
      author
      comment
    }
  }
`;

function App() {
  const [createPost, {}] = useMutation(CREATE_POST, {
    variables: { author: "hello", comment: "world" },
  });
  const { data, loading } = useSubscription(SUBSCRIPTION_UPDATED);
  const { postCreated } = data || {};
  return (
    <div className="App">
      <button
        onClick={() => {
          createPost();
        }}
      >
        helloworld
      </button>
      {loading && "loading"}
      {data && (
        <div>
          author:{" "}
          <span>
            <b>{postCreated.author}</b>
          </span>
        </div>
      )}
      {data && (
        <div>
          comment:{" "}
          <span>
            <b>{postCreated.comment}</b>
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
