import {
  objectType,
  arg,
  stringArg,
  inputObjectType,
  extendType,
  nonNull,
} from "nexus";
import { NexusGenObjects, NexusGenScalars } from "../../nexus-typegen";

export const subject = objectType({
  name: "newSubject",
  definition(t) {
    t.string("id");
    t.nonNull.string("name");
    t.nonNull.string("userId");
  },
});

const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted it successfully!!";

export const QuerySubject = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allSubjects", {
      type: "newSubject",
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const allBlogs = await prisma.subject.findMany();
        return allBlogs;
      },
    });
    t.nonNull.field("oneSubject", {
      type: "newSubject",
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        const oneBlogData = await prisma.subject.findUnique({
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

export const MutationSubject = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_subject", {
      type: "newSubject",
      args: {
        name: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        id: stringArg(),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { name, userId, id} = args;
        const newSubject = {
          userId,
          name
        };
        const newSubjectAdded =
          await prisma.subject.create({ data: newSubject });
        return newSubjectAdded;
      },
    });
    t.nonNull.field("update_subject", {
      type: "newSubject",
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { name, id } = args;
        const updatedSubjectData = await prisma.subject.update({
          where: {
            id,
          },
          data: {
            name
          },
        });
        return updatedSubjectData;
      },
    });
    t.nonNull.string("delete_delete", {
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        await prisma.subject.delete({
          where: {
            id,
          },
        });
        return deleteMsg;
      },
    });
  },
});
