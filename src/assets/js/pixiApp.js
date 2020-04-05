export const pixiApp = () => {
  // register the plugin
  gsap.registerPlugin(PixiPlugin)
  // give the plugin a reference to the PIXI object
  PixiPlugin.registerPIXI(PIXI)

  const colors = ['#FF3D3D', '#FFC13D', '#A161CC', '#41C9CC', '#4489FF']
  const canvasContainer = document.getElementById('canvasContainer')
  let innerWidth = document.documentElement.clientWidth
  let innerHeight = document.documentElement.clientHeight
  let halfW = innerWidth / 2
  let halfH = innerHeight / 2

  const app = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    // backgroundColor: 0xfff000,
    transparent: true,
    // resolution: window.devicePixelRatio || 1,
    // autoDensiy: true,
    resizeTo: canvasContainer
  })

  // scroll on tap mobile
  app.renderer.plugins.interaction.autoPreventDefault = false
  app.renderer.view.style.touchAction = 'auto'

  // We stop Pixi ticker using stop() function because autoStart = false does NOT stop the shared ticker:
  // doc: http://pixijs.download/release/docs/PIXI.Application.html
  // app.ticker.stop()

  // Now, we use 'tick' from gsap
  // gsap.ticker.add(() => {
  //   app.ticker.update()
  // })

  app.loader.add('bunny', 'bunny.png').load((loader, resources) => {
    let throttled = false
    let delay = 250
    let sprite
    let layer

    // init graphics

    // const setupSprite = () => {
    //   sprite = new PIXI.Sprite(resources.bunny.texture)
    //   sprite.anchor.x = 0.5
    //   sprite.anchor.y = 0.5
    //   return sprite
    // }

    // const drawSprite = () => {
    //   sprite.x = innerWidth / 2
    //   sprite.y = innerHeight / 2
    //   app.stage.addChild(sprite)
    // }

    // const drawChildren = () => {
    //   drawSprite()
    //   textWrite()
    //   drawRectangle()
    // }

    // const clearStage = () => {
    //   app.stage.removeChildren()
    // }

    // const resize = () => {
    //   if (!throttled) {
    //     innerWidth = document.documentElement.clientWidth
    //     innerHeight = document.documentElement.clientHeight
    //     clearStage()
    //     drawChildren()
    //     throttled = true
    //     setTimeout(function() {
    //       throttled = false
    //     }, delay)
    //   }
    // }

    const drawRectangle = (color, i) => {
      let rect = new PIXI.Graphics()

      let width = 20
      let offset = width * i
      rect.beginFill(`0xFFFFFF`)
      // rect.beginFill(`0x${color.substring(1)}`)
      rect.drawRect(
        innerWidth / 2 - offset / 2 - width / 2,
        innerHeight / 2 - offset / 2 - width / 2,
        width + offset,
        width + offset
      )
      rect.endFill()
      return rect
    }

    const drawRectangleSet = () => {
      let rectSet = []
      for (let i = 20; i > 0; i--) {
        let color = colors[i % 5]
        let graphics = drawRectangle(color, i)
        rectSet.push(graphics)
        app.stage.addChild(graphics)
      }
      return rectSet
    }

    const animateRectangleSet = set => {
      const myFunction = () => {
        console.log('complete')
      }
      var tl = gsap.timeline({
        yoyo: true,
        repeat: -1,
        onComplete: myFunction
      })
      let time = 2.0

      tl.from([...set], time, {
        pixi: {
          scaleX: 5,
          rotation: 15,
          tint: 'black'
        },
        stagger: {
          amount: 1.5
          // grid: "auto",
          // from: "center"
        }
      })

      tl.to([...set], time, {
        pixi: {
          scaleX: 5,
          rotation: 15,
          tint: 'blue'
        },
        stagger: {
          amount: 1.5
          // grid: "auto",
          // from: "center"
        }
      })
    }

    const createTL1 = () => {
      const createCircle = () => {
        let circle = new PIXI.Graphics()
        circle.beginFill(0xde123, 1)
        circle.lineStyle(0)
        circle.x = halfW
        circle.y = halfH
        circle.pivotX = 100
        circle.pivotY = 100
        circle.drawCircle(0, 0, 200)
        circle.endFill()

        app.stage.addChild(circle)
        return circle
      }

      const createRectangle = () => {
        let rectangle = new PIXI.Graphics()
        rectangle.beginFill(0xde123, 1)
        rectangle.lineStyle(0)
        rectangle.x = halfW
        rectangle.y = halfH
        rectangle.pivot.x = 100
        rectangle.pivot.y = 100
        rectangle.drawRect(0, 0, 200, 200)
        rectangle.endFill()
        app.stage.addChild(rectangle)
        return rectangle
      }

      const circle = createCircle()
      const rectangle = createRectangle()

      let time = 1.2
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('complete')
        }
      })

      tl.to(circle, time, {
        pixi: {
          scaleY: 2,
          scaleX: 2,
          fillColor: 'blue'
        }
      }).to(rectangle, time, {
        pixi: {
          scaleY: 2,
          scaleX: 2,
          fillColor: 'red'
        }
      })
    }

    const init = () => {
      // setupSprite()
      // drawSprite()

      // const rectangleSet = drawRectangleSet()
      // animateRectangleSet(rectangleSet)

      // createTL1()
      // window.addEventListener('resize', resize)
      // window.addEventListener('orientationchange', resize)
      canvasContainer.appendChild(app.view)

      // app.ticker.add(() => {
      //   sprite.rotation += 0.1
      // })
    }

    init()
  })
}
