const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('laddu', {
  probeCapabilities: () => ipcRenderer.invoke('capabilities:probe'),
  ask: (payload) => ipcRenderer.invoke('mind:ask', payload),
  speak: (payload) => ipcRenderer.invoke('voice:speak', payload),
  desktopAction: (payload) => ipcRenderer.invoke('desktop:action', payload),
  toggleDevTools: () => ipcRenderer.invoke('window:toggle-devtools')
});
