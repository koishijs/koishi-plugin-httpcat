import { Context, Schema, segment, Quester } from 'koishi'

export const name = 'httpcat'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.i18n.define('zh', require('./locales/zh'))

  ctx.command('httpcat <code:number>', { checkArgCount: true })
    .action(async ({}, code) => {
      try {
        const buffer = await ctx.http.get<ArrayBuffer>(`https://http.cat/${code}`, {
          responseType: 'arraybuffer',
        })
        return segment.image(buffer, 'image/jpeg')
      } catch (e) {
        if (!Quester.isAxiosError(e) || e.code !== '404') throw e
        return segment.i18n('.invalid', [code])
      }
    })
}
