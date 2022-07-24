import { objectType, stringArg, extendType, nonNull } from "nexus";
import { NexusGenScalars } from "../../nexus-typegen";

export const newBlogSchemas = objectType({
  name: "newBlogObjects",
  definition(t) {
   t.string("id");
   t.nonNull.string("question");
   t.nonNull.string("answer");
   t.nonNull.string("subjectId");
  },
});

const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted << BLOG >> successfully!!";

export const QueryBlog = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allBlogs", {
      type: "newBlogObjects",
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const allBlogs = await prisma.blog.findMany();
        return allBlogs;
      },
    });
    t.nonNull.field("oneBlog", {
      type: "newBlogObjects",
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
        return oneBlogData;
      },
    });
  },
});

export const MutationBlog = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_blog", {
      type: "newBlogObjects",
      args: {
        question: nonNull(stringArg()),
        answer: nonNull(stringArg()),
        subjectId: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { question, answer, subjectId } = args;
        const newBlogAdded = await prisma.blog.create({
          //@ts-ignore
          data: {
            question,
            answer,
            subjectId
          },
        });
        return newBlogAdded;
      },
    });
    t.nonNull.field("update_blog", {
      type: "newBlogObjects",
      args: {
        id: nonNull(stringArg()),
        answer: nonNull(stringArg()),
        question: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { question, id, answer } = args;
        const updatedBlogData = await prisma.blog.update({
          where: {
            id,
          },
          data: {

            answer,
            question,
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
      async resolve(parent, args, { prisma }, info) {
        const { id } = args;
        await prisma.blog.delete({
          where: {
            id,
          },
        });
        return deleteMsg;
      },
    });
  },
});
