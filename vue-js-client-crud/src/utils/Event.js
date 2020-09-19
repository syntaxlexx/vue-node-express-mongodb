// since any vue instance has access to the $emit and $on, maybe we
// could create a new Vue instance and any other component can listen
// for an event on this particular instance. This way, we are
// not limited to parent-child alone, any component can
// listen and emit event. It's called an 'EventEmitter)
// window.Event = new Vue();

// we can als opt for the ES2015 if we need to customize $emit and $on
// in this case, we will use fire() and listen()
import Vue from 'vue';

window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data)
    }

    listen(event, callback) {
        this.vue.$on(event, callback)
    }
};