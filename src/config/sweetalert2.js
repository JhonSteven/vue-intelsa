import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

const options = {
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#23ce6b',
};


function getDataSwal(message) {
    if (typeof message === 'object' && message !== null) {
        return message;
    } else {
        return { title: message }
    }
}

Vue.prototype.$swalSuccess = function(message) {
    const { title, text = '' } = getDataSwal(message);

    this.$swal({
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2500,
        icon: 'success'
    })
}
Vue.prototype.$swalError = function(message) {
    const { title, text = '' } = getDataSwal(message);

    this.$swal({
        title: title,
        text: text,
        timer: 5000,
        icon: 'error'
    })
}
var getNextSibling = function(elem, selector) {

    // Get the next sibling element
    var sibling = elem.nextElementSibling;

    // If there's no selector, return the first sibling
    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
    }
};

Vue.prototype.$swalValidationError = function(message) {
    let html = '';
    let notInHTML = [];
    Object.entries(message).forEach(([key, value]) => {
        if (!document.querySelector("input[name='" + key + "']")) {
            html = html + '<div class="text-left pb-2"><b class="text-danger capitalize">' + key + ':</b><br>';
            value.forEach(function(val) {
                html = html + '- ' + val + '<br>';
            })
            html = html + '</div>'
            notInHTML.push(key);
        }
    });
    this.$swal({
        title: 'Hay un error en los datos',
        html: html,
        icon: 'error'
    }).then(response => {
        Object.entries(message).forEach(([key, value]) => {
            if (!notInHTML.some(a => a == key)) {
                let nodo = document.querySelector("input[name='" + key + "']")
                nodo.classList.add('is-invalid');
                getNextSibling(nodo, '.invalid-feedback').innerText = value[0]
            }
        });
    })
}