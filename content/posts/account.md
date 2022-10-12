---
title: "Account" # 标题
date: 2022-10-12T22:09:45+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- account
description: "" # 描述
weight: # 输入1可以顶置文章，用来给文章展示排序，不填就默认按时间排序
slug: ""
draft: false # 是否为草稿
comments: true # 是否展示评论
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true # 顶部显示当前路径
cover:
    image: "" #图片路径 例：posts/tech/123/picture.png
    caption: "" # 图片底部描述
    alt: ""
    relative: false
---

[[Redis]]
# Django
## 用户名密码登录
[6.1用户名密码登录-Vedio](https://www.acwing.com/video/3550/)
数据表定义：11m02s~21m02s
views & urls & js：25m01s~32m50s~33m37s~47m30s
将头像渲染到角色上：48m~50m20s
登陆界面 HTML+CSS：57m10s~1h42m30s~1h49m56s
登陆界面 逻辑实现：1h50m~1h53m47s~1h58m41s~2h20s~2h32m40s
[6.1 上课笔记](https://www.acwing.com/solution/content/79314/)
[6.1 上课笔记——**客户端请求与Django响应流程**](https://www.acwing.com/solution/content/75831/)

- 我们在定义完一个数据表之后，需要将其**更新到数据库**，这时候我们需要执行两句话：
```

python3 manage.py makemigrations
python3 manage.py migrate
```

**客户端请求与Django响应流程**
用户在客户端通过`$.ajax`发送请求，根据`urls`路由到对应的`views`中的函数，处理`request`后返回`JsonResponse` 至客户端

`views`
```py

from django.http import JsonResponse
from django.contrib.auth import authenticate, login

def signin(request):
    data = request.GET # 获取请求的信息
    username = data.get('username') # 用户名
    password = data.get('password') # 密码
    user = authenticate(username = username, password = password) # 从数据库中查找这个用户
    if not user: # 如果没有就直接返回不成功
        return JsonResponse({
            'result': "用户名或密码不正确"
        })
   login(request, user) # 找到了就登录
```

`urls`
```py

from game.views.settings.login import signin # 引入自己写的逻辑

urlpatterns = [
    path("login/", signin, name = "settings_login"), # "settings/login/"
]
```

`js`


```js

login_on_remote() // 在远程服务器上登录
{
    let outer = this;

    let username = this.$login_username.val(); // 获取输入框中的用户名
    let password = this.$login_password.val(); // 获取输入框中的密码

    this.$login_error_message.empty(); // 清楚错误信息

    $.ajax({
        url: "登录URL", // 访问url
        type: "GET",
        data: {
            username: username, // 传输数据
            password: password,
        },
        success: function(resp){
            console.log(resp); // 测试输出
            if (resp.result === "success") {
                location.reload(); // 如果成功就刷新
            }
            else {
                outer.$login_error_message.html(resp.result); // 如果失败就显示错误信息
            }
        }
    });
}
```

## 第三方登录
[6.2 web端AcWing一键登录-Vedio](https://www.acwing.com/video/3565/)
在`django`中集成数据库`redis`：7m10s~13m20s
`redis`命令：13m40s~16m34s
**Oauth2一键授权登录的基本原理**：17m30s~29m15s~32m51s
数据表添加`openid`信息：33m20s~34m47s
**Oauth2一键授权登录的代码实现**：35m20s~1h25s~1h27m20s
用户点击`AcWing一键登录`，通过`urls & views`调用`apply_code`函数，将`state`放到`redis`中，将`appid & redirect_uri & scope & state` 传入`apply_code_url`链接，返回并重定向至`apply_code_url`向用户询问是否授权
用户点击`同意`后，重定向至`redirect_uri`链接，返回参数为`code`和`state`，通过`urls & views`调用`receive_code`函数。若验证`state`失败，直接重定向至初始界面
若验证`state`成功，将`appid & code & secret`发送至`AcWing服务器`，申请授权令牌`access_token`和用户的`openid`
若申请令牌成功，将`access_token & openid`发送至`AcWing服务器`，得到用户信息，创建并登录用户，最后重定向至初始界面
[6.2 **Web端AcWing一键登录-讲义**](https://www.acwing.com/blog/content/12466/)
[6.2 **上课笔记**](https://www.acwing.com/solution/content/79354/)
`redirect_uri = quote("https://app23.acapp.acwing.com.cn/settings/acwing/web/receive_code")`

[6.3 acapp端AcWing一键登录-Vedio](https://www.acwing.com/video/3566/)
**Oauth2一键授权登录的基本原理**：10m~12m20s~16m35s~18m
**Oauth2一键授权登录的代码实现**：19m25s~21m~23m25s~34m29s~42m10s
[6.3 acapp端AcWing一键登录-讲义](https://www.acwing.com/blog/content/12467/)
[6.3 上课笔记](https://www.acwing.com/solution/content/79365/)
