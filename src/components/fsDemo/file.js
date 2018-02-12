
// 将一个文件包装成一个类
// function File (file) {
//     this
// }
class File {
    constructor (file) {
        this.file = file
        this.type = 'image'
        this.length = file.length || 0
        
    }
}

export default File;