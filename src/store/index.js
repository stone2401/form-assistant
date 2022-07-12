import { createStore } from 'vuex'
import { reactive } from 'vue'
import langZh from '@/language/zh.json'
import langEn from '@/language/en.json'
import configDatabase from '@/database/configdb'
import Token from '@/model/postFile'
let config = null

const whetherToken = function (temp) {
    return temp['userToken']['API_key'] != '' && temp['userToken']['Secret_key'] != '' && (temp['userToken']['token'] === '' || temp['userToken']['time'] + Token.day29 < Token.getTimeStamp())
}

configDatabase.db.find({ _id: 'config' }, async (err, docs) => {
    if (err || docs.length === 0) {
        const setting = require('./setting.json')
        let response = await Token.getToken()
        let token = response['data']['access_token']
        setting['tokenObj']['token'] = token
        configDatabase.db.insert(setting)
        storn.state.config = reactive(setting)
    } else {
        let temp = docs[0]
        if (whetherToken(temp)) {
            let response = await Token.getUserToken()
            let token = response['data']['access_token']
            setting['tokenObj']['token'] = token
            configDatabase.db.update({ _id: 'config' }, temp, (err) => {
                console.log(err)
            })
        }
        storn.state.config = reactive(temp)
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
        atRouter: '/',
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
        AtRouter: (context) => {
            return context['atRouter']
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
        pushRouter(context, value) {
            context['atRouter'] = value
        },
    },
    actions: {},
    modules: {},
})

export default storn

