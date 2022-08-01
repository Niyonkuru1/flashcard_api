/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  UserLoginPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['newUserObject'] | null; // newUserObject
  }
  newAdmin: { // root type
    email: string; // String!
    firstName: string; // String!
    id?: string | null; // String
    password: string; // String!
    secondName: string; // String!
    users?: Array<NexusGenRootTypes['newUser'] | null> | null; // [newUser]
  }
  newBlogObject: { // root type
    answer: string; // String!
    id?: string | null; // String
    question: string; // String!
    skip: number; // Int!
    subjectId: string; // String!
    take: number; // Int!
  }
  newBlogObjects: { // root type
    answer: string; // String!
    id?: string | null; // String
    question: string; // String!
    skip: number; // Int!
    subjectId: string; // String!
    take: number; // Int!
  }
  newSubject: { // root type
    id?: string | null; // String
    name: string; // String!
    userId: string; // String!
  }
  newSubjectObject: { // root type
    blogs?: Array<NexusGenRootTypes['newBlogObject'] | null> | null; // [newBlogObject]
    id?: string | null; // String
    name: string; // String!
    userId: string; // String!
  }
  newUser: { // root type
    adminId: string; // String!
    email: string; // String!
    firstName: string; // String!
    id?: string | null; // String
    password: string; // String!
    secondName: string; // String!
  }
  newUserObject: { // root type
    adminId: string; // String!
    email: string; // String!
    firstName: string; // String!
    id?: string | null; // String
    password: string; // String!
    secondName: string; // String!
    subjects?: Array<NexusGenRootTypes['newSubject'] | null> | null; // [newSubject]
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    create_admin: NexusGenRootTypes['newAdmin']; // newAdmin!
    create_blog: NexusGenRootTypes['newBlogObjects']; // newBlogObjects!
    create_subject: NexusGenRootTypes['newSubjectObject']; // newSubjectObject!
    create_user: NexusGenRootTypes['UserLoginPayload']; // UserLoginPayload!
    delete_admin: string; // String!
    delete_blog: string; // String!
    delete_subject: string; // String!
    delete_user: string; // String!
    login_user: NexusGenRootTypes['UserLoginPayload']; // UserLoginPayload!
    update_admin: NexusGenRootTypes['newAdmin']; // newAdmin!
    update_blog: NexusGenRootTypes['newBlogObjects']; // newBlogObjects!
    update_subject: NexusGenRootTypes['newSubjectObject']; // newSubjectObject!
    update_user: NexusGenRootTypes['newUserObject']; // newUserObject!
  }
  Query: { // field return type
    allAdmins: NexusGenRootTypes['newAdmin'][]; // [newAdmin!]!
    allBlogs: NexusGenRootTypes['newBlogObjects'][]; // [newBlogObjects!]!
    allSubjects: NexusGenRootTypes['newSubjectObject'][]; // [newSubjectObject!]!
    allUsers: NexusGenRootTypes['newUserObject'][]; // [newUserObject!]!
    oneAdmin: NexusGenRootTypes['newAdmin']; // newAdmin!
    oneBlog: NexusGenRootTypes['newBlogObjects']; // newBlogObjects!
    oneSubject: NexusGenRootTypes['newSubjectObject']; // newSubjectObject!
    oneUser: NexusGenRootTypes['newUserObject']; // newUserObject!
  }
  UserLoginPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['newUserObject'] | null; // newUserObject
  }
  newAdmin: { // field return type
    email: string; // String!
    firstName: string; // String!
    id: string | null; // String
    password: string; // String!
    secondName: string; // String!
    users: Array<NexusGenRootTypes['newUser'] | null> | null; // [newUser]
  }
  newBlogObject: { // field return type
    answer: string; // String!
    id: string | null; // String
    question: string; // String!
    skip: number; // Int!
    subjectId: string; // String!
    take: number; // Int!
  }
  newBlogObjects: { // field return type
    answer: string; // String!
    id: string | null; // String
    question: string; // String!
    skip: number; // Int!
    subjectId: string; // String!
    take: number; // Int!
  }
  newSubject: { // field return type
    id: string | null; // String
    name: string; // String!
    userId: string; // String!
  }
  newSubjectObject: { // field return type
    blogs: Array<NexusGenRootTypes['newBlogObject'] | null> | null; // [newBlogObject]
    id: string | null; // String
    name: string; // String!
    userId: string; // String!
  }
  newUser: { // field return type
    adminId: string; // String!
    email: string; // String!
    firstName: string; // String!
    id: string | null; // String
    password: string; // String!
    secondName: string; // String!
  }
  newUserObject: { // field return type
    adminId: string; // String!
    email: string; // String!
    firstName: string; // String!
    id: string | null; // String
    password: string; // String!
    secondName: string; // String!
    subjects: Array<NexusGenRootTypes['newSubject'] | null> | null; // [newSubject]
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    create_admin: 'newAdmin'
    create_blog: 'newBlogObjects'
    create_subject: 'newSubjectObject'
    create_user: 'UserLoginPayload'
    delete_admin: 'String'
    delete_blog: 'String'
    delete_subject: 'String'
    delete_user: 'String'
    login_user: 'UserLoginPayload'
    update_admin: 'newAdmin'
    update_blog: 'newBlogObjects'
    update_subject: 'newSubjectObject'
    update_user: 'newUserObject'
  }
  Query: { // field return type name
    allAdmins: 'newAdmin'
    allBlogs: 'newBlogObjects'
    allSubjects: 'newSubjectObject'
    allUsers: 'newUserObject'
    oneAdmin: 'newAdmin'
    oneBlog: 'newBlogObjects'
    oneSubject: 'newSubjectObject'
    oneUser: 'newUserObject'
  }
  UserLoginPayload: { // field return type name
    token: 'String'
    user: 'newUserObject'
  }
  newAdmin: { // field return type name
    email: 'String'
    firstName: 'String'
    id: 'String'
    password: 'String'
    secondName: 'String'
    users: 'newUser'
  }
  newBlogObject: { // field return type name
    answer: 'String'
    id: 'String'
    question: 'String'
    skip: 'Int'
    subjectId: 'String'
    take: 'Int'
  }
  newBlogObjects: { // field return type name
    answer: 'String'
    id: 'String'
    question: 'String'
    skip: 'Int'
    subjectId: 'String'
    take: 'Int'
  }
  newSubject: { // field return type name
    id: 'String'
    name: 'String'
    userId: 'String'
  }
  newSubjectObject: { // field return type name
    blogs: 'newBlogObject'
    id: 'String'
    name: 'String'
    userId: 'String'
  }
  newUser: { // field return type name
    adminId: 'String'
    email: 'String'
    firstName: 'String'
    id: 'String'
    password: 'String'
    secondName: 'String'
  }
  newUserObject: { // field return type name
    adminId: 'String'
    email: 'String'
    firstName: 'String'
    id: 'String'
    password: 'String'
    secondName: 'String'
    subjects: 'newSubject'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    create_admin: { // args
      email: string; // String!
      firstName: string; // String!
      password: string; // String!
      secondName: string; // String!
    }
    create_blog: { // args
      answer: string; // String!
      question: string; // String!
      subjectId: string; // String!
    }
    create_subject: { // args
      name: string; // String!
      userId: string; // String!
    }
    create_user: { // args
      email: string; // String!
      firstName: string; // String!
      password: string; // String!
      secondName: string; // String!
    }
    delete_admin: { // args
      id: string; // String!
    }
    delete_blog: { // args
      id: string; // String!
    }
    delete_subject: { // args
      id: string; // String!
    }
    delete_user: { // args
      id: string; // String!
    }
    login_user: { // args
      email: string; // String!
      password: string; // String!
    }
    update_admin: { // args
      email: string; // String!
      id: string; // String!
      password: string; // String!
    }
    update_blog: { // args
      answer: string; // String!
      id: string; // String!
      question: string; // String!
    }
    update_subject: { // args
      id: string; // String!
      name: string; // String!
    }
    update_user: { // args
      email: string; // String!
      id: string; // String!
      password: string; // String!
    }
  }
  Query: {
    allBlogs: { // args
      skip: number; // Int!
      take: number; // Int!
    }
    oneAdmin: { // args
      id: string; // String!
    }
    oneBlog: { // args
      id: string; // String!
    }
    oneSubject: { // args
      id: string; // String!
    }
    oneUser: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}