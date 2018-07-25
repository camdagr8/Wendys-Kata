
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Template from 'components/Mendies/Template';
import { Link } from 'react-router-dom';
import products from 'components/Mendies/products';
import Card from 'components/Mendies/Card';
import _ from 'underscore';
import op from 'object-path';
import HeartEmptyIcon from 'components/Mendies/Pages/Category/HeartEmptyIcon';
import HeartFullIcon from 'components/Mendies/Pages/Category/HeartFullIcon';

/**
 * -----------------------------------------------------------------------------
 * React Component: Category
 * -----------------------------------------------------------------------------
 */

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            ...prevState,
            ...nextProps,
        }));
    }

    onOrderClick(e) {
        if (typeof this.state.add === 'function') {
            let { product, category } = e.currentTarget.dataset;
            this.state.add({ product, category });
        }
    }

    render404({ title, className }) {
        return (
            <Template title={title} className={className}>
                <main className={'main-content px-20'} role='main'>
                    <h1 className={'mb-10 mt-md-20 mt-lg-20 center left-md'}>404 <span className={'px-10'}>/</span> Page not found </h1>
                </main>
            </Template>
        );
    }

    render() {
        let { className, category, favorites = [] } = this.state;
        category = Number(category);

        if (category === 0 || isNaN(category)) {
            return this.render404(this.state);
        }

        let cat = _.findWhere(products, { id: category });
        if (!cat) { return this.render404(this.state); }

        let { name:categoryName, menuItems } = cat;
        let title =`${categoryName} | Mendie's`;

        return (
            <Template title={title} className={'category'}>
                <main className={'main-content px-20'} role='main'>
                    <h1 className={'mb-10 mt-md-20 mt-lg-20'}>
                        <div className={'row center-xs center-sm start-md end'}>
                            <Link to={'/categories'} title={'go back to the main menu'}>Menu</Link>
                            <span className={'px-10'}>/</span>
                            <span className={'mb-6'} style={{fontSize: '.5em'}} title={`${categoryName} menu items`} tabIndex={0}>{categoryName}</span>
                        </div>
                    </h1>
                    <div className={'row'}>
                        {menuItems.map((item, i) => {
                            let { name, id, image, calories } = item;

                            return (
                                <div className={'col-xs-12 col-sm-6 col-md-4 col-lg-3'} key={`item-${i}`}>
                                    <div className={'card'}>
                                        <div className={'card-wrapper'}>
                                            <div className={'card-heading'}>
                                                <div>
                                                    <Link to={`/category/${category}/${id}`}>{name}</Link>
                                                    <div><small className={'mt-8'}>{calories}</small></div>
                                                </div>
                                                {(favorites.indexOf(id) > -1)
                                                    ? (
                                                        <button
                                                            className={'btn-icon'}
                                                            onClick={(e) => { this.state.removeFavorite(id); e.currentTarget.blur(); }}
                                                        >
                                                            <HeartFullIcon />
                                                        </button>
                                                    )
                                                    : (
                                                        <button
                                                            className={'btn-icon'}
                                                            onClick={(e) => { this.state.addFavorite(id); e.currentTarget.blur(); }}
                                                        >
                                                            <HeartEmptyIcon />
                                                        </button>
                                                    )
                                                }

                                            </div>
                                            <div className={'card-body'}>
                                                <Link to={`/category/${category}/${id}`} className={'center'}>
                                                    <img src={image} />
                                                </Link>
                                            </div>
                                            <div className={'card-footer middle flex'}>
                                                <button
                                                    type={'button'}
                                                    className={'btn-secondary-md-pill'}
                                                    data-category={category}
                                                    data-product={id}
                                                    onClick={this.onOrderClick.bind(this)}
                                                >
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </Template>
        );
    }
}

Category.defaultProps = {};
