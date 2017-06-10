const coffee = require(`coffee`)
const path = require(`path`)

describe(`sharemd`, () => {
  it(`add`, done => {
    coffee
      .fork(path.join(__dirname, `./index.js`), [`readme.md`])
      .expect(`stdout`, /Your markdown online url is: http:\/\/api.sinchang.me\/markdown\//)
      .end(done)
  })

  it(`update`, done => {
    coffee
      .fork(path.join(__dirname, `./index.js`), [`readme.md`, `--i`, `h8UfScR2bx84KknJ`])
      .expect(`stdout`, /h8UfScR2bx84KknJ/)
      .end(done)
  })

  it(`set style`, done => {
    coffee
      .fork(path.join(__dirname, `./index.js`), [`readme.md`, `--s`, `hexo`])
      .expect(`stdout`, /Your markdown online url is: http:\/\/api.sinchang.me\/markdown\//)
      .end(done)
  })

  it(`set title`, done => {
    coffee
      .fork(path.join(__dirname, `./index.js`), [`readme.md`, `--t`, `hello md`])
      .expect(`stdout`, /Your markdown online url is: http:\/\/api.sinchang.me\/markdown\//)
      .end(done)
  })
})
