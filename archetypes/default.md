---
title: "{{ replace .Name "-" " " | title }}" # 标题
date: {{ .Date }} # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Life
- Sports
- Fun
keywords: # 关键词
- Life
- Sports
- Fun
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



{{< galleries >}}
{{< gallery src="">}}
{{< gallery src="">}}
{{< gallery src="">}}
{{< gallery src="">}}
{{< /galleries >}}