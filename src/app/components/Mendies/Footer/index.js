
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


/**
 * -----------------------------------------------------------------------------
 * React Component: Footer
 * -----------------------------------------------------------------------------
 */

export default class Footer extends Component {
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
        let date = new Date();
        return (
            <footer className={'main-footer'}>
                <div className={'container px-20'}>
                    <div>
                        <Link to={'/'}>&copy; Mendie&rsquo;s &ndash; {date.getFullYear()}</Link>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.defaultProps = {};
