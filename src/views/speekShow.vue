<template>
    <div class="main show-main">
        <div class="show-left">
            <!-- <el-scrollbar>
                <div v-for="item in 20" :class="classStyle(item)" :key="item" class="scrollbar-demo-item">{{ 1234 }}</div>
            </el-scrollbar> -->
            <el-scrollbar>
                <div v-for="item in 20" :class="classStyle(item)" :key="item" class="scrollbar-demo-item">{{ 1234 }}</div>
            </el-scrollbar>
        </div>
        <div class="show-content">
            <el-scrollbar>
                <div v-for="item in 20" :class="classStyle(item)" :key="item" class="scrollbar-demo-item">{{ 1234 }}</div>
            </el-scrollbar>
        </div>
        <div class="show-right"></div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
    name: 'speekShow',
    setup() {
        const router = useRoute()
        let query = router.query
        let atSelect = 2
        const classStyle = function (item) {
            if (item === atSelect) {
                return 'scrollbar-demo-item-select'
            } else {
                return 'scrollbar-demo-item-noselect'
            }
        }
        return { classStyle }
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
        font-size: 12px;
        height: 80px;
        line-height: 80px;
        margin: 5px;
        padding: 0 40px;
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
}
.show-content {
    float: left;
    width: 30%;
    height: 100%;
    .scrollbar-demo-item {
        height: 40px;
        line-height: 40px;
    }
}
.show-right {
    float: left;
    margin: 50px 50px 50px 5px;
    width: 35%;
    height: 100%;
}
</style>
