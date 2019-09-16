type DefinedRoutePath = "/auth/create" | "/statuses/create"

export type BaseBody = Partial<{
  path: DefinedRoutePath
}>

export type AuthCreateRequestBody = Partial<
  {
    callback_url: string
  } & BaseBody
>

export type StatusesCreateRequestBody = Partial<
  {
    // TODO
  } & BaseBody
>

/**
 * validate済みのRequestBody
 * 処理に不要なプロパティ(e.g. path)は削除する
 */
export type ValidatedRequestBody<T extends BaseBody> = Required<Omit<T, "path">>
