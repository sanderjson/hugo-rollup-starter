import barba from "@barba/core";
import { gsap } from "gsap";

// SCROLL ANIMATIONS
// let callback = (entries, observer) => {
//   entries.forEach(entry => {
//     // Each entry describes an intersection change for one observed
//     // target element:
//     //   entry.boundingClientRect
//     //   entry.intersectionRatio
//     //   entry.intersectionRect
//     //   entry.isIntersecting
//     //   entry.rootBounds
//     //   entry.target
//     //   entry.time
//   });
// };
let ioCallback = (entries, io) => {
  entries.forEach(entry => {
    console.log(`New post ${entry.target.id} is ${entry.isIntersecting}`);

    gsap.fromTo(
      entry.target,
      { opacity: 0 },
      {
        duration: 1,
        opacity: 1,
        onStart: function() {
          // this.targets()[0].style.zIndex = '1'
          console.log("started enter");
        },
        onComplete: function() {
          // document.body.removeChild(this.targets()[0])
          console.log("completed enter");
        }
      }
    );
  });
};

const ioOptions = {
  thresholds: [0, 0.33, 0.66, 1]
};
const io = new IntersectionObserver(ioCallback, ioOptions);

document.querySelectorAll(".post").forEach(post => io.observe(post));

// PAGE TRANSITIONS
gsap.registerPlugin(barba);

barba.init({
  debug: true,
  transitions: [
    {
      leave({ current, next, trigger }) {
        var done = this.async();
        gsap.to(current.container, {
          duration: 1,
          opacity: 0,
          onStart: function() {
            // this.targets()[0].style.zIndex = '1'
            console.log("started leave");
          },
          onComplete: function() {
            // document.body.removeChild(this.targets()[0])
            console.log("completed leave");
          }
        });
        done();
        // do something with `current.container` for your leave transition
        // then return a promise or use `this.async()`
      },
      enter({ current, next, trigger }) {
        var done = this.async();
        gsap.fromTo(
          next.container,
          { opacity: 0 },
          {
            duration: 1,
            opacity: 1,
            onStart: function() {
              // this.targets()[0].style.zIndex = '1'
              console.log("started enter");
            },
            onComplete: function() {
              // document.body.removeChild(this.targets()[0])
              console.log("completed enter");
            }
          }
        );
        done();
        // do something with `next.container` for your enter transition
        // then return a promise or use `this.async()`
      }
    }
  ]
});
