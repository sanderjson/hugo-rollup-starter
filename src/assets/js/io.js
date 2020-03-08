// let ioCallback = (entries, io) => {
//   entries.forEach(entry => {
//     console.log(`New post ${entry.target.id} is ${entry.isIntersecting}`);

//     gsap.fromTo(
//       entry.target,
//       { opacity: 0 },
//       {
//         duration: 1,
//         opacity: 1,
//         onStart: function() {
//           // this.targets()[0].style.zIndex = '1'
//           console.log("started enter");
//         },
//         onComplete: function() {
//           // document.body.removeChild(this.targets()[0])
//           console.log("completed enter");
//         }
//       }
//     );
//   });
// };

// const ioOptions = {
//   thresholds: [0, 0.33, 0.66, 1]
// };
// const io = new IntersectionObserver(ioCallback, ioOptions);
