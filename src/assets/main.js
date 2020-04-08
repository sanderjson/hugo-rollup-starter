import barba from '@barba/core'
import gsap from 'gsap'
import {pixiApp} from './js/pixiApp.js'
import {storeInstance} from './js/store.js'

console.log(window.location.href)

// listeners
// const buttonHome1 = document.getElementById('home-button-1')

// buttonHome1.addEventListener('click', () => {
//   storeInstance.dispatch('togglePlayAction')
//   console.log('this will toggle play', storeInstance.state.play)
// })

// const buttonHome2 = document.getElementById('home-button-2')

// buttonHome2.addEventListener('click', () => {
//   storeInstance.dispatch('updateTitle', {
//     text: 'The new text for the title',
//   })
//   console.log('this is the current state of play', storeInstance.state.play)
// })

const buttonHome = document.getElementById('home-button')

buttonHome.addEventListener('click', () => {
  storeInstance.dispatch('togglePlayAction')
  console.log('this is the current state of play', storeInstance.state.play)
})

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

// Intersection observer
const ioOptions = {
  root: null,
  rootMargin: '0px 0px',
  // thresholds: [0, 0.33, 0.76, 1],
  thresholds: [0.33],
}

const ioHandleIntersect = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      gsap.to(entry.target, {
        duration: 1.2,
        opacity: 1,
        onStart: function () {},
        onComplete: function () {},
      })
    } else {
      gsap.to(entry.target, {
        duration: 0.6,
        opacity: 0,
      })
    }
  }
}

const io = new IntersectionObserver(ioHandleIntersect, ioOptions)
const canvasContainer = document.getElementById('canvasContainer')
window.addEventListener('load', (event) => {
  if (canvasContainer) {
    pixiApp()
  }
  observePostList()
  barba.init(barbaOptions)
})
