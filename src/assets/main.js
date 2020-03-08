console.log("barba", barba);
console.log("gsap", gsap);

console.log(window.location.href);
const manual = true;
if ("scrollRestoration" in history && manual) {
  history.scrollRestoration = "manual";
  console.log("history scroll restoration to manual");
} else {
  console.log("history scroll restoration to default");
}

const barbaOptions = {
  debug: true,
  transitions: [
    {
      leave({ current, next, trigger }) {
        var done = this.async();
        gsap.to(current.container, {
          duration: 1,
          opacity: 0,
          onStart: function() {
            console.log("started leave");
          },
          onComplete: function() {
            console.log("completed leave");
          }
        });
        done();
      },
      enter({ current, next, trigger }) {
        var done = this.async();
        window.scrollTo(0, 0);
        observePostList();

        gsap.fromTo(
          next.container,
          { opacity: 0 },
          {
            duration: 1,
            opacity: 1,
            onStart: function() {
              console.log("started enter");
            },
            onComplete: function() {
              console.log("completed enter");
            }
          }
        );
        done();
      }
    }
  ]
};

const ioCallback = (entries, io) => {
  entries.forEach(entry => {
    gsap.fromTo(
      entry.target,
      { opacity: 0 },
      {
        duration: 1.8,
        opacity: 1,
        onStart: function() {
          console.log("started enter");
        },
        onComplete: function() {
          console.log("completed enter");
        }
      }
    );
  });
};

const ioOptions = {
  thresholds: [0, 0.33, 0.76, 1]
};
const io = new IntersectionObserver(ioCallback, ioOptions);

const observePostList = () => {
  document.querySelectorAll(".post").forEach(post => {
    io.observe(post);
  });
};

window.addEventListener("load", event => {
  observePostList();
  barba.init(barbaOptions);
});
