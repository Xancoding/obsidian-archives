GNN + LSTM

第二个项目：

《Spectral Temporal Graph Neural Network for Multivariate Time-series Forecasting》

《Stock Price Prediction with StemGNN and Dynamic Time Warping》

# Motivation

* Specifically, we hope to combine both the advantages of GFT and DFT, and model **multivariate time-series** data entirely **in the spectral domain**.

  better model the **intra-series** temporal patterns and **inter-series** correlations jointly.

  

* enables a data-driven construction of **dependency** graphs for different timeseries.

  without pre-defined topologies

  

  Conclusion: achieves state-of-the-art performances



Inside a StemGNN block,

* GFT is first applied to transfer **structural multivariate inputs** into **spectral** time-series representations.

* DFT is utilized to transfer each **univariate time-series** into the **frequency domain**.



# 应用场景

* 谱域GCN：时间+空域 —> 傅里叶变换 —> 谱域

* 多变量依赖问题

## 问题定义

![image-20220417191622663](assets/17.png)




# Preliminary

## GRU

https://pytorch.org/docs/stable/generated/torch.nn.GRU.html

`torch.nn.GRU`(**args*, ***kwargs*)

Parameter：

- **input_size** – The number of expected features in the input x
- **hidden_size** – The number of features in the hidden state h
- **batch_first** – If `True`, then the input and output tensors are provided as (batch, seq, feature) instead of (seq, batch, feature). Note that this does not apply to hidden or cell states. See the Inputs/Outputs sections below for details. **Default: `False`**

Inputs:

![image-20220414104943895](assets/12.png)
$$
N = batch \quad size  \\   
L = sequece \quad length  \\
H_{in} = input \quad size      \\
H_{out} = hidden \quad size \\
D =  2 \quad if \quad bidirectional=True \quad otherwise \quad 1
$$
Outputs:

![image-20220414105437099](assets/13.png)



## self-attention

https://www.cnblogs.com/USTC-ZCC/p/11155636.html

<img src="assets/14.png" alt="image-20220414135440223" style="zoom:50%;" />

<img src="assets/15.png" alt="image-20220414135524327" style="zoom: 67%;" />

# 项目实战

## 关于数据

* 训练/测试数据

* 模型输入（GCN参数+GCN输入）
* 数据集预处理

```python
# 注意：edge_index是定义所有边的源节点和目标节点的张量，不是索引元组的列表。
edge_index = torch.tensor([[0, 1, 1, 2],
                           [1, 0, 2, 1]], dtype=torch.long)
x = torch.tensor([[-1], [0], [1]], dtype=torch.float)
```



## 模型

<img src="C:/Users/QChen/Desktop/2222.png" alt="image-20220417191228818" style="zoom:67%;" />



### Latent Correlation Layer

the graph structure and its associated **weight matrix W** can be inferred automatically from data.

### StemGNN Block

* the graph G = (X, W) serves as input to the StemGNN layer
* A StemGNN block is by design to model **structural and temporal dependencies** inside multivariate time-series jointly **in the spectral domain**.

### Spectral Sequential Cell (Spe-Seq Cell)

### Loss

### Spectral Graph Convolution



## 训练过程

* 数据类的设计 Dataset
* 训练与推理Inference过程
* 模型保存与加载





