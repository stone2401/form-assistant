<template>
    <div class="main">
        <div class="config-lang">
            <h3 class="config-item-title">语言</h3>
            <div class="config-item-content">
                <el-radio-group v-model="atlang">
                    <el-radio v-for="(item, index) in lang['langRadio']" :key="langs[index]" :label="langs[index]" border>{{ item }}</el-radio>
                </el-radio-group>
            </div>
        </div>
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
        console.log('config')
        return { lang, atlang, langs }
    },
}
</script>

<style lang="less">
.config-lang {
    box-sizing: border-box;
    text-align: left;
}
</style>
