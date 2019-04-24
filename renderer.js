const { ipcRenderer } = require('electron')

//did-start-loading
ipcRenderer.on('start', (event, arg) {
    const msg = `${arg}`
    document.getElementById('webE1').innerHTML = msg
})