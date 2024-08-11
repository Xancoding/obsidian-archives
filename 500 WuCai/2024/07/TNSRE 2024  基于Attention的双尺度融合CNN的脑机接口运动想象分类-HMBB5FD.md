---
标题: "TNSRE 2024 | 基于Attention的双尺度融合CNN的脑机接口运动想象分类"
笔记ID: HMBB5FD
笔记类型: page
星标: false
tags: 
域名: mp.weixin.qq.com
域名2: qq.com
作者: "AI前沿论文分享"
原文链接: "https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw"
五彩链接: "https://marker.dotalk.cn/#/?nx=HMBB5FD&vs=1"
划线数量: 6
创建时间: 2024-07-31 22:13
更新时间: 2024-08-01 13:29
---

## TNSRE 2024 | 基于Attention的双尺度融合CNN的脑机接口运动想象分类 


## 页面笔记


## 划线列表
- 运动想象（MI）是BCI中最常见的范式之一，通常是非侵入式。人体不同部位的运动与感知，受到大脑皮层不同区域的控制，而当人想象自己 身体部位的运动时，会在对应的大脑皮层区域引起感觉运动节律。基于运动想象的脑机接口就是在用户想象运动的部位与外部设备的控制命令之间建立映射关系，比如当检测到用户正在想象左手运动时，命令外部设备向左移动。人在进行肢体运动或者想象运动时，会引起大脑皮层对应区域的感觉运动节律 的调制，包括 mu 节律（8-12Hz）和beta 节律（14-30Hz）。当大脑执行运动相关的任务时，这些节律活动会因为运动、运动想象或者运动准备被抑制而下降，在运动结束或者进入休息状态之后上升。因此，检测大脑皮层特定区域的感觉运动 节律可用于"解读"受试者正在进行哪部分身体的运动想象，然后通过映射关系控制外部设备。 [Link](https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw#WCREFX-4846166)
- ![](https://g1proxy.wimg.site/sPH8c2Wt3phoy7vzmH3z0Ecej1NQlGp_rJStrfFoMGf4=/https://mmbiz.qpic.cn/mmbiz_png/xbJBl2MmzhiaGy8Tyfbqs7tMx0274q1XaYNus60CM1KLC9fjDIFPs6Otp5AHlefJfFtbaZ0oBGQ5haCwJ96llHQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1) [Link](https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw#WCREFX-4846163)
- 上图是MI中的一段脑电信号，可视为一个样本，即MI分类任务中每个样本的是 C×T 的维度，即每个样本包含C个通道（脑电帽的电极），每个通道的维度包括T个采样点，例如：以1000Hz采样4s即T维度包含4001个特征。MI分类任务包含N个上图所示的EEG信号，对每个样本进行运动想象任务的分类。 [Link](https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw#WCREFX-4846167)
- ![](https://g1proxy.wimg.site/syLkzRAzq_tblwM52ZoHeJItbGFF7-zwl14pyu2B5JdE=/https://mmbiz.qpic.cn/mmbiz_png/xbJBl2MmzhiaGy8Tyfbqs7tMx0274q1Xam2Xq1QPkgMKNcvreTibHT945hrkAibnHgxniaSQqbXXo3yMSutu4z4D3w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1) [Link](https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw#WCREFX-4852545)
- 具体地，input是C*T的维度，经过kernel大小为[F, 1,125]和[F, 1, 30]的时间滤波后（沿T维度卷）分别送进Branch-Ⅰ和Branch-Ⅱ。Branch-Ⅰ中经过分组卷积，1*1卷积，pooling；Branch-Ⅱ经过普通空间卷积，pooling。之后将两个branch拼接起来经过Attention block再进入下游分类器。 [Link](https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw#WCREFX-4852566)
- 值得注意的是，在送进两个Branch之前经过了不同kernel的时间卷积，这是因为一段时域信号是由多段不同频率的信号叠加而成，频率越低，周期就越长，更大的卷积核才能cover到这些EEG信号。因此，沿着T维度进行卷积，大的kernel可以提取低频信息，小的kernel可以提取高频信息（其实本质就是类似FBCSP[1], IFNet[2]的分频思想） [Link](https://mp.weixin.qq.com/s/ESGc-bE_R6ovpIk0OX2Hdw#WCREFX-4852583)

## 全文剪藏

