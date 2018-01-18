(function () {
  var VideoItem = {
    id: ['#media', '#loading-info-number', '#loading', '#mask', '#play-container', '#media-container','#play'],
    src: 'http://www.xyz.cn/special/2016/xyz/video/media.mp4',
    initVideo: function () {
      this.preVideo();
      this.endVideo();
    },
    flag: false,
    timer: null,
    last: -1,
    startDate: 0,
    showVideo: function () {
        var _this = this;
        setTimeout(function () {
            $(_this.id[3]).addClass('mask-visible');
            $(_this.id[4]).addClass('play-container-visible');
        }, 300);
        $(_this.id[0]).on('click',function () {
            setTimeout(function () {
                $(_this.id[0])[0].play();
                $(_this.id[0])[0].play();
                _this.flag = true;
            }, 0);
        });
        $(_this.id[0]).on('timeupdate',function (){
            if ($(_this.id[0])[0].currentTime >= $(_this.id[0])[0].duration) {
                setTimeout(function () {
                    window.location.href = './share.php';
                }, 0);
            }
            if (_this.flag === true) {
                $(_this.id[0])[0].play();
            }
        });
        $(_this.id[6]).on('click', function () {
            setTimeout(function () {
                $(_this.id[5]).addClass('media-container-visible');
                $(_this.id[0])[0].play();
                $(_this.id[0])[0].play();
                _this.flag = true;
                $(_this.id[0]).click();
            }, 100);
        });
    },
    canPlay: function () {
        var _this = VideoItem;
        $(_this.id[0])[0] && $(_this.id[0])[0].pause();
        $(_this.id[0])[0].removeEventListener("playing", _this.canPlay)
    },
    endLoad: function () {
        var _this = this;
        _this.flag = false;
        setTimeout(function () {
            _this.showVideo();
        }, 1000);
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
        if (current >= total || new Date() - _this.startDate > 1e3) {
            _this.progressAnimation(100);
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
      _this.startDate = new Date();
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
                  window.location.href = './share.php';
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
