const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron
const path = require('path')
const url = require('url')

var force_quit = false
menuTemplate = [{
    label: 'Application',
    submenu: [{
        label: 'About',
        click: () => {
            openAboutWindow()
        }
    }]

}, {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: function() {
        //force_quit = true
        app.quit()
    }
}]


//mainWindow

let mainWindow

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 900,
        height: 500,
        title: 'mainWindow'
    })


    //WebContents Events

    //did-start-loading
    mainWindow.webContents.on('did-start-loading', event => {
        console.log('did-start-loading:', event.sender.webContents.browserWindowOptions.title)
    })

    //did-stop-loading
    mainWindow.webContents.on('did-stop-loading', event => {
        console.log('did-stop-loading:', event.sender.webContents.browserWindowOptions.title)
    })

    //dom-ready
    mainWindow.webContents.on('dom-ready', event => {
        console.log('dom-ready:', event.sender.webContents.getTitle())
    })

    //did-finish-load
    mainWindow.webContents.on('did-finish-load', event => {
        console.log('did-finish-load:', event.sender.webContents.getTitle())
    })

    //did-fail-load
    mainWindow.webContents.on('did-fail-load', event => {
        console.log('did-fail-load', event.sender.webContents.getTitle())
    })

    //page-favicon-updated
    mainWindow.webContents.on('page-favicon-updated', event => {
        console.log('page-favicon-updated:', event.sender.webContents.getTitle())
    })

    //responsive
    mainWindow.webContents.on('responsive', event => {
        console.log('responsive:', event.sender.webContents.browserWindowOptions.title)
    })

    //unresponsive
    mainWindow.webContents.on('unresponsive', event => {
        console.log('unresponsive:', event.sender.webContents.browserWindowOptions.title)
    })





    //loading files
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    var menu = Menu.buildFromTemplate(menuTemplate)
    mainWindow.setMenu(menu)

    mainWindow.on('closed', () => {
        mainWindow = null

        console.log('close')
    })
}

//about Window

function openAboutWindow() {

    let aboutWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 400,
        height: 200,
        title: 'aboutWindow'
    })
    aboutWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'about.html'),
        protocol: 'file:',
        slashes: true
    }))
    aboutWindow.setMenu(null)
    aboutWindow.once('ready-to-show', () => {
        aboutWindow.show()

        console.log('ready-to-show')
    })
}

// App Events

app.on('before-quit', function(e) {
    console.log('before-quit')
    force_quit = true
})

app.on('will-quit', function() {
    console.log('will-quit')
    win = null
})

app.on('ready', () => {
    createWindow()

    console.log('ready')

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }

    console.log('window-all-closed')
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }

    console.log('activate')
})

app.on('browser-window-focus', event => {
    console.log('browser-window-focus:', event.sender.webContents.id)
})

app.on('browser-window-blur', event => {
    console.log('browser-window-blur:', event.sender.webContents.id)
})

app.on('browser-window-created', event => {
    console.log('browser-window-created')
})

app.on('web-contents-created', event => {
    console.log('web-contents-created')
})