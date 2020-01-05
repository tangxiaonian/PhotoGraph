export function Debounce(fun,time = 200) {

    let timer = null;

    return function (...args) {

        if (timer != null) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {

            fun.apply(this,args);

            timer = null;

        }, time);

    }

}