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
                <div class="scrollbar-demo-item">{{ 1234 }}</div>
            </el-scrollbar>
            <el-scrollbar v-else>
                <div class="scrollbar-demo-item" @click="configAtFile('overall')" :class="fileShow('overall')">{{ '总任务' }}</div>
                <div v-for="item in atFileData['fileDatas']" @click="configAtFile(item['base'])" :class="fileShow(item['base'])" :key="item" class="scrollbar-demo-item">
                    <p>{{ item['base'] }}</p>
                </div>
            </el-scrollbar>
        </div>
        <div class="show-right"></div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import routerShow from '@/model/speekShow/routerShow'
import dataShow from '@/model/speekShow/dataShow'

export default {
    name: 'speekShow',
    setup() {
        let allData = dataShow()
        const router = useRoute()
        let query = router.query
        allData.atClassify.value = query['classify']
        // let atClassify = null
        return { ...allData, allData }
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
}
</style>
