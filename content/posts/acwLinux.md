---
title: "AcWing Linux 基础课" # 标题
date: 2022-10-16T14:23:58+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- AcWing
- Linux
- 新技能
keywords: # 关键词
- Tech
- AcWing
- Linux
- 新技能
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

# AcWing Linux 基础课
- [AcWing Linux 基础课 | Colopen's blog](https://www.colopen-blog.com/Engineer/acw_linux/)
- [AcWing Linux 基础课](https://www.acwing.com/activity/content/57/)
- [命令行的艺术 ](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
- [The Missing Semester of Your CS Education](https://missing-semester-cn.github.io/)
***
## Terminal
> **终端，一个程序，是界面上打开的黑框框本身，`shell` 运行于其中**
## Shell
- [常用文件管理命令 | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2855530/)
- **[Shell 语法 | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2855883/)**
- [管道、环境变量与常用命令  | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/3030391/)
	- **[常用命令  | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/3030414/)**
- [《Bash 脚本教程》](https://wangdoc.com/bash/)
- [第 1 讲 - 课程概览与 Shell | The missing semester of your CS education](https://missing-semester-cn.github.io/2020/course-shell/)
- [第 2 讲 - Shell 工具和脚本 | The missing semester of your CS education](https://missing-semester-cn.github.io/2020/shell-tools/)
- [终极 Shell——ZSH](https://zhuanlan.zhihu.com/p/19556676)
- [快速入门 zsh](https://github.com/ohmyzsh/ohmyzsh)
***
### Shell是什么？
- `Shell` 是我们通过命令行与操作系统沟通的 `程序`，是个 `命令行解释器`
- `Shell` 脚本可以直接在命令行中执行，也可以将一套逻辑组织成一个文件，方便复用
- `Shell` 负责外界与 `Linux 内核` 的交互，接收用户或其他应用程序的命令，然后把这些命令转化成内核能理解的语言，传给内核，内核是真正干活的，干完之后再把结果返回用户或应用程序
- `Shell`解释器有 `sh`、`bash`、`zsh...`
### Shell常用命令
1. `ag xxx`：搜索当前目录下的所有文件，**检索`xxx`字符串**
2. `find /path/to/directory/ -name '*.py'`：**搜索**某个文件路径下的所有`*.py`**文件**
3. `history`：展示当前用户的历史操作。内容存放在`~/.bash_history`中
4. `grep xxx`：从`stdin`中读入若干行数据，如果某行中包含`xxx`，则输出该行；否则忽略该行，**用于查找文件里符合条件的字符串**

## Tmux && Vim
- [tmux和vim | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2855620/)
- [Tmux 使用教程 | 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/10/tmux.html)
- [Tmux 简介与使用 | Huoty's Blog](http://kuanghy.github.io/2016/09/29/tmux)
- [简明 VIM 练级攻略 | 酷壳](https://coolshell.cn/articles/5426.html#comments)
- [第 3 讲 - 编辑器 (Vim) | The missing semester of your CS education](https://missing-semester-cn.github.io/2020/editors/)
- [VIM 大冒险 - Game](https://vim-adventures.com/)
***
### Tmux 是什么？
> **`Tmux` 是一个用于在终端窗口中运行多个终端会话的工具，即终端复用软件（terminal multiplexer）**
> 
> **远程 `SSH` 访问服务器进行工作时。即使非正常掉线，它能保存当前工作状态，并保证当前任务继续运行。**
### Session && Window && Pane
- 一个`tmux `可以有好多个`session`(会话)
- 一个`session`可以有好多个`window`(窗口)
- 一个`window`可以有好多个`pane`(面板)
- 一个`session`里不超过10个`window`是最方便的：可以用0到9迅速切换
### Vim 是什么？
> **VIM 是 Linux 系统上一款文本编辑器，它是操作 Linux 的一款利器。**
## SSH 
- [SSH | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2898263/)
- [Adding a new SSH key to your GitHub account](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
***
### SSH是什么？
> **SSH是一种网络协议，用于计算机之间的加密登录**
### SSH 免密登录
1.  `ssh-key-gen` ：在本地服务器生成密钥
2.  `cd .ssh/`
3.  `vim config` ：定义服务器别名

```config
Host server
	HostName 服务器IP地址  
	User     登录用户名
	port     远程主机端口号，默认为 22
``` 
4. `ssh-copy-id server`：在本地服务器配置免密登录至云服务器
5. 免密登录至`docker 容器`步骤同上
6. 配置完成后，就可以直接使用 `ssh server` 免密登录啦
## SCP
- [SCP | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2898266/)
***
### SCP是什么？
> **SCP是一个命令行程序，可让您在计算机之间安全地复制文件和目录**
### SCP 传文件
- 复制多个文件：`scp source1 source2 LOCAL_PATH SERVER:SERVER_PATH`
- 复制文件夹 ：
	- `scp -r ~/tmp SERVER:/home/acs/`：将本地家目录中的`tmp`文件夹复制到服务器中的`/home/acs/`目录下
	- `scp -r SERVER:homework .`：将服务器中的`~/homework/`文件夹复制到本地的当前路径下
## Git
- [git | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2932078/)
- [Git从放弃到入门](https://juejin.cn/column/6969263852206686221)
	- [Git从放弃到入门：状态与阶段](https://juejin.cn/post/6973299611536457742)
	- **[Git从放弃到入门：撤销操作](https://juejin.cn/post/6974039503056928776)**
- [Git 原理入门](https://www.ruanyifeng.com/blog/2018/10/git-internals.html)
- [Learn Git Braching - Game](https://learngitbranching.js.org/?locale=zh_CN)
- [Pro Git Online](https://git-scm.com/book/zh/v2)
***
### Git是什么？
> **Git是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理**
### Git常用命令
#### 常用命令
1. `git add XX`：将`XX`文件添加到暂存区
2. `git commit -m "给自己看的备注信息"`：将暂存区的内容提交到当前分支
3. `git push -u (第一次需要 -u 以后不需要)` ：将当前分支推送到远程仓库
4. `git clone git@git.acwing.com:xxx/XXX.git`：将远程仓库`XXX`下载到当前目录下
5. `git log`：查看当前分支的所有版本
6. **`git status`：查看仓库状态**
7. **有时候暂存了更改，尚未提交至仓库，如何取消暂存的更改？**
	- **`git restore --staged XX`或`git reset HEAD XX`：将`XX`从暂存区里移除** 
8. **有时候修改了本地工作目录（通常也叫工作区）的文件，如何放弃本地更改（尚未暂存）？**
	-  **`git checkout XX`或`git restore XX`：将`XX`文件尚未加入暂存区的修改全部撤销**
#### Git 全局设置
1. `git config --global user.name xxx`：设置全局用户名，信息记录在`~/.gitconfig`文件中
2. `git config --global user.email xxx@xxx.com`：设置全局邮箱地址，信息记录在`~/.gitconfig`文件中
3. `git init`：将当前目录配置成`git`仓库，信息记录在隐藏的`.git`文件夹中
#### Git 查看命令
1. `git diff XX`：查看`XX`文件相对于暂存区修改了哪些内容
2. `git status`：查看仓库状态
3. `git log`：查看当前分支的所有版本
4. `git log --pretty=oneline`：用一行来显示
5. `git reflog`：查看`HEAD`指针的移动历史（包括被回滚的版本）
6. `git branch`：查看所有分支和当前所处分支
7. `git pull` ：将远程仓库的当前分支与本地仓库的当前分支合并
#### Git 删除命令
1. `git rm --cached XX`：将文件从仓库索引目录中删掉，不希望管理这个文件
2. `git restore --staged xx`：将`xx`从暂存区里移除
3. `git checkout — XX`或`git restore XX`：将`XX`文件尚未加入暂存区的修改全部撤销
#### Git 代码回滚
1. `git reset --hard HEAD^`或`git reset --hard HEAD~ `：将代码库回滚到上一个版本
2. `git reset --hard HEAD^^`：往上回滚两次，以此类推
3. `git reset --hard HEAD~100`：往上回滚100个版本
4. `git reset --hard 版本号`：回滚到某一特定版本
#### Git 远程仓库
1. `git remote add origin git@git.acwing.com:xxx/XXX.git`：将本地仓库关联到远程仓库
2. `git push -u (第一次需要-u以后不需要)` ：将当前分支推送到远程仓库
3. `git push origin branch_name`：将本地的某个分支推送到远程仓库
4. `git clone git@git.acwing.com:xxx/XXX.git`：将远程仓库XXX下载到当前目录下
5. `git push --set-upstream origin branch_name`：设置本地的`branch_name`分支对应远程仓库的`branch_name`分支
6. `git push -d origin branch_name`：删除远程仓库的`branch_name`分支
7. `git checkout -t origin/branch_name`：将远程的`branch_name`分支拉取到本地
8. `git pull`：将远程仓库的当前分支与本地仓库的当前分支合并
9. `git pull origin branch_name`：将远程仓库的`branch_name`分支与本地仓库的当前分支合并
10. `git branch --set-upstream-to=origin/branch_name1 branch_name2`：将远程的
11. `branch_name1`分支与本地的`branch_name2`分支对应
#### Git 分支命令
1. `git branch branch_name`：创建新分支
2. `git branch`：查看所有分支和当前所处分支
3. `git checkout -b branch_name`：创建并切换到`branch_name`这个分支
4. `git checkout branch_name`：切换到`branch_name`这个分支
5. `git merge branch_name`：将分支`branch_name`合并到当前分支上
6. `git branch -d branch_name`：删除本地仓库的`branch_name`分支
7. `git push --set-upstream origin branch_name`：设置本地的`branch_name`分支对应远程仓库的`branch_name`分支
8. `git push -d origin branch_name`：删除远程仓库的`branch_name`分支
9. `git checkout -t origin/branch_name`：将远程的`branch_name`分支拉取到本地
10. `git pull` ：将远程仓库的当前分支与本地仓库的当前分支合并
11. `git pull origin branch_name`：将远程仓库的`branch_name`分支与本地仓库的当前分支合并
12. `git branch --set-upstream-to=origin/branch_name1 branch_name2`：将远程的
13. `branch_name1`分支与本地的`branch_name2`分支对应
#### Git stash 暂存
1. `git stash`：将工作区和暂存区中尚未提交的修改存入栈中
2. `git stash apply`：将栈顶存储的修改恢复到当前分支，但不删除栈顶元素
3. `git stash drop`：删除栈顶存储的修改
4. `git stash pop`：将栈顶存储的修改恢复到当前分支，同时删除栈顶元素
5. `git stash list`：查看栈中所有元素
## **Thrift** 
- [Thrift_learning - AcGit](https://git.acwing.com/fashen/thrift_learning/-/blob/master/readme.md)
- [thrift 官网](https://thrift.apache.org/) -> [Tutorial](https://thrift.apache.org/tutorial/) -> [tutorial.thrift](https://git-wip-us.apache.org/repos/asf?p=thrift.git;a=blob_plain;f=tutorial/tutorial.thrift)

### Thrift是什么？
> **Thrift是一个轻量级、跨语言的远程过程服务调用（RPC）框架**
> 
> **RPC（远程过程调用）是一个计算机通信协议，该协议允许运行于一台计算机的程序调用另一台计算机的子程序，而程序员无需额外地为这个交互作用编程**
> 
> **Thrift用于跨语言服务开发，它将软件栈和代码生成引擎结合在一起，以构建在 C++、Java、Python、PHP、Ruby、Erlang、Perl、Haskell、C#、Cocoa、JavaScript、Node. Js、Smalltalk、OCaml 和 Delphi 等语言之间高效、无缝地工作的服务**
### 例：实现一个游戏的匹配服务
#### 基本框架
1. 游戏应用端（Python3）
	1. 客户端：与 匹配系统服务器 的服务端交互
2. 匹配系统服务器（C++）
	1. 服务端：与 游戏应用端 的客户端交互
	2. 客户端：与 数据存储服务器 的服务端交互 
3. 数据存储服务器（已经实现）
	1. 服务端：与 匹配系统服务器 的客户端交互
#### 文件结构
```
|-- README.md
|-- game
|   `-- src
|       |-- client.py
|       `-- match_client
|           |-- __init__.py
|           |-- __pycache__
|           |   `-- __init__.cpython-38.pyc
|           `-- match
|               |-- Match.py
|               |-- __init__.py
|               |-- __pycache__
|               |   |-- Match.cpython-38.pyc
|               |   |-- __init__.cpython-38.pyc
|               |   `-- ttypes.cpython-38.pyc
|               |-- constants.py
|               `-- ttypes.py
|-- match_system
|   `-- src
|       |-- Match.o
|       |-- Save.o
|       |-- main
|       |-- main.cpp
|       |-- main.o
|       |-- match_server
|       |   |-- Match.cpp
|       |   |-- Match.h
|       |   |-- match_types.cpp
|       |   `-- match_types.h
|       |-- match_types.o
|       `-- save_client
|           |-- Save.cpp
|           |-- Save.h
|           `-- save_types.h
`-- thrift
    |-- match.thrift
    `-- save.thrift
```
#### 实现过程（部分）
1. 定义接口 (存放接口的文件夹就是 `thrift` 文件)
2. 完成 `Server` 端
	1. 通过`match.thrift`接口在`match_system`文件夹下生成 C++版本的服务端
	```
	thrift -r --gen cpp tutorial.thrift
	```
	2. 将`gen cpp` 文件夹重命名，如：`match_server`（区别于之后要在此处生成的`client_server`）
	3. 把 `Match_server.skeleton.cpp` 移动到当前 `src` 目录下并重命名为 `main.cpp`
		- 由于移动了 `main.cpp` 故需要修改一下` main.cpp` 中头文件里关于 `Match.h` 的引用路径：`#include "Match.h"` -> `#include "match_server/Match.h"`
	4. 在`main.cpp`中实现具体业务逻辑
1. 完成 `Client` 端
	1. 通过`match.thrift`接口在`game`文件夹下生成 `python3` 版本的服务端，然后通过修改得到客户端，其余操作步骤同服务端
	```
	thrift -r --gen py tutorial.thrift
	```
	2. 删掉 `Match_remote `，该文件是用 py 实现 服务端 时用的文件，此处我们只需要实现 **客户端** 功能，因此他没有作用，不妨删掉，让文档简洁一点
	3. 利用官网提供的模板，在`src`文件夹下编写 **客户端** 文件 `client.py`
4. 持久化到云端
	- 将 **非编译文件** 和 **非可执行文件** 提交到 `git` 中去（好的工程习惯）
		- `Cpp`
			- `git restore --stage *.o`
			- `git restore --stage main`
		- `Python`
			- `git restore --stage *.pyc   # .pyc文件是编译文件，不加入暂存区里`
			- `git restore --stage *.swp   # .swp文件是缓存文件，不加入暂存区里`
- 注意：先运行服务器后，客户端才能正常运行
#### 项目地址
- [Thrift_lesson](https://git.acwing.com/ZagY/thrift_lesson)











