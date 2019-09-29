const fs = require('fs')
const path = require('path')

const files = (dir) => {
  return fs.readdirSync(dir).filter(file => {
    return path.extname(file).toLowerCase() === '.png' ||
      path.extname(file).toLowerCase() === '.jpg' ||
      path.extname(file).toLowerCase() === '.jpeg'
  }).map(file => {
    return dir + '/' + file
  })
}

module.exports = files
