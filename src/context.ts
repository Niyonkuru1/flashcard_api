import { PrismaClient } from "@prisma/client";
import { NexusGenObjects } from "../nexus-typegen";
export const prisma = new PrismaClient();
const blogs: NexusGenObjects["newOne"][] = [
  {
    // root type
    question: "one of the biggest challenge ever", // String!
    subjectId: "e79a6083-7d68-4aee-b6c3-e33a234d0ea0", // String!
    answer: "the man of the match", // String!
  },
  {
    // root type
    question: "lorem ipsum lorem ipsum asjkhchxjkvbzxjcnzxjhasndcxjb", // String!
    subjectId: "ae2e517a-a972-4689-a0ad-a172e7e8158e", // String!
    answer: "winners", // String!
  },
  {
    // root type
    question:
      "one of the biggest challenge ever one of the biggest challenge ever one of the biggest challenge ever", // String!
    subjectId: "845c0381-112f-41a2-8e08-e6be83269542", // String!
    answer: "reepated stringing", // String!
  },
];
export interface Context {
  // 1
  prisma: PrismaClient;
  blogs: NexusGenObjects["newOne"][];
}

export const context: Context = {
  // 2
  prisma,
  blogs
};


// 1: First you have defined the Context interface, which specifies what objects will be attached to the context object. Right now it’s just an instance of PrismaClient, but this can change as the project grows.
// 2: You’re exporting the context object, so that it can be imported and used by the GraphQL server.