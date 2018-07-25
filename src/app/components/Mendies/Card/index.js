
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * -----------------------------------------------------------------------------
 * React Component: Card
 * -----------------------------------------------------------------------------
 */
 const Wrap = (props) => {
     return (props.url) ? (
         <Link to={props.url} className={`card ${props.className}`} title={props.title}>
             {props.children}
         </Link>
     ) : (
         <div className={`card ${props.className}`}>
             {props.children}
         </div>
     );
 };

export default class Card extends Component {
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
        let { url, title, subtitle, footer, image, className = '' } = this.state;
        let hoverText = title || footer;

        return (
            <Wrap url={url} className={className} title={hoverText}>
                {(image)
                    ? (
                        <span className={'card-body'} style={{backgroundImage: `url('${image}')`}} />
                    )
                    : null
                }
                {(footer)
                    ? (
                        <span className={'card-footer'}>
                            <h3>{footer}</h3>
                        </span>
                    )
                    : null
                }
            </Wrap>
        );
    }
}

Card.defaultProps = {
    image: null,
    subtitle: null,
    title: null,
    url: null,
    className: null,
};
