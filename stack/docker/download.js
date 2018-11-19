const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const parityID = process.env.PARITY_ID


const fileName = process.argv[2];
const downloadFile = async () => {
  console.log('DOWNLOADING BACKUP FILE...')

  const params = {
    Bucket: 'ab-parity-backups',
    Key: `base-app-mantle/parity${parityID}/${fileName}`
  }
  const backupStream = s3.getObject(params).createReadStream()
  const writeStream = fs.createWriteStream(fileName);

  backupStream.pipe(writeStream)
  console.log('DOWNLOD COMPLETE...')
}

(async () => {
  await downloadFile()
})()
