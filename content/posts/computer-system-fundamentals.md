---
title: "计算机系统基础" # 标题
date: 2022-11-15T21:37:17+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- 计算机系统基础
- 计算机基础
keywords: # 关键词
- Tech
- 计算机系统基础
- 计算机基础
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

# 计算机系统基础(一)——程序的表示、转换与链接
## 原码&移码&补码
1. 原码
	- <u>最高位放符号位，1 表示负</u>
	- `定点小数，用来表示浮点数的尾数`
2. 移码
	- <u>真值加上一个偏置值 bias</u>，$bias$ 常为 2<sup>n - 1</sup> $or$ 2<sup>n - 1</sup> - 1 (如 $IEEE 754$)
	- `定点整数，用来表示浮点数的阶`
	- 移码的本意是为了方便两个数作比较
3. 补码
	- 假设补码有 $n$ 位，则：**x<sub>补</sub> = 2<sup>n</sup> + x**
	- <u>数值为正数时，其值大小就是原码；为负时，其值的大小就是各位取反再加 1</u>
	- `补码表示带符号整数`
	- 补码的出现是为了解决计算机的减法运算问题
	- 求补码的真值——简便求法
		- 符号为 0 ，则为正数，数值部分相同
		- 符号为 1，则为负数，数值各位取反，末位加 1
- <u>各位取反，末位加 1 简便做法：从后往前看，找到第一个 1 ，将它前面的所有位取反</u>

## 浮点数——$IEEE754$标准
- <u>数符 + 阶码 + 尾数</u>
	- Float $1 + 8 + 23$
		- $SP$：$(-1)$<sup>s</sup>  $*$ $(1 + Significand)$ $*$ $2$<sup>(Exponent  - 127)</sup>
	- Double $1 + 11 + 52$
		- $DP$：$(-1)$<sup>s</sup>  $*$ $(1 + Significand)$ $*$ $2$<sup>(Exponent  - 1023)</sup>
1. 数符 $Sign bit$
	- 1 表示负数
2. 阶码 $Exponent$
	- 规格化阶码范围为 $0000 0001(-126) —— 1111 1110(127)$ $(single)$
	- $bias$ 为 $127(single)$ $1023(double)$
	- 规格化阶范围为 $1——254$$(single)$
	- **全 $0$ 和全 $1$ 用来表示特殊值**
	- 为避免混淆，用<u>阶码表示阶的编码</u>，用<u>阶或指数表示阶码的值</u>
3. 尾数 $Significand$
	- **规格化尾数最高位总是 $1$，所以隐含表示，省 $1$ 位，小数点前总是 $1$**
- 特殊数的表示$(single)$
	- $0$
		- $阶码：all$ $zeros$ 
		- $尾数：all$ $zeros$
		- $+0：0$ $00000000$ $00000000000000000000000$
		- $-0：1$ $00000000$ $00000000000000000000000$
	- $∞$
		- $阶码：all$ $ones$ 
		- $尾数：all$ $zeros$
		- $+∞：0$ $11111111$ $00000000000000000000000$
		- $-∞：1$ $11111111$ $00000000000000000000000$
		- 浮点数除以 $0$ 的结果是 $∞$，而不是溢出异常(整数除以 $0$ 为异常)
	- $NaN$  ($Not$ $a$ $Number$)
		- $阶码：all$ $ones$
		- $尾数：nonzeros$
		- <u>可帮助调试程序</u>
	- **非规格化数 $Denorms$**
		- $阶码：all$ $zeros$ 
		- $尾数：nonzeros$
		- 用于表示 $0$ 与规格化数间的$Gap$
		- $SP$：$(-1)$<sup>s</sup>  $*$ $(0.xxxx...xxx)$ $*$ $2$<sup>-126</sup>
		- 为了让非规格化单精度浮点数能够平缓过渡到规格化单精度浮点数，所以取 $2$<sup>-126</sup>
		- <u>当输入数据为不可表示数时，机器将其转换为最邻近的可表示数</u>

## 汉字内码&ASCII码
- <u>ASCII码为 7 位编码</u>
- Ex：汉字 "$大$" 在码表中位于第 $20$ 行、第 $83$ 列。因此<u>区位码</u>为 $0010100$ $1010011$，在区、位码上各加 $32$ 得到两个字节编码（<u>GB2312国标码</u>），即 $00110100$ $01110011B$ $=$ $3473H$。前面的 $34 H$ 和 字符 $4$ 的 $ACSII$ 的最高位相同，后面的 $73H$ 和字符 $s$ 的 $ACSII$ 码相同。但是，将每个字节的最高位各设为 $1$ 后，就得到其<u>内码</u>： $B4F3H$ ($0110100$ $11110011B$)，因而不会和 $ASCII$ 码混淆
## 逻辑电路
- 异或：$n$ 个数做异或运算，若有奇数个 $1$ ，则输出 $1$
# 推荐阅读
1. [# 原码、反码、补码](https://zhuanlan.zhihu.com/p/118432554)
***
- [计算机系统基础(一)——程序的表示、转换与链接](https://www.bilibili.com/video/BV1gx411n7aG/?spm_id_from=333.337.search-card.all.click&vd_source=ae16ff6478eb15c1b87880540263910b)
- [计算机系统基础(二)——异常、中断和输入/输出](https://www.bilibili.com/video/BV1Xx411E7qn/?spm_id_from=333.337.search-card.all.click&vd_source=ae16ff6478eb15c1b87880540263910b)
- [计算机系统基础(三)——程序的执行和存储访问](https://www.bilibili.com/video/BV1jE411874k/?spm_id_from=333.337.search-card.all.click&vd_source=ae16ff6478eb15c1b87880540263910b)
	- 以 `IA-32 + Linux + C + gcc` 为平台
- [【精校中英字幕】2015 CMU 15-213 CSAPP 深入理解计算机系统](https://www.bilibili.com/video/BV1iW411d7hd?p=1&vd_source=ae16ff6478eb15c1b87880540263910b)
***
- **[《深入理解计算机系统（原书第3版）》CSAPP](https://book.douban.com/subject/26912767/)**
{{< douban src="https://book.douban.com/subject/26912767/" >}}
