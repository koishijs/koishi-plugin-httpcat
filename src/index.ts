import { Context, Schema, segment } from 'koishi'

const STATUS_CODES = [
  100, 101,
  200, 201, 202, 204, 206, 207,
  300, 301, 302, 303, 304, 305, 307,
  400, 401, 402, 403, 404, 405, 406, 408,
  409, 410, 411, 412, 413, 414, 415, 416,
  417, 418, 420, 421, 422, 423, 424, 425,
  426, 429, 431, 444, 450, 451, 499,
  500, 501, 502, 503, 504, 505, 506, 507,
  508, 509, 510, 511, 599,
]

export const name = 'httpcat'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('httpcat <code:number>', '状态码猫图', { checkArgCount: true })
    .action(async (_, code) => {
      if (!STATUS_CODES.includes(code)) return `你家 http 协议会返回 ${code}？`
      return segment.image(`https://http.cat/${code}`)
    })
}
