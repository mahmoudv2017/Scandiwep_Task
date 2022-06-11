import React, { Component } from 'react';
import style from './scrollbar.module.css'

class ScrollBar extends Component {

    render() { 
        return (
            <div className={style.buttonSection}>
                {this.props.children}
            </div>
        );
    }
}
 
export default ScrollBar;