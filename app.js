
const express = require('express'), //express 框架 
    crypto = require('crypto'), //引入加密模块
    Jsapi = require("./jsApi/wechat_jsapi"), //Wechat JS-API接口
    config = require('./config'); //引入配置文件

var app = express(); //实例express框架

//实例Jsapi
var jssdk = new Jsapi(config.appID, config.appScrect);

//静态文件伺服
app.use('/wxJssdk/public', express.static('public'));

//用于处理所有进入 3000 端口 get 的连接请求
app.get('/', function (req, res) {
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature, //微信加密签名
        timestamp = req.query.timestamp, //时间戳
        nonce = req.query.nonce, //随机数
        echostr = req.query.echostr; //随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [config.token, timestamp, nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
});

//用于请求获取 access_token
app.get('/getAccessToken', function (req, res) {
    jssdk.getAccessToken().then(
        re => res.send({
            "code": 0,
            "message": "ok",
            "data": {
                "access-token": re
            }
        })
    ).catch(
        err => res.send({
            "code": 1,
            "message": "err",
            "err": err
        }));
});

//用于JS-SDK使用权限签名算法
app.get('/jssdk', function (req, res) {
    //获取传入的url
    let url = req.query.url;
    //使用签名算法计算出signature
    jssdk.getSignPackage(url).then(
        re => res.send({
            "code": 0,
            "message": "ok",
            "data": re
        })
    ).catch(err => res.send({
        "code": 1,
        "message": "err",
        "err": err
    }));
});

//监听3000端口
app.listen(3000);