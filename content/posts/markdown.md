---
title: "Markdown学习记" # 标题
date: 2022-10-17T12:54:56+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Life
- Productivity
- Markdown
- 工具
- 新技能
keywords: # 关键词
- Life
- Productivity
- Markdown
- 工具
- 新技能
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

# Markdown是什么？
> **Markdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用，如Github、Wikipedia等网站，如各大博客平台：WordPress、Drupal、简书等**
# Markdown常用语法
## 避免格式转换
- **如果需要避免文本中的符号被当做markdown标识符而发生不必要的格式转化，可以在符号前加`\`来避免。**

<u>书写格式如下</u>：

```
\*不是斜体\*
```

<u>解析效果如下</u>：

\*不是斜体\*

## 角标
不同于链接，这里的角标内容会被放在文末，点击可以实现跳转。

<u>书写格式如下</u>：

```
请参阅脚注1. [^1]

[^1]: 脚注1内容。

请参阅脚注2. [^2]

[^2]: 脚注2内容。
```

<u>解析效果如下</u>：

请参阅脚注1. [^1]

[^1]: 脚注1内容。

请参阅脚注2. [^2]

[^2]: 脚注2内容。

## 段落与换行
1. 如果行与行之间没有空行，则会被视为同一段落
2. 如果行与行之间有空行，则会被视为不同的段落
3. 空行是指行内什么都没有，或者只有空格和制表符
4. 如果想在段内换行，则需要在上一行的结尾插入两个以上的空格然后按回车键
![NeatReader-1673687488276.png](https://bu.dusays.com/2023/01/14/63c271cd41342.png)
## 代码块
1. 建议不要在没有输出内容的Shell命令前加`$`，在有输出内容的Shell命令前加上`$`
```shell
$ echo "test"
test
```
## 引用
![NeatReader-1673689679672.png](https://bu.dusays.com/2023/01/14/63c27a5f1c3b1.png)

# 推荐阅读
- [Markdown - All You Need to Know](http://haoeric.github.io/markdown-grammar/#fnref:1)
- [Markdown 官方教程](https://markdown.com.cn/)
- [Markdown 指南中文版](https://www.markdown.xyz/)
***
- [《了不起的Markdown》](https://book.douban.com/subject/34613706/)
{{< douban src="https://book.douban.com/subject/34613706/" >}}

