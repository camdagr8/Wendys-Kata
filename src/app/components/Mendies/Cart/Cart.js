
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


/**
 * -----------------------------------------------------------------------------
 * React Component: Cart
 * -----------------------------------------------------------------------------
 */

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props };
        this.container = null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            ...prevState,
            ...nextProps,
        }));
    }

    onRemove(e) {
        if (typeof this.state.remove === 'function') {
            let { product, category, index } = e.currentTarget.dataset;
            this.state.remove({ index, product, category });
        }
    }

    render() {
        let { visible = false, items = [], hide, update } = this.state;

        let cls = (visible === true) ? 'cart cart-visible' : 'cart cart-hide';

        return (
            <aside className={cls} id={'cart'}>
                <input type={'hidden'} defaultValue={update} />
                <div className={'cart-backdrop'} onClick={hide} />
                <div className={'cart-list'} id={'cart-list'}>
                    <div className={'cart-header'}>
                        <button
                            type={'button'}
                            className={'btn-cart-close'}
                            title={'close cart'}
                            onClick={hide}
                        >
                            &times;
                        </button>
                        <h4>Your Order</h4>
                    </div>
                    <ul className={'cart-items'}>
                        {(items.length < 1) ? (
                            <li className={'cart-item'}>
                                {/* no cart items */}
                                <div className={'px-20'} style={{width: '100%'}}>
                                    <a className={'btn-primary-pill btn-block'} href={'/categories'}>Start your order</a>
                                </div>
                            </li>
                        ) : items.map((item, i) => {
                            let { image, name, category, id } = item;

                            return (
                                <li className={'cart-item'} key={`cart-item-${i}`}>
                                    <div className={'cart-item-image'}>
                                        <img src={image} />
                                    </div>
                                    <div className={'cart-item-title'}>
                                        <a href={`/category/${category}/${id}`}>{name}</a>
                                    </div>
                                    <button
                                        className={'cart-item-remove'}
                                        data-product={id}
                                        data-index={i}
                                        data-category={category}
                                        onClick={this.onRemove.bind(this)}
                                    >
                                        &times;
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {(items.length > 0) ? (
                        <div className={'cart-footer'}>
                            <button type={'button'} className={'btn-default-lg-pill btn-block'}>
                                Check Out
                            </button>
                        </div>
                    ) : null}
                </div>
            </aside>
        );
    }
}

Cart.defaultProps = {};
