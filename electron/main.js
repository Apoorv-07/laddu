const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const { probeCapabilities, askMind, speakVoicebox, desktopAction } = require('./services');
let win;
const harnessMode = process.argv.includes('--harness');
const harnessStatePath = path.join(app.getPath('temp'), 'laddu-harness-state.json');
function createWindow() {
  if (harnessMode) {
    win = new BrowserWindow({ width: 820, height: 620, title: 'LADDU Test Harness', webPreferences: { preload: path.join(__dirname, 'harness-preload.js'), contextIsolation: true, nodeIntegration: false } });
    fs.writeFileSync(harnessStatePath, JSON.stringify({ clicked:false,doubleClicked:false,rightClicked:false,scrollDelta:0,text:'',hotkey:'' }));
    win.loadFile(path.join(__dirname, 'harness.html'));
    return;
  }
  const display = screen.getPrimaryDisplay();
  win = new BrowserWindow({ width: 340, height: 410, x: Math.max(20, display.workArea.x + display.workArea.width - 390), y: display.workArea.y + 80, transparent: true, frame: false, resizable: false, alwaysOnTop: true, skipTaskbar: true, show: false, webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
  win.once('ready-to-show', () => win.show());
}
app.whenReady().then(createWindow);
app.on('window-all-closed', e => { if (!harnessMode) e.preventDefault(); });
if (harnessMode) ipcMain.handle('harness:state', (_event, value) => { if (value) fs.writeFileSync(harnessStatePath, JSON.stringify(value)); return value; });
ipcMain.handle('capabilities:probe', () => probeCapabilities());
ipcMain.handle('mind:ask', (_event, payload) => askMind(payload));
ipcMain.handle('voice:speak', (_event, payload) => speakVoicebox(payload));
ipcMain.handle('desktop:action', (_event, payload) => desktopAction(payload));
ipcMain.handle('window:toggle-devtools', () => win?.webContents.toggleDevTools());
