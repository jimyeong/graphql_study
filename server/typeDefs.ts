const typeDefs = `#graphql
    type Query{
        hello: String
    }
    type Mutation{
        createPost(author: String, comment: String):Post
    }
    type Post{
        author: String
        comment: String
    }
    type Subscription{
        postCreated: Post
        
    }
`;

export { typeDefs };
