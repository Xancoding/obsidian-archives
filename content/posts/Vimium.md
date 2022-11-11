---
title: "Vimium学习记" # 标题
date: 2022-11-11T20:39:13+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Life
- Productivity
- Vimium
- 工具
keywords: # 关键词
- Life
- Productivity
- Vimium
- 工具
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

# Vimium是什么？
> **Vimium是一款Chrome插件，它提供了类Vim操作来控制浏览器网页**
> 
> **熟练掌握后，可以脱离鼠标，只使用键盘浏览页面**
# Vimium常用命令
- `?` 指令可以打开帮助指南，其中有大多数的指令介绍
- 小写字母一般是在当前页面的操作
- 大写字母一般是跳转到新页面的操作
***
## 页面浏览
1. `j/k/h/l`：向上/下/左/右滚动页面
2. `d/u`：向下/上滚动半屏页面
3. `gg/G`：回到顶/底部
4. `J/K`：选择左/右标签
5. `x/X`：关闭/恢复标签
6. `r`：刷新页面
7. `gi`：将焦点聚集在第一个输入框
8. `<</>>`：移动当前标签到左/右侧边
9. `W`：把当前标签页转移到一个新的窗口
10. `^`：跳转到上一个标签页面
11. `g0/$`：跳转到第一个/最后一个标签页面
## URL操作
1. `H/L`：当前页面的浏览历史记录的后退和前进
2. `yy`：把当前页面的URL复制到剪切板
3. `yf`：选择一个URL复制到剪切板
4. `p/P`：在当前/新页面打开剪切板中的URL
5. `gu/U`：跳转到当前URL的父/根目录
6. `g + e/E`：编辑当前地址栏，并在当前/新页面打开
## 模式切换
1. `f/F`：点击模式，为页面上所有可见的链接分配到一个好按的键位，这个时候按下相应的键位，就会打开对应的链接
2. `i`：插入模式，可以屏蔽掉vimium快捷键，使其不和网页默认快捷键冲突
3. `v/V`：视觉/行视觉 模式，用于选区
4. `Esc`：退出模式
## 查找操作
1. `/`：查找
2. `n/N`：向下/上查找结果
3. `o/O`：查找历史记录 & 书签
4. `t/T`：创建/查找标签页
## 常用技巧
1. 快速定位 + 复制文本：
	1. `<a-f>`搜索指定关键字，并定位至起点
	2. 按`v`切换到视觉模式
	3. 使用`h、j、k、l、b、e、w、$、Shift + w`控制方向，选择范围
	4. 最后使用`y`复制内容至剪切板
# 推荐阅读
- [我比想象中更需要浏览器中的 Vim 模式](https://www.owenyoung.com/blog/vimium/)
- [Vimium完全教程，各类技巧大全](https://zhuanlan.zhihu.com/p/30263616)
- [Vimium教程 | Micracle's blog](http://miracle.hi.cn/2021/04/21/vimium-guide/)
- [Vimium如何选中网页中的内容并对其进行复制和粘贴？](https://www.zhihu.com/question/22508515)