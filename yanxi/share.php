<?php
require_once "../wshare/jssdk.php";
$jssdk = new JSSDK("wxd3a7714f3a9f9675", "5db7f79eabe9bcc7ff28e3dbc9b3b4d9");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>一切要从那条朋友圈说起</title>
    <link rel="stylesheet" href="css/common.css"/>
    <script type="text/javascript" src="js/zepto.min.js"></script>
    <script type="text/javascript" src="js/flexible.js"></script>
</head>
    <body>
        <div class="button-container">
            <a href="https://m.xyz.cn/" class="button">点击去看看</a>
            <div class="button-border"></div>
        </div>
        <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
          Zepto(function($){
            var shareTitle = '分享标题';
            var sharedes = '分享描述';
            wx.config({
              debug: false,//调试模式
              appId: '<?php echo $signPackage["appId"];?>',// </span><span style="font-family:Georgia, Times New Roman, Times, sans-serif;color:#333333;">
              timestamp: <?php echo $signPackage["timestamp"];?>,//生成签名的时间戳
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',//生成签名的随机串
              signature: '<?php echo $signPackage["signature"];?>',

              jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline']// 所有要调用的 API 都要加到这个列表中
          });
            wx.ready(function() {
              wx.onMenuShareAppMessage({ //分享给朋友
                title: shareTitle, // 分享标题,可在控制器端传递
                desc: sharedes,//分享的描述，可在控制器端传递

                link: 'http://wixinxyz.vemic.com/own/bonus/', // 分享链接，可在控制器端传递
                imgUrl: 'http://wixinxyz.vemic.com/own/wshare/share.jpg', // 分享图标 ，可在控制器端传递
                success: function() {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });

              wx.onMenuShareTimeline({ //分享到朋友圈
                title: shareTitle,
                desc: sharedes,

                link: 'http://wixinxyz.vemic.com/own/bonus/', // 分享链接
                imgUrl: 'http://wixinxyz.vemic.com/own/caiyun/images/cai.png', // 分享图标
                success: function() {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });
            });
          });
        </script>
    </body>
</html>

