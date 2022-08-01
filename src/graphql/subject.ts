import { objectType, stringArg, extendType, nonNull, intArg } from "nexus";
import { NexusGenScalars } from "../../nexus-typegen";

export const newBlogObjects = objectType({
  name: "newBlogObject",
  definition(t) {
    t.string("id");
    t.nonNull.string("question");
    t.nonNull.string("answer");
    t.nonNull.string("subjectId");
    t.nonNull.int("take");
    t.nonNull.int("skip");
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
      // args: {
      //   take: nonNull(intArg()),
      //   skip: nonNull(intArg()),
      // },
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        // for pagination
        // const { take, skip } = args;
        const allSubjects = await prisma.subject.findMany({
          // take,
          // skip,
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
      async resolve(parent, args, { userId, prisma }, info) {
        const { id } = args;
        if (!userId) {
          throw new Error(
            "You are not authorised to view the subject if not signed in"
          );
        }
        // if (postedById?.userId !== userId) {
        //   throw new Error(
        //     "You are not allowed to update the subject WHICH YOU DO NOT CREATE "
        //   );
        // }
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
        name: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const { name, userId } = args;
        const newSubjectAdded = await prisma.subject.create({
          //@ts-ignore
          data: {
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
        // const postedById = await prisma.subject.findUnique({
        //   where: {
        //     id,
        //   },
        // });
        // if (!userId) {
        //   throw new Error(
        //     "You are not authorised to update the subject if not signed in"
        //   );
        // }
        // if (postedById?.userId !== userId) {
        //   throw new Error(
        //     "You are not allowed to update the subject WHICH YOU DO NOT CREATE "
        //   );
        // }
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
      async resolve(parent, args, { prisma, userId }, info) {
        const { id } = args;
        // const postedById = await prisma.subject.findUnique({
        //   where: {
        //     id,
        //   },
        // });
        // if (!userId) {
        //   throw new Error(
        //     "You are not authorised to delete the subject if not signed in"
        //   );
        // }
        // if (postedById?.userId !== userId) {
        //   throw new Error(
        //     "You are not allowed to delete the subject WHICH YOU DO NOT CREATE "
        //   );
        // }
        try {
           await prisma.subject.delete({
          where: {
            id,
          },
        });
        return deleteMsg;
        } catch(error) {
         if (error) {
          throw new Error("You are not allowed to delete the subjects which contains the cards, first delete the cards!!")
         }
        }
      },
    });
  },
});
