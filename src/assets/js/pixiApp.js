import {storeInstance} from './store.js'
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

  app.loader.add('bunny', 'bunny.png').load((loader, resources) => {})

  const init = app.loader.onComplete.add(() => {
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
      console.log('store from PIXI', storeInstance.state.title)

      for (const child of container.children) {
        child.draw()
        child.move()
      }
      // window.addEventListener('resize', resize)
      // window.addEventListener('orientationchange', resize)
      canvasContainer.appendChild(app.view)

      storeInstance.subscribe(() => {
        for (const child of container.children) {
          child.toggle()
        }
      })
      app.ticker.add(() => {
        // if (
        //   !storeInstance.state.play &&
        //   container.children &&
        //   !container.children[0].isMoving
        // ) {
        //   // container.cacheAsBitmap = false
        //   console.log('play is on')
        //   for (const child of container.children) {
        //     child.move()
        //   }
        // } else if (
        //   storeInstance.state.play &&
        //   container.children &&
        //   container.children[0].isMoving
        // ) {
        //   // container.cacheAsBitmap = true
        //   console.log('play is off')
        //   for (const child of container.children) {
        //     child.stop()
        //   }
        // }
      })
    }

    init()
  }) // called once when the queued resources all load.
}
