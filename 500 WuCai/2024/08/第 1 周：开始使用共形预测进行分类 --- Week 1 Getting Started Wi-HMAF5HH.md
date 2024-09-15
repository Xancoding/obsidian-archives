---
标题: "第 1 周：开始使用共形预测进行分类 --- Week #1:Getting Started Wi"
笔记ID: HMAF5HH
笔记类型: page
星标: false
tags: 
域名: mindfulmodeler.substack.com
域名2: substack.com
作者: "Christoph Molnar"
原文链接: "https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal"
五彩链接: "https://marker.dotalk.cn/#/?nx=HMAF5HH&vs=1"
划线数量: 7
创建时间: 2024-08-27 21:18
更新时间: 2024-08-27 23:12
---

## 第 1 周：开始使用共形预测进行分类 --- Week #1:Getting Started Wi 


## 页面笔记


## 划线列表
- exchangeable [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5219129)
	- 如果数据点是可交换的，这意味着数据点的顺序不影响它们的整体分布特性。
- A bit sloppy notation for saying that we take 1 minus the model score for the true class (if the ground truth for bean number 8 is “Seker” and the probability score for Seker is 0.9, then s_8 = 0.1). [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5220132)
- How is that threshold useful? We know that for bean uncertainties s_i below 0.999 (equivalent to class “probabilities” > 0.001) we can be sure that with a probability of 95% we have the correct class included. [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5220146)
	- 那些低于阈值的s_i，有95%的概率包含正确的类
- prob_true_class = predictions[np.arange(len(y_calib)),y_calib] [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5220210)
	- prob_true_class 将是一个一维数组，其中包含了每个实例真正类别的预测概率
- With a small correction: For conformal prediction, the data scientist shouldn’t use a 0.95 quantile, but instead, apply a finite sample correction, i.e. multiplying 0.95 with (n+1)/n which is 0.951 for n = 1000. [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5220225)
	- 因为样本大小有限，所以我们要对0.95分位数进行修正，得到修正后的结果是0.951
- The data scientist found out that the coverage guarantee only holds on average across all data points, also called “marginal” coverage. There is currently no guarantee that the coverage holds for each variety. [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5220322)
	- 覆盖率保证仅适用于所有数据点的平均值，也称为“边际”覆盖率。目前无法保证每个品种的覆盖范围均有效。
- Coverage = percentage of prediction sets that contain the true label [Link](https://mindfulmodeler.substack.com/p/week-1-getting-started-with-conformal#WCREFX-5220315)
	- 覆盖率 = 包含真实标签的预测集的百分比

## 全文剪藏

