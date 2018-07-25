
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

/**
 * -----------------------------------------------------------------------------
 * React Component: Categories
 * -----------------------------------------------------------------------------
 */

export default class Categories extends Component {
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

    render() {
        let { title, className } = this.state;
        return (
            <Template title={title} className={className}>
                <main className={'main-content px-20'} role='main'>
                    <h1 className={'mb-10 mt-md-20 mt-lg-20 center left-md'}>Menu</h1>
                    <div className={'row'} style={{marginBottom: 10}}>
                        {products.map((item, i) => {
                            let { name, image, id } = item;
                            if (id === 1) { name = null; }
                            return (
                                <div className={'col-xs-12 col-sm-6 col-md-4 col-lg-3'} key={`category-${i}`}>
                                    <Card footer={name} url={`/category/${id}`} image={image} className={`card-${id}`} title={`Browse ${item.name}`} />
                                </div>
                            );
                        })}
                    </div>
                </main>
            </Template>
        );
    }
}

Categories.defaultProps = {

};
