## 实战小项目
实现一个 随机音乐播放器
[预览](http://htmlpreview.github.io/?https://github.com/AllenWalkerC/Music-player/blob/master/Music-player3/music-play3.html)可能会有些慢
源码直接看Music-player3文件夹里的就行了。
****
#### 2017.02.22
仅仅实现了基本功能，上一曲，下一曲，播放，暂停，进度条和音量条的拖动，音乐时间和进度条的同步是用setInterval实现的，但是它会一直执行，虽然时间和进度条的显示没有问题，还是觉得不好。暂时还没想到其他的方法。

[预览地址](http://htmlpreview.github.io/?https://github.com/AllenWalkerC/Music-player/blob/master/Music-player1/index.html)
****
#### 2017.03.10
实在是太懒了，很早就想改进上一个版本的，一直拖到现在。

新增:

   1. 歌词同步显示。

   2. 样式也完全改变了，上个版本太丑了。

   3. 支持切换音乐频道

上个版本的BUG：

   1. 上个版本的静音图标显示错误问题。

这个版本的不足之处是：

   1. 虽然使用了构造函数的写法，代码还是写的有些乱，自己写着写着都晕了。

   2. 对网络略差的同学可能体验不是很好。

   3. 歌词同步滚动虽然实现了，但是无法让使用者自由的滚动歌词。

   4. 代码的注释也没写好，明天再搞！！！！！！
   
   ps:如果狂点切歌或切换频道会出现各种各样的错误。。。。。。
   
[预览地址](http://htmlpreview.github.io/?https://github.com/AllenWalkerC/Music-player/blob/master/Music-player2/music%20play2.html)

****
#### 2017.03.10

修复

疯狂点击切换歌曲和切换频道歌词错乱BUG，解决办法每当歌词到来就清除上一首的歌词，本来想用延迟阻止用户点击，但是觉得获取歌曲太慢了。
[预览地址](http://htmlpreview.github.io/?https://github.com/AllenWalkerC/Music-player/blob/master/Music-player2/music%20play2.html) 

#### 2017.03.20

这个版本改进了外观，基本就这样了。
[预览](http://htmlpreview.github.io/?https://github.com/AllenWalkerC/Music-player/blob/master/Music-player3/music-play3.html)
