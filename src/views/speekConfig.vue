<template>
    <div class="main">
        <div class="config-lang">
            <h3 class="config-item-title">{{ lang['language'] }}</h3>
            <div class="config-item-content">
                <el-radio-group v-model="atlang">
                    <el-radio v-for="(item, index) in lang['langRadio']" :key="langs[index]" :label="langs[index]" border>{{ item }}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <!-- <div class="config-lang">
            <h3 class="config-item-title">{{ lang['interConfig'] }}</h3>
            <div class="config-item-content">
                <el-form label-width="100px">
                    <el-form-item label="API Key:">
                        <el-input v-model.trim="config['userToken']['API_key']"></el-input>
                    </el-form-item>
                    <el-form-item label="Secret Key:">
                        <el-input v-model.trim="config['userToken']['Secret_key']"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="commitValue">{{ lang['apply'] }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div> -->
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name: 'speekConfig',
    setup() {
        const store = useStore()
        let lang = computed({
            get() {
                return store.getters['lang']
            },
        })
        let atlang = computed({
            get() {
                return store.getters['atlang']
            },
            set(value) {
                store['state']['config']['language'] = value
                store.commit('saveConfig')
            },
        })
        let langs = computed({
            get() {
                return store.getters['langs']
            },
        })
        let config = computed({
            get() {
                return store.getters['useConfig']
            },
        })
        let commitValue = function () {
            store.dispatch('saveConfig')
        }
        return { lang, atlang, langs, config, commitValue }
    },
}
</script>

<style lang="less">
.config-lang {
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 20px;
    .config-item-title {
        margin-bottom: 10px;
    }
}
</style>
