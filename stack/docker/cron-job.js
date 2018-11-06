const cron = require('node-cron')
const fs = require('fs')
const AWS = require('aws-sdk')
const { exec } = require('child_process')

const s3 = new AWS.S3()

cron.schedule('* * * * *', () => {
  console.log('RUNNING PARITY BACKUP TASK...')

  const backupName = createFilename('base-app-mantle-parity')
  const command = `sh cron-job.sh ${backupName}`

  const execution = exec(command)
  execution.stdout.on('data', (data) => {
    // Archiving has been completed - we can now upload to S3
    if (data.trim() === 'Archive complete...') {
      const body = fs.readFileSync(`./${backupName}`)
      const params = {
        Bucket: 'ab-parity-backups',
        Body: body,
        Key: backupName
      }

      s3.upload(params, (err, data) => {
        if (err) {
          console.log(`S3 upload error: ${err}`)
        } else {
          console.log(`S3 upload success: "${data.key}" uploaded to "${data.Bucket}" bucket`)
        }
      })
    }
  })
})

function createFilename(prefix) {
  const date = new Date()

  let day = date.getDate()
  day = day < 10 ? `0${day}` : `${day}`

  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`
 
  const year = `${date.getFullYear()}`

  return `${prefix}-${day}-${month}-${year}.tar.gz`
}