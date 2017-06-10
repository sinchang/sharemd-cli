#!/usr/bin/env node
'use strict'
const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const marked3 = require('marked3')
const cliSpinners = require('cli-spinners')
const logUpdate = require('log-update')
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

updateNotifier({
  pkg
}).notify()

const argv = yargs
  .alias('v', 'version')
  .alias('h', 'help')
  .option('title', {
    desc: 'set webpage title',
    alias: 't'
  })
  .option('id', {
    desc: 'use to update markdown content',
    alias: 'i'
  })
  .option('style', {
    desc: 'set markdown theme',
    alias: 's'
  })
  .example('gist-it readme.md --tile "readme.md" --style "github"')
  .version()
  .help().argv

fs.readFile(argv._[0], 'UTF-8', (err, data) => {
  if (err) throw err
  getId(data)
})

function getId(content) {
  const spinner = cliSpinners.dots

  let i = 0

  const timer = setInterval(() => {
    const frames = spinner.frames
    logUpdate(frames[i = ++i % frames.length])
  }, spinner.interval)

  axios.post('http://api.sinchang.me/markdown', {
    content: marked3(content),
    id: argv.id,
    style: argv.style,
    title: argv.title
  }).then(res => {
    clearInterval(timer)
    logUpdate(`Your markdown online url is: http://api.sinchang.me/markdown/${res.data.id}`)
  }).catch(err => {
    clearInterval(timer)
    logUpdate(err.message)
  })
}
