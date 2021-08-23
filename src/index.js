const { template, segment } = require('koishi-core')

template.set('httpcat', {
  cmd: {
    desc: '获取 HTTP 猫猫图',
  },
})

/**
 * @param {import('koishi-core').Context} ctx
 * @param {{ command?: string; quote?: boolean; }} pOptions
 */
function apply(ctx, pOptions) {
  pOptions = {
    command: 'http',
    quote: false,
    ...pOptions,
  }
  ctx
    .command(`${command} [code:posint]`, template('httpcat.cmd.desc'))
    .action(({ session }, code) => {
      return `${
        pOptions.quote ? segment.quote(session.messageId) : ''
      }${segment.image(`https://http.cat/${code}`)}`
    })
}

module.exports = {
  name: 'http-cat',
  apply,
}
