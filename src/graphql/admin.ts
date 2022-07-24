import {
  objectType,
  stringArg,
  extendType,
  nonNull,
} from "nexus";
import {  NexusGenScalars } from "../../nexus-typegen";

export const userNew = objectType({
  name: "newUser",
  definition(t) {
    t.string("id");
    t.nonNull.string("firstName");
    t.nonNull.string("secondName");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("adminId");
  },
});
export const admin = objectType({
  name: "newAdmin",
  definition(t) {
    t.string("id");
    t.nonNull.string("firstName");
    t.nonNull.string("secondName");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.list.field("users", {
      type: "newUser",
    });
  },
});

const deleteMsg: NexusGenScalars["String"] =
  "Hello you have deleted << ADMIN >> successfully!!";

export const QueryAdmin = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allAdmins", {
      type: "newAdmin",
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const allBlogs = await prisma.admin.findMany({
          include: {
            users: true, // Include all users in the returned object
          },
        });
        return allBlogs;
      },
    });
    t.nonNull.field("oneAdmin", {
      type: "newAdmin",
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { id } = args;
        const oneAdminData = await prisma.admin.findUnique({
          where: {
            id,
          },
          include: {
            users: true, // Include all users in the returned object
          },
        });
        return oneAdminData;
      },
    });
  },
});

export const MutationAdmin = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_admin", {
      type: "newAdmin",
      args: {
        firstName: nonNull(stringArg()),
        secondName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { secondName, email, password, firstName } = args;
        const newAdmin = {
          firstName,
          password,
          email,
          secondName,
        };
        const newAdminAdded = await prisma.admin.create({
          data: newAdmin,
          include: {
            users: true, // Include all users in the returned object
          },
        });
        return newAdminAdded;
      },
    });
    t.nonNull.field("update_admin", {
      type: "newAdmin",
      args: {
        id: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { blogs, prisma }, info) {
        const { email, password, id } = args;
        const updatedAdminData = await prisma.admin.update({
          where: {
            id,
          },
          data: {
            email,
            password,
          },
          include: {
            users: true, // Include all users in the returned object
          },
        });
        return updatedAdminData;
      },
    });
    t.nonNull.string("delete_admin", {
      args: {
        id: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
        const { id } = args;
        await prisma.admin.delete({
          where: {
            id,
          },
        });
        return deleteMsg;
      },
    });
  },
});
