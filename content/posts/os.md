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
# 进程同步问题
## 生产者--消费者
假设有一个缓冲区，生产者往其中生产数据，消费者从其中取出数据。生产者和消费者各有若干个，它们之间需要通过缓冲区进行数据交换。

1.  初始化信号量：

-   empty：计数信号量，初始值为缓冲区大小，表示缓冲区空闲的数量。
-   full：计数信号量，初始值为0，表示缓冲区中已经存放的数据量。
-   mutex：互斥信号量，初始值为1，用于保护缓冲区的互斥访问。

2.  生产者过程：
```scss
while (true) {
    produce(item);  // 生产数据
    P(empty);  // 等待空闲缓冲区
    P(mutex);  // 占用缓冲区
    put(item);  // 将数据放入缓冲区
    V(mutex);  // 释放缓冲区
    V(full);  // 增加缓冲区已有数据的数量
}

```

3.  消费者过程：
```scss
while (true) {
    P(full);  // 等待有数据的缓冲区
    P(mutex);  // 占用缓冲区
    item = get();  // 从缓冲区取出数据
    V(mutex);  // 释放缓冲区
    V(empty);  // 增加空闲缓冲区的数量
    consume(item);  // 消费数据
}

```

在这个过程中，P操作表示进程占用一个信号量资源，V操作表示进程释放一个信号量资源。对于互斥信号量mutex，每次只有一个进程可以占用资源，以保证缓冲区的互斥访问。对于计数信号量empty和full，它们都是等待队列，生产者和消费者通过占用和释放信号量来加入和离开等待队列。
## 图书馆阅览室问题
### 问题描述
假定阅览室最多可同时容纳 100 个人阅读，读者进入时，必须在阅览室门口的一个登记表上登记，内容包括姓名、座号等，离开时要撤掉登记内容。用P、V操作描述读者进程的同步算法。
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
