const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProcess;

function startBackend() {
  const exePath = path.join(process.resourcesPath, 'persona_backend.exe');
  console.log('[Electron] Trying to launch backend from:', exePath);

  const backendProcess = spawn(exePath, {
    detached: true,
    stdio: 'inherit', // for debugging
  });

  backendProcess.on('error', (err) => {
    console.error('[Electron] Failed to start backend:', err);
  });

  backendProcess.on('exit', (code) => {
    console.log(`[Electron] Backend process exited with code ${code}`);
  });

  backendProcess.unref();
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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
