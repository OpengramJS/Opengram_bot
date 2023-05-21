const https = require('https')
const crypto = require('crypto')

function sha1 (data) {
  return crypto.createHash('sha1')
    .update(data, 'binary')
    .digest('hex')
}
function sleep (timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const downloadFileByUrl = (fileUrl) => new Promise((resolve, reject) => {
  const data = []

  https.get(fileUrl, (response) => {
    response.on('data', (chunk) => {
      data.push(chunk)
    })

    response.on('end', () => {
      resolve(Buffer.concat(data))
    })
  }).on('error', reject)
})

function notModified (error) {
  if (!error.message.includes('message is not modified')) throw error
}

module.exports = { downloadFileByUrl, sha1, sleep, notModified }
