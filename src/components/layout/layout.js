import { Component } from 'react';

import Wrapper from '../hoc/wrapper';
import Nav from '../nav/nav';

class Layout extends Component{
    render(){
        return(

            <Wrapper>
                <Nav />

                {/* Switch Routes
                    Product Listing Page
                    Product Description Page
                    Cart Page */}
            </Wrapper>
            
        )
    }
}

export default Layout