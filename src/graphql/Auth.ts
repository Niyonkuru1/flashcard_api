import { stringArg, extendType, nonNull } from "nexus";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../../config";


export interface AuthTokenPayload {
  // 1
  userId: string;
  adminId:string
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  // console.log(authHeader);
  // 2
  const token = authHeader.replace("Bearer ", ""); // 3
  // console.log(token);
  if (!token) {
    throw new Error("No token found");
  }
  const decodedData = jwt.verify(token, config.jwt.JWT_SECRET);
  return  decodedData as AuthTokenPayload; // 4
}



export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("create_user", {
      type: "UserLoginPayload",
      args: {
        firstName: nonNull(stringArg()),
        secondName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },

      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: args.email,
            },
          });
          if (existingUser) {
            throw new Error("User already exists.");
          }
          const hashedPassword = bcrypt.hashSync(args.password, 10);
          const adminId = "820ea0cf-c1c7-4449-987a-ed667c6adc51";
          const createdUser = await prisma.user.create({
            data: {
              firstName: args.firstName,
              secondName: args.secondName,
              email: args.email,
              adminId,
              password: hashedPassword,
            },
          });
          const token = jwt.sign(
            { userId: createdUser.id, adminId: adminId },
            config.jwt.JWT_SECRET
          );
          return {
            user: createdUser,
            token,
          };
      },
    });
    t.nonNull.field("login_user", {
      type: "UserLoginPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },

      //@ts-ignore
      async resolve(parent, args, { prisma }, info) {
          const adminId = "820ea0cf-c1c7-4449-987a-ed667c6adc51";
        const { email, password } = args;
          const existingUser = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!existingUser) {
            throw new Error("User DOES NOT exists");
          }
          const Valid = await bcrypt.compare(password, existingUser.password);
          console.log(Valid)
          if (!Valid) {
            throw new Error("Invalid password or email!");
          }
          const token = jwt.sign(
            { userId: existingUser.id, adminId: adminId },
            config.jwt.JWT_SECRET
          );
          return {
            user: existingUser,
            token,
          };
      },
    });
  },
});
