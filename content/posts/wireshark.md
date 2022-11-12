---
title: "计算机网络课程大作业" # 标题
date: 2022-11-12T11:38:21+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- Wireshark
- 工具
- 新技能
- 计算机网络 
keywords: # 关键词
- Tech
- Wireshark
- 工具
- 新技能
- 计算机网络 
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

# 要求
1. 团队合作、合理分工、按组为单位进行
2. 报告文字内容不可拷贝粘贴现有文献，应反映小组所做的工作，有分析，实践性的选题应有具体操作或者配置过程描述，辅以截图或实验数据
3. 所交报告中应在最后注明组员分工、参考文献，报告字数3000-6000
4. 不同班级的小组可选择相同的题目，但重复计数（由各班学委协调），不可多于3组，且报告内容不可相同，要求独立完成各组任务
5. 除了个别综述性的选题，其它选题要求在实际平台上实践
# 选题
> **基于网络嗅探软件（wireshark）的协议分析实验**
1. Wireshark的深入学习与掌握，如过滤器的使用，归纳方法
2. 通过实验阐述ARP的工作原理
3. 利用实验结果分析ICMP协议的报文结构字段定义
4. 基于实验数据深入分析TCP协议的连接过程原理，报文的分片等功能
5. 从校园网发起向外网中某Web服务器的访问，记录并分析从MAC层协议、IP协议、TCP协议一直到HTTP协议的过程 
# 基于网络嗅探软件Wireshark的协议分析实验
## Wireshark 是什么？
> **Wirkshark 是一个功能十分强大的开源的网络数据包分析器，能够在多种平台上抓取和分析网络包**
> 
> **Wirkshark 可被用于检查安全问题和解决网络问题，也可供开发者调试协议的实现和学习网络协议的原理**
> 
> **Wireshark使用 Npcap or WinPcap 作为接口，直接与网卡进行数据报文交换**
## Wireshark 下载与安装
官网地址：<https://www.wireshark.org/>，直接点击下一步下一步安装即可
![1](https://bu.dusays.com/2022/11/12/636eef0324bca.png)
但是，我在安装过程中报了如下的错误：
![npcap](https://bu.dusays.com/2022/11/11/636e699429bad.png)
排查了好久，没找到合适的解决办法  
最后，下载 WinPcap 来代替 Npcap ，成功运行。
## Wireshark 基本用法
> 简单抓包基础步骤：选择捕获接口 -> 获取网络实时痕迹 -> 获取报文 -> 深入解析
*** 
### 选择接口（网卡）
> **网络上传输的数据包需要经过网卡到达计算机，Wireshark可以捕获流经网卡的数据包**

在使用Wireshark捕获数据前，先要选择捕获接口。一台计算机可能会有不止一个网卡，此时需要选择你要捕获数据的接口。

选择菜单栏上的 捕获->选项
![1](https://bu.dusays.com/2022/11/12/636eef03d463f.png)
选择想要捕获数据的接口后，点击开始
![2](https://bu.dusays.com/2022/11/12/636ef1eb47349.png)

### 界面说明
开始捕获后，Wireshark会把捕获到的报文显示到界面上
1. **显示过滤器**用于设置过滤条件进行数据列表区数据过滤
1. **数据列表区**展示的是Wireshark捕获到的所有数据包的列表，每个数据包包含 编号、时间戳、源地址、目标地址、协议、长度以及数据包信息
2. **数据详细区**展示的是在数据列表区中选中的数据包的分协议展示
	1. <u>Frame</u>：物理层的数据帧概况
	2. <u>Ethernet II</u>：数据链路层以太网帧头部信息
	3. <u>Internet Protocol Version 4</u>： 互联网层IP包头部信息
	4. <u>Transmission Control Protocol</u>：传输层的数据段头部信息，此处是TCP
3. **数据字节区**展示的是选中的数据包的源数据。另外，在数据详细区选中的某层或某字段，对应的数据会在数据字节区中高亮
![1](https://bu.dusays.com/2022/11/12/636efb5f7ea6d.png)

### 过滤器设置
> **根据我们想要抓取的数据包，对过滤器进行设置。过滤掉冗余的数据包，找到我们需要的信息**
#### 捕获过滤器
> **捕获过滤器表达式作用在Wireshark捕获数据包之前，只捕获符合条件的数据包**  
> 
> **当需要处理大量数据时，使用捕获过滤器可以节省大量资源**
##### 界面说明
选择菜单栏上的 捕获->捕获过滤器
![1](https://bu.dusays.com/2022/11/12/636efe3d72678.png)
点击 `+` 即可添加新的过滤规则  
 `Filter Name` 指代过滤器名称，用来给自己看该过滤器的过滤效果  
 `Filter Expression` 指代过滤器表达式，需要使用 `Berkeley Packet Filter` 语法书写
![2](https://bu.dusays.com/2022/11/12/636efe3e2ce20.png)
##### 语法规则
捕获过滤器使用 `BPF` 语法，表达式由多个原语组成：
```markdown
原语(primitives)：由名称或数字，以及描述它的多个限定词组成。  
  * 限定词(qualifiers)
    * Types：设置数字或者名称所指示类型，例如host www.baidu.com，如果没有指定此值，则默认使用“host”关键字
        * host、post
        * net，设定子网， net 192.168.0.0 mask 255.255.255.0等价于net 192.168.0.0/24
        * port，设置端口范围，例如port 6000-8000
    * Dir：设置网络出入方向，例如dst port 80，如果没有特别指明来源或目的地，则默认使用“src or dst”作为关键字
        * src、dst、src or dst、src and dst(src：源端口，dst：目标端口)
    * Proto：指定协议类型，例如udp，如果没有特别指明是什么协议，则默认使用所有支持的协议
        * ether、fddi、tr、wlan、ip、ip6、arp、rarp、decnet、tcp、udp、icmp、igmp、icmp、igrp、pim、ah、esp、vrrp
    * 其他
        * gateway：指明网关IP地址，等价于ether host 'ehost' and not host 'host'
        * broadcast：广播报文，例如ether broadcast或者ip broadcast
        * multicast：多播报文，例如ip multicast或者ip6 multicast
        * less、greater：小于或者大于
  * 原语运算符
    * 与：&&或者and
    * 或：||或者or
    * 非：!或者not
```
<div style="color:orange; border-bottom: 1px solid #d9d9d9; 
	display: inline-block; 
	color: #999; 
	padding: 2px;">转载自：https://juejin.cn/post/6844904066229747720 </div> 

##### 应用示例
只抓取源端口或者目的端口范围6000到8000，并且是一个tcp协议或者ipv6的数据包
```
src or dst port 6000-8000 && tcp or ip6    
```
只抓取IP地址为192.168.0.10的数据包
```
host 192.168.0.10
```
#### 显示过滤器 
> **显示过滤器表达式作用在在Wireshark捕获数据包之后，从已捕获的所有数据包中显示出符合条件的数据包**

显示过滤表达式在工具栏下方的“应用显示过滤器”输入框输入即可生效
![1](https://bu.dusays.com/2022/11/12/636f11a82564a.png)
##### 基本过滤表达式
1. 一条基本的表达式由**过滤项**、**过滤关系**、**过滤值**三项组成  
2. 例如：`ip.addr == 192.168.1.1`，其中 `ip.addr` 为过滤项，`==` 为过滤关系，`192.168.1.1` 为过滤值。  
3. 该表达式的意思是 **找出所有ip协议中源或目标ip等于192.168.1.1的数据包**
###### 过滤项
1. Wireshark的过滤项是 `协议.协议字段` 的模式，Wireshark支持的全部协议及协议字段可查看[官方说明](https://www.wireshark.org/docs/dfref/)。
2. 以端口为例，端口出现于tcp协议中。所以有端口这个过滤项且其写法就是tcp.port  
3. Wireshark出于缩减长度的原因，有些字段没有使用协议规定的名称而是使用简写，比如Destination Port在Wireshark中写为dstport
4. Wireshark出于简便使用的原因，增加了一些协议中没有的字段，比如tcp协议只有源端口和目标端口字段，为了简便使用Wireshark增加了tcp.port来同时代表这两个字段
5. 实际使用时我们输入`协议.`后Wireshark就会有支持的字段提示
###### 过滤关系
过滤关系指的是大于、等于、小于等等式关系，具体可以看[官方给出的表](https://www.wireshark.org/docs/wsug_html/#DispCompOps)
![1](https://bu.dusays.com/2022/11/12/636f11ecb35db.png)
###### 过滤值
过滤值就是设定的过滤项应该满足过滤关系的标准，比如500、5000、50000等等。  
过滤值的写法一般已经被过滤项和过滤关系设定好了，只是填下自己的期望值就可以了。
##### 复合过滤表达式
所谓复合过滤表达示，就是指由多条基本过滤表达式组合而成的表达示。  
基本过滤表达式的写法还是不变的，复合过滤表达示多出来的东西就只是基本过滤表达示的“连接词”，我们依然直接参照[官方给出的表](https://www.wireshark.org/docs/wsug_html/#FiltLogOps)
![1](https://bu.dusays.com/2022/11/12/636f11cc4be71.png)
##### 常见显示过滤需求及其对应表达式
###### 数据链路层

```
筛选mac地址为04:f9:38:ad:13:26的数据包----eth.src == 04:f9:38:ad:13:26

筛选源mac地址为04:f9:38:ad:13:26的数据包----eth.src == 04:f9:38:ad:13:26
```

###### 网络层

```
筛选ip地址为192.168.1.1的数据包----ip.addr == 192.168.1.1

筛选192.168.1.0网段的数据---- ip contains "192.168.1"

筛选192.168.1.1和192.168.1.2之间的数据包----ip.addr == 192.168.1.1 && ip.addr == 192.168.1.2

筛选从192.168.1.1到192.168.1.2的数据包----ip.src == 192.168.1.1 && ip.dst == 192.168.1.2
```
###### 传输层

```
筛选tcp协议的数据包----tcp

筛选除tcp协议以外的数据包----!tcp

筛选端口为80的数据包----tcp.port == 80

筛选12345端口和80端口之间的数据包----tcp.port == 12345 && tcp.port == 80

筛选从12345端口到80端口的数据包----tcp.srcport == 12345 && tcp.dstport == 80
```

###### 应用层

```
特别说明----http中http.request表示请求头中的第一行（如GET index.jsp HTTP/1.1），http.response表示响应头中的第一行（如HTTP/1.1 200 OK），其他头部都用http.header_name形式。

筛选url中包含.php的http数据包----http.request.uri contains ".php"

筛选内容包含username的http数据包----http contains "username"
```
## 通过实验阐述ARP的工作原理
## 参考
1. [Wireshark系列之4 捕获过滤器](https://blog.51cto.com/yttitan/1734425)
2. [网络——Wireshark工具](https://blog.51cto.com/u_13579643/3647795?articleABtest=0)
3. [WireShark的基本用法](https://juejin.cn/post/6844904066229747720)
4. [Wireshark使用教程（界面说明、捕获过滤器表达式、显示过滤器表达式）](https://www.cnblogs.com/lsdb/p/9254544.html)
5. [一文精讲Wireshark的抓包和分析](https://www.freebuf.com/sectool/256745.html)
6. [Wireshark简明教程，新手专用，挑实在的讲，不搞花里胡哨](https://bbs.huaweicloud.com/blogs/285673)
7. [WireShark网络封包抓包工具各个界面介绍](https://blog.51cto.com/u_15688254/5694733)
8. [Wireshark官方文档](https://www.wireshark.org/docs/wsug_html_chunked/ChapterWork.html)
