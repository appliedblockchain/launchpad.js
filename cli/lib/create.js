const { spawnSync } = require('child_process')
const chalk = require('chalk')
const { isDir } = require('../utils')
const excluded = require('./excluded')

const create = (args, options, logger) => {
  const { name } = args
  const { protocol, bootstrap } = options

  // Clone using ssh protocol as default
  const url = protocol === 'https'
    ? 'https://github.com/appliedblockchain/base-app.git'
    : 'git@github.com:appliedblockchain/base-app.git'

  if (isDir(name)) {
    spawnSync('rm', [ '-rf', name ])
  }

  const cwd = process.cwd()
  const installPath = `${cwd}/${name}`

  logger.info(`Installing base-app into ${chalk.cyan(installPath)}`)
  spawnSync('git', [ 'clone', url, name ])


  if (bootstrap) {
    logger.info(chalk.green('Installation complete'))
    return
  }

  logger.info(chalk.cyan('Removing unnecessary dependencies...'))
  spawnSync('rm', [ '-rf', excluded(name) ], { shell: true })

  logger.info(chalk.green('Installation complete'))
}

module.exports = create