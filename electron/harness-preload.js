const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('harness', { state: (value) => ipcRenderer.invoke('harness:state', value) });
