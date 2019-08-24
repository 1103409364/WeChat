const express = require('express');
const sha1 = require('sha1');

const app = express();
const PORT = 3000;

const config = {
  token: 'wxTest824',
  appID: 'wxc9f722ba539e223f',
  appsecret: 'f56a94d1cbb87c82a2dd50bab9178b4e'
}

app.use((req, res, next) => {
  // 微信服务器提交的参数:签名,随机字符串,微信发请求的时间戳,微信的随机数字
  console.log(req.query);

  const { signature, echostr, timestamp, nonce } = req.query;
  const { token } = config;

  const arr = [timestamp, nonce, token];
  // 按照字典序排序
  const arrSort = arr.sort();
  const str = arrSort.join('');
  // 加密
  const sha1Str = sha1(str);
  console.log(sha1Str);
  
  // 判断,如果计算得到的签名如果和微信服务器的签名相同,说明消息来自微信服务器
  if (sha1Str === signature) {
    // 如果签名一致,返回随机字符串
    res.send(echostr)
  } else {
    res.send('error')
  }

})
// 监听端口
app.listen(PORT, () => {
  console.log('server is running on port: ' + PORT)
})