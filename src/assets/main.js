import barba from '@barba/core'
import gsap from 'gsap'
import {pixiApp} from './js/pixiApp.js'

// current slug
// console.log(window.location.href)

//
// button handlers
//
const buttonHomePause = document.getElementById('home-button-pause')
const buttonHomeReset = document.getElementById('home-button-reset')

const eventPause = new Event('togglePause', {})
const eventReset = new Event('reset', {})

buttonHomePause.addEventListener('click', () => {
  document.dispatchEvent(eventPause)
})

buttonHomeReset.addEventListener('click', () => {
  document.dispatchEvent(eventReset)
})

//
// barba options
//
const barbaOptions = {
  debug: true,
  transitions: [
    {
      name: 'home',
      leave({current, next, trigger}) {
        var done = this.async()
        const header = document.getElementById('header')
        console.log(header)
        gsap.to(current.container, {
          duration: 1,
          opacity: 0,
          onStart: function () {
            // removePostList()
            console.log('started leave')
            document.dispatchEvent(eventReset)
          },
          onComplete: function () {
            console.log('completed leave')
          },
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
            onStart: function () {
              console.log('started enter')
            },
            onComplete: function () {
              console.log('completed enter')
            },
          }
        )
        done()
      },
    },
  ],
}

//
// posts class add
//
const addCSSTransitionClass = (event) => {
  event.target.classList.add('on')
}

const removeCSSTransitionClass = (event) => {
  event.target.classList.remove('on')
}

const observePostList = () => {
  let posts = document.getElementsByClassName('io-post--link')
  for (let i = 0; i < posts.length; i++) {
    posts[i].setAttribute('style', 'opacity: 0;')
    posts[i].addEventListener('mouseenter', (ev) => addCSSTransitionClass(ev))
    posts[i].addEventListener('mouseleave', (ev) =>
      removeCSSTransitionClass(ev)
    )
    io.observe(posts[i])
  }
  // console.log('posts', posts)
}

const removePostList = () => {
  for (let i = 0; i < posts.length; i++) {
    posts[i].removeEventListener('mouseenter', (ev) =>
      addCSSTransitionClass(ev)
    )
    posts[i].removeEventListener('mouseleave', (ev) =>
      removeCSSTransitionClass(ev)
    )
    io.disconnect()
  }
}

//
// DEMO
//
const observeDemo = () => {
  let items = document.getElementsByClassName('demo')
  for (let i = 0; i < items.length; i++) {
    io.observe(items[i])
  }
  // console.log('demos', items)
}

//
// Intersection observer
//
const ioOptions = {
  root: null,
  rootMargin: '0px 0px',
  // thresholds: [0, 0.33, 0.76, 1],
  thresholds: [0.33],
}

// const ioHandleIntersect = (entries) => {
//   for (const entry of entries) {
//     let red = entry.target.children[1]
//     if (entry.isIntersecting) {
//       console.log(entry)
//       gsap.to(red, {
//         duration: 0.6,
//         opacity: 1,
//         y: -40,
//         onStart: function () {},
//         onComplete: function () {},
//       })
//     } else {
//       gsap.to(red, {
//         duration: 0.6,
//         opacity: 0,
//         y: 40,
//       })
//     }
//   }
// }

const observerElements = document.getElementsByClassName('wrapper')
console.log('getElementsByClassName', observerElements)

const observerOptions = {
  root: null,
  rootMargin: '0px 0px',
  threshold: 0,
}

for (const el of observerElements) {
  const box = el.querySelector('.child')
  el.tl = gsap.timeline({paused: true})

  el.tl.to(box, 1, {y: -180, ease: Linear.easeNone})

  el.observer = new IntersectionObserver((entry) => {
    if (entry[0].intersectionRatio > 0) {
      gsap.ticker.add(el.progressTween)
    } else {
      gsap.ticker.remove(el.progressTween)
    }
  }, observerOptions)

  el.progressTween = () => {
    //       parallax calculations
    const scrollPosition = window.scrollY + window.innerHeight
    const elPosition = scrollPosition - el.offsetTop
    const durationDistance = window.innerHeight + el.offsetHeight
    const currentProgress = elPosition / durationDistance
    el.tl.progress(currentProgress)
  }

  el.observer.observe(el)
}

//
// init
//
// const io = new IntersectionObserver(ioHandleIntersect, ioOptions)
const canvasContainer = document.getElementById('canvasContainer')
window.addEventListener('load', (event) => {
  if (canvasContainer) {
    pixiApp()
  }
  // observePostList()
  // observeDemo()
  barba.init(barbaOptions)
})
