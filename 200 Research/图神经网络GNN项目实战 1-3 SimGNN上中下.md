GNN + LSTM

第一个项目：《SimGNN: A Neural Network Approach to Fast Graph Similarity Computation》

图相似度计算与图相似度搜索

# Motivation

However, the core operation, namely computing the **GED or MCS** between two graphs, is known to be **NP-complete**.

<font color='red'>**the effectiveness and efficiency**</font>

Specifically, our model achieves smaller error rate and great time reduction compared against a series of baselines, including several approximation algorithms on GED computation, and many existing graph neural network based models.



# 应用场景

谱域GCN：空域 —> 傅里叶变换 —> 谱域

* 处理非欧式空间数据（图数据，比如社交网络、多变量时间序列预测等）

  Defu Cao: Spectral Temporal Graph Neural Network for Multivariate Time-series Forecasting

* 图相似度搜索

* .......



# 项目实战

## 关于数据

* 训练数据
* 模型输入（GCN参数+GCN输入）
* 常见的图数据集（ AIDS、IMDB、GREC 等，GEXF or GXL）
* 数据集预处理

```python
# 注意：edge_index是定义所有边的源节点和目标节点的张量，不是索引元组的列表。
edge_index = torch.tensor([[0, 1, 1, 2],
                           [1, 0, 2, 1]], dtype=torch.long)
x = torch.tensor([[-1], [0], [1]], dtype=torch.float)
```



## 模型

![image-20220412170512791](assets/11.png)

## 训练过程

* 数据集的制作
* 训练与测试
* 模型保存

