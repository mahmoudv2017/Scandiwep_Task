import React, { Component } from 'react';
import style from './backdrop.module.css'
import Wrapper from '../hoc/wrapper';

class Backdrop extends Component {
    
    
    render() { 

        this.props.backdrop ? document.querySelector('body').style.overflow = 'hidden' : document.querySelector('body').style.overflow = 'auto'
      
        return (
            <Wrapper>
              {this.props.backdrop ? <div  onClick={this.props.enabler} className={style.backdrop} ></div> : false}  
            </Wrapper>
            
           
        );
    }
}
 
export default Backdrop;