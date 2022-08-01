import {
  objectType,
  stringArg,
  extendType,
  nonNull,
  intArg,
  booleanArg,
} from "nexus";
import { NexusGenScalars } from "../../nexus-typegen";

export const newBlogSchemas = objectType({
  name: "newBlogObjects",
  definition(t) {
    t.string("id");
    t.nonNull.string("question");
    t.nonNull.string("answer");
    t.nonNull.string("subjectId");
    t.nonNull.int("take");
    t.nonNull.int("skip");
  },
});

const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted << BLOG >> successfully!!";

export const QueryBlog = extendType({
  type: "Query",

  definition(t) {
    t.nonNull.list.nonNull.field("allBlogs", {
      type: "newBlogObjects",
      args: {
        take: nonNull(intArg()),
        skip: nonNull(intArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const { take,skip } = args;
          const allBlogs = await prisma.blog.findMany({
            take,
            skip
          });
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
      async resolve(parent, args, { userId, adminId, prisma }, info) {
        const { question, answer, subjectId} = args;
        // const subjectId = "ff09c194-873e-410c-b4cd-84f912aa413a";
        const newBlogAdded = await prisma.blog.create({
          //@ts-ignore
          data: {
            question,
            answer,
            subjectId,
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
        // const categoryId = await prisma.blog.findUnique({
        //   where: {
        //     id,
        //   },
        // });
        // const postedById = await prisma.subject.findUnique({
        //   where: {
        //     id: categoryId?.subjectId,
        //   },
        // });
      //  const userId = "debe31a0-810e-4dc2-aab2-c28a0f48ebe8";
        // if (!userId) {
        //   throw new Error(
        //     "You are not authorised to update the card if not signed in"
        //   );
        // }
        // if (postedById?.userId !== userId) {
        //   throw new Error(
        //     "You are not allowed to update the card which you do not create "
        //   );
        // }
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
      async resolve(parent, args, { prisma, userId }, info) {
        const { id } = args;
        // const categoryId = await prisma.blog.findUnique({
        //   where: {
        //     id,
        //   },
        // });
        // const postedById = await prisma.subject.findUnique({
        //   where: {
        //     id: categoryId?.subjectId,
        //   },
        // });
        // if (!userId) {
        //   throw new Error(
        //     "You are not authorised to delete the card if not signed in"
        //   );
        // }
        // if (postedById?.userId !== userId) {
        //   throw new Error(
        //     "You are not allowed to delete the card which you do not create"
        //   );
        // }
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
