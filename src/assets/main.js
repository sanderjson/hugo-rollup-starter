import barba from '@barba/core'
import gsap from 'gsap'
// import * as PIXI from 'pixi.js';

console.log(window.location.href)
const manual = true
if ('scrollRestoration' in history && manual) {
  history.scrollRestoration = 'manual'
  console.log('history scroll restoration to manual')
} else {
  console.log('history scroll restoration to default')
}

const barbaOptions = {
  debug: true,
  transitions: [
    {
      leave({current, next, trigger}) {
        var done = this.async()
        gsap.to(current.container, {
          duration: 1,
          opacity: 0,
          onStart: function() {
            console.log('started leave')
          },
          onComplete: function() {
            observePostList()
            console.log('completed leave')
          }
        })
        done()
      },
      enter({current, next, trigger}) {
        var done = this.async()
        window.scrollTo(0, 0)
        observePostList()

        gsap.fromTo(
          next.container,
          {opacity: 0},
          {
            duration: 1,
            opacity: 1,
            onStart: function() {
              console.log('started enter')
            },
            onComplete: function() {
              console.log('completed enter')
            }
          }
        )
        done()
      }
    }
  ]
}

const addCSSTransitionClass = event => {
  event.target.classList.add('on')
}

const removeCSSTransitionClass = event => {
  event.target.classList.remove('on')
}

const observePostList = () => {
  let posts = document.getElementsByClassName('io-post--link')
  for (let i = 0; i < posts.length; i++) {
    posts[i].classList.add('opacity-0')
    posts[i].addEventListener('mouseenter', ev => addCSSTransitionClass(ev))
    posts[i].addEventListener('mouseleave', ev => removeCSSTransitionClass(ev))
    io.observe(posts[i])
  }
}

const removePostList = () => {
  for (let i = 0; i < posts.length; i++) {
    posts[i].removeEventListener('mouseenter', ev => addCSSTransitionClass(ev))
    posts[i].removeEventListener('mouseleave', ev =>
      removeCSSTransitionClass(ev)
    )
    io.disconnect()
  }
}

// Intersection observer
const ioCallback = (entries, io) => {
  entries.forEach(entry => {
    gsap.fromTo(
      entry.target,
      {opacity: 0},
      {
        duration: 0.6,
        opacity: 1,
        onStart: function() {
          console.log('started enter')
        },
        onComplete: function() {
          console.log('completed enter')
        }
      }
    )
  })
}

const ioOptions = {
  thresholds: [0, 0.33, 0.76, 1]
}
const io = new IntersectionObserver(ioCallback, ioOptions)

window.addEventListener('load', event => {
  observePostList()
  barba.init(barbaOptions)
})

//
// PixiJS
//
const canvasContainer = document.getElementById('canvasContainer')
const innerWidth = document.documentElement.clientWidth
const innerHeight = document.documentElement.clientHeight

const app = new PIXI.Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0xffffff,
  // resolution: window.devicePixelRatio || 1,
  // autoDensiy: true,
  resizeTo: canvasContainer
})

// scroll on tap mobile
app.renderer.plugins.interaction.autoPreventDefault = false
app.renderer.view.style.touchAction = 'auto'

app.loader.add('bunny', 'bunny.png').load((loader, resources) => {
  let bunny

  const setupBunny = () => {
    bunny = new PIXI.Sprite(resources.bunny.texture)
    bunny.anchor.x = 0.5
    bunny.anchor.y = 0.5
  }

  const drawBunny = () => {
    bunny.x = innerWidth / 2
    bunny.y = innerHeight / 2
    app.stage.addChild(bunny)
  }

  const resize = () => {
    drawBunny()
  }

  const init = () => {
    setupBunny()
    drawBunny()
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)
    canvasContainer.appendChild(app.view)
  }

  if (window) {
    init()
  }

  app.ticker.add(() => {
    bunny.rotation += 0.1
  })
})
