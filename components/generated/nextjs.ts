import type {
	CreatePostResponse,
	CreatePostInput,
	CreatePostResponseData,
	GetLatestPostsResponse,
	GetLatestPostsInput,
	GetLatestPostsResponseData,
	GetPostByIdResponse,
	GetPostByIdInput,
	GetPostByIdResponseData,
} from "./models";
import { createContext } from "react";
import { hooks, WunderGraphContextProperties } from "@wundergraph/nextjs";
import { QueryArgsWithInput, SubscriptionArgs, SubscriptionArgsWithInput } from "@wundergraph/sdk/client";
export type Role = "admin" | "user";

export enum AuthProvider {
	"github" = "github",
}

export const AuthProviders = {
	github: AuthProvider.github,
};

const defaultWunderGraphContextProperties: WunderGraphContextProperties<Role> = {
	ssrCache: {},
	client: null,
	clientConfig: {
		applicationHash: "9c3e4921",
		applicationPath: "app/main",
		baseURL: "http://localhost:9991",
		sdkVersion: "0.108.0",
		authenticationEnabled: true,
	},
	user: null,
	setUser: (value) => {},
	isWindowFocused: "pristine",
	setIsWindowFocused: (value) => {},
	refetchMountedOperations: 0,
	setRefetchMountedOperations: (value) => {},
};

export const WunderGraphContext = createContext<WunderGraphContextProperties<Role>>(
	defaultWunderGraphContextProperties
);

export const withWunderGraph = hooks.withWunderGraphContextWrapper(
	WunderGraphContext,
	defaultWunderGraphContextProperties
);

export const useWunderGraph = hooks.useWunderGraph<Role, AuthProvider>(WunderGraphContext);

export const useQuery = {
	GetLatestPosts: (args: QueryArgsWithInput<GetLatestPostsInput>) =>
		hooks.useQueryWithInput<GetLatestPostsInput, GetLatestPostsResponseData, Role>(WunderGraphContext, {
			operationName: "GetLatestPosts",
			requiresAuthentication: false,
		})(args),
	GetPostById: (args: QueryArgsWithInput<GetPostByIdInput>) =>
		hooks.useQueryWithInput<GetPostByIdInput, GetPostByIdResponseData, Role>(WunderGraphContext, {
			operationName: "GetPostById",
			requiresAuthentication: false,
		})(args),
};

export const useMutation = {
	CreatePost: () =>
		hooks.useMutationWithInput<CreatePostInput, CreatePostResponseData, Role>(WunderGraphContext, {
			operationName: "CreatePost",
			requiresAuthentication: false,
		}),
};

export const useSubscription = {};

export const useLiveQuery = {
	GetLatestPosts: (args: SubscriptionArgsWithInput<GetLatestPostsInput>) =>
		hooks.useSubscriptionWithInput<GetLatestPostsInput, GetLatestPostsResponseData, Role>(WunderGraphContext, {
			operationName: "GetLatestPosts",
			requiresAuthentication: false,
			isLiveQuery: true,
		})(args),
	GetPostById: (args: SubscriptionArgsWithInput<GetPostByIdInput>) =>
		hooks.useSubscriptionWithInput<GetPostByIdInput, GetPostByIdResponseData, Role>(WunderGraphContext, {
			operationName: "GetPostById",
			requiresAuthentication: false,
			isLiveQuery: true,
		})(args),
};
