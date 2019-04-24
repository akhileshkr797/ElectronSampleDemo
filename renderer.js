//ctrl+f functionality

const { remote, ipcRenderer } = require('electron')
const FindInPage = require('electron-find').FindInPage

let findInPage = new FindInPage(remote.getCurrentWebContents())

ipcRenderer.on('on-find', (e, args) => {
    findInPage.openFindWindow()
})


//notification
const notifier = require('node-notifier')
const path = require('path');
document.getElementById('notify').onclick = (event) => {
    notifier.notify({
        title: 'OHM Systems Inc',
        message: 'Hello from electron, Mr. Akhilesh!',
        icon: path.join('', './ohm-logo.png'),
        sound: true,
        wait: true
    });
}