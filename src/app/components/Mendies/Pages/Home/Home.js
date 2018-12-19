/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Template from 'components/Mendies/Template';
import { NavLink } from 'react-router-dom';

/**
 * -----------------------------------------------------------------------------
 * React Component: Home
 * -----------------------------------------------------------------------------
 */

export default class Home extends Component {
    render() {
        const { title, className } = this.props;
        return (
            <Template title={title} className={className}>
                <main className={'main-content'} role="main">
                    <div className={'main-content-left'}>
                        <h1>Delicious Food</h1>
                        <p className={'mt-xs-20'}>
                            Only the pure of heart can make a superb burger.
                        </p>
                        <NavLink
                            to={'/categories'}
                            className={
                                'btn-primary-lg-pill mt-xs-20 mt-md-40 hide-xs-only'
                            }
                        >
                            Order Online
                        </NavLink>
                    </div>
                    <div className={'main-content-right'}>
                        <img src={'/assets/images/home-burger.png'} />
                    </div>
                </main>
            </Template>
        );
    }
}

Home.defaultProps = {};
