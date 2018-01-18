(function () {
  var VideoItem = {
    id: ['#media', '#loading-info-number', '#loading', '#mask', '#play-container', '#media-container','#play'],
    src: 'http://vliveachy.tc.qq.com/vhot2.qqvideo.tc.qq.com/A55NCC7KIrwQWJGAw6P_IGUSHCDJwoph0hOmrIFYQogk/z1332h2vsaz.p712.1.mp4?sdtfrom=v1001&type=mp4&vkey=8C5B88CFAF191949BA87C1A98ACC2EE615D95B33B6ED919D42E6F196D20D5845CE833A9FD0ED638C81F7688CCAB0351A01B92FD35ED983E789576D56C3DCC3C3C633114B62E3CF8EC799458E01E49CD012CBF588447669E94BCD6098A60F444FB9C6B98A58BDB36045AA50ACB3D64DC315C5AE67177D6D02',
    initVideo: function () {
      this.preVideo();
      this.endVideo();
    },
    flag: false,
    timer: null,
    last: -1,
    showVideo: function () {
        var _this = this;
        setTimeout(function () {
            $(_this.id[3]).addClass('mask-visible');
            $(_this.id[4]).addClass('play-container-visible');
        }, 300);
        $(_this.id[6]).on('click', function () {
            setTimeout(function () {
                $(_this.id[5]).addClass('media-container-visible');
                $(_this.id[0])[0].play();
                _this.flag = true;
            }, 300);
        });
    },
    canPlay: function () {
        var _this = VideoItem;
        $(_this.id[0])[0] && $(_this.id[0])[0].pause();
        $(_this.id[0])[0].removeEventListener("playing", _this.canPlay)
    },
    endLoad: function endLoad() {
        var _this = this;
        _this.flag = false;
        _this.showVideo();
        if (_this.timer !== null) {
            clearTimeout(_this.timer);
            _this.timer = null;
        }
    },
    transformData: function (video) {
        var loadedData = video.buffered.length > 0 ? video.buffered.end(0) : 0;
        video.currentTime = loadedData;
        loadedData = parseInt(1e3 * loadedData + 1) / 1e3;
        return loadedData;
    },
    loading: function () {
        var _this = this;
        var current = _this.transformData($(_this.id[0])[0]),
            total = $(_this.id[0])[0].duration;
        var target = parseInt(current/total*100);
        _this.progressAnimation(target);
        if (current >= total) {
            _this.endLoad(_this.timer);
        } else {
            _this.last = current;
            _this.timer = setTimeout(function() {
                _this.loading();
            }, 500);
        }
    },
    preVideo: function () {
      var _this = this;
      $(_this.id[0])[0].src = _this.src;
      $(_this.id[0])[0].play();
      $(_this.id[0])[0].addEventListener("playing", _this.canPlay);
      _this.loading();
    },
    endVideo: function () {
        var _this = this;
      $(this.id[0]).on('ended', function () {
          if (_this.flag === true) {
              setTimeout(function () {
                  window.location.href = './share.html';
              }, 300);
          }
          _this.flag = false;
      });
    },
    progressAnimation: function (target) {
      var start = 0;
      var _this = this;
      var timer = setInterval(function () {
        start = parseInt($(_this.id[1]).html());
        if (start < target) {
          start++;
          $(_this.id[1]).html(start);
        } else {
          clearInterval(timer);
          return true;
        }
      },0);
    }
  };
  Zepto(function ($) {
    VideoItem.initVideo();
  });
})();
