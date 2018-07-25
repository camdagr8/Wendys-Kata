import deps from 'dependencies';
import TweenMax, { Power2 } from 'gsap';


const show = (dispatch) => {

    let body = document.body;
    let cart = document.getElementById('cart');
    let cont = document.getElementById('cart-list');

    body.style.overflow = 'hidden';

    TweenMax.set(cart, {display: 'block'});
    TweenMax.set(cont, {display: 'flex', transform: 'none'});

    dispatch({
        type: deps.actionTypes.CART_SHOW,
    });

    let rect = cont.getBoundingClientRect();

    let w     = rect.width;
    let right = `-${w}px`;
    let ease  = Power2.easeInOut;

    TweenMax.from(cont, .125, { right, ease });
};

export default {
    add: (data) => (dispatch) => {
        dispatch({
            type: deps.actionTypes.CART_ADD,
            data,
        });

        show(dispatch);
    },

    hide: () => (dispatch) => {

        let body = document.body;
        let cart = document.getElementById('cart');
        let cont = document.getElementById('cart-list');

        let rect = cont.getBoundingClientRect();

        let w = rect.width;
        let right = `-${w}px`;
        let ease = Power2.easeInOut;

        TweenMax.to(cont, .125, {
            right,
            ease,
            onComplete: () => {
                body.style.overflow = 'auto';
                TweenMax.set(cart, {display: 'none'});
                TweenMax.set(cont, {display: 'flex', transform: 'translateX(-100%)', right: 0});
                dispatch({
                    type: deps.actionTypes.CART_HIDE,
                });
            }
        });
    },

    mount: (data) => (dispatch) => {
        return dispatch({
            type: deps.actionTypes.CART_MOUNT,
            data,
        });
    },

    remove: (data) => (dispatch) => {
        return dispatch({
            type: deps.actionTypes.CART_REMOVE,
            data,
        });
    },

    show: () => show,
};
