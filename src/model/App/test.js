const open = window.require('fs')
import Qs from 'qs'
import axios from 'axios'
import { ref } from 'vue'

let file = ref(null)
const getRequestData = function () {
    let path = 'C:/Users/stone/Desktop/zh_val_49.jpg'
    // let path = getPath();

    const readable = open.readFileSync(path, 'binary')
    let image = Buffer.from(readable, 'binary').toString('base64')
    let data = {
        image: image,
        is_sync: true,
        request_type: 'excel',
    }
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    }
    let request_url =
        // "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=24.1a1f7c9a1ade3aded14c182841f7fce0.2592000.1659417573.282335-26611303";
        'api/rest/2.0/solution/v1/form_ocr/request?access_token=24.1a1f7c9a1ade3aded14c182841f7fce0.2592000.1659417573.282335-26611303'
    let qsData = Qs.stringify(data)
    return {
        request_url,
        qsData,
        config,
    }
}

function speakList(speak, end, speakData) {
    if (end == -1) return
    speak.text = speakData[end]['words']
    let newSpeak = new SpeechSynthesisUtterance()
    speak.onend = speakList(newSpeak, --end, speakData)
    speechSynthesis.speak(speak)
}
const getPath = function () {
    return file.value
}
const postImage = async function () {
    let requestData = getRequestData()
    let response = await axios.post(requestData['request_url'], requestData['qsData'], requestData['config'])
    let words_result = response['data']['words_result']
    let speak = new SpeechSynthesisUtterance()
    speakList(speak, words_result.length - 1, words_result)
}
const getExcel = async function () {
    let requestData = getRequestData()
    let response = await axios.post(requestData['request_url'], requestData['qsData'], requestData['config'])
    let responseData = response['data']['result']['result_data']
    console.log(responseData)
}

function toBuffer(ab) {
    var buf = new Buffer(ab.byteLength)
    var view = new Uint8Array(ab)
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i]
    }
    return buf
}
const dowlodExcel = async function () {
    let url = 'execl/v1/ai-edgecloud/8A194366F19C47659C6FF5B6ABB5D346.xls?authorization=bce-auth-v1%2Fd9272b4e9a38476db4470c2714e1339a%2F2022-07-04T12%3A06%3A41Z%2F172800%2F%2F742d8cac6ee925c0483462f1261f38fbf1cd1f1b4c3a2089e505d0eb2d286f16'
    let response = await axios.get(url, {
        responseType: 'blob',
    })
    console.log(response['data'])
    let blob = new Blob([response.data], {
        type: `text/plain;charset=utf-8`,
    })
    let bufferData = await blob.arrayBuffer()
    bufferData = toBuffer(bufferData)
    console.log(bufferData)
    open.writeFile(`C:/Users/stone/Desktop/zh_val_49.xlsx`, bufferData, (err) => {
        if (err) return 0
        console.log('成功')
    })
    console.log(blob)
    // open.writeFile(
    //   `C:/Users/stone/Desktop/zh_val_49.xlsx`,
    //   responseData,
    //   { encoding: "utf-8" },
    //   function (err) {
    //     if (err) throw err;
    //     console.log("写入到文件结束.");
    //   }
    // );
}
const download_file = async function (file_name) {
    var url = 'execl/v1/ai-edgecloud/8A194366F19C47659C6FF5B6ABB5D346.xls?authorization=bce-auth-v1%2Fd9272b4e9a38476db4470c2714e1339a%2F2022-07-04T12%3A06%3A41Z%2F172800%2F%2F742d8cac6ee925c0483462f1261f38fbf1cd1f1b4c3a2089e505d0eb2d286f16'
    let res = await axios.get(url, {
        responseType: 'blob',
    })

    let blob = new Blob([res.data], {
        type: `text/plain;charset=utf-8`,
    })
    // 获取heads中的filename文件名
    let downloadElement = document.createElement('a')
    // 创建下载的链接
    let href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    // 下载后文件名
    downloadElement.download = file_name
    document.body.appendChild(downloadElement)
    // 点击下载
    downloadElement.click() // 下载完成移除元素
    document.body.removeChild(downloadElement)
    // 释放掉blob对象
}

export default function () {
    return {
        postImage,
        file,
        getPath,
        getExcel,
        dowlodExcel,
        download_file,
    }
}
