
// 将一个文件包装成一个类

export default class wrapFile {
    constructor (file) {
        this.file = file
        this.type = 'image'
        this.size = file.size || 0

        let reader = new FileReader();
        reader.onload = () => {
            this.buffer = reader.result;
        }

        reader.readAsArrayBuffer(file)
        
    }
}
