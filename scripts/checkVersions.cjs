const semver = require('semver')
const { engines } = require('../package')// 这里的package是你的package.json文件路径
const version = engines.node

if (!semver.satisfies(process.version, version)) {
  console.log(
    [
      'node环境变量版本错误',
      '你的node环境启动位置' + process.execPath + '.',
      '要求环境版本' + version,
      '你的环境版本' + process.version
    ].join('\n')
  )
  process.exit(1)
}else{
  console.log(`echo check environment successfully`)
}

