const cron = require('node-cron')
const { exec } = require('child_process')

cron.schedule('* * * * *', () => {
  console.log('RUNNING...')
  const date = new Date()

  let day = date.getDate()
  day = day < 10 ? `0${day}` : `${day}`

  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`

  const year = `${date.getFullYear()}`

  const backupName = `base-app-mantle-parity-${day}-${month}-${year}.tar.gz`
  const command = `sh cron-job.sh ${backupName}`

  exec(command, (err, stdout, stderr) => {
    console.log('err', err)
    console.log('STDOUT', stdout)
    console.log('STDERR', stderr)
  })
})