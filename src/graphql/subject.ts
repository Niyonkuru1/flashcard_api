import { objectType, stringArg, extendType, nonNull } from "nexus";
import { NexusGenScalars } from "../../nexus-typegen";

export const newBlogObjects = objectType({
  name: "newBlogObject",
  definition(t) {
    t.string("id");
    t.nonNull.string("question");
    t.nonNull.string("answer");
    t.nonNull.string("subjectId");
  },
});
export const newSubjectSchemas = objectType({
  name: "newSubjectObject",
  definition(t) {
    t.string("id");
    t.nonNull.string("name");
    t.nonNull.string("userId");
    t.list.field("blogs", {
      type: "newBlogObject",
    });
  },
});

const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted << SUBJECT >> successfully!!";

export const QuerySubject = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allSubjects", {
      type: "newSubjectObject",
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const allSubjects = await prisma.subject.findMany({
          include: {
            blogs: true, // Include all users in the returned object
          },
        });
        return allSubjects;
      },
    });
    t.nonNull.field("oneSubject", {
      type: "newSubjectObject",
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        const oneSubjectData = await prisma.subject.findUnique({
          where: {
            id,
          },
          include: {
            blogs: true, // Include all users in the returned object
          },
        });
        return oneSubjectData;
      },
    });
  },
});

export const MutationSubject = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_subject", {
      type: "newSubjectObject",
      args: {
        userId: nonNull(stringArg()),
        name: nonNull(stringArg())
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { userId, name } = args;
        const newSubjectAdded = await prisma.subject.create({
          data: {
            //@ts-ignore
            userId,
            name,
          },
          include: {
            blogs: true, // Include all users in the returned object
          },
        });
        return newSubjectAdded;
      },
    });
    t.nonNull.field("update_subject", {
      type: "newSubjectObject",
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { name, id } = args;
        const updatedUserData = await prisma.subject.update({
          where: {
            id,
          },
          data: {
            name,
          },
          include: {
            blogs: true, // Include all users in the returned object
          },
        });
        return updatedUserData;
      },
    });
    t.nonNull.string("delete_subject", {
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
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
