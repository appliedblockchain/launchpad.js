const prog = require('caporal')
const pkg = require('../package.json')
const create = require('./create')

prog
  .version(pkg.version)
  .command('create', 'Create a bare-bones version of launchpad')
  .argument('<name>', 'Project name')
  .option('--protocol <protocol>', 'Clone via ssh or https', /^ssh|^https$/)
  .option('--bootstrap [bootstrap]', 'Bootstraps the entire launchpad project')
  .action(create)

prog.parse(process.argv)
