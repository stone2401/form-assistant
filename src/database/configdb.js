const nedb = window.require('nedb')
const databasePath = './data/save.db'
const db = new nedb({ filename: databasePath, autoload: true })

// 深度拷贝Object

export default {
    db,
}
