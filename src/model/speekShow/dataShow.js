import { reactive, computed, toRefs, watch, onMounted } from 'vue'
import fileDB from '@/database/filedb'
const overAll = 'overall'
let allData = reactive({
    allClassify: [],
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
        return 'scrollbar-demo-item-noselect'
    }
}
const fileShow = function (item) {
    if (item === allData.atFile) {
        return 'scrollbar-demo-item-select'
    } else {
        return 'scrollbar-demo-item-noselect'
    }
}
const clickTest = function (temp) {
    allData['atClassify'] = temp
    allData['atFile'] = overAll
}
const configAtFile = function (temp) {
    allData['atFile'] = temp
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
                    console.log(allData['atFileData'])
                    allData.showFileData = true
                }
            })
        }
    )
    onMounted(() => {
        setTimeout(() => {
            fileDB.getAllClassify((err, docs) => {
                if (!err) {
                    allData.allClassify = docs
                    console.log(docs)
                }
            })
        }, 0)
    })
    return { ...toRefs(allData), classifyShow, classifyStyle, clickTest, fileShow, configAtFile }
}
