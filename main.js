const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let djangoProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  // Start Django server
  djangoProcess = spawn(
    process.platform === 'win32' ? 'backend\\venv\\Scripts\\python.exe' : 'python3',
    ['manage.py', 'runserver'],
    { cwd: path.join(__dirname, 'backend') }
  );

  // Load your React frontend (after building)
  win.loadURL(`file://${__dirname}/frontend/dist/index.html`);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  if (djangoProcess) {
    djangoProcess.kill();
  }
});