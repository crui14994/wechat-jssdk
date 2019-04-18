### 基于Node.js的微信JS-SDK后端接口实现
---

#### 一.初始化项目(需要配置自己的微信公众号;自行查看微信官方文档)
1. 下载项目
    ```
    git clone git@github.com:crui14994/wechat-jssdk.git
    ```
2. 安装依赖
    ```
    cnpm install
    ```
2. 在根目录下运行命令启动项目
    ```
    node app.js
    ```

#### 二.项目目录说明
    public --- nodejs的静态文件伺服文件夹
        test.html --- 测试文件
    wechatApi ---保存了Wechat JS-API接口文件
        wechat_jsapi.js --- 封装了管理和获取微信 JSSDK 生产的access_token、jsapi_ticket和签名（signature）
    access_token.json --- 保存了access_token
    app.js --- 项目的入口文件
    config.json --- 项目配置文件；配置了token，appID，appScrect
    jsapi_ticket.json --- 保存了jsapi_ticket

#### 三.wechat_jsapi.js使用说明
> 1.在app.js中导入模块并实例化一个jssdk用于调用wechat_jsapi.js中的方法
```
const express = require('express'), //express 框架 
    crypto = require('crypto'), //引入加密模块
    Jsapi = require("./wechatApi/wechat_jsapi"), //Wechat JS-API接口
    config = require('./config'); //引入配置文件

//实例Jsapi
var jssdk = new Jsapi(config.appID, config.appScrect);
```
> 2.方法介绍

获取 access_token, 返回promise对象，resolve回调返回string
```
jssdk.getAccessToken().then(
    re => console.log(re)
).catch(err => console.error(err));
```
获取 jsapi_ticket, 返回promise对象，resolve回调返回string
```
jssdk.getJsApiTicket().then(
    re => console.log(re)
).catch(err => console.error(err));
```
获取 JS-SDK 权限验证的签名, 返回promise对象，resolve回调返回json
```
jssdk.getSignPackage(url).then(
    re => console.log(JSON.stringify(re))
).catch(err => console.error(err));
```

#### 四.详情移步简书查看
[基于Node.js的微信JS-SDK后端接口实现（一）](https://www.jianshu.com/p/6e039428431b)


[基于Node.js的微信JS-SDK后端接口实现（二）](https://www.jianshu.com/p/4bf47177b076)

[基于Node.js的微信JS-SDK后端接口实现（三）](https://www.jianshu.com/p/ca72ac845d0c)