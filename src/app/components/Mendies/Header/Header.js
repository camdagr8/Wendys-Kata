
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from 'components/Mendies/Cart/CartIcon';


/**
 * -----------------------------------------------------------------------------
 * React Component: Header
 * -----------------------------------------------------------------------------
 */

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            ...prevState,
            ...nextProps,
        }));
    }

    onCartClick(e) {
        if (typeof this.state.showCart === 'function') {
            this.state.showCart();
        }
    }

    render() {
        let { logo, links } = this.state;

        return (
            <header className={'main-header'}>
                {
                    (logo)
                        ? (
                            <div className={'main-header-logo'}>
                                <NavLink to={'/'} title={"Mendie's home page"}>
                                    <img src={logo} /> <span className={'lobster'}>Mendie&rsquo;s</span>
                                </NavLink>
                            </div>
                        )
                        : null
                }
                <nav className={'main-header-nav'}>
                    {
                        links.map((item, i) => {
                            let { url, label, className } = item;
                            return (
                                <span key={`main-header-nav-link-${i}`} className={`main-header-nav-link`}>
                                    <NavLink to={url} exact={true} className={className}>{label}</NavLink>
                                </span>
                            );
                        })
                    }
                    <span className={`main-header-nav-link`}>
                        <button
                            type={'button'}
                            className={'btn-icon'}
                            onClick={this.onCartClick.bind(this)}
                        >
                            <CartIcon width={18} height={18} />
                        </button>
                    </span>
                </nav>
            </header>
        );
    }
}

Header.defaultProps = {};
