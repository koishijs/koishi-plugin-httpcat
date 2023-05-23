import { Context, Schema, segment, Quester } from 'koishi'

export const name = 'httpcat'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.i18n.define('zh', require('./locales/zh'))

  ctx.command('httpcat <code:number>', { checkArgCount: true })
    .action(async ({ session}, code) => {
      const url = `https://http.cat/${code}`
      try {
        await ctx.http.head(url)
      } catch (e) {
        if (Quester.isAxiosError(e) && e?.response?.status === 404) return session.text('.invalid', [code])
        throw e
      }
      return segment.image(url)
    })
}
