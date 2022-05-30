import React, { Component } from 'react';
import style from './backdrop.module.css'
import Wrapper from '../hoc/wrapper';

class Backdrop extends Component {
    constructor(props){
        super(props)

        this.state={...props}
    }

    
    render() { 

        let x = this.state.backdrop 
      
        return (
            <Wrapper>
                <div  onClick={this.state.enabler} className={style.backdrop} ></div>
            </Wrapper>
            
           
        );
    }
}
 
export default Backdrop;