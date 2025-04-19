const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let backendProcess;


function startBackend() {
  const exePath = path.join(process.resourcesPath, 'persona_backend', 'persona_backend.exe');

  console.log('[Electron] Trying to launch backend from:', exePath);


  const backend = spawn(exePath, {
    detached: true,
    stdio: ['ignore'],
    detached: false
  });

  backend.on('error', (err) => {
    console.error('[Electron] Backend failed to start:', err);
  });

  backend.unref();
}
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  // Load your React frontend (after building)
  win.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
}

app.whenReady().then(() => {
  startBackend();
  setTimeout(createWindow, 3000); // slight delay to give backend time to boot
});

app.on('window-all-closed', () => {
  if (backend) {
    console.log('[Electron] Killing backend process...');
    backend.kill();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});
