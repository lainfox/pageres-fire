const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors')({ origin: true });
const proxy = require('html2canvas-proxy');
const { exec } = require('child_process');
const Promise = require('bluebird');
const cmd = require('node-cmd');
const path = require('path');
const fs = require('fs');

function pause(milliseconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve, milliseconds);
    console.log('Promise executor');
  });
}

function screenShot(url) {
  const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })
  console.log(`${path.resolve(__dirname)}/node_modules/.bin/pageres`);
  return getAsync(`${path.resolve(__dirname)}/node_modules/.bin/pageres https://www.instagram.com/_rotta_/ 1280x1024 --delay=2 --format=jpg`);
}

function getData(fileName, type = 'utf8') {
  return new Promise(function(resolve, reject){
    fs.readFile(fileName, type, (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
}

const fetchImage = (filename) => {
  let count = 0;

  setTimeout(() => {

  }, 1000);
}

app.get('/', proxy());

app.get('/go', (req, res) => {
  const url = 'https://www.instagram.com/_rotta_/';

  screenShot(url).then(data => {
    console.log('cmd data', data);
    res.json(data);
  }).catch(err => {
    console.log('cmd err', err)
    res.send(err.message);
  })
});

app.get('/test', (req, res, next) => {
  console.log('Before');
  
  const url = 'https://www.instagram.com/_rotta_/';

  // REturn image  
  getData('instagram.com!_rotta_-1280x1024.jpg')
    .then(file => {
      const filePath = path.resolve(__dirname) + '/instagram.com!_rotta_-1280x1024.jpg';
      setTimeout(() => {
        fs.unlinkSync(filePath);
      }, 2000);

      return res.sendFile(filePath)
    })
    .catch(err => res.send(err.message))

  // screenShot(url).then(data => {
  //   console.log('cmd data', data);
  //   res.json(data);
  // }).catch(err => {
  //   console.log('cmd err', err)
  //   res.send(err.message);
  // })


  // capture(url)
  //   .then(data => console.warn(data))

    // .then(image => res.send('hello world'))
    // .catch(error => res.send(error.message));

  // pause(5000).then(function(fulfilled) {
  //   console.log("Promise callback", fulfilled);
  //   res.json(fulfilled);
  // })
  // .catch(function (error) {
  //   res.send(error.message);
  // });


  console.log('After');

  // screenShot();

})

exports.cors = functions.https.onRequest(app);

// 
// curl https://us-central1-<project-id>.cloudfunctions.net/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson
// curl https://us-central1-capture-2000.cloudfunctions.net/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson
// 
