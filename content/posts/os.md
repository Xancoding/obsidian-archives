---
title: "操作系统" # 标题
date: 2022-11-15T12:04:42+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- 计算机基础
- 操作系统
keywords: # 关键词
- Tech
- 计算机基础
- 操作系统
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

# 记录型信号量
```cpp
S：信号量的值。当其值大于 0 时，表示可供使用的资源数；当其值小于 0 时，其绝对值表示等待使用该资源的进程数

/* P 操作的定义 */
P(S)
{
	S.value--;
	if (S.value < 0) 
	{
		// 将该进程加到 S.list 队列
		block();
	}
}

/* V 操作的定义 */
V(S)
{
	S.value++;
	if (S.value <= 0)
	{
		// 从 S.list 队列中将 Q 移走
		wakeup(Q);
	}
}
```
# 经典的进程同步问题
## 生产者--消费者
### 分析
1. 生产者与消费者进程 **互斥**
2. 当缓冲区为空时，消费者不能消费
3. 当缓冲区为满时，生产者不能生产
### 解答
```
信号量full ：表示放有产品的缓冲区数目，初值为 0
信号量empty：表示未放产品的缓冲区数目，初值为 N
mutex：互斥信号量，初值为 1
```

```
Producer 

while(true)
{
	P(empty);
	P(mutex);
	将产品放入缓冲区 buffer(in);
	in = (in + 1) % N; 
}

```
# 推荐阅读
-  [NJU操作系统](https://www.bilibili.com/video/BV1Cm4y1d7Ur/?spm_id_from=333.788)
	-  [操作系统：设计与实现 (2022 春季学期)](http://jyywiki.cn/OS/2022/)
- [【精校中英字幕】2015 CMU 15-213 CSAPP 深入理解计算机系统](https://www.bilibili.com/video/BV1iW411d7hd?p=1&vd_source=ae16ff6478eb15c1b87880540263910b)
***
- [《操作系统导论》](https://book.douban.com/subject/33463930/)
- [《现代操作系统》（原书第4版）](https://book.douban.com/subject/27096665/)
- [《操作系统:精髓与设计原理》](https://book.douban.com/subject/5064311/)
- **[《深入理解计算机系统（原书第3版）》CSAPP](https://book.douban.com/subject/26912767/)**
	- **计算机组成 + 操作系统 + 汇编 + C语言 + Linux系统编程**
{{< douban src="https://book.douban.com/subject/33463930/" >}}
{{< douban src="https://book.douban.com/subject/27096665/" >}}
{{< douban src="https://book.douban.com/subject/5064311/" >}}
{{< douban src="https://book.douban.com/subject/26912767/" >}}
