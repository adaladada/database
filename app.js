const express = require('express');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser');
// 处理post请求的查询参数————需要引入body-parser中间件
const bodyParser = require('body-parser');
// 处理urlencoded格式参数
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式参数
app.use(bodyParser.json());
// cookie中间件设置
app.use(cookieParser());
// session配置
app.use(session({
  secret: 'sessionKey', // 可以随便写。String类型的字符串，作为服务器端生成 session 的签名
  name: 'token', // 这个会作为给cookie设置值的key
  saveUninitialized: true, // 强制将未初始化的 session 存储。默认值是true，建议设置成true
  resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //设置过期时间是一天
  },
  rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间，默认：false
}))
// 全局过滤器
// app.use((req, res, next) => {
//   const { userInfo } = req.session;
//   if (req.url !== '/user/login') {
//     if (!userInfo) {
//       res.json({
//         code: "A0109",
//         msg: "登录会话失效，请重新登录"
//       });
//     } else {
//       next();
//     }
//   }
// });

app.all('*', (req, res, next) => {
  // 设置任何域名都能允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
})

// 导入userRouter模块
const userRouter = require('./Router/userRouter');
// app调用use方法挂载路由
app.use('/user', userRouter);

// 监听窗口
app.listen(8081, () => {
  console.log('8081端口启动');
})