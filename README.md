# BarbaJs & SmoothScroll Bolierplate (v. @2.9.7)
> npm install @barba/core

### Call SPA
> on app.js
```bash
    import Spa from './js/spa'
    new Spa()

```

### SPA file
> spa.js
```bash
    
import barba from '@barba/core';
import { gsap } from 'gsap'
import { scroll } from './scroll'

export default class Spa {
    constructor() {
        this.init()
    }

    init() {

        barba.init({


            //? - =========================  TRANSITIONS  ========================= -//
            //? - =========================  TRANSITIONS  ========================= -//

            transitions: [{
                //sync: true,
                preventRunning: true,
                once({ next }) {
                    scroll.init(next.namespace, false, next.container)
                },
                leave(data) {
                    const done = this.async();
                    gsap.set('body', { overflow: 'hidden' })
                    scroll.destroy()
                    gsap.to('body', { duration: .5, opacity: 0, onComplete: () => { done(); } });
                },
                enter(data) {
                    let thisOld = data.current.namespace,  thisNext = data.next.namespace
                    if(thisOld === 'home' && thisNext ==='about') {
                        console.log('Under Conditions');
                        gsap.set('h1', { rotation: 180 })
                    }
                },
                after({ next }) {
                    history.scrollRestoration = "manual"
                    window.scrollTo(0, 0)
                    gsap.set('body', { overflowY: 'auto' })
                    gsap.to('body', { delay: .5, duration: .5, opacity: 1 });
                    scroll.init(next.namespace, false, next.container)
                    gsap.from('h1', { delay: 1, duration: 2, yPercent: 200, opacity: 0, ease: 'expo.out' })

                },

            }],



            //? - =========================  VIEWS  ========================= -//
            //? - =========================  VIEWS  ========================= -//

            views: [
                //? --- home
                {
                    namespace: 'home',
                    beforeEnter(data) {
                        //console.log(data);
                    }
                },
                //? --- about
                {
                    namespace: 'about',
                    beforeEnter(data) {
                        //console.log(data);
                    }
                },
                //? --- page
                {
                    namespace: 'page',
                    beforeEnter(data) {
                        //console.log(data);
                    }
                },
                //? --- contact
                {
                    namespace: 'contact',
                    beforeEnter(data) {
                        //console.log(data);
                    }
                },
            ]
        });
    } //close Init

}

```