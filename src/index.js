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
    command: 'httpcat',
    quote: false,
    ...pOptions,
  }
  ctx
    .command(`${pOptions.command} [code:posint]`, template('httpcat.cmd.desc'))
    .action(({ session }, code) => {
      return `${
        pOptions.quote ? segment.quote(session.messageId) : ''
      }${segment.image(`https://http.cat/${code}`)}`
    })
}

function test(p = { a: 1, b: 2 }) {
  return p
}

module.exports = {
  name: 'httpcat',
  apply,
}
