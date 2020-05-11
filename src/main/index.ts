import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

const dev = process.env.HOST && process.env.PORT;

(async () => {
  await app.whenReady();
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (dev)
    win.webContents.openDevTools();
  win.on('closed', () => app.quit());
  let renderer = url.format(dev ? {
    protocol: 'http',
    hostname: process.env.HOST,
    port: process.env.PORT
  } : {
    protocol: 'file',
    pathname: path.join(__dirname, '../renderer/index.html')
  });
  await win.loadURL(renderer);
})();
