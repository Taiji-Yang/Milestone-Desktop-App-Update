

const { app, BrowserWindow, screen } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');

let mainWindow;

function createWindow() {
    // var python = require('child_process').spawn('py', ['../backend/app.py']);
    // python.stdout.on('data', function (data) {
    //     console.log("data: ", data.toString('utf8'));
    //   });
    //   python.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`); // when error
    // });
    
    console.log(parseInt(screen.getPrimaryDisplay()["size"]["width"]), parseInt(screen.getPrimaryDisplay()["size"]["height"]))
    let windowWidth = parseInt(screen.getPrimaryDisplay()["size"]["width"])
    let windowHeight = parseInt(screen.getPrimaryDisplay()["size"]["height"])
    let factor = windowWidth/windowHeight
    windowHeight = 0.7*windowHeight
    windowWidth = factor*windowHeight
    mainWindow = new BrowserWindow({
        width: parseInt(windowWidth),
        height: parseInt(windowHeight),
        show: false
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);