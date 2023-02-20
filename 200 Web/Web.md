# CSS
[CSS内外边距、盒子模型、位置、浮动](https://www.acwing.com/video/3734/)
父元素与子元素同时有`margin-top`，导致塌陷问题：12m55s~17m33s
上下紧邻的元素`margin`塌陷问题：18m15s~22m15s
`position`：34m10s~50m14s
`float`：51m40s~57m31s
*实战*——名片：59m21s~2h18m52s
[内外边距](https://www.acwing.com/blog/content/16280/)
[位置](https://www.acwing.com/blog/content/16282/)
[浮动](https://www.acwing.com/blog/content/16283/)

```CSS

.div-outer {
width: 300px;
height: 400px;
background-color: lightblue;
/* border-top: 1px solid; */
/* padding-top: 1px; */
overflow: hidden;
}
.div-inner {
width: 100px;
height: 100px;
background-color: darkred;
margin: 20px auto
}
```

[CSS flex、响应式布局](https://www.acwing.com/video/3748/)16m08s
flex布局：11m43s
布局排列界面各个模块摆放方式
响应式布局： 

[flex布局](https://www.acwing.com/blog/content/16284)
[响应式布局](https://www.acwing.com/blog/content/16285/)

在熵权法的灵敏度分析中，每个因素的灵敏度系数可以通过以下公式计算：

$S_j = \frac{|\omega_j - \omega_j'|}{\omega_j} \times 100%$

其中，$S_j$ 表示第 $j$ 个指标的灵敏度系数；$W_j$ 表示原始数据集下第 $j$ 个指标的权重；$W_j^{\prime}$ 表示对第 $j$ 个指标进行变化范围内的调整后，重新计算的权重；$|\cdot|$ 表示绝对值。

该公式的含义为：计算第 $j$ 个指标的权重变化占其原始权重的百分比，即该指标对最终权重的影响程度。灵敏度系数越大，表示该指标对最终权重的影响程度越大，其稳定性也越低。反之，灵敏度系数越小，表示该指标对最终权重的影响程度越小，其稳定性也越高。

灵敏度系数越小，说明模型对该因素的变化越不敏感，该因素对模型的影响越小；灵敏度系数越大，则说明模型对该因素的变化越敏感，该因素对模型的影响越大。因此，在实际应用中，可以根据具体的情况来判断灵敏度系数的大小是否合理，一般需要结合领域知识和经验进行综合评估