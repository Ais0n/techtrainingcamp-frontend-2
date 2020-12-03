# 简介

本项目是字节跳动前端训练营**第2组**的项目代码

我们实现了一个操作简单、动画流畅、可以支持多人游戏并能够同步状态的2048游戏

完成日期：2020年12月3日

## 组员及分工

黄彦玮（组长，游戏逻辑）

王钧池（服务器、动画）

张淳鑫（界面设计、多人游戏页面）

张平（后端）



# 使用方法

注意：前端部分在`master`分支，后端部分在`gameserver`分支

1. 安装node.js
2. `git clone` 本项目
3. `git checkout gameserver`，将文件夹拷贝一份到一个新建的目录，在该目录下运行cmd，输入`npm install`，然后输入`node server.js`启动服务器
4. 在本项目的目录下执行`git checkout master`，在cmd中输入`yarn start`，等待片刻后游戏将会运行在3000端口
5. 访问`localhost:3000`，打开两个页面，选择模式、输入昵称后点击`start`，即可开始游戏
6. 游戏过程中按键盘上的上下左右键进行操作



# Contribution Process

1. git checkout to create a branch different from master.

2. Add new features / fix bugs in the newly-created branch.

3. Push changes to remote repo on own account, pushing the new branch as well.

4. Create new PR to master.

5. Wait till PR was reviewed by maintainer.

6. If PR was rejected, jump to step 2.


