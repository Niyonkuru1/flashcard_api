import { objectType, stringArg, extendType, nonNull } from "nexus";
import { NexusGenScalars } from "../../nexus-typegen";

export const newSubject = objectType({
  name: "newSubject",
  definition(t) {
    t.string("id");
    t.nonNull.string("name");
    t.nonNull.string("userId");
  },
});
export const newUserSchema = objectType({
  name: "newUserObject",
  definition(t) {
    t.string("id");
    t.nonNull.string("firstName");
    t.nonNull.string("secondName");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("adminId");
    t.list.field("subjects", {
      type: "newSubject",
    });
  },
});

const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted << USER >> successfully!!";

export const QueryUser = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "newUserObject",
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const allUsers = await prisma.user.findMany({
          include: {
            subjects: true, // Include all users in the returned object
          },
        });
        return allUsers;
      },
    });
    t.nonNull.field("oneUser", {
      type: "newUserObject",
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        const oneUserData = await prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            subjects: true, // Include all users in the returned object
          },
        });
        return oneUserData;
      },
    });
  },
});

export const MutationUser = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_user", {
      type: "newUserObject",
      args: {
        firstName: nonNull(stringArg()),
        secondName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        adminId: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { secondName, email, password, firstName, adminId } = args;
        const newUser = {
          firstName,
          password,
          email,
          secondName,
          adminId,
        };
        const newUserAdded = await prisma.user.create({
          data: newUser,
          include: {
            subjects: true, // Include all users in the returned object
          },
        });
        return newUserAdded;
      },
    });
    t.nonNull.field("update_user", {
      type: "newUserObject",
      args: {
        id: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { email, password, id } = args;
        const updatedUserData = await prisma.user.update({
          where: {
            id,
          },
          data: {
            email,
            password,
          },
          include: {
            subjects: true, // Include all users in the returned object
          },
        });
        return updatedUserData;
      },
    });
    t.nonNull.string("delete_user", {
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const { id } = args;
        await prisma.user.delete({
          where: {
            id,
          },
        });
        return deleteMsg;
      },
    });
  },
});
