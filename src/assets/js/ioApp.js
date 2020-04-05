// export const ioApp = () => {
//   const addCSSTransitionClass = event => {
//     event.target.classList.add('on')
//   }
  
//   const removeCSSTransitionClass = event => {
//     event.target.classList.remove('on')
//   }
  
//   const observePostList = () => {
//     let posts = document.getElementsByClassName('io-post--link')
//     for (let i = 0; i < posts.length; i++) {
//       posts[i].classList.add('opacity-0')
//       posts[i].addEventListener('mouseenter', ev => addCSSTransitionClass(ev))
//       posts[i].addEventListener('mouseleave', ev => removeCSSTransitionClass(ev))
//       io.observe(posts[i])
//     }
//   }
  
//   const removePostList = () => {
//     for (let i = 0; i < posts.length; i++) {
//       posts[i].removeEventListener('mouseenter', ev => addCSSTransitionClass(ev))
//       posts[i].removeEventListener('mouseleave', ev =>
//         removeCSSTransitionClass(ev)
//       )
//       io.disconnect()
//     }
//   }
  
//   // Intersection observer
//   const ioCallback = (entries, io) => {
//     entries.forEach(entry => {
//       gsap.fromTo(
//         entry.target,
//         {opacity: 0},
//         {
//           duration: 0.6,
//           opacity: 1,
//           onStart: function() {
//             console.log('started enter')
//           },
//           onComplete: function() {
//             console.log('completed enter')
//           }
//         }
//       )
//     })
//   }
  
//   const ioOptions = {
//     thresholds: [0, 0.33, 0.76, 1]
//   }
//   const io = new IntersectionObserver(ioCallback, ioOptions)
// }