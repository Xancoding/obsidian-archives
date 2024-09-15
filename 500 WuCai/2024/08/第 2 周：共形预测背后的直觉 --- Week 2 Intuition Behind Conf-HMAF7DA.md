---
标题: "第 2 周：共形预测背后的直觉 --- Week #2:Intuition Behind Conf"
笔记ID: HMAF7DA
笔记类型: page
星标: false
tags: 
域名: mindfulmodeler.substack.com
域名2: substack.com
作者: "Christoph Molnar"
原文链接: "https://mindfulmodeler.substack.com/p/week-2-intuition-behind-conformal"
五彩链接: "https://marker.dotalk.cn/#/?nx=HMAF7DA&vs=1"
划线数量: 3
创建时间: 2024-08-28 11:06
更新时间: 2024-08-28 12:48
---

## 第 2 周：共形预测背后的直觉 --- Week #2:Intuition Behind Conf 


## 页面笔记


## 划线列表
- I came to the conclusion that, within the prediction sets, conformal prediction foremost controls the coverage of positive labels: there’s a guarantee that 1- α of the sets contain the true class. [Link](https://mindfulmodeler.substack.com/p/week-2-intuition-behind-conformal#WCREFX-5224133)
	- 在预测集中，保形预测首先控制正标签的覆盖范围：保证集合中的 1- α 包含真实类别。
- Conformal prediction has 3 steps: training, calibration, and prediction. [Link](https://mindfulmodeler.substack.com/p/week-2-intuition-behind-conformal#WCREFX-5224551)
	- 共形预测的步骤：训练、校准、预测。
	- 校准
	- 1. 计算校准数据的不确定性分数
	- 2. 将分数从确定到不确定排序
	- 3. 确定置信水平α（α=0.1代表覆盖率90%）
	- 4. 找到分位数q，使得1-α（乘以有限样本校正）的不确定性分数都小于q
	- 预测
	- 1. 计算新数据的不合格分数
	- 2. 选择所有得分低于q的y
	- 3. 这些y构成您的预测集或区间
- For cross-conformal prediction, you split the data, for example, into 10 pieces. You take the first 9 pieces together to train the model and compute the non-conformity scores for the remaining 1/10th. You repeat this step 9 times so that each piece is once in the calibration set. You end up with non-conformity scores for the entire data set and can continue with computing the quantile for conformal prediction. [Link](https://mindfulmodeler.substack.com/p/week-2-intuition-behind-conformal#WCREFX-5225455)
	- 对于交叉保形预测，您可以将数据分成 10 部分。您将前 9 个部分放在一起训练模型并计算剩余 1/10 的不合格分数。您重复此步骤 9 次，以便每个部件都在校准集中一次。您最终会得到整个数据集的不合格分数，并且可以继续计算保形预测的分位数。

## 全文剪藏

