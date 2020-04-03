// import barba from '@barba/core'
// import gsap from 'gsap'

// console.log(window.location.href)
// const manual = true
// if ('scrollRestoration' in history && manual) {
//   history.scrollRestoration = 'manual'
//   console.log('history scroll restoration to manual')
// } else {
//   console.log('history scroll restoration to default')
// }

// const barbaOptions = {
//   debug: true,
//   transitions: [
//     {
//       leave({current, next, trigger}) {
//         var done = this.async()
//         gsap.to(current.container, {
//           duration: 1,
//           opacity: 0,
//           onStart: function() {
//             console.log('started leave')
//           },
//           onComplete: function() {
//             observePostList()
//             console.log('completed leave')
//           }
//         })
//         done()
//       },
//       enter({current, next, trigger}) {
//         var done = this.async()
//         window.scrollTo(0, 0)
//         observePostList()

//         gsap.fromTo(
//           next.container,
//           {opacity: 0},
//           {
//             duration: 1,
//             opacity: 1,
//             onStart: function() {
//               console.log('started enter')
//             },
//             onComplete: function() {
//               console.log('completed enter')
//             }
//           }
//         )
//         done()
//       }
//     }
//   ]
// }

// const addCSSTransitionClass = event => {
//   event.target.classList.add('on')
// }

// const removeCSSTransitionClass = event => {
//   event.target.classList.remove('on')
// }

// const observePostList = () => {
//   let posts = document.getElementsByClassName('io-post--link')
//   for (let i = 0; i < posts.length; i++) {
//     posts[i].classList.add('opacity-0');
//     posts[i].addEventListener('mouseenter', ev => addCSSTransitionClass(ev))
//     posts[i].addEventListener('mouseleave', ev => removeCSSTransitionClass(ev))
//     io.observe(posts[i])
//   }
// }

// const removePostList = () => {
//   for (let i = 0; i < posts.length; i++) {
//     posts[i].removeEventListener('mouseenter', ev => addCSSTransitionClass(ev))
//     posts[i].removeEventListener('mouseleave', ev =>
//       removeCSSTransitionClass(ev)
//     )
//     io.disconnect()
//   }
// }
