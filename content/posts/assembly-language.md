---
title: "汇编语言" # 标题
date: 2022-11-15T13:16:12+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- 计算机基础
- 汇编语言
keywords: # 关键词
- Tech
- 计算机基础
- 汇编语言
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

# 汇编语言是什么？
> **汇编语言是任何一种用于电子计算机、微处理器、微控制器，或其他可编程器件的低级语言**
# 检测点答案（部分）
## 检测点2.1 
（2）最多使用 4 条指令，编程计算 2 的 4 次方
```
mov ax, 2H
add ax, ax
add ax, ax
add ax, ax
```
## 检测点3.1
（2）  

1. 
```
mov ax,6622H
jmp 0ff0:0100
mov ax,2000H
mov ds,ax
mov ax,[0008]
mov ax,[0002]
```
2. 
| 指令          | CS    | IP    | DS    | AX    | BX    |
|---------------|-------|-------|-------|-------|-------|
| mov ax, 6622H | 2000H | 0003H | 1000H | 6622H | 0000H |
| jmp 0ff0:0100 | 0ff0H | 0100H | 1000H | 6622H | 0000H |
| mov ax, 2000H | 0ff0H | 0103H | 1000H | 2000H | 0000H |
| mov ds, ax    | 0ff0H | 0105H | 2000H | 2000H | 0000H |
| mov ax, [0008]| 0ff0H | 0108H | 2000H | C389H | 0000H |
| mov ax, [0002]| 0ff0H | 010BH | 2000H | EA66H | 0000H |
## 检测点3.2
（1）
```
mov ax,2000H 
mov ss,ax
mov sp,0010H
```
（2）
```
mov ax,1000H 
mov ss,ax
mov sp,0000H 
```
# 推荐阅读
- [Win10下配置汇编语言 （王爽）实验环境](https://www.bilibili.com/video/BV1Gf4y1w75t/?vd_source=ae16ff6478eb15c1b87880540263910b)
- [《汇编语言》第三版检测点答案](https://github.com/sanmianti/AssemblyLanguageTest/blob/master/%E3%80%8A%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80%E3%80%8B%E7%AC%AC%E4%B8%89%E7%89%88%E6%A3%80%E6%B5%8B%E7%82%B9%E7%AD%94%E6%A1%88.md)
- [《汇编语言 王爽著》课后实验参考答案](https://tinylab.org/assembly/)
	+ [x] 实验一
	+ [ ] 实验二
	+ [ ] 实验三
	+ [ ] 实验四
	+ [ ] 实验五
***
- [《汇编语言（第4版）》](https://book.douban.com/subject/35038473/)
{{< douban src="https://book.douban.com/subject/35038473/" >}}