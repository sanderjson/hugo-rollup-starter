// import * as PIXI from 'pixi.js'
export const pixiApp = () => {
  // register the plugin
  gsap.registerPlugin(PixiPlugin)
  PixiPlugin.registerPIXI(PIXI)

  const colors = ['#FF3D3D', '#FFC13D', '#A161CC', '#41C9CC', '#4489FF']
  const canvasContainer = document.getElementById('canvasContainer')
  let innerWidth = window.innerWidth
  let innerHeight = window.innerHeight
  let halfW = innerWidth / 2
  let halfH = innerHeight / 2

  const app = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    // backgroundColor: 0xfff000,
    transparent: true,
    // resolution: window.devicePixelRatio || 1,
    // autoDensiy: true,
    resizeTo: canvasContainer,

    // RENDER SETTINGS
    // circle res
    // antialias: true,
    // autoDensity: true, // !!!
    // resolution: 1.5,
  })

  // scroll on tap mobile
  app.renderer.plugins.interaction.autoPreventDefault = false
  app.renderer.view.style.touchAction = 'auto'

  // We stop Pixi ticker using stop() function because autoStart = false does NOT stop the shared ticker:
  // doc: http://pixijs.download/release/docs/PIXI.Application.html
  app.ticker.stop()

  // Now, we use 'tick' from gsap
  gsap.ticker.add(() => {
    app.ticker.update()
  })

  app.loader
    .add('bg', '../texture-portrait-690x1227.webp')
    .add('bunny', '../bunny.png')
    .load((loader, resources) => {
      const bg = PIXI.Sprite.from(resources.bg.texture)
      bg.anchor.set(0)
      // bg.x = app.screen.width
      // bg.y = app.screen.height / 2
      app.stage.addChild(bg)

      const bgMask = new PIXI.Graphics()
      bgMask.beginFill(0xff3300, 0.4)
      // drawRect (x, y, width, height)
      bgMask.drawRect(0, 0, innerWidth / 2, innerHeight)
      bgMask.endFill()
      app.stage.addChild(bgMask)

      bg.mask = bgMask

      const tlMaskTime = 2
      const tlMask = gsap
        .timeline({
          // yoyo: true,
          // repeat: -1,
        })
        .fromTo(
          bgMask,
          {
            pixi: {
              x: app.screen.width,
            },
            ease: 'sine',
          },
          {
            duration: tlMaskTime,
            pixi: {
              x: -app.screen.width,
            },
            ease: 'sine',
          }
        )
        .fromTo(
          bg,
          {
            pixi: {
              x: app.screen.width,
            },
            ease: 'sine',
          },
          {
            duration: (tlMaskTime * 4) / 5,
            pixi: {
              x: -app.screen.width,
            },
            ease: 'sine',
            delay: -tlMaskTime,
          }
        )

      const paused = () => {
        tlMask.paused(!tlMask.paused())
      }

      const play = () => {
        tlMask.play()
      }
      const reset = () => {
        tlMask.restart()
      }

      let throttled = false
      let delay = 250

      class pixiCircle extends PIXI.Graphics {
        constructor(radius) {
          super()
          this.lineStyle(0)
          this.isMoving = false
          this.radius = radius
          this.beginFill(0xffffff, 0.41)
          this.drawCircle(0, 0, radius)
          this.endFill()
          this.tint = Math.random() * 0xffffff
          this.tl = gsap.timeline({
            yoyo: true,
            repeat: -1,
            onComplete: () => {
              console.log('complete')
            },
          })
        }

        clear() {
          app.stage.removeChild(this)
        }

        draw() {
          this.x = innerWidth - 4 * this.radius * Math.random()
          this.y = innerHeight - 4 * this.radius * Math.random()
        }

        move() {
          this.isMoving = true
          // let time = this.radius - 2.6 * Math.random()
          let time = 0.5

          this.tl.to(this, time, {
            pixi: {
              y: innerHeight - 400,
            },
          })
        }

        stop() {
          this.isMoving = false
          // let time = this.radius - 2.6 * Math.random()
          let time = 0.5

          this.tl.pause()
        }

        toggle() {
          // this.isMoving = false
          // // let time = this.radius - 2.6 * Math.random()
          // let time = 0.5

          this.tl.paused(!this.tl.paused())
        }
      }

      const resize = () => {
        if (!throttled) {
          innerWidth = window.innerWidth
          innerHeight = window.innerHeight
          circleClass.clear()
          circleClass.draw()
          throttled = true
          setTimeout(function () {
            throttled = false
          }, delay)
        }
      }

      const clearStage = () => {
        app.stage.removeChildren()
      }

      const init = () => {
        let container = new PIXI.Container()

        const circles = []
        for (let i = 0; i < 5; i++) {
          let circle
          let radius = 100 * Math.random() + 5
          circle = new pixiCircle(radius)
          container.addChild(circle)
        }

        app.stage.addChild(container)

        for (const child of container.children) {
          child.draw()
          child.move()
        }
        // window.addEventListener('resize', resize)
        // window.addEventListener('orientationchange', resize)
        canvasContainer.appendChild(app.view)

        // test custom event listener
        document.addEventListener('togglePause', (e) => {
          paused()
        })

        document.addEventListener('reset', (e) => {
          reset()
        })

        app.ticker.add(() => {})
      }

      init()
    })

  const init = app.loader.onComplete.add(() => {}) // called once when the queued resources all load.
}
