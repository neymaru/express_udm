const path = require('path')

// 애플리케이션이 실행될 수 있도록 해주는 파일의 경로를 알려줌
module.exports = path.dirname(process.mainModule.filename)