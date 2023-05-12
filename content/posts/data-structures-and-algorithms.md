---
title: "数据结构与算法" # 标题
date: 2022-10-18T17:16:53+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- 计算机基础
- 数据结构与算法
keywords: # 关键词
- Tech
- 计算机基础
- 数据结构与算法
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

# 递推式的计算
## 主定理
假设 $T(n)$ 是一个递归算法的时间复杂度，其中 $n$ 是输入规模。假设算法分解问题时，将其划分为 $a$ 个子问题，每个子问题的规模为原问题的 $1/b$，且每个子问题的解需要 $f(n)$ 的时间。即：
$$T(n) = aT(n/b) + f(n)$$

假设分解问题和合并子问题的过程需要常数时间 $d$，那么主定理的公式如下：
### 易记（不严谨）
1.  如果 $f(n) < O(n^{\log_b(a)})$，那么 $T(n) = \Theta(n^{\log_b(a)})$
    
2.  如果 $f(n) = \Theta(n^{\log_b(a)})$，那么 $T(n) = \Theta(n^{\log_b(a)} \log n)$
    
3.  如果 $f(n) > \Omega(n^{\log_b(a)})$，那么 $T(n) = \Theta(f(n))$。
    

这里的比较指的是数量级的大小
### 严谨
1.  如果 $f(n) = O(n^{\log_b(a - \epsilon)})$，那么 $T(n) = \Theta(n^{\log_b(a)})$
    
2.  如果 $f(n) = \Theta(n^{\log_b(a)})$，那么 $T(n) = \Theta(n^{\log_b(a)} \log n)$
    
3.  如果 $f(n) = \Omega(n^{\log_b(a + \epsilon)})$，且对于某个常数 $c < 1$ 和所有足够大的 $n$ 都有 $af(n/b) \le cf(n)$，那么 $T(n) = \Theta(f(n))$。
    

其中 $\epsilon > 0$ 是任意小的正数。这里的 $O$、$\Theta$ 和 $\Omega$ 表示渐进符号。
# P & NP & NPC & NP-Hard 
-   NP完全问题（NPC，NP-Complete）是指那些同时满足NP问题和NP-hard问题的问题。也就是说，NP完全问题既可以在多项式时间内验证解的正确性，又至少和其他NP问题一样难。NP完全问题通常被认为是计算机科学中最难解决的问题之一。
    
-   NP-hard问题（NPH，NP-Hard）是指那些至少和NP问题一样难的问题。也就是说，如果存在一个多项式时间算法能够解决一个NP-hard问题，那么所有的NP问题都可以在多项式时间内解决。需要注意的是，NP-hard问题并不一定是NP问题，它们可能不具备在多项式时间内验证解的正确性的性质。

总之，NP完全问题和NP-hard问题都属于计算复杂度理论中难以解决的问题。它们之间的区别在于，NP完全问题既可以在多项式时间内验证解的正确性，又至少和其他NP问题一样难；而NP-hard问题只需满足后者的条件。
# 推荐阅读
- [数据结构与算法 | 我的笔记](https://github.com/Xancoding/Data-Structures-and-Algorithms)
***
- [LABULADONG 的算法网站](https://labuladong.github.io/algo/)
- [代码随想录 x 数据结构与算法](https://www.programmercarl.com/) 
- [AcWing 算法基础课](https://www.acwing.com/activity/content/11/)
- [AcWing 算法提高课](https://www.acwing.com/activity/content/16/)
- [AcWing 算法进阶课](https://www.acwing.com/activity/content/32/)
- [OI Wiki](https://oi-wiki.org/)
- [CP Wiki](https://cp-wiki.vercel.app/)
***
- [LeetCode](https://leetcode.cn/)
- [AcWing](https://www.acwing.com/)
- [Luogo](https://www.luogu.com.cn/)
- [Codeforces](https://codeforces.com/)
***
- [《大话数据结构》](https://book.douban.com/subject/6424904/)
- [《labuladong的算法小抄》](https://book.douban.com/subject/35252621/)
- [《算法竞赛进阶指南》](https://book.douban.com/subject/30136932/)
- [《算法（第4版）》](https://book.douban.com/subject/19952400/)
{{< douban src="https://book.douban.com/subject/6424904/" >}}
{{< douban src="https://book.douban.com/subject/35252621/" >}}
{{< douban src="https://book.douban.com/subject/30136932/" >}}
{{< douban src="https://book.douban.com/subject/19952400/" >}}