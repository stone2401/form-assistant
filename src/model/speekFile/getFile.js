import { ref, onMounted, reactive, computed } from 'vue'
import store from '@/store/index'
import fileDatabase from '@/database/filedb'
import moment from 'moment'
const fs = window.require('fs')
const { dialog } = window.require('electron').remote
const path = window.require('path')

let lang = computed({
    get() {
        return store.getters['lang']
    },
})
// TODO：file操作中的一些配置信息
const extensions = ['jpg', 'png', 'jpeg', 'bmp']
const fileOption = {
    title: lang.value['impTitle'],
    properties: ['openFile', 'multiSelections', 'createDirectory'],
    filters: [{ name: 'Images', extensions: extensions }],
}

const folderOption = {
    title: lang.value['settingFolder'],
    properties: ['openDirectory'],
}

let upload = ref(null)
let data = ref(null)
let dataList = ref(null)

let fileData = reactive({
    classify: '',
    output: '',
    time: '',
    timestamp: '',
    output: '',
    finished: false,
    fileDatas: {},
    errFile: [],
    folders: [],
})

// 打开文件管理器函数
// 无参无返回值

let successShow = computed({
    get() {
        if (Object.keys(fileData['fileDatas']).length === 0) {
            return true
        }
        return false
    },
})
let unsuccessShow = computed({
    get() {
        if (fileData['errFile'].length === 0) {
            return true
        }
        return false
    },
})
let Grouping = computed({
    get() {
        return fileData['classify'] === '' ? lang.value['noGrouping'] : fileData['classify']
    },
})
let outputPath = computed({
    get() {
        return fileData['output'] === '' ? lang.value['noOutput'] : fileData['output']
    },
})
let globeOutput = computed({
    get() {
        let globePath = store['state']['config']['output']
        return globePath === '' ? lang.value['noOutput'] : globePath
    },
})

let showMsgErr = null

const groupingValidator = (rule, value, callack) => {
    if (showMsgErr) {
        showMsgErr.close()
    }
    if (value.length >= 10) {
        showMsgErr = ElMessage({
            type: 'error',
            showClose: true,
            message: lang.value['errClassfy'],
            duration: 5000,
        })
        callack(new Error(lang.value['errClassfy']))
    } else {
        fileDatabase.findClassify(fileData['classify'], (pass) => {
            if (!pass) {
                showMsgErr = ElMessage({
                    type: 'error',
                    showClose: true,
                    message: lang.value['alrExist'],
                    duration: 5000,
                })
                callack(new Error(lang.value['alrExist']))
            }
        })
    }
}

const roles = reactive({
    classify: [{ required: true, validator: groupingValidator, trigger: 'change' }],
})

const openFile = async function () {
    const file = await dialog.showOpenDialog(fileOption)
    if (!file['canceled']) {
        let objFiles = file['filePaths']
        data.value = objFiles
        // TODO: 点击添加文件入口
        searchFileOpen(objFiles)
    } else {
        return 0
    }
}

const openFolder = async function () {
    const folders = await dialog.showOpenDialog(folderOption)
    if (!folders['canceled']) {
        fileData['output'] = folders['filePaths'][0]
    }
}

// 点击添加文件
// 此处都为path路径
// objFiles: array[] => string: path路径
const searchFileOpen = function (objFiles) {
    objFiles.forEach((filePath) => {
        saveFileData(filePath)
    })
}

// TODO: 通用图片文件添加方法
// 文件路径添加
const saveFileData = function (filePath) {
    let parse = path.parse(filePath)
    let flag = extensions.findIndex((item) => {
        return '.'.concat(item) == parse['ext']
    })
    if (flag != -1) {
        let oneFile = { path: filePath, ...parse, debug: '', finishedFile: false }
        if (fileData['fileDatas'][parse['name']] != undefined) {
            oneFile['debug'] = '文件名已存在'
            fileData['errFile'].push(oneFile)
            return
        }
        fileData['fileDatas'][parse['name']] = oneFile
    }
}

// TODO: 检索文件夹部分, 分文件夹与文件情况
// fillPath: string => 绝对路径路径
const searchFile = function (filePath) {
    let stat = null
    try {
        stat = fs.lstatSync(filePath)
    } catch (error) {
        return
    }
    if (stat.isFile()) {
        saveFileData(filePath)
    } else {
        fileData['folders'].push(filePath)
        fs.readdir(filePath, (err, files) => {
            readdirFile(err, files, filePath)
        })
    }
}

// FIXME: 检索文件夹回调函数
// err: string => 报错消息， files：array[] => sting 文件夹下的目录
const readdirFile = function (err, files, oldPath) {
    if (err) {
        return
    }
    files.forEach((basename) => {
        let filePath = path.join(oldPath, basename)
        searchFile(filePath)
    })
}

// 拖入文件检索入口函数
// objFiles: object{} => file: object
const searchFileDrop = function (objFiles) {
    for (let i = 0; i < objFiles.length; i++) {
        searchFile(objFiles[i]['path'])
    }
}

// 拖入事件绑定函数
const dropFile = function () {
    upload.value.addEventListener('drop', function (e) {
        e.preventDefault()
        e.stopPropagation()
        let filePaths = e['dataTransfer']['files']
        dataList.value = filePaths
        // TODO: 拖拽检索入口, filePaths: object
        searchFileDrop(filePaths)
    })
    upload.value.addEventListener('dragover', (e) => {
        //必须要阻止拖拽的默认事件
        e.preventDefault()
        e.stopPropagation()
    })
}

const removeFileData = function (name) {
    const temp = fileData['fileDatas'][name]
    delete fileData['fileDatas'][name]
    temp['debug'] = '用户取消'
    fileData['errFile'].push(temp)
}

let addMsg = null

const addFileData = function (item, index) {
    if (addMsg) {
        addMsg.close()
    }
    const name = item['name']
    if (fileData['fileDatas'][name] === undefined) {
        fileData['fileDatas'][name] = item
        fileData['errFile'].splice(index, 1)
    } else {
        addMsg = ElMessage({
            message: 'Warning, this is a warning message.',
            type: 'warning',
        })
    }
}

const getData = function () {
    let result = {}
    result['timestamp'] = Date.now()
    result['time'] = moment(result['timestamp']).format('YYYY-MM-DD HH:mm')
    return result
}
export default function () {
    onMounted(() => {
        dropFile()
    })
    return { getData, openFile, upload, dropFile, data, dataList, fileData, removeFileData, addFileData, openFolder, lang, successShow, unsuccessShow, Grouping, outputPath, globeOutput, roles }
}
