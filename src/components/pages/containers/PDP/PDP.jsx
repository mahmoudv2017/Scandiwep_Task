import  { Component } from 'react';
import style from './PDP.module.css'
import axios from '../../../../Axios';
import Details from '../../../nav/cart/CartItem/ItemDesc/ItemDetails/Details';

class PDP extends Component {

    state = {
        selected_index : 0,
        selected_product : null
    }


    componentDidMount = (id) => {
        const stringer = window.location.pathname
        let jsoner = '{"' + stringer.replace('/','').replace(/=/g , '":"').replace( / /g ,',')+ '"}'
        let jk = "\"" +JSON.parse(jsoner).id+ "\""

        axios.get("/graphql?query={product(id:"+jk+"){id,name,gallery,description,category,prices{amount,currency{symbol}},brand,attributes{id,name,type}}}")
        .then(res => {
            this.setState({selected_product : res.data.data.product})
        })
    }
    
    render() { 


        

        let selected_product , images

        if(this.state.selected_product){
            console.log(this.state.selected_product )
             selected_product = this.props.products.filter(item => {
                return item.id === this.state.selected_product.id
            })[0]
    
            
    
             images = selected_product.gallery.map( (image_link,index) => {
                return <img key={index} src={image_link} onClick={ () => {
                    
                     this.setState({selected_index : index})
                } } alt="asdasd"/>
            } )
        }

     
        return (
            <div>
                {this.state.selected_product ? <div className={style.flex_container}>
                <div className={style.images_swapper}>
                    {images}
                </div>

                <div className={style.big_img}>
                    <img src={selected_product.gallery[this.state.selected_index]} alt="asdasd" />
                </div>

                <div>
                    <Details item={this.state.selected_product} selected_currency={this.props.currency} />

                    <button>Add To Cart</button>

                    <p>{selected_product.description}</p>
                </div>

               

                {/* <div className={style.details}>

                    <h1>{selected_product.name}</h1>

             
                    <p>Size: </p>
                    <ul className={style.sizer}>
                        <li>XS</li>
                        <li>S</li>
                        <li>M</li>
                        <li>L</li>
                    </ul>

                    <p>Color: </p>
                    <ul className={style.sizer}>
                        <li><input type="color" name="green" id="color#1" defaultValue='#1D1F22' /></li>
                        <li><input type="color" name="black" id="color#2" defaultValue='#15A4C4'/></li>
                        <li><input type="color" name="dark" id="color#3" defaultValue='#EA8120'/></li>
                    </ul>
                 
                    <p>Price:</p>
                    <p>{selected_product.prices[this.props.currency].currency.symbol}  {selected_product.prices[this.props.currency].amount}</p>

                    <button>Add To Cart</button>

                    <p>{selected_product.description}</p>
                </div> */}
            </div>
             : false}
            </div>
      
        );
    }
}
 
export default PDP;