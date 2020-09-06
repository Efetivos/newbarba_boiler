
import { gsap } from 'gsap'
import { home } from './home';
import { about } from './about';
class Smooth {
    constructor() {
    }

    bindMethods() {
        ['scroll', 'run', 'resize']
            .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    setStyles() {
        this.dom.el.style.position = 'fixed';
        this.dom.el.style.top = 0;
        this.dom.el.style.left = 0;
        this.dom.el.style.height = '100%'
        this.dom.el.style.width = '100%'
        this.dom.el.style.overflow = 'hidden'
    }

    setHeight() {
        document.body.style.height = `${this.dom.content.offsetHeight}px`
    }

    resize() {
        this.setHeight()
        this.scroll()
    }
    scroll() {
        this.data.current = window.scrollY
    }

    run() {
        this.data.last = this.math.lerp(this.data.last, this.data.current, this.data.ease)
        this.data.last = Math.floor(this.data.last * 100) / 100

        const diff = this.data.current - this.data.last
        const acc = diff / this.config.width
        const velo = + acc

        this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0)`




        //! - =========================  conditions  ========================= -//



        if (this.isPage === 'home') {
            if (!this.once) {
                home.init(this.contentPage)
                this.once = true
            }
            home.onScroll(this.data.last)
        }


        if (this.isPage === 'about') {
            if (!this.once) {
                about.init(this.contentPage)
                this.once = true
            }
            about.onScroll(this.data.last)
        }


        this.requestAnimationFrame()
    }

    on(requestAnimationFrame = true) {
        this.setStyles()
        this.setHeight()
        this.addEvents()

        requestAnimationFrame && this.requestAnimationFrame()
    }

    off(cancelAnimationFrame = true) {
        cancelAnimationFrame && this.cancelAnimationFrame()

        this.removeEvents()
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run)
    }

    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF)
    }

    destroy() {
        this.off()
        document.body.style.height = ''
        this.data = null

    }

    resize() {
        this.setHeight()
    }

    addEvents() {
        window.addEventListener('resize', this.resize, { passive: true })
        window.addEventListener('scroll', this.scroll, { passive: true })
    }

    removeEvents() {
        window.removeEventListener('resize', this.resize, { passive: true })
        window.removeEventListener('scroll', this.scroll, { passive: true })
    }

    init(isPage, once, contentPage) {
        this.contentPage = contentPage
        this.isPage = isPage
        this.once = once
        this.isPage = isPage
        this.math = {
            lerp: (a, b, n) => {
                return (1 - n) * a + n * b
            },
            norm: (value, min, max) => {
                return (value - min) / (max - min)
            }
        }

        this.config = {
            height: window.innerHeight,
            width: window.innerWidth
        }
        this.bindMethods()
        this.data = {
            ease: 0.045,
            current: 0,
            last: 0
        }

        this.dom = {
            el: document.querySelector('[data-scroll]'),
            content: document.querySelector('[data-scroll-content]')
        }

        this.rAF = null
        this.on()
    }
}


export const scroll = new Smooth()