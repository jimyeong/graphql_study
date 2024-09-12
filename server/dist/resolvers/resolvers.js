import { PubSub } from "graphql-subscriptions";
// Resolver map
const pubsub = new PubSub();
const resolvers = {
    Mutation: {
        createPost: (parent, variables) => {
            console.log("@what's parents", parent);
            console.log("@@variables", variables);
            // console.log("@@postController", postController);
            pubsub.publish("POST_CREATED", { postCreated: variables });
            // return postController.createPost(variables);
            return variables;
        },
    },
    Query: {
        hello: () => "Hello world!",
    },
    Subscription: {
        postCreated: {
            subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
        },
    },
};
export { resolvers };
