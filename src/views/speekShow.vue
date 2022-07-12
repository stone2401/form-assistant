<template>
    <div class="main show-main">
        <div class="show-left">
            <el-scrollbar v-if="classifyShow"></el-scrollbar>
            <el-scrollbar v-else>
                <div v-for="item in allClassify" @click="clickTest(item['classify'])" :key="item['classify']" :class="classifyStyle(item['classify'])" class="scrollbar-demo-item">
                    <p>
                        <span>{{ item['classify'] }}</span>
                    </p>
                    <p>
                        <span>{{ item['time'] }}</span>
                    </p>
                </div>
            </el-scrollbar>
        </div>
        <div class="show-content">
            <el-scrollbar v-if="!showFileData">
                <div class="scrollbar-demo-item"></div>
            </el-scrollbar>
            <el-scrollbar v-else>
                <div class="scrollbar-demo-item" @click="configAtFile('overall')" :class="fileShow('overall')">{{ lang['mainTask'] }}</div>
                <div v-for="item in atFileData['fileDatas']" @click="configAtFile(item['name'])" :class="fileShow(item['name'])" :key="item" class="scrollbar-demo-item">
                    <p>{{ item['base'] }}</p>
                </div>
            </el-scrollbar>
        </div>
        <div class="show-right" v-if="atClassifyData">
            <el-form label-width="">
                <el-form-item :label="lang['grouping']">{{ atClassifyData['classify'] }}</el-form-item>
                <el-form-item label="创建时间：">{{ atClassifyData['time'] }}</el-form-item>
                <el-form-item :label="lang['output']">{{ atClassifyData['output'] }}</el-form-item>
                <el-form-item label="是否已导出：">{{}}</el-form-item>
            </el-form>
            <el-form v-if="file">
                <el-form-item label="文件名称：">{{ file['name'] }}</el-form-item>
                <el-form-item label="文件路径：">{{ file['path'] }}</el-form-item>
                <el-form-item label="文件类型：">{{ file['ext'] }}</el-form-item>
            </el-form>
            <el-form>
                <el-form-item label=""><el-button @click="start" type="primary" plain>开始任务</el-button></el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import dataShow from '@/model/speekShow/dataShow'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
    name: 'speekShow',
    setup() {
        let allData = dataShow()
        const router = useRoute()
        let store = useStore()
        let lang = computed({
            get() {
                return store.getters['lang']
            },
        })
        let query = router.query
        if (query['classify'] != undefined) {
            allData.atClassify.value = query['classify']
        }
        return { ...allData, allData, lang }
    },
}
</script>

<style lang="less">
.show-main {
    .scrollbar-demo-item-select {
        background-color: #409eff;
    }
    .scrollbar-demo-item-noselect {
        background-color: #ebb563;
    }
    .scrollbar-demo-item-success {
        background-color: #67c23a;
    }
    .scrollbar-demo-item-err {
        background-color: #f56c6c;
    }
    .scrollbar-demo-item {
        user-select: none;
        cursor: pointer;
        font-size: 12px;
        height: 80px;
        margin: 5px;
        padding: 0 20px;
        text-align: left;
        border-radius: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.show-left {
    float: left;
    width: 20%;
    height: 100%;
    margin-right: 5px;
    .scrollbar-demo-item {
        border-radius: 8px;
        text-align: left;
        line-height: 30px;
    }
}
.show-content {
    float: left;
    width: 30%;
    height: 100%;
    margin-right: 5px;
    .scrollbar-demo-item {
        height: 40px;
        line-height: 40px;
    }
}
.show-right {
    float: left;
    width: 35%;
    height: 100%;
    text-align: left;
    padding-top: 50px;
    margin-left: 20px;
    .el-form-item {
        margin-bottom: 0;
    }
    .el-checkbox.el-checkbox--large {
        height: 32px;
    }
}
</style>
