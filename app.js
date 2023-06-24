const path = require('path');

const express = require('express');
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')

const app = express();

// app.set() : Express 애플리케이션 전체에 어떤 값이든 설정할 수 있으며 Express가 이해할 수 없는 키라던가 구성항목도 포함
// 뷰엔진 설정
app.set('view engine', 'ejs') // express에게 pug 엔진을 사용해서 동적 견본을 컴파일 하고 싶다는 것과
app.set('views', 'views') // 견본들을 찾을 장소 알려주기

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));
// 정적 폴더 등록
app.use(express.static(path.join(__dirname, 'public'))) // public 경로에 엑세스 가능 (확장자 .css나 .js 파일을 찾는 요청이면 자동으로 public으로 포워딩)


app.use('/admin',adminRoutes);
app.use(shopRoutes);

// 404 오류 페이지 추가
app.use(errorController.get404)

app.listen(3000);