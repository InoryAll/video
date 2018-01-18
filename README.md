# video
&lt;video> api usage and attention.
  
关于video的api的各个注意点以及坑.

其中包含两种视频缓冲的实现方式

1. 通过新的h5的API中的buffer的属性来进行，同时配合使用currentTime.
2. 通过xhr的方法去实现，利用xhr的blob去读取二进制流实现的文件读入，然后监听事件，例如progress等.

问题注意：

1. 各个浏览器的区别
2. pc与mobile的差异区别
3. 微信中的浏览器的问题的差异
4. 不同系统下的差异，Ios以及Android 