import { Request } from "express"
import { IncomingHttpHeaders } from "http2"

/**
 * OpenFaaS definition and fix
 * @see https://github.com/unubo/java-serverless-on-unubo-cloud/blob/9e0e12a9a1b360bee3736c386e04bd1e613fc550/src/main/java/com/openfaas/function/Handler.java#L5
 * @see https://github.com/openfaas/templates/pull/39/files#diff-e25cfb8bfc303943d898c523f3244aaeR1
 */

/**
 * @template TBody request body
 * @template TSuccess success response body
 */
export type FaaSHandler<TBody extends Object, TSuccess extends Object> = (
  event: FunctionEvent<TBody>,
  context: FunctionContext<TSuccess>,
  callback: FunctionCallBack<TSuccess>
) => Promise<void>

export class FunctionEvent<TBody> {
  public body: TBody
  public headers: {}

  // NOTE: My App "POST" and "OPTIONS" (preflight request) only.
  public method: "POST" | "OPTIONS" = "POST"
  public query: never

  constructor(req: Pick<Request, "body" | "headers">) {
    this.body = req.body
    this.headers = req.headers
    // this.method = req.method
    // this.query = req.query
  }
}

type Failure =
  | {
      message: string
    }
  | string

type FunctionCallBack<TSuccess extends Object> = (
  err: Failure | null,
  result: TSuccess | null
) => void

export class FunctionContext<TSuccess extends Object> {
  public value: number
  public callBack: FunctionCallBack<TSuccess>
  public headerValues: IncomingHttpHeaders

  // NOTE: Not official. But maybe implemented.
  private responseBody: Object = {}

  constructor(callBack: FunctionCallBack<TSuccess> = () => {}) {
    this.value = 0
    this.callBack = callBack
    this.headerValues = {}
  }

  status(value: number): FunctionContext<TSuccess> {
    this.value = value
    return this
  }

  headers(value: IncomingHttpHeaders): FunctionContext<TSuccess> {
    this.headerValues = value
    return this
  }

  /**
   * 200 OK | (maybe 400 client side error?)
   */
  succeed(value?: TSuccess): void {
    if (!value) {
      return
    }
    this.responseBody = value
    this.callBack(null, value)
  }

  /**
   * 500 server side error
   */
  fail(value: Failure): void {
    this.responseBody = value
    this.callBack(value, null)
  }
}
