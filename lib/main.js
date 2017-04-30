'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @todo:
 * - add random pieces
 * - check support translateZ
 * - add effect box shadow
 */
var anime = require('animejs');

var SegmentEffect = function () {
  function SegmentEffect(el, opts) {
    _classCallCheck(this, SegmentEffect);

    this.el = el;
    this.opts = this.getOptions(opts);
    this.init();
  }

  _createClass(SegmentEffect, [{
    key: 'getOptions',
    value: function getOptions(opts) {
      var baseOpts = {
        pieces: 4,
        positions: 'random',
        zoom: 160,
        easing: 'easeOutCubic',
        duration: 20000,
        onAnimated: function onAnimated() {}
      };
      return Object.assign(baseOpts, opts);
    }
  }, {
    key: 'init',
    value: function init() {
      this.el.innerHTML = '';

      var imgUrl = this.el.style.backgroundImage || getComputedStyle(this.el).backgroundImage;
      this.imgsrc = imgUrl.replace('url(', '').replace(')', '').replace(/\"/gi, "");

      var image = new Image();
      image.onload = initElement.bind(this);
      image.src = this.imgsrc;

      function initElement() {
        var $wrapper = document.createElement('div');
        $wrapper.className = 'segment-wrapper';
        Object.assign($wrapper.style, {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        });

        var $wrappperInnerHtml = '';
        $wrappperInnerHtml += '<div class="segment-mask" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 22; perspective: 400px; -webkit-perspective: 400px; perspective-origin: 50% 50%; -webkit-perspective-origin: 50% 50%">';

        var piecesLength = this.opts.pieces;
        for (var i = 0; i < piecesLength; i++) {
          var top = this.opts.positions[i].top;
          var left = this.opts.positions[i].left;
          var width = this.opts.positions[i].width;
          var height = this.opts.positions[i].height;
          $wrappperInnerHtml += '<div class="segment-fragment" style="transform: translateZ(1px); box-shadow: rgba(0, 0, 0, 0.498039) 5px 5px 30px 0px; background-size: cover; background-attachment: fixed; background-image: url(' + this.imgsrc + '); position: absolute; top: ' + top + '%; left: ' + left + '%; width: ' + width + '%; height: ' + height + '%"></div>';
        }
        $wrappperInnerHtml += '</div>';
        $wrapper.innerHTML = $wrappperInnerHtml;

        this.el.appendChild($wrapper);
        this.fragments = this.el.querySelectorAll('.segment-fragment');
        this.animate();
      }
    }
  }, {
    key: 'animate',
    value: function animate() {
      var animeProps = {
        targets: this.fragments,
        duration: this.opts.duration,
        translateZ: {
          value: this.opts.zoom,
          easing: this.opts.easing
        }
      };
      anime(animeProps);
    }
  }]);

  return SegmentEffect;
}();

module.exports = SegmentEffect;
