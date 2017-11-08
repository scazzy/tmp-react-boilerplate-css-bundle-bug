// You're free to use your preferred choice of node framework
// like express, koajs, or just write vanilla
import express from 'express';
import path from 'path';
import fs from 'fs';
import flock from 'flockos';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile } from 'fs';
import config from './config';
import Root from './components/Root';

const port = process.env.PORT || 3000;

flock.appId = config.flock.appId;
flock.secretId = config.flock.secretId;

const app = express();

app.use(flock.events.tokenVerifier);

app.get('/', (req, res) => {
  const indexFile = path.join(__dirname, '..', 'public','index.html');
  const renderedHtml = renderToString(
      <Root/>
  );
  readFile(indexFile, 'utf8', (err, data) => {
      if (err) throw err;
      const document = data.replace('<!-- server -->', renderedHtml);
      res.send(document);
  })
});

app.post('/events', flock.events.listener);

flock.events.on('app.install', (event, callback) => {
  // App installed
  // Save event.userId, event.token
  callback();
});

app.post('/thankyou', (req, res) => {
  res.send(':thankyou endpoint');
});


app.listen(port, () => {
    console.log('listening at :' + port);
});
