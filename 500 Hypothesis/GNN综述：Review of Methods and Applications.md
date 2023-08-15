---
doc_type: hypothesis-highlights
url: 'https://zhuanlan.zhihu.com/p/76025331'
---
# GNN综述：Review of Methods and Applications
## Metadata
- Author: [zhuanlan.zhihu.com]()
- Title: GNN综述：Review of Methods and Applications
- Reference: https://zhuanlan.zhihu.com/p/76025331
- Category: #source/article🗞
- Tags:
## Highlights
- CNN只能在欧几里得数据(Euclidean data)，比如二维图片和一维文本数据上进行处理，而这些数据只是图结构的特例而已，对于一般的图结构，可以发现很难将CNN中的卷积核(convolutional filters)和池化操作(pooling operators)迁移到图的操作上。如下图，左图为图像，是比较明显的Euclidean数据，而右图为普通的graph结构。

   - Annotation: GNN相比CNN可以更好的处理非欧几里得型数据- 图嵌入常见模型有DeepWalk，Node2Vec等，然而，这些方法方法有两种严重的缺点，首先就是节点编码中权重未共享，导致权重数量随着节点增多而线性增大，另外就是直接嵌入方法缺乏泛化能力，意味着无法处理动态图以及泛化到新的图。

   - Annotation: 传统的图嵌入方法：权重数量随结点增多而线性增加，导致计算度太复杂；缺乏泛化能力

- Tags:

- GNN采用在每个节点上分别传播(propagate)的方式进行学习，由此忽略了节点的顺序，相当于GNN的输出会随着输入的不同而不同。

