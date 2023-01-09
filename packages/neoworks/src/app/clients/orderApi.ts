/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export interface V1CreateOrderRequest {
  productId?: string;
  side?: V1OrderSide;
  type?: V1OrderType;
  quantity?: string;
  limitPrice?: string;
  timeInForce?: V1OrderTimeInForce;
}

export interface V1CreateOrderResponse {
  orderId?: string;
  ownerId?: string;
  productId?: string;
  side?: V1OrderSide;
  type?: V1OrderType;
  quantity?: string;
  limitPrice?: string;
  timeInForce?: V1OrderTimeInForce;
  status?: V1OrderStatus;

  /** @format date-time */
  createdAt?: string;

  /** @format date-time */
  updatedAt?: string;
  filledQuantity?: string;
  filledValue?: string;
  averageFilledPrice?: string;
  commission?: string;
  exchangeFee?: string;
}

export interface V1ListOrdersResponse {
  data?: V1ReadOrderResponse[];

  /** @format int32 */
  count?: number;
  nextCursor?: string;
  hasNext?: boolean;
}

export enum V1OrderSide {
  ORDER_SIDE_UNSPECIFIED = "ORDER_SIDE_UNSPECIFIED",
  ORDER_SIDE_BUY = "ORDER_SIDE_BUY",
  ORDER_SIDE_SELL = "ORDER_SIDE_SELL",
}

export enum V1OrderStatus {
  ORDER_STATUS_UNSPECIFIED = "ORDER_STATUS_UNSPECIFIED",
  ORDER_STATUS_PENDING = "ORDER_STATUS_PENDING",
  ORDER_STATUS_OPEN = "ORDER_STATUS_OPEN",
  ORDER_STATUS_FILLED = "ORDER_STATUS_FILLED",
  ORDER_STATUS_CANCELLED = "ORDER_STATUS_CANCELLED",
  ORDER_STATUS_EXPIRED = "ORDER_STATUS_EXPIRED",
  ORDER_STATUS_FAILED = "ORDER_STATUS_FAILED",
}

export enum V1OrderTimeInForce {
  ORDER_TIME_IN_FORCE_UNSPECIFIED = "ORDER_TIME_IN_FORCE_UNSPECIFIED",
  ORDER_TIME_IN_FORCE_GOOD_UNTIL_DATETIME = "ORDER_TIME_IN_FORCE_GOOD_UNTIL_DATETIME",
  ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED = "ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED",
  ORDER_TIME_IN_FORCE_IMMEDIATE_OR_CANCEL = "ORDER_TIME_IN_FORCE_IMMEDIATE_OR_CANCEL",
  ORDER_TIME_IN_FORCE_FILL_OR_KILL = "ORDER_TIME_IN_FORCE_FILL_OR_KILL",
}

export enum V1OrderType {
  ORDER_TYPE_UNSPECIFIED = "ORDER_TYPE_UNSPECIFIED",
  ORDER_TYPE_MARKET = "ORDER_TYPE_MARKET",
  ORDER_TYPE_LIMIT = "ORDER_TYPE_LIMIT",
}

export interface V1ReadOrderResponse {
  orderId?: string;
  ownerId?: string;
  productId?: string;
  side?: V1OrderSide;
  type?: V1OrderType;
  quantity?: string;
  limitPrice?: string;
  timeInForce?: V1OrderTimeInForce;
  status?: V1OrderStatus;

  /** @format date-time */
  createdAt?: string;

  /** @format date-time */
  updatedAt?: string;
  filledQuantity?: string;
  filledValue?: string;
  averageFilledPrice?: string;
  commission?: string;
  exchangeFee?: string;
}

export type V1SendVenueOrderResponse = object;

export enum V1SortDirection {
  SORT_DIRECTION_UNSPECIFIED = "SORT_DIRECTION_UNSPECIFIED",
  SORT_DIRECTION_ASC = "SORT_DIRECTION_ASC",
  SORT_DIRECTION_DESC = "SORT_DIRECTION_DESC",
}

export type V1UpdateOrderFeedResponse = object;

export interface V1UpdateOrderResponse {
  orderId?: string;
  ownerId?: string;
  productId?: string;
  side?: V1OrderSide;
  type?: V1OrderType;
  quantity?: string;
  limitPrice?: string;
  timeInForce?: V1OrderTimeInForce;
  status?: V1OrderStatus;

  /** @format date-time */
  createdAt?: string;

  /** @format date-time */
  updatedAt?: string;
  filledQuantity?: string;
  filledValue?: string;
  averageFilledPrice?: string;
  commission?: string;
  exchangeFee?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title pkg/pbs/v1/order.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags OrderService
     * @name OrderServiceCreateOrder
     * @request POST:/v1/order
     */
    orderServiceCreateOrder: (body: V1CreateOrderRequest, params: RequestParams = {}) =>
      this.request<V1CreateOrderResponse, RpcStatus>({
        path: `/v1/order`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderService
     * @name OrderServiceReadOrder
     * @request GET:/v1/order/{id}
     */
    orderServiceReadOrder: (id: string, params: RequestParams = {}) =>
      this.request<V1ReadOrderResponse, RpcStatus>({
        path: `/v1/order/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderService
     * @name OrderServiceUpdateOrder
     * @request PUT:/v1/order/{orderId}
     */
    orderServiceUpdateOrder: (
      orderId: string,
      body: {
        status?: V1OrderStatus;
        filledQuantity?: string;
        filledValue?: string;
        averageFilledPrice?: string;
        commission?: string;
        exchangeFee?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V1UpdateOrderResponse, RpcStatus>({
        path: `/v1/order/${orderId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderService
     * @name OrderServiceUpdateOrderFeed
     * @request POST:/v1/order/{orderId}/status
     */
    orderServiceUpdateOrderFeed: (
      orderId: string,
      body: {
        clientOrderId?: string;
        cumQty?: string;
        leavesQty?: string;
        avgPx?: string;
        fees?: string;
        status?: V1OrderStatus;
      },
      params: RequestParams = {},
    ) =>
      this.request<V1UpdateOrderFeedResponse, RpcStatus>({
        path: `/v1/order/${orderId}/status`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderService
     * @name OrderServiceListOrders
     * @request GET:/v1/orders
     */
    orderServiceListOrders: (
      query?: {
        query?: string;
        cursor?: string;
        sortDirection?: "SORT_DIRECTION_UNSPECIFIED" | "SORT_DIRECTION_ASC" | "SORT_DIRECTION_DESC";
      },
      params: RequestParams = {},
    ) =>
      this.request<V1ListOrdersResponse, RpcStatus>({
        path: `/v1/orders`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderService
     * @name OrderServiceSendVenueOrder
     * @request POST:/v1/venue/{orderId}
     */
    orderServiceSendVenueOrder: (orderId: string, body: V1SendVenueOrderResponse, params: RequestParams = {}) =>
      this.request<V1SendVenueOrderResponse, RpcStatus>({
        path: `/v1/venue/${orderId}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
