import axios from 'axios'
import Qs from 'qs'
const open = window.require('fs')
const pathModel = window.require('path')
import fileDB from '@/database/filedb'
let G_value = null
let G_store = null
let G_config = null
const day29 = 29 * 24 * 60 * 60 * 1000

const getToken = function () {
    let url = 'api/oauth/2.0/token?grant_type=client_credentials&client_id=4d3eEfGpwDTqPeFfH4k01lxX&client_secret=KkXK2LuRu9wUXpiePnojMOqsTQzlEZsy'
    return axios.get(url)
}
const getTimeStamp = function () {
    return new Date().getTime()
}
const getUserToken = function (config) {
    let url = 'api/oauth/2.0/token?grant_type=client_credentials&client_id=' + config['API_key'] + '&client_secret=' + config['Secret_key']
    return axios.get(url)
}
const getConfigToken = function () {
    if (G_config['userToken']['token'] != '') {
        return G_config['userToken']['token']
    } else {
        return G_config['tokenObj']['token']
    }
}
const getStronConfig = function () {
    return G_store.state['config']
}
const submitImage = async function (request) {
    let response = await axios.post(request['request_url'], request['qsData'], request['httpConfig'])
    return response['data']['result']['result_data']
}
const getRequestData = function (item) {
    let path = item['path']
    const readable = open.readFileSync(path, 'binary')
    let image = Buffer.from(readable, 'binary').toString('base64')
    let data = { image: image, is_sync: true, request_type: 'excel' }
    let httpConfig = { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    let request_url = G_config['execl_url'] + getConfigToken()
    let qsData = Qs.stringify(data)
    return { request_url, qsData, httpConfig }
}
const toBuffer = function (ab) {
    var buf = new Buffer(ab.byteLength)
    var view = new Uint8Array(ab)
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i]
    }
    return buf
}
const dowlodExcel = async function (execlUrl) {
    const url = new URL(execlUrl)
    const realUrl = `execl${url['pathname']}${url['search']}`
    let response = await axios.get(realUrl, { responseType: 'blob' })
    let blob = new Blob([response['data']], { type: `text/plain;charset=utf-8` })
    let bufferData = await blob.arrayBuffer()
    return toBuffer(bufferData)
}
const saveExcel = function (bufferData, item) {
    let outpath = pathModel.join(G_value['output'], G_value['classify'])
    let outFilePath = pathModel.join(outpath, item['name'] + '.xlsx')
    open.mkdir(outpath, { recursive: true }, (err) => {})
    let err = open.writeFileSync(outFilePath, bufferData)
    if (!err) {
        item['output'] = true
    } else {
        item['output'] = false
    }
}
const main = async function (all, store) {
    G_store = store
    G_config = getStronConfig()
    let fileDatas = all['value']['fileDatas']
    G_value = all['outValue']
    for (const key in fileDatas) {
        let item = fileDatas[key]
        let requetsData = getRequestData(item)
        let execlUrl = await submitImage(requetsData)
        item['execlUrl'] = execlUrl
        let bufferData = await dowlodExcel(execlUrl)
        saveExcel(bufferData, item)
    }
    G_value['finished'] = true
    fileDB.updateAllData(G_value, all['value'])
}
export default {
    main,
    getToken,
    getTimeStamp,
    day29,
    getUserToken,
}
