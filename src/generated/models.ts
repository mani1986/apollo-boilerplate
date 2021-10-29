/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export enum AuthTokenKind {
  Auth = 'Auth'
}

export type DeviceInput = {
  id: Scalars['String'];
  os?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  message: Scalars['String'];
};

export type MediaResponse = {
  __typename?: 'MediaResponse';
  color?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  type: MediaType;
  value: Scalars['String'];
};

export enum MediaType {
  Image = 'Image',
  YouTube = 'YouTube'
}

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserLoginResponse;
  sendPushNotification?: Maybe<Scalars['String']>;
  updateUser: UserResponse;
};


export type MutationLoginArgs = {
  device: DeviceInput;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSendPushNotificationArgs = {
  body: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};

export enum NotificationDeliveryMethod {
  MobilePush = 'MobilePush',
  Web = 'Web'
}

export enum NotificationDeliveryStatus {
  Delivered = 'Delivered',
  FailedToDeliver = 'FailedToDeliver',
  Initial = 'Initial',
  Viewed = 'Viewed'
}

export enum NotificationStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Initial = 'Initial'
}

export enum NotificationType {
  Manual = 'Manual'
}

export enum OnboardingStatus {
  Initial = 'Initial',
  Onboarded = 'Onboarded'
}

export type Query = {
  __typename?: 'Query';
  getStatus: StatusResponse;
};

export type StatusResponse = {
  __typename?: 'StatusResponse';
  user?: Maybe<UserResponse>;
};

export type UpdateUserInput = {
  onboardingStatus?: Maybe<OnboardingStatus>;
  profile?: Maybe<UserProfileInput>;
};

export enum UploadType {
  Store = 'Store',
  Temporary = 'Temporary'
}

export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  /** Access token used for all authenticated requests. */
  accessToken: Scalars['String'];
  user: UserResponse;
};

export type UserProfileInput = {
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UserProfileResponse = {
  __typename?: 'UserProfileResponse';
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String'];
  onboardingStatus: OnboardingStatus;
  profile: UserProfileResponse;
  role: UserRole;
};

export enum UserRole {
  Admin = 'Admin',
  ClientManager = 'ClientManager'
}

export enum UserSource {
  AzureActiveDirectory = 'AzureActiveDirectory',
  Manual = 'Manual'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthTokenKind: AuthTokenKind;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeviceInput: DeviceInput;
  GenericResponse: ResolverTypeWrapper<GenericResponse>;
  MediaResponse: ResolverTypeWrapper<MediaResponse>;
  MediaType: MediaType;
  MessageResponse: ResolverTypeWrapper<MessageResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  NotificationDeliveryMethod: NotificationDeliveryMethod;
  NotificationDeliveryStatus: NotificationDeliveryStatus;
  NotificationStatus: NotificationStatus;
  NotificationType: NotificationType;
  OnboardingStatus: OnboardingStatus;
  Query: ResolverTypeWrapper<{}>;
  StatusResponse: ResolverTypeWrapper<StatusResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserInput: UpdateUserInput;
  UploadType: UploadType;
  UserLoginResponse: ResolverTypeWrapper<UserLoginResponse>;
  UserProfileInput: UserProfileInput;
  UserProfileResponse: ResolverTypeWrapper<UserProfileResponse>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserRole: UserRole;
  UserSource: UserSource;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  DeviceInput: DeviceInput;
  GenericResponse: GenericResponse;
  MediaResponse: MediaResponse;
  MessageResponse: MessageResponse;
  Mutation: {};
  Query: {};
  StatusResponse: StatusResponse;
  String: Scalars['String'];
  UpdateUserInput: UpdateUserInput;
  UserLoginResponse: UserLoginResponse;
  UserProfileInput: UserProfileInput;
  UserProfileResponse: UserProfileResponse;
  UserResponse: UserResponse;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenericResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericResponse'] = ResolversParentTypes['GenericResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaResponse'] = ResolversParentTypes['MediaResponse']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['UserLoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'device' | 'password' | 'username'>>;
  sendPushNotification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSendPushNotificationArgs, 'body' | 'title'>>;
  updateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getStatus?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
};

export type StatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponse'] = ResolversParentTypes['StatusResponse']> = {
  user?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLoginResponse'] = ResolversParentTypes['UserLoginResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfileResponse'] = ResolversParentTypes['UserProfileResponse']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onboardingStatus?: Resolver<ResolversTypes['OnboardingStatus'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['UserProfileResponse'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  GenericResponse?: GenericResponseResolvers<ContextType>;
  MediaResponse?: MediaResponseResolvers<ContextType>;
  MessageResponse?: MessageResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StatusResponse?: StatusResponseResolvers<ContextType>;
  UserLoginResponse?: UserLoginResponseResolvers<ContextType>;
  UserProfileResponse?: UserProfileResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};

