---
title: "JS简易游戏引擎实现" # 标题
date: 2022-10-12T22:06:12+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Javascript
- Tech
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

# 简易游戏引擎实现（AcGameObject）
```js

let last_timestp; // 上一帧的时间
let AC_GAME_ANIMATION = function(timestp) // timestp 是传入的一个参数，就是当前调用的时间
{
    for (let i = 0; i < AC_GAME_OBJECTS.length; ++ i) // 所有动的元素都进行更新。
    {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start)
        {
            obj.start(); // 调用start()
            obj.has_called_start = true; // 表示已经调用过start()了
        }
        else
        {
            obj.timedelta = timestp - last_timestp; // 时间微分
            obj.update(); // 不断调用
        }
    }
    last_timestp = timestp; // 进入下一帧时当前时间戳就是这一帧的时间戳

    requestAnimationFrame(AC_GAME_ANIMATION); // 不断递归调用
}

requestAnimationFrame(AC_GAME_ANIMATION); // JS的API，可以调用1帧里面的函数。(有些浏览器的一秒帧数不一定相等)
```
