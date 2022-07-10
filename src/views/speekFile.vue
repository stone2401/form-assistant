<template>
    <div class="main">
        <div class="file-upload" @click="openFile" ref="upload">
            <div class="file-image">
                <svg t="1657075617488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3491" width="128" height="128">
                    <path d="M510.495057 625.379161c-212.404575 0-384.594523 43.293726-384.594523 96.69435s172.189948 96.69435 384.594523 96.69435c212.413449 0 384.603397-43.293726 384.603397-96.69435s-172.189948-96.69435-384.603397-96.69435z" fill="#5597FF" opacity=".7" p-id="3492"></path>
                    <path d="M513.496957 772.937206c-212.404575 0-384.594523 43.293726-384.594524 96.69435s172.189948 96.69435 384.594524 96.69435c212.413449 0 384.603397-43.293726 384.603397-96.69435s-172.189948-96.69435-384.603397-96.69435z" fill="#5597FF" opacity=".7" p-id="3493"></path>
                    <path
                        d="M618.71695 433.256707c49.586801-49.587688 79.021033-100.554315 65.737428-113.83792-13.283605-13.283605-64.250232 16.150627-113.83792 65.737428a494.475757 494.475757 0 0 0-4.560084 4.62131c2.942447-22.003577 4.569844-46.168735 4.569844-71.524714 0-91.955023-21.382433-168.236811-49.389809-182.579022-26.749116-20.460478-85.436562-34.664263-153.536998-34.664264-93.313553 0-168.96 26.664818-168.96 59.567695s75.646447 59.576568 168.96 59.576569c35.771674 0 68.946967-3.919418 96.259549-10.606475-7.072166 30.516797-11.244478 68.081802-11.244478 108.705497 0 27.143986 1.863432 52.921456 5.208735 76.14425a476.662239 476.662239 0 0 0-8.997713-9.242621c-49.586801-49.586801-100.554315-79.021033-113.83792-65.737428-13.283605 13.283605 16.150627 64.25112 65.738315 113.83792 41.478211 41.479099 83.919196 68.85557 104.468409 68.93277 2.094142 0.706329 4.221116 1.068367 6.375598 1.068367 2.608804 0 5.179452-0.531522 7.699522-1.563507 21.952998-3.875938 61.059328-30.14766 99.347522-68.435855z"
                        fill="#89B7FF"
                        p-id="3494"
                    ></path>
                </svg>
            </div>
            <div class="file-title">
                {{ lang['impPro1'] }}
                <br />
                {{ lang['impPro2'] }}
                <br />
                {{ lang['impPro3'] }}
            </div>
        </div>
        <div class="file-data">
            <div class="file-success">
                <el-scrollbar v-if="successShow">
                    <div class="scrollbar-demo-item">{{ lang['blankData'] }}</div>
                </el-scrollbar>
                <el-scrollbar v-else>
                    <div v-for="item in fileData['fileDatas']" :key="item" class="scrollbar-demo-item">
                        {{ item['path'] }}
                        <svg @click="removeFileData(item['name'])" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 992.1 992.1" style="enable-background: new 0 0 992.1 992.1" xml:space="preserve">
                            <g>
                                <g>
                                    <defs><rect id="SVGID_1_" x="125" y="132.1" width="726.9" height="727.9" /></defs>
                                    <clipPath id="SVGID_2_">
                                        <use xlink:href="#SVGID_1_" style="overflow: visible" />
                                    </clipPath>
                                    <path class="st0" style="clip-path: url(#SVGID_2_); fill: #f56c6c" d="M488.3,132.2c-200.7,0-363.5,162.7-363.5,363.5c0,200.7,162.7,363.5,363.5,363.5c200.7,0,363.5-162.7,363.5-363.5C851.8,294.9,689.1,132.2,488.3,132.2L488.3,132.2z M488.3,132.2" />
                                </g>
                                <path class="st1" style="fill: #ffffff" d="M716.5,507.3c0-52-102.2-52-228.2-52c-126,0-228.2,0-228.2,52c0,52,102.1,52,228.2,52C614.3,559.3,716.5,559.3,716.5,507.3L716.5,507.3z M716.5,507.3" />
                            </g>
                        </svg>
                    </div>
                </el-scrollbar>
            </div>
            <div class="file-unsuccess">
                <el-scrollbar v-if="unsuccessShow">
                    <div class="scrollbar-demo-item">{{ lang['blankData'] }}</div>
                </el-scrollbar>
                <el-scrollbar v-else>
                    <div v-for="(item, index) in fileData['errFile']" :key="index" class="scrollbar-demo-item">
                        {{ item['path'] }}
                        <svg @click="addFileData(item)" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 992.1 992.1" style="enable-background: new 0 0 992.1 992.1" xml:space="preserve">
                            <g>
                                <g>
                                    <defs>
                                        <rect id="SVGID_1_" x="59.5" y="52" width="726.9" height="727.9" />
                                    </defs>
                                    <clipPath id="SVGID_2_">
                                        <use xlink:href="#SVGID_1_" style="overflow: visible" />
                                    </clipPath>
                                    <path class="st0" style="clip-path: url(#SVGID_2_); fill: #409eff" d="M422.9,52C222.1,52,59.4,214.8,59.4,415.5c0,200.7,162.7,363.5,363.5,363.5c200.7,0,363.5-162.7,363.5-363.5C786.3,214.8,623.6,52,422.9,52L422.9,52z M422.9,52" />
                                </g>
                                <path class="st1" style="fill: #ffffff" d="M368.7,375.2c0.9-101,7.5-176.3,54.2-176.3c46.7,0,53.3,75.3,54.2,176.3c99.8,1,173.9,7.5,173.9,51.9c0,44.3-74.1,50.9-173.9,51.9c-0.9,101-7.5,176.3-54.2,176.3c-46.7,0-53.3-75.3-54.2-176.3c-99.8-1-173.9-7.5-173.9-51.9C194.7,382.8,268.8,376.2,368.7,375.2L368.7,375.2z M368.7,375.2" />
                            </g>
                        </svg>
                    </div>
                </el-scrollbar>
            </div>
            <div class="file-title">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item :label="lang['success']">{{ Object.keys(fileData['fileDatas']).length }}</el-form-item>
                    <el-form-item :label="lang['unsuccess']">{{ fileData['errFile'].length }}</el-form-item>
                </el-form>
                <el-form :rules="roles" :model="fileData" class="demo-form-inline">
                    <el-form-item prop="classify" :label="lang['grouping']"><el-input v-model="fileData['classify']" size="small" type="text" :placeholder="Grouping" clearable /></el-form-item>
                    <!-- TODO: output 部分 -->
                    <el-tooltip class="box-item" effect="dark" :content="lang['msgOutput']" placement="bottom">
                        <el-form-item :label="lang['output']">{{ outputPath }}</el-form-item>
                    </el-tooltip>
                    <!-- <el-form-item :label="lang['output']">{{ outputPath }}</el-form-item> -->
                    <el-form-item>
                        <el-button :size="'small'" @click="openFolder" color="#409eff" plain>{{ lang['settingPath'] }}</el-button>
                    </el-form-item>
                    <el-form-item :label="lang['globeOutput']">{{ globeOutput }}</el-form-item>
                    <el-form-item>
                        <el-button @click="createTask" :size="'small'" color="#409eff" plain :disabled="successShow">{{ lang['saveTask'] }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import '@/css/speekFile.less'
import getFile from '@/model/speekFile/getFile'
import { useRouter } from 'vue-router'
import filedb from '@/database/filedb'

export default {
    name: 'speekFile',
    setup() {
        let globleData = getFile()
        const routers = useRouter()

        // TODO: 创建任务main逻辑
        let createError = null
        let fileData = globleData['fileData']
        const createTask = function () {
            if (createError) {
                createError.close()
            }
            if (fileData['classify'] != '' && fileData['classify'].length <= 10) {
                filedb.db.find(fileData, (err, docs) => {
                    if (!err && docs.length === 0) {
                        let nowTime = globleData.getData()
                        fileData = { ...fileData, ...nowTime }
                        filedb.db.insert(fileData, (err) => {
                            if (!err) {
                                routers.push({ path: '/show', query: { classify: '1123' } })
                            } else {
                                createError = ElNotification({
                                    title: 'Error',
                                    message: `${globleData['lang'].value['createError']}${err}`,
                                    type: 'error',
                                    position: 'bottom-right',
                                })
                            }
                        })
                    } else {
                        createError = ElNotification({
                            title: 'Error',
                            message: `${globleData['lang'].value['alrError2']}`,
                            type: 'error',
                            position: 'bottom-right',
                        })
                    }
                })
            } else {
                createError = ElNotification({
                    title: 'Error',
                    message: `${globleData['lang'].value['alrError']}`,
                    type: 'error',
                    position: 'bottom-right',
                })
            }
        }
        return { ...globleData, ...globleData, createTask }
    },
}
</script>

<style lang="less"></style>
