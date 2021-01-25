import Vue from 'vue';

Vue.directive('meu-trasform', {
    bind(el, binding, vnode) {
        let current = 0;

        el.addEventListener('dblclick', function() {
            current += binding.value || 90;
            if (binding.modifiers.animate) {
                el.style.transition = 'transform 0.5s';
            }
            el.style.transform = `rotate(${current}deg)`;
        })
    }
});
