const currentPath = process.cwd();
const fs = require('fs')
const path = require('path')
const program = require('commander');

const {
  description,
  version
} = require('./../package.json')

const files = require('./files')
const processing = require('./processing')

program
  .description(description)
  .version(version, '-v, --version')
  .option('-i, --input <folder>', 'Input folder')
  .option('-o, --output <folder>', 'Output folder')
  .option('-f, --format [png|jpg]', 'Output image format')
  .option('-q, --quality [integer]', 'Jpeg quality, default: 80%', value => parseInt(value))
  .option('-w, --width [integer]', 'Image width', value => parseInt(value))
  .option('-h, --height [integer]', 'Image heights', value => parseInt(value))
  .option('-t, --trim', 'Trim transparent Background')

  .parse(process.argv)

if (process.argv.length === 2) program.help()

if (process.argv.length > 2) {
  if (program.input === undefined || program.output === undefined) {
    console.log('Missing parameter input, output.')
    process.exit(0)
  }
}

const dir = path.join(currentPath + '/', program.input)
const target = program.output
const options = {
  format: program.format ? program.format : 'jpg',
  width: program.width ? program.width : null, // 390
  height: program.height ? program.height : null, // 293
  trim: program.trim,
  quality: program.quality ? program.quality : 80,
  target: currentPath + '/' + target + '/'
}

try {
  if (!fs.existsSync(options.target)) {
    fs.mkdirSync(options.target)
  }
  files(dir).forEach(file => processing(file, options))
} catch (err) {
  console.error(err)
}
