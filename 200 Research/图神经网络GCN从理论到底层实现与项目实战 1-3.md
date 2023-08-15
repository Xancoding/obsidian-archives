

# GCN

《SEMI-SUPERVISED CLASSIFICATION WITH  GRAPH CONVOLUTIONAL NETWORKS》

## GCN有什么用？

图结构的数据：社交网络、化学分子结构、知识图谱等等；即使关于图像的部分任务，比如姿势识别中的关键点也是一个图结构。



引入场景 torch.nn.Conv2d

https://pytorch.org/docs/master/generated/torch.nn.Conv2d.html#torch.nn.Conv2d



## GCN原理形象解释


$$
\begin{aligned} 
& A：图结构的邻接矩阵 \\
& \widetilde{A}：有自连接的邻接矩阵 \\
& \widetilde{A} = A + I \\
& \widetilde{D}：有自连接的邻接矩阵的度矩阵 \\
& \widetilde{D}_{ii} = \sum_{j} \widetilde{A}_{ij} \\
& H：图节点的特征
\end{aligned}
$$
问题：

* GCN的输入是邻接矩阵A和节点特征H，直接做内积，再乘一个参数矩阵W，然后激活一下，不就相当于一个的神经网络层？为什么要有自连接的邻接矩阵?

  提示：无法区分“自身节点”与“无连接节点”。只使用A的话，由于A的对角线上都是0，所以在和特征矩阵H相乘的时候，只会计算一个节点的所有邻居的特征的加权和，该节点本身的特征却被忽略了。

* 为什么需要有自连接的邻接矩阵的度矩阵？

  提示：A是没有经过归一化的矩阵，这样与特征矩阵H相乘会改变特征原本的分布，所以对A做一个标准化处理。平衡度很大的节点的重要性。（对称归一化拉普拉斯矩阵）
  $$
  NormA_{ij} = \frac{A_{ij}}{\sqrt{d_{i}}\sqrt{d_{j}}}
  $$

理论：https://www.zhihu.com/question/54504471    （傅里叶变换）






## GCN的底层实现

Pytorch-Geometric (PyG) https://github.com/pyg-team/pytorch_geometric

官方文档 https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html

PyG provides the following main features:

- [Data Handling of Graphs](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#data-handling-of-graphs)
- [Common Benchmark Datasets](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#common-benchmark-datasets)
- [Mini-batches](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#mini-batches)
- [Data Transforms](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#data-transforms)
- [Learning Methods on Graphs](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#learning-methods-on-graphs)
- [Exercises](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#exercises)

### Data Handling of Graphs

图用于对对象（节点）之间的成对关系（边）进行建模。 PyG 中的单个图由 torch_geometric.data.Data 的实例描述，该实例默认包含以下属性： 

- `data.x`: Node feature matrix with shape `[num_nodes, num_node_features]`
- `data.edge_index`: Graph connectivity in COO format with shape `[2, num_edges]` and type `torch.long`
- `data.edge_attr`: Edge feature matrix with shape `[num_edges, num_edge_features]`
- `data.y`: Target to train against (may have arbitrary shape), *e.g.*, node-level targets of shape `[num_nodes, *]` or graph-level targets of shape `[1, *]`
- `data.pos`: Node position matrix with shape `[num_nodes, num_dimensions]`

```python
import torch
from torch_geometric.data import Data

# 注意：edge_index是定义所有边的源节点和目标节点的张量，不是索引元组的列表。
edge_index = torch.tensor([[0, 1, 1, 2],
                           [1, 0, 2, 1]], dtype=torch.long)
x = torch.tensor([[-1], [0], [1]], dtype=torch.float)

data = Data(x=x, edge_index=edge_index)
>>> Data(edge_index=[2, 4], x=[3, 1])

# -------------------------------------------------
edge_index = torch.tensor([[0, 1],
                           [1, 0],
                           [1, 2],
                           [2, 1]], dtype=torch.long)
x = torch.tensor([[-1], [0], [1]], dtype=torch.float)

data = Data(x=x, edge_index=edge_index.t().contiguous())
>>> Data(edge_index=[2, 4], x=[3, 1])
```



### Mini-batches

Neural networks are usually trained in a batch-wise fashion. PyG **achieves parallelization over a mini-batch** by creating **sparse block diagonal adjacency matrices** (defined by `edge_index`) and concatenating feature and target matrices in the node dimension. 

This composition allows differing number of nodes and edges over examples in one batch:



### Creating Message Passing Networks

将卷积算子推广到不规则域通常表示为邻域聚合或**消息传递**方案。  

PyG 提供了 MessagePassing 基类，它通过**自动处理消息传播**来帮助创建此类消息传递图神经网络。 用户只需定义函数，即 message() 和 update()，以及要使用的聚合方案，即 aggr="add"、aggr="mean" 或 aggr="max"。 



### Implementing the GCN Layer

This formula can be divided into the following steps:

1. Add self-loops to the adjacency matrix.
2. Linearly transform node feature matrix.
3. Compute normalization coefficients.
4. Normalize node features
5. Sum up neighboring node features (`"add"` aggregation).

```python
import torch
from torch_geometric.nn import MessagePassing
from torch_geometric.utils import add_self_loops, degree

class GCNConv(MessagePassing):
    def __init__(self, in_channels, out_channels):
        super().__init__(aggr='add')  # "Add" aggregation (Step 5).
        self.lin = torch.nn.Linear(in_channels, out_channels)

    def forward(self, x, edge_index):
        # x has shape [N, in_channels]
        # edge_index has shape [2, E]

        # Step 1: Add self-loops to the adjacency matrix.
        edge_index, _ = add_self_loops(edge_index, num_nodes=x.size(0))

        # Step 2: Linearly transform node feature matrix.
        x = self.lin(x)

        # Step 3: Compute normalization.
        row, col = edge_index
        deg = degree(col, x.size(0), dtype=x.dtype)
        deg_inv_sqrt = deg.pow(-0.5)
        deg_inv_sqrt[deg_inv_sqrt == float('inf')] = 0
        # The result is saved in the tensor norm of shape [num_edges, ]
        norm = deg_inv_sqrt[row] * deg_inv_sqrt[col]

        # Step 4-5: Start propagating messages.
        return self.propagate(edge_index, x=x, norm=norm)

    def message(self, x_j, norm):
        # x_j has shape [E, out_channels]

        # Step 4: Normalize node features.
        return norm.view(-1, 1) * x_j
```

step1-step3 .......

We then call [`propagate()`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.message_passing.MessagePassing.propagate), which internally calls [`message()`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.message_passing.MessagePassing.message), [`aggregate()`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.message_passing.MessagePassing.aggregate) and [`update()`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.message_passing.MessagePassing.update). We pass the node embeddings `x` and the normalization coefficients `norm` as additional arguments for message propagation.

In the [`message()`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.message_passing.MessagePassing.message) function, we need to normalize the neighboring node features `x_j` by `norm`. **Here, `x_j` denotes a *lifted* tensor, which contains the source node features of each edge, *i.e.*, the neighbors of each node.** Node features can be automatically lifted by appending `_i` or `_j` to the variable name. In fact, any tensor can be converted this way, as long as they hold source or destination node features.



Try to answer the following questions related to [`GCNConv`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.GCNConv):

1. What information does `row` and `col` hold?
2. What does [`degree()`](https://pytorch-geometric.readthedocs.io/en/latest/modules/utils.html#torch_geometric.utils.degree) do?
3. Why do we use `degree(col, ...)` rather than `degree(row, ...)`?
4. What does `deg_inv_sqrt[col]` and `deg_inv_sqrt[row]` do?
5. What information does `x_j` hold in the `message()` function? If `self.lin` denotes the identity function, what is the exact content of `x_j`?
6. Add an `update()` function to [`GCNConv`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.GCNConv) that adds transformed central node features to the aggregated output.

### [Implementing the Edge Convolution](https://pytorch-geometric.readthedocs.io/en/latest/notes/create_gnn.html#id3)

Try to answer the following questions related to [`EdgeConv`](https://pytorch-geometric.readthedocs.io/en/latest/modules/nn.html#torch_geometric.nn.conv.EdgeConv):

1. What is `x_i` and `x_j - x_i`?
2. What does `torch.cat([x_i, x_j - x_i], dim=1)` do? Why `dim = 1`?

## GCN的简单实例

```python
import torch
import torch.nn.functional as F
from torch_geometric.nn import GCNConv

class GNN(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = GCNConv(dataset.num_node_features, 16)
        self.conv2 = GCNConv(16, dataset.num_classes)

    def forward(self, data):
        x, edge_index = data.x, data.edge_index

        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, training=self.training)
        x = self.conv2(x, edge_index)

        return F.log_softmax(x, dim=1)
```

```python
from torch_geometric.datasets import Planetoid
dataset = Planetoid(root='./data/Cora', name='Cora')

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = GNN().to(device)
data = dataset[0].to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=5e-4)

model.train()
for epoch in range(200):
    optimizer.zero_grad()
    out = model(data)
    loss = F.nll_loss(out[data.train_mask], data.y[data.train_mask])
    loss.backward()
    optimizer.step()
```

```
model.eval()
pred = model(data).argmax(dim=1)
correct = (pred[data.test_mask] == data.y[data.test_mask]).sum()
acc = int(correct) / int(data.test_mask.sum())
print(f'Accuracy: {acc:.4f}')
```



## GCN项目实战

《SimGNN: A Neural Network Approach to Fast Graph Similarity Computation》

https://github.com/benedekrozemberczki/SimGNN



《Noah: Neural-optimized A* Search Algorithm for Graph Edit Distance Computation》

https://github.com/pkumod/Noah-GED







