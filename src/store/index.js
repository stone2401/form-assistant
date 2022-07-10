import { createStore } from 'vuex'
import { reactive } from 'vue'
import langZh from '@/language/zh.json'
import langEn from '@/language/en.json'
import configDatabase from '@/database/configdb'
let config = null

configDatabase.db.find({ _id: 'config' }, (err, docs) => {
    if (err || docs.length === 0) {
        const setting = require('./setting.json')
        configDatabase.db.insert(setting)
        config = reactive(setting)
        console.log('加载默认配置')
    } else {
        let temp = docs[0]
        storn['state']['config'] = reactive(temp)
        console.log('加载配置用户配置')
    }
})
import setting from './setting.json'
config = reactive(setting)

let language = reactive({
    zh: langZh,
    en: langEn,
})

const storn = createStore({
    state: {
        language,
        config,
    },
    getters: {
        lang: (context) => {
            return context['language'][context['config']['language']]
        },
        atlang: (context) => {
            return context['config']['language']
        },
        langs: (context) => {
            return context['config']['langs']
        },
    },
    mutations: {
        saveConfig(context) {
            let temp = JSON.parse(JSON.stringify(context['config']))
            configDatabase.db.update({ _id: 'config' }, temp, { upsert: true }, (err, docs, world) => {
                console.log(context)
                if (err) {
                    ElNotification({
                        title: 'Success',
                        message: storn.getters['lang']['settingSuccess'],
                        type: 'error',
                    })
                } else {
                    ElNotification({
                        title: 'Success',
                        message: storn.getters['lang']['settingSuccess'],
                        type: 'success',
                    })
                }
            })
        },
    },
    actions: {},
    modules: {},
})

export default storn

