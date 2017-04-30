/**
 * @todo:
 * - add random pieces
 * - check support translateZ
 * - add effect box shadow
 */
// const anime = require('animejs')

class SegmentEffect {
  constructor(el, opts) {
    this.el = el
    this.opts = this.getOptions(opts)
    this.init()
  }

  getOptions (opts) {
    const baseOpts = {
      pieces: 4,
      positions: 'random',
      zoom: 160,
      easing: 'easeOutCubic',
      duration: 20000,
      onAnimated () {}
    }
    return Object.assign(baseOpts, opts)
  }

  init () {
    this.el.innerHTML = ''

    const imgUrl = this.el.style.backgroundImage || getComputedStyle(this.el).backgroundImage
    this.imgsrc = imgUrl.replace('url(','').replace(')','').replace(/\"/gi, "")

    let image = new Image()
    image.onload = initElement.bind(this)
    image.src = this.imgsrc

    function initElement () {
      let $wrapper = document.createElement('div')
      $wrapper.className = 'segment-wrapper'
      Object.assign($wrapper.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })

      let $wrappperInnerHtml = ''
      $wrappperInnerHtml += '<div class="segment-mask" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 22; perspective: 400px; -webkit-perspective: 400px; perspective-origin: 50% 50%; -webkit-perspective-origin: 50% 50%">'

      let piecesLength = this.opts.pieces
      for (let i = 0; i < piecesLength; i++) {
        let top = this.opts.positions[i].top
        let left = this.opts.positions[i].left
        let width = this.opts.positions[i].width
        let height = this.opts.positions[i].height
        $wrappperInnerHtml += '<div class="segment-fragment" style="transform: translateZ(1px); box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 30px 0px; background-size: cover; background-attachment: fixed; background-image: url(' + this.imgsrc + '); position: absolute; top: ' + top + '%; left: ' + left + '%; width: ' + width + '%; height: ' + height + '%"></div>'
      }
      $wrappperInnerHtml += '</div>'
      $wrapper.innerHTML = $wrappperInnerHtml

      this.el.appendChild($wrapper)
      this.fragments = this.el.querySelectorAll('.segment-fragment')
      this.animate()
    }
  }

  animate () {
    let animeProps = {
      targets: this.fragments,
      duration: this.opts.duration,
      translateZ: {
        value: this.opts.zoom,
        easing: this.opts.easing
      }
    }
    anime(animeProps)
  }
}

// module.exports = SegmentEffect
window.SegmentEffect = SegmentEffect
