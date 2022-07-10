const ipcRenderer = window.require('electron').ipcRenderer
const close = function () {
    console.log('关闭')
    ipcRenderer.send('appExit')
}
const winMax = function () {
    console.log('最大化')
    ipcRenderer.send('winMax')
}
const winMin = function () {
    console.log('最小化')
    ipcRenderer.send('winMin')
}
export default function () {
    return {
        close,
        winMax,
        winMin,
    }
}
