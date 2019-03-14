const cron = require('node-cron')
const fs = require('fs')
const AWS = require('aws-sdk')
const { exec } = require('child_process')

const BUCKET_NAME = 'ab-parity-backups'

const s3 = new AWS.S3()

const createFilename = () => {
  const date = new Date()

  let day = date.getDate()
  day = day < 10 ? `0${day}` : `${day}`

  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`

  const year = `${date.getFullYear()}`

  return `${year}-${month}-${day}.tar.gz`
}

const runBackup = () => {
  console.log('Running Parity backup task...')

  const parityID = process.env.PARITY_ID
  const backupName = createFilename()
  const command = `sh parity-backup-tar.sh ${backupName}`

  const execution = exec(command)
  execution.stdout.on('data', (data) => {
    // Archiving has been completed - we can now upload to S3
    if (data.trim() === 'Archive complete...') {
      const body = fs.readFileSync(`./${backupName}`)
      const params = {
        Bucket: BUCKET_NAME,
        Body: body,
        Key: `launchpad-dev/parity${parityID}/${backupName}`
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
}

const setupCron = () => {
  // Run task every day at 06:00 (using container timezone)
  cron.schedule('* 06 * * *', () => {
    runBackup()
  })
}

setupCron()
