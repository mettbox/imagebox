const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const processing = (file, options) => {
  const image = sharp(file)
  image
    .metadata()
    .then(metadata => {
      return metadata.hasAlpha && options.trim ? image.trim() : image
    })
    .then(image => {
      return image.resize(options.width, options.height)
    })
    .then(image => {
      return options.format === 'jpg' ? image.jpeg({
        quality: options.quality
      }) : image
    })
    .then(image => {
      return image.toBuffer()
    })
    .then(data => {
      fs.writeFileSync(options.target + path.basename(file, path.extname(file)) + '.' + options.format, data)
    })
    .catch(err => {
      console.log(err, file)
    })
}

module.exports = processing
