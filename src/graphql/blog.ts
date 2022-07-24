import {
  objectType,
  arg,
  stringArg,
  inputObjectType,
  extendType,
  nonNull,
} from "nexus";
import { NexusGenObjects, NexusGenScalars } from "../../nexus-typegen";
import { v4 as uuid } from "uuid";



export const blog = objectType({
  name: "newOne",
  definition(t) {
    t.string("id");
    t.nonNull.string("question");
    t.nonNull.string("answer");
    t.nonNull.string("subjectId");
  },
});

// export const newBlog = inputObjectType({
//   name: "newBlog",
//   definition(t) {
//     t.nonNull.string("question");
//     t.nonNull.string("answer");
//     t.nonNull.string("subjectId");
//   },
// });


const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted it successfully!!";

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allBlogs", {
      type: "newOne",
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const allBlogs = await prisma.blog.findMany();
        return allBlogs;
      },
    });
    t.nonNull.field("oneBlog", {
      type: "newOne",
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        const oneBlogData = await prisma.blog.findUnique({
          where: {
            id,
          },
        });
        // console.log(oneBlogData);
        return oneBlogData;
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_blog", {
      type: "newOne",
      args: {
        answer: nonNull(stringArg()),
        question: nonNull(stringArg()),
        subjectId: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { answer, question, subjectId } = args;
        const newBlog = {
          answer,
          question,
          subjectId,
        };
        const newBlogAdded: NexusGenObjects["newOne"] =
          await prisma.blog.create({ data: newBlog });
        return newBlogAdded;
      },
    });
    t.nonNull.field("update_blog", {
      type: "newOne",
      args: {
        answer: nonNull(stringArg()),
        question: nonNull(stringArg()),
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { answer, question, id } = args;
        const updatedBlogData = await prisma.blog.update({
          where: {
            id,
          },
          data: {
           answer,
           question
          },
        });
        return updatedBlogData;
      },
    });
    t.nonNull.string("delete_blog", {
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
     async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        await prisma.blog.delete({
          where: {
            id
          }
        });
        return deleteMsg;
      },
    });
  },
});

