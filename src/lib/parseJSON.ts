type GuardType<T> = T extends (x: unknown, ...rest: unknown[]) => x is infer U
  ? U
  : never

type JSONValidator = (result: unknown) => boolean

export type ParseJSONOptions<Validator extends JSONValidator = JSONValidator> =
  {
    validator?: Validator,
    /** @default false — при `true` при ошибке парсинга или валидации возвращается `null` вместо выброса */
    safe?: boolean,
  }

/**
 * Парсит JSON. По умолчанию (`safe: false`) ошибки пробрасываются (как у `JSON.parse` и при провале валидатора).
 * При `safe: true` при невалидном JSON или неуспешной валидации возвращается `null`.
 */
function parseJSON(json: string): unknown
function parseJSON(
  json: string,
  options: { safe: true, validator?: undefined },
): unknown
function parseJSON<Validator extends JSONValidator>(
  json: string,
  options: { validator: Validator, safe: true },
): GuardType<Validator> | null
function parseJSON<Validator extends JSONValidator>(
  json: string,
  options: { validator: Validator, safe?: false } | { validator: Validator },
): GuardType<Validator>
function parseJSON<Validator extends JSONValidator>(
  json: string,
  options?: ParseJSONOptions<Validator>,
): unknown {
  const safe = options?.safe === true
  const validator = options?.validator

  try {
    const result = JSON.parse(json) as unknown
    if (validator && !validator(result)) {
      if (safe) return null
      throw new TypeError('JSON validation failed')
    }
    return result
  } catch (e) {
    if (!safe) throw e
    return null
  }
}

export { parseJSON }
export default parseJSON
