const nedb = window.require('nedb')
const basicsPath = './data/basics.db'
const deepPath = './data/deepDatabase/'
const basicDB = new nedb({ filename: basicsPath, autoload: true })

const deepKey = ['fileDatas', 'errFile', 'folders']

// 创建 深度数据储存库
const createDeepDB = function (classify) {
    let deepDB = deepPath + classify + '.db'
    return new nedb({ filename: deepDB, autoload: true })
}

// 截取 file 等数据字段
const getDeepData = function (fileDataCopy) {
    let temp = {}
    deepKey.forEach((key) => {
        temp[key] = fileDataCopy[key]
    })
    return temp
}
// 截取 信息 数据部分
const getBasicData = function (fileDataCopy) {
    let temp = {}
    deepKey.forEach((key) => {
        delete fileDataCopy[key]
    })
    temp = { ...fileDataCopy }
    return temp
}
const deepCopy = function (value) {
    return JSON.parse(JSON.stringify(value))
}
// 分段保存 fileData 数据，分为 浅数据层：信息部分  深数据层：file等字段
const insertAllData = function (fileData, callack) {
    const fileDataCopy = deepCopy(fileData)
    let classify = fileDataCopy['classify']
    let deepData = getDeepData(fileDataCopy)
    let basicData = getBasicData(fileDataCopy)
    let deepDB = createDeepDB(classify)
    basicDB.insert(basicData, (err) => {
        if (!err) {
            deepDB.insert(deepData, (err) => {
                callack(err)
            })
            return
        }
        callack(err)
    })
}

const updateAllData = function (classifyData, fileData) {
    console.log(classifyData, fileData)
    const classifyDataCopy = deepCopy(classifyData)
    let classify = classifyDataCopy['classify']
    const fileDataCopy = deepCopy(fileData)
    let deepId = fileDataCopy['_id']
    basicDB.update({ classify: classify }, classifyDataCopy, (err) => {
        console.log(err)
    })
    let deepDB = createDeepDB(classify)
    deepDB.update({ _id: deepId }, fileDataCopy, (err) => {
        console.log(err)
    })
}

const findClassify = function (classify, callack) {
    basicDB.find({ classify: classify }, (err, docs) => {
        // 该 classify 不存在情况
        if (!err && docs.length === 0) {
            callack(true)
            return
        }
        callack(false)
    })
}

const getAllClassify = function (callack) {
    basicDB.find({}, (err, docs) => {
        callack(err, docs)
    })
}

const getAtFileData = function (classify, callack) {
    let deepDB = createDeepDB(classify)
    deepDB.find({}, (err, docs) => {
        callack(err, docs[0])
    })
}

export default { insertAllData, findClassify, getAllClassify, getAtFileData, updateAllData }
