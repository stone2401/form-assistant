<template>
    <div class="common-layout app-main globle">
        <el-container class="app-container">
            <el-aside width="60px" class="app-menu" style="-webkit-app-region: drag">
                <speekMenu></speekMenu>
            </el-aside>
            <el-main class="app-view-main">
                <div class="speekHeader">
                    <speekHeader></speekHeader>
                </div>
                <div class="speekView">
                    <router-view v-slot="{ Component }">
                        <transition name="el-zoom-in-center">
                            <keep-alive :exclude="keepComp">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
    name: 'App',
    components: {
        speekMenu: (speekMenu) => (['@/components/speekMenu.vue'], speekMenu),
        speekHeader: (speekHeader) => (['@/components/speekHeader.vue'], speekHeader),
    },
    setup() {
        const router = useRouter()
        router.push('/blank')
        const keepComp = ['speekFile', 'speekConfig', 'speekShow']
        return { keepComp }
    },
}
</script>
<style lang="less">
.el-main {
    overflow: visible;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
}
.app-main {
    height: 100%;
    .el-container {
        height: 100%;
    }
    .app-menu {
        background-color: #409eff;
        border-right: solid 1px var(--el-menu-border-color);
    }
    .speekHeader {
        height: 6%;
        width: 100%;
    }
    .speekView {
        height: 94%;
        width: 100%;
        overflow: hidden;
    }
    .test {
        background-color: #000;
        width: 100%;
        height: 100%;
    }
}
</style>

