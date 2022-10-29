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
- [Tmux和Vim | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2855620/)
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
### Tmux && Session && Window && Pane
- 一个`tmux `可以有好多个`session`(会话)
- 一个`session`可以有好多个`window`(窗口)
- 一个`window`可以有好多个`pane`(面板)
- 一个`session`里不超过10个`window`是最方便的：可以用0到9迅速切换
### Tmux常用命令
> **Ac-Terminal 下前缀键被修改成了 Ctrl + a，一般的默认情况下是 Ctrl + b**
1. `tmux new -s <session-name>`：新建会话
2. `tmux detach` $or$ `Ctrl + a d`：分离会话，退出当前 Tmux 窗口，但是会话和里面的进程仍然在后台运行
3. `tmux attach -t <session-name>`：重新接入某个已存在的会话
4. `tmux kill-session -t <session-name>`：杀死某个会话
5. `tmux switch -t <session-name>`：切换会话
6. `tmux rename-session -t <old-name> <new-name>`：重命名会话
7. `tmux ls` $or$ `Ctrl + a s`：查看当前所有的 Tmux 会话
8. 在`tmux`中选中文本时，需要按住 `shift` 键
9. `tmux`中复制/粘贴文本：
	1. 按下 `Ctrl + a` 后松开手指，然后按 `[`
	2. 用鼠标选中文本，被选中的文本会被自动复制到tmux的剪贴板
	3. 按下 `Ctrl + a` 后松开手指，然后按 `]` ，会将剪贴板中的内容粘贴到光标处
### Vim 是什么？
> **VIM 是 Linux 系统上一款文本编辑器，它是操作 Linux 的一款利器。**
### Vim常用命令
1. 一般模式切换到编辑模式（常用）
	1. `i` : 在光标所处位置 **直接** 开始
	2. `a` : 在光标所处位置的 **下一个字符** 开始
	3. `o` : 在光标所处位置的 **下一行** 开始
	4. `r` : 取代当前光标处的字符，然后开始
	5. `[ESC]` : 退出编辑模式，回到一般模式
2. 光标移动操作
	1. `n<Space>` : **n** 为数字，光标 **向右移动**这一行的n个字符
	2. `n<Enter>` : **n** 为数字，光标 **向下移动**n行
	3. `0` 或 `功能键[Home]`: 光标移动到 **本行开头**
	4. `$` 或 `功能键[End]`: 光标移动到 **本行末尾**
	5. `:n` 或 `nG` : **n** 为数字，光标移动到 **第n行**
	6. `G`: 光标移动到 **最后一行**
	7. `gg` : 光标移动到 **第一行**
3. 查找、替换操作
	1. `/word` : 向 **光标之下** 寻找 第一个值为 **word** 的字符串
	2. `?word` : 向 **光标之上** 寻找 第一个值为 **word** 的字符串
	3. `n` : 重复 **前一个** 查找操作
	4. `N` : 反向 重复 **前一个** 查找操作
	5. `:n1,n2s/word1/word2/g` : **n1** 与 **n2** 为数字，在第 **n1** 行与 **n2** 行之间寻找 **word1** 这个字符串，并将该字符串 替换 为 **word2**
	6. `:1,$s/word1/word2/g` : 将全文的 **word1** 替换为 **word2**
	7. `:1,$s/word1/word2/gc` : 将全文的 **word1** 替换为 **word2**，且在替换前 **要求用户确认**
4. 文本操作（可搭配 `数字+<Enter>/<Space>、0、G、$` 等使用，达到预期组合效果）
	1. `v` : 选中文本
	2. `d` : 删除选中的文本
	3. `dd` : 删除当前行
	4. `y` : 复制选中的文本
	5. `yy` : 复制当前行
	6. `p` : 将复制的数据在光标的下一行/下一个位置 粘贴
	7. `u` : 撤销
	8. `Ctrl + r` : 取消撤销
	9. `>` : 将选中的文本整体 **向右缩进一次**
	10. `<` : 将选中的文本整体 **向左缩进一次**
5. 命令行操作
	1. `:w` : 保存
	2. `:w!` : 强制保存
	3. `:q` : 退出
	4. `:q!` : 强制退出
	5. `:wq` : 保存并退出
	6. `:set paste` : 设置成粘贴模式，取消代码自动缩进
	7. `:set nopaste` : 取消粘贴模式，开启代码自动缩进
	8. `:set nu` : 显示行号
	9. `:set nonu` : 隐藏行号
	10. `:noh`：关闭查找关键词高亮
6. `Ctrl + q` : 当`vim`卡死时，可以 **取消当前正在执行的命令**
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
- [Git | AcWing Linux 基础课](https://www.acwing.com/file_system/file/content/whole/index/content/2932078/)
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
### 本地项目上传到GitHub
1. 配置`ssh-key`实现本地与`Git`服务器免密交互
```
ssh-keygen  # 生成密钥
cat .ssh/id_rsa.pub
# 复制密钥，提交到 git 服务器的 ssh 密钥中
```
2. 按照下面的操作在本地文件夹配置一下`Git`：
```
git config --global user.name xxx  # 设置用户名
git config --global user.email xxx@xxx.com  # 设置用户邮箱

git init
git add .
git commit -m "xxx"
git remote add origin https://github.com/xxx/XXX.git  # 建立连接
git push -u origin master
```
### .gitignore的作用
> **工程常识：缓存文件，可执行文件，编译文件 不要传到自己的 git 项目里**
> 
> **.gitignore的作用就是帮助我们在git add时将我们指定的一些文件自动排除在外，不提交到git当中**
> 
> **在Git工作区的根目录下创建一个特殊的`.gitignore`文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件**

## **Thrift** 
- [Thrift | AcWing Linux 基础课](https://www.acwing.com/video/3479/)
- [Thrift_learning - AcGit](https://git.acwing.com/fashen/thrift_learning/-/blob/master/readme.md)
- [AcWing Linux 基础课 | Colopen's blog | Thrift](https://www.colopen-blog.com/Engineer/acw_linux/)
- [thrift 官网](https://thrift.apache.org/) -> [Tutorial](https://thrift.apache.org/tutorial/) -> [tutorial.thrift](https://git-wip-us.apache.org/repos/asf?p=thrift.git;a=blob_plain;f=tutorial/tutorial.thrift)
***
### Thrift是什么？
> **Thrift是一个轻量级、跨语言的远程过程服务调用（RPC）框架**
> 
> **RPC（远程过程调用）是一个计算机通信协议，该协议允许运行于一台计算机的程序调用另一台计算机的子程序，而程序员无需额外地为这个交互作用编程**
> 
> **Thrift用于跨语言服务开发，它将软件栈和代码生成引擎结合在一起，以构建在 C++、Java、Python、PHP、Ruby、Erlang、Perl、Haskell、C#、Cocoa、JavaScript、Node. Js、Smalltalk、OCaml 和 Delphi 等语言之间高效、无缝地工作的服务**
### 例：实现一个游戏的匹配服务
#### 基本框架
1. 游戏应用端 `game`（Python3）
	1. 客户端：与 匹配系统服务器 的服务端交互
2. 匹配系统服务器 `match_system`（C++）
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
#### 实现过程
1. 定义接口 (`thrift` 文件夹用于存放接口 )
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
	1. 通过`match.thrift`接口在`game`文件夹下生成 `python3` 版本的服务端，然后通过修改得到客户端
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
#### Thrift 接口
##### Match.thrift 
```
namespace cpp match_service
struct User {
    1: i32 id,
    2: string name,
    3: i32 scores
}
service Match {
    i32 add_user(1: User user, 2: string info),
    i32 remove_user(1: User user, 2: string info),
}
```
##### Save.thrift 
```
namespace cpp save_service
service Save {
    /**
     * username: myserver的名称
     * password: myserver的密码的md5值的前8位，用命令md5sum
     * 用户名密码验证成功会返回0，验证失败会返回1
     * 验证成功后，结果会被保存到myserver:homework/lesson_6/result.txt中
     */
    i32 save_data(1: string username, 2: string password, 3: i32 player1_id, 4: i32 player2_id)
}
```
#### 各版本预览
##### Match_server:1.0
- `match_client`：创建固定的`User`
```
from match_client.match import Match
from match_client.match.ttypes import User

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol


def main():
    # Make socket
    transport = TSocket.TSocket('localhost', 9090)

    # Buffering is critical. Raw sockets are very slow
    transport = TTransport.TBufferedTransport(transport)

    # Wrap in a protocol
    protocol = TBinaryProtocol.TBinaryProtocol(transport)

    # Create a client to use the protocol encoder
    client = Match.Client(protocol)

    # Connect!
    transport.open()

    user = User(1, 'yxc', 1500)
    client.add_user(user, "")

    # Close!
    transport.close()


# 调用 main 函数
if __name__ == "__main__":
    main()
```
- `match_server`
```
// This autogenerated skeleton file illustrates how to build a server.
// You should copy it to another filename to avoid overwriting it.
#include "match_server/Match.h"
#include <thrift/protocol/TBinaryProtocol.h>
#include <thrift/server/TSimpleServer.h>
#include <thrift/transport/TServerSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include<iostream>
using namespace ::apache::thrift;
using namespace ::apache::thrift::protocol;
using namespace ::apache::thrift::transport;
using namespace ::apache::thrift::server;
using namespace  ::match_service;
using namespace std;
class MatchHandler : virtual public MatchIf {
 public:
  MatchHandler() {
    // Your initialization goes here
  }
  int32_t add_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("add_user\n");
    return 0;
  }
  int32_t remove_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("remove_user\n");
    return 0;
  }
};
int main(int argc, char **argv) {
  int port = 9090;
  ::std::shared_ptr<MatchHandler> handler(new MatchHandler());
  ::std::shared_ptr<TProcessor> processor(new MatchProcessor(handler));
  ::std::shared_ptr<TServerTransport> serverTransport(new TServerSocket(port));
  ::std::shared_ptr<TTransportFactory> transportFactory(new TBufferedTransportFactory());
  ::std::shared_ptr<TProtocolFactory> protocolFactory(new TBinaryProtocolFactory());
  TSimpleServer server(processor, serverTransport, transportFactory, protocolFactory);
  
  cout << "Start Match Server" << endl;
    
  server.serve();
  return 0;
}
```
##### Match_server:2.0
- `match_client`：根据标准输入来创建`User`
```
from match_client.match import Match
from match_client.match.ttypes import User

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

# 利用 python 在终端读入信息需要引入 stdin
from sys import stdin

# 将原来的通信 main 函数改写成operate函数，每次需要的时候调用一次建立通信传递信息
# 目的是可以一直不断处理信息
# 然后重写 main 函数，使之能不断从终端读入信息
def operate(op, user_id, user_name, score):
    # Make socket 
	transport = TSocket.TSocket('localhost', 9090)
	
	# Buffering is critical. Raw sockets are very slow
	transport = TTransport.TBufferedTransport(transport)
	
	# Wrap in a protocol
	protocol = TBinaryProtocol.TBinaryProtocol(transport)
	
	# Create a client to use the protocol encoder
	client = Match.Client(protocol)
	
	# Connect!
	transport.open()

    # 针对 op 参数，分别进行 "增加" 与 "删出" 操作
    user = User(user_id, user_name, score)

    if op == "add":
        client.add_user(user, "")
    else:
        client.remove_user(user, "")
    
    # Close!
	transport.close()

def main():
    for line in stdin:
        op, user_id, user_name, score = line.split(' ')
        operate(op, int(user_id), user_name, int(score))

# 调用 main 函数
if __name__ == "__main__":
    main()
```
- `match_server`：自动将用户池中前两个用户匹配到一起
```
// This autogenerated skeleton file illustrates how to build a server.
// You should copy it to another filename to avoid overwriting it.
#include "match_server/Match.h"
#include <thrift/protocol/TBinaryProtocol.h>
#include <thrift/server/TSimpleServer.h>
#include <thrift/transport/TServerSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include<iostream>
#include <thread>               // 需要线程，引入头文件
#include <mutex>                // 互斥信号量
#include <condition_variable>   // 条件变量，用于 阻塞和唤醒 线程
#include <queue>                // 用于模拟消息队列
#include <vector>
using namespace ::apache::thrift;
using namespace ::apache::thrift::protocol;
using namespace ::apache::thrift::transport;
using namespace ::apache::thrift::server;
using namespace  ::match_service;
using namespace std;
struct Task {   // 消息队列中的元素
    User user;
    string type;
};
struct MessageQueue {   // 消息队列
    queue<Task> q;          // 消息队列本体
    mutex m;                // 互斥信号量
    condition_variable cv;  // 条件变量，用于阻塞唤醒线程
}message_queue;
class Pool {    // 模拟匹配池
public:
    void save_result(int a, int b) {  // 记录成功匹配的信息
        printf("Match Result: %d %d \n", a, b);
    }
    void match() {  // 将匹配池中的第一、第二个用户匹配
        while (users.size() > 1) {
            auto a = users[0], b = users[1];
            users.erase(users.begin());
            users.erase(users.begin());
            save_result(a.id, b.id);
        }
    }
    
    void add(User user) {   // 向匹配池中加入用户
        users.push_back(user);
    }
    void remove(User user) {    // 向匹配池中删除用户
        for (uint32_t i = 0; i < users.size(); ++ i) {
            if (users[i].id == user.id) {
                users.erase(users.begin() + i);
                break;
           }
        }
    }
private:
    vector<User> users; // 匹配池中的用户，用 vector 记录
}pool;
class MatchHandler : virtual public MatchIf {
 public:
  MatchHandler() {
    // Your initialization goes here
  }
  int32_t add_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("add_user\n");
    
    unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
    message_queue.q.push({user, "add"});        // 把新消息加入消息队列
    message_queue.cv.notify_all();              // 唤醒阻塞的线程
    return 0;
  }
  int32_t remove_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("remove_user\n");
    unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
    message_queue.q.push({user, "remove"});     // 把新消息加入消息队列
    message_queue.cv.notify_all();              // 唤醒阻塞的线程
   
    return 0;
  }
};
// 基于“生产者-消费者模型”的线程
void consume_task() {
    while(true) {
        unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
        if (message_queue.q.empty()) {
            message_queue.cv.wait(lck); // 这里要阻塞进程
            // 避免队列为空时，一直反复运行该进程，导致一直占用临界区，而不能加入新消息
        } else {
            auto task = message_queue.q.front();    // 取出消息队列队头元素
            message_queue.q.pop();
            lck.unlock();   // 临界区访问结束，直接解锁
            // 避免后续没用到临界区信息，而长时间占用临界区的情况发生
            
            if (task.type == "add") pool.add(task.user);
            else if (task.type == "remove") pool.remove(task.user);
            pool.match();
        } 
    }
}
int main(int argc, char **argv) {
  int port = 9090;
  ::std::shared_ptr<MatchHandler> handler(new MatchHandler());
  ::std::shared_ptr<TProcessor> processor(new MatchProcessor(handler));
  ::std::shared_ptr<TServerTransport> serverTransport(new TServerSocket(port));
  ::std::shared_ptr<TTransportFactory> transportFactory(new TBufferedTransportFactory());
  ::std::shared_ptr<TProtocolFactory> protocolFactory(new TBinaryProtocolFactory());
  TSimpleServer server(processor, serverTransport, transportFactory, protocolFactory);
  
  cout << "Start Match Server" << endl;
  
  thread matching_thread(consume_task); // 调用一个线程运行 consume_task
  server.serve();
  
  return 0;
}
```
##### Match_server:3.0
- `save_client`：因为一个节点只能由一个`main`方法作为程序的入口，所以匹配系统中的客户端和服务端写在同一个`main`方法中
```
// 需要额外引入的头文件
#include "save_client/Save.h"
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TTransportUtils.h>

// 需要额外声明的命名空间
using namespace  ::save_service;

//重写 save_result 内的内容，使其能够与 "数据存储服务器" 交互
void save_result(int a, int b) { // 记录成功匹配的信息
    printf("Match Result: %d %d\n", a, b);

    // Client端的板子
    std::shared_ptr<TTransport> socket(new TSocket("123.57.47.211", 9090));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    SaveClient client(protocol);

    try {
        transport->open();

        //调用接口，把信息存储 "数据存储服务器" 中
        int res = client.save_data("acs_4888", "07637c4c", a, b);
        //输出匹配结果
        if (!res) puts("success");
        else puts("fail");

        transport->close();
    } catch (TException& tx) {
        cout << "ERROR: " << tx.what() << endl;
    }
}
```
- `match_server`：每次只匹配分差小于 50 的用户
```
// This autogenerated skeleton file illustrates how to build a server.
// You should copy it to another filename to avoid overwriting it.
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TTransportUtils.h>
#include "match_server/Match.h"
#include "save_client/Save.h"
#include <thrift/protocol/TBinaryProtocol.h>
#include <thrift/server/TSimpleServer.h>
#include <thrift/transport/TServerSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <unistd.h> // 用于调用 sleep 函数
#include<iostream>
#include <thread>               // 需要线程，引入头文件
#include <mutex>                // 互斥信号量
#include <condition_variable>   // 条件变量，用于 阻塞和唤醒 线程
#include <queue>                // 用于模拟消息队列
#include <vector>
using namespace ::apache::thrift;
using namespace ::apache::thrift::protocol;
using namespace ::apache::thrift::transport;
using namespace ::apache::thrift::server;
using namespace ::save_service;
using namespace  ::match_service;
using namespace std;
struct Task {   // 消息队列中的元素
    User user;
    string type;
};
struct MessageQueue {   // 消息队列
    queue<Task> q;          // 消息队列本体
    mutex m;                // 互斥信号量
    condition_variable cv;  // 条件变量，用于阻塞唤醒线程
}message_queue;
class Pool {    // 模拟匹配池
public:
	//重写 save_result 内的内容，使其能够与 "数据存储服务器" 交互
    void save_result(int a, int b) {  // 记录成功匹配的信息
        printf("Match Result: %d %d \n", a, b);
        // Client端的板子
        std::shared_ptr<TTransport> socket(new TSocket("123.57.47.211", 9090));
        std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
        std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
        SaveClient client(protocol);
        try {
            transport->open();
            //调用接口，把信息存储 "数据存储服务器" 中
            int res = client.save_data("acs_4888", "07637c4c", a, b);
            //输出匹配结果
            if (!res) puts("success");
            else puts("fail");
            transport->close();
        } catch (TException& tx) {
            cout << "ERROR: " << tx.what() << endl;
        }
    }
    void match() {  // 将匹配池中的第一、第二个用户匹配
        while (users.size() > 1) {
            // 按照 rank分 排序
            sort(users.begin(), users.end(), [&](User& a, User& b) {
                return a.scores < b.scores;
            });
            bool flag = true;
            for (uint32_t i = 1; i < users.size(); ++ i) {
                auto a = users[i - 1], b = users[i];
                // 两名玩家分数差小于50时进行匹配
                if (b.scores - a.scores <= 50) {
                    users.erase(users.begin() + i - 1, users.begin() + i + 1);
                    save_result(a.id, b.id);
                    flag = false;
                    break;
                }
            }
            if (flag) break;    // 一轮扫描后，发现没有能够匹配的用户，就停止扫描，等待下次调用
        }
    } 
    
    void add(User user) {   // 向匹配池中加入用户
        users.push_back(user);
    }
    void remove(User user) {    // 向匹配池中删除用户
        for (uint32_t i = 0; i < users.size(); ++ i) {
            if (users[i].id == user.id) {
                users.erase(users.begin() + i);
                break;
           }
        }
    }
private:
    vector<User> users; // 匹配池中的用户，用 vector 记录
}pool;
class MatchHandler : virtual public MatchIf {
 public:
  MatchHandler() {
    // Your initialization goes here
  }
  int32_t add_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("add_user\n");
    
    unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
    message_queue.q.push({user, "add"});        // 把新消息加入消息队列
    message_queue.cv.notify_all();              // 唤醒阻塞的线程
    return 0;
  }
  int32_t remove_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("remove_user\n");
    unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
    message_queue.q.push({user, "remove"});     // 把新消息加入消息队列
    message_queue.cv.notify_all();              // 唤醒阻塞的线程
   
    return 0;
  }
};
// 基于“生产者-消费者模型”的线程
void consume_task() {
    while(true) {
        unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
        if (message_queue.q.empty()) {
            // message_queue.cv.wait(lck); // 这里要阻塞进程
            // 避免队列为空时，一直反复运行该进程，导致一直占用临界区，而不能加入新消息
            // 修改为每 1 秒进行一次匹配
            lck.unlock();   // 直接解锁临界区资源
            pool.match();   //调用 match()
            sleep(1);
        } else {
            auto task = message_queue.q.front();    // 取出消息队列队头元素
            message_queue.q.pop();
            lck.unlock();   // 临界区访问结束，直接解锁
            // 避免后续没用到临界区信息，而长时间占用临界区的情况发生
            
            if (task.type == "add") pool.add(task.user);
            else if (task.type == "remove") pool.remove(task.user);
            pool.match();
        } 
    }
}
int main(int argc, char **argv) {
  int port = 9090;
  ::std::shared_ptr<MatchHandler> handler(new MatchHandler());
  ::std::shared_ptr<TProcessor> processor(new MatchProcessor(handler));
  ::std::shared_ptr<TServerTransport> serverTransport(new TServerSocket(port));
  ::std::shared_ptr<TTransportFactory> transportFactory(new TBufferedTransportFactory());
  ::std::shared_ptr<TProtocolFactory> protocolFactory(new TBinaryProtocolFactory());
  TSimpleServer server(processor, serverTransport, transportFactory, protocolFactory);
  
  cout << "Start Match Server" << endl;
  
  thread matching_thread(consume_task); // 调用一个线程运行 consume_task
  server.serve();
  
  return 0;
}
```

##### Match_server:4.0
- `match_server`：随时间扩大匹配域，每一单位的 `wt` 会扩大 $50$ 分 的匹配域
```
// This autogenerated skeleton file illustrates how to build a server.
// You should copy it to another filename to avoid overwriting it.
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TTransportUtils.h>
#include "match_server/Match.h"
#include "save_client/Save.h"
#include <thrift/protocol/TBinaryProtocol.h>
#include <thrift/server/TSimpleServer.h>
#include <thrift/transport/TServerSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <unistd.h> // 用于调用 sleep 函数
#include<iostream>
#include <thread>               // 需要线程，引入头文件
#include <mutex>                // 互斥信号量
#include <condition_variable>   // 条件变量，用于 阻塞和唤醒 线程
#include <queue>                // 用于模拟消息队列
#include <vector>
using namespace ::apache::thrift;
using namespace ::apache::thrift::protocol;
using namespace ::apache::thrift::transport;
using namespace ::apache::thrift::server;
using namespace ::save_service;
using namespace  ::match_service;
using namespace std;
struct Task {   // 消息队列中的元素
    User user;
    string type;
};
struct MessageQueue {   // 消息队列
    queue<Task> q;          // 消息队列本体
    mutex m;                // 互斥信号量
    condition_variable cv;  // 条件变量，用于阻塞唤醒线程
}message_queue;
class Pool {    // 模拟匹配池
public:
    void save_result(int a, int b) {  // 记录成功匹配的信息
        printf("Match Result: %d %d \n", a, b);
        // Client端的板子
        std::shared_ptr<TTransport> socket(new TSocket("123.57.47.211", 9090));
        std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
        std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
        SaveClient client(protocol);
        try {
            transport->open();
            //调用接口，把信息存储 "数据存储服务器" 中
            int res = client.save_data("acs_4888", "07637c4c", a, b);
            //输出匹配结果
            if (!res) puts("success");
            else puts("fail");
            transport->close();
        } catch (TException& tx) {
            cout << "ERROR: " << tx.what() << endl;
        }
    }
    bool check_match(uint32_t i, uint32_t j) {
        auto a = users[i], b = users[j];
        
        int dt = abs(a.scores - b.scores);
        int a_max_dif = wt[i] * 50;
        int b_max_dif = wt[j] * 50;
        return dt <= a_max_dif && dt <= b_max_dif;
    }
    void match() {
       for (uint32_t i = 0; i < wt.size(); ++ i)
           wt[i] ++;
        while (users.size() > 1) {
            bool flag = true;
            for (uint32_t i = 0; i < users.size(); ++ i) {
                for (uint32_t j = i + 1; j < users.size(); ++ j) {
                    if (check_match(i, j)) {
                        auto a = users[i], b = users[j];
                        users.erase(users.begin() + j);
                        users.erase(users.begin() + i);
                        wt.erase(wt.begin() + j);
                        wt.erase(wt.begin() + i);
                        save_result(a.id, b.id);
                        flag = false;
                        break;
                    }
                    if (!flag) break;       
                }
            }
            if (flag) break;    // 一轮扫描后，发现没有能够匹配的用户，就停止扫描，等待下次调用
        }
    } 
    
    void add(User user) {   // 向匹配池中加入用户
        users.push_back(user);
        wt.push_back(0);
    }
    void remove(User user) {    // 向匹配池中删除用户
        for (uint32_t i = 0; i < users.size(); ++ i) {
            if (users[i].id == user.id) {
                users.erase(users.begin() + i);
                wt.erase(wt.begin() + i);
                break;
           }
        }
    }
private:
    vector<User> users; // 匹配池中的用户，用 vector 记录
    vector<int> wt; // 等待时间，单位：s
}pool;
class MatchHandler : virtual public MatchIf {
 public:
  MatchHandler() {
    // Your initialization goes here
  }
  int32_t add_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("add_user\n");
    
    unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
    message_queue.q.push({user, "add"});        // 把新消息加入消息队列
    message_queue.cv.notify_all();              // 唤醒阻塞的线程
    return 0;
  }
  int32_t remove_user(const User& user, const std::string& info) {
    // Your implementation goes here
    printf("remove_user\n");
    unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
    message_queue.q.push({user, "remove"});     // 把新消息加入消息队列
    message_queue.cv.notify_all();              // 唤醒阻塞的线程
   
    return 0;
  }
};
// 基于“生产者-消费者模型”的线程
void consume_task() {
    while(true) {
        unique_lock<mutex> lck(message_queue.m);    // 访问临界区（消息队列），先上锁
        if (message_queue.q.empty()) {
            // message_queue.cv.wait(lck); // 这里要阻塞进程
            // 避免队列为空时，一直反复运行该进程，导致一直占用临界区，而不能加入新消息
            // 修改为每 1 秒进行一次匹配
            lck.unlock();   // 直接解锁临界区资源
            pool.match();   //调用 match()
            sleep(1);
        } else {
            auto task = message_queue.q.front();    // 取出消息队列队头元素
            message_queue.q.pop();
            lck.unlock();   // 临界区访问结束，直接解锁
            // 避免后续没用到临界区信息，而长时间占用临界区的情况发生
            
            if (task.type == "add") pool.add(task.user);
            else if (task.type == "remove") pool.remove(task.user);
        } 
    }
}
int main(int argc, char **argv) {
  int port = 9090;
  ::std::shared_ptr<MatchHandler> handler(new MatchHandler());
  ::std::shared_ptr<TProcessor> processor(new MatchProcessor(handler));
  ::std::shared_ptr<TServerTransport> serverTransport(new TServerSocket(port));
  ::std::shared_ptr<TTransportFactory> transportFactory(new TBufferedTransportFactory());
  ::std::shared_ptr<TProtocolFactory> protocolFactory(new TBinaryProtocolFactory());
  TSimpleServer server(processor, serverTransport, transportFactory, protocolFactory);
  
  cout << "Start Match Server" << endl;
  
  thread matching_thread(consume_task); // 调用一个线程运行 consume_task
  server.serve();
  
  return 0;
}
```
#### Usage
```
# 启动服务端
./match_system/src/main

# 启动客户端
python3 game/src/client.py

# 游戏应用端 （op id name scores）
add 1 yxc 2000
add 2 xan 1500
add 3 zagy 2500
remove 3 zagy 2500

# 匹配系统服务器
add_user
add_user
remove_user 
# 等待了 10 s
Match Result: 1 2
success
```
#### 项目地址
- [Learning-Thrift](https://github.com/Xancoding/Learning-Thrift)
## Docker
- [Docker | AcWing Linux 基础课](https://www.acwing.com/blog/content/10878/)
- [Docker 入门教程 | 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
***
### Docker是什么？
> **Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,然后发布到任何流行的Linux或Windows操作系统的机器上**
### Docker常用命令
- `镜像（images）`
	1. `docker images`：列出本地所有镜像
	2. `docker image rm ubuntu:20.04`：删除镜像`ubuntu:20.04`
	3. `docker commit CONTAINER_NAME IMAGE_NAME:TAG`：创建某个`container`的镜像，`TAG` 为镜像标签，用以记录当前版本。
	4. `docker save -o ubuntu_20_04.tar ubuntu:20.04`：将镜像`ubuntu:20.04`导出到本地文件`ubuntu_20_04.tar`中
	5. `docker load -i ubuntu_20_04.tar`：将镜像`ubuntu:20.04`从本地文件`ubuntu_20_04.tar`中加载出来
- `容器(container)`
	1. `docker ps -a`：查看本地的所有容器
	2. `docker start CONTAINER`：启动容器
	3. `docker stop CONTAINER`：停止容器
	4. `docker restart CONTAINER`：重启容器
	5. `docker rm CONTAINER`：删除容器
	6. `docker run -p HOST_PORT:CONTAINER_PORT --name CONTAINER_NAME -itd IMAGE_NAME:TAG`：将创建并启动一个容器
		- `-p`：端口映射，将宿主机的端口和容器的端口进行映射
			- 例：`-p 20000:22 -p 8000:8000 -p 80:80 -p 443:443`
			- `22`：`ssh`登录服务端口
			- `8000`：`Django`调试端口
			- `80`：用于`HTTP`服务
			- `443`：用于`HTTPS`服务
	1. `docker attach CONTAINER`：进入容器
		- 先按`Ctrl-p`，再按`Ctrl-q`可以挂起容器


### Docker环境配置
1. `scp django_lesson_1_0.tar server`：将`docker压缩包`传至云服务器
2.  `ssh server`：免密登录至云服务器
3.  `docker load -i django_lesson_1_0.tar`：将`docker压缩包`解压缩成`docker镜像`
4.  `docker run -p 20000:22 8000:8000 --name django -itd django_lesson:1.0` ：利用 `镜像django_lesson:1.0` 创建一个命名为 `django` 的 `docker容器`并启动
5.  `docker attach my_docker_server`：进入创建的`docker容器`（服务器）
6.  `adduser acs`：创建`acs`用户
7.  `usermod -aG sudo acs`：为`acs`用户分配`sudo`权限
8.  `scp .bashrc .vimrc .tmux.conf django`：将本地服务器的`bash`&`vim`&`tmux`配置文件传至`docker 容器`
### Docker项目迁移
第一步，登录容器，关闭所有运行中的任务 

第二步，登录运行容器的服务器，然后执行：

```
docker commit CONTAINER_NAME django_lesson:1.1  # 将容器保存成镜像，将CONTAINER_NAME替换成容器名称
docker stop CONTAINER_NAME # 关闭容器
docker rm CONTAINER_NAME # 删除容器
```
### 增加容器的映射端口 : 80 与 443
> **给运行中的容器，开通端口，是一件非常麻烦的事情**
> 
> **一个比较好的解决方案 : 先把容器保存成镜像，再删掉容器，然后用镜像生成新的容器，同时打开需要的端口**

第一步，登录容器，关闭所有运行中的任务

第二步，登录运行容器的服务器，然后执行 :
```shell
docker commit CONTAINER_NAME django_lesson:1.1  # 将容器保存成镜像，将CONTAINER_NAME替换成容器名称
docker stop CONTAINER_NAME  # 关闭容器
docker rm CONTAINER_NAME # 删除容器

# 使用保存的镜像重新创建容器

docker run -p 20000:22 -p 8000:8000 -p 80:80 -p 443:443 --name CONTAINER_NAME -itd django_lesson:1.1
```
第三步，去云服务器控制台，在安全组配置中开放80和443端口




