const buildTag = process.argv[2]
const shell = require('shelljs')

if (!buildTag) {
  const err = new Error('Build tag is missing')
  throw err
} else {
  shell.exec(`docker build  -t hipbar/dportal:${buildTag} . && docker push hipbar/dportal:${buildTag}`)
}
