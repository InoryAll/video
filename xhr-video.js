(function () {
  var VideoItem = {
    id: ['#media', '#loading-info-number', '#loading', '#mask', '#play-container', '#media-container','#play'],
    src: './source/media.mp4',
    initVideo: function () {
      this.playVideo();
      this.endVideo();
    },
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
            }, 300);
        });
    },
    preVideo: function () {
      var _this = this;
      function canPlay() {
          $(_this.id[0])[0].pause();
          $(_this.id[0])[0].removeEventListener("playing", canPlay)
      }

      function endLoad() {
        _this.showVideo();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
      }

      function transformData(video) {
          var loadedData = video.buffered.length > 0 ? video.buffered.end(0) : 0;
          loadedData = parseInt(1e3 * loadedData + 1) / 1e3;
          return loadedData;
      }

      function loading() {
          var current = transformData($(_this.id[0])[0]),
              total = $(_this.id[0])[0].duration;
          if (new Date() - startTime > timeout || current >= total || last === current) {
              endLoad();
          } else {
              last = current;
              timer = setTimeout(function() {
                  var target = parseInt(current/total*100);
                  _this.progressAnimation(target);
                  loading();
              }, 500);
          }
      }
      $(_this.id[0])[0].src = _this.src;
      var startTime = new Date(),
          timeout = 4e3,
          timer = null;
      $(_this.id[0])[0].play();
      $(_this.id[0])[0].addEventListener("playing", canPlay);
      var last = -1;
      loading();
    },
    playVideo: function () {
      var _this = this;
    if (-1 !== navigator.userAgent.indexOf("MiuiBrowser")) {
        _this.preVideo();
        $(_this.id[0])[0].className = "miui";
    } else {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", _this.src, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                if (200 === this.status && "video/mp4" === this.response.type) {
                    var res = this.response,
                        url = (window.URL || window.webkitURL || window || {}).createObjectURL(res);
                    $(_this.id[0]).attr('src', url);
                _this.showVideo();
            } else {
                    _this.preVideo();
                }
            };
            xhr.onprogress=function (e) {
                var target = parseInt(e.loaded/e.total*100);
                _this.progressAnimation(target);
            };
            xhr.onerror = function (e) {
                _this.preVideo();
            };
            xhr.send();
        }
    },
    endVideo: function () {
      $(this.id[0]).on('ended', function () {
        setTimeout(function () {
          window.location.href = './share.html';
        }, 300);
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
