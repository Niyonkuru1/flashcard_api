// export const Link = objectType({
//   name: "Link",
//   definition(t) {
//     t.nonNull.int("id");
//     t.nonNull.string("description");
//     t.nonNull.string("url");
//   },
// });

// let links: NexusGenObjects["Link"][] = [
//   // 1
//   {
//     id: 1,
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
//   {
//     id: 2,
//     url: "graphql.org",
//     description: "GraphQL official website",
//   },
// ];

// const newLink: NexusGenObjects["Link"] = {
//   id: 10,
//   url: "www.howtographql.com",
//   description: "added from the server is now running well",
// };

// export const LinkQuery = extendType({
//   type: "Query",
//   definition(t) {
//     t.nonNull.list.nonNull.field("feedMe", {
//       type: "Link",
//       resolve(parent, args, context, info) {
//         return links;
//       },
//     });
//       t.field("feed", {
//         type: "Link",
//         args: { id: nonNull(intArg()) },
//       //@ts-ignore
//         resolve(parent, args, context, info) {
//           const { id } = args;
//           const found = links.find((link) => link.id === id);
//           return found;
//         },
//       });
//   },
// });

// export const LinkMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("feed", {
//       type: "Link",
//       args: { description: nonNull(stringArg()), url: nonNull(stringArg()) },

//       resolve(parent, args, context, info) {
//         const { description, url } = args;
//         const id = links.length + 1;
//         const createdData = {
//           id,
//           url,
//           description,
//         };
//         links.push(createdData);
//         return createdData;
//       },
//     }
//     );
//   },
// });
