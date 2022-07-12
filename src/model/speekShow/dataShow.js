import { reactive, computed, toRefs, watch, onMounted, onUnmounted } from 'vue'
import fileDB from '@/database/filedb'
import emittBus from '@/model/bus'
const overAll = 'overall'
let allData = reactive({
    allClassify: {},
    atClassify: null,
    atFileData: {},
    atFile: overAll,
    query: {},
    showFileData: false,
})

let classifyShow = computed({
    get() {
        return allData.allClassify.length != 0 ? false : true
    },
})
const classifyStyle = function (item) {
    if (item === allData.atClassify) {
        return 'scrollbar-demo-item-select'
    } else {
        let itemFinished = allData['allClassify'][item]['finished']
        if (itemFinished) {
            return 'scrollbar-demo-item-success'
        } else {
            return 'scrollbar-demo-item-noselect'
        }
    }
}
const fileShow = function (item) {
    if (item === allData.atFile) {
        return 'scrollbar-demo-item-select'
    } else {
        if (item === overAll) {
            return 'scrollbar-demo-item-noselect'
        }
        let itemOutput = allData['atFileData']['fileDatas'][item]['output']
        if (itemOutput === undefined) {
            return 'scrollbar-demo-item-noselect'
        } else if (itemOutput) {
            return 'scrollbar-demo-item-success'
        } else {
            return 'scrollbar-demo-item-err'
        }
    }
}
const clickTest = function (temp) {
    allData['atClassify'] = temp
    allData['atFile'] = overAll
}
const configAtFile = function (temp) {
    allData['atFile'] = temp
}

let atClassifyData = computed({
    get() {
        return allData['allClassify'][allData['atClassify']]
    },
})
let file = computed({
    get() {
        let temp = allData['atFileData']['fileDatas']
        if (allData['atFile'] === overAll) {
            return undefined
        }
        return temp[allData['atFile']]
    },
})
const pushDocs = function (docs) {
    let temp = {}
    docs.forEach((self) => {
        let classify = self['classify']
        temp[classify] = self
    })
    return temp
}

const start = function () {
    emittBus.emit('startTask', { value: allData['atFileData'], outValue: atClassifyData.value })
}
const test = function () {
    console.log(allData)
}
export default function () {
    watch(
        () => allData['atClassify'],
        () => {
            if (allData['atClassify'] === undefined) {
                return
            }
            fileDB.getAtFileData(allData['atClassify'], (err, docs) => {
                if (!err) {
                    allData['atFileData'] = docs
                    allData.showFileData = true
                }
            })
        }
    )
    onMounted(() => {
        fileDB.getAllClassify((err, docs) => {
            if (!err) {
                allData.allClassify = pushDocs(docs)
            }
        })
    })
    return { test, start, file, ...toRefs(allData), classifyShow, classifyStyle, clickTest, fileShow, configAtFile, atClassifyData }
}
