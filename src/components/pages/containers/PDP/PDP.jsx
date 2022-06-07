import  { Component } from 'react';
import style from './PDP.module.css'
import axios from '../../../../Axios';



class PDP extends Component {

    state = {
        selected_index : 0,
        selected_product : null
    }


    componentDidMount = (id) => {

        const stringer = window.location.pathname
        let jsoner = '{"' + stringer.replace('/','').replace(/=/g , '":"').replace( / /g ,',')+ '"}'
        let jk = "\"" +JSON.parse(jsoner).id+ "\""
        // let selected_product = this.props.products.filter(item => {
        //     return item.id === JSON.parse(jsoner).id
        // })[0]

        // this.setState({selected_product : selected_product})
        axios.get("/graphql?query={product(id:"+jk+"){id,name,gallery,description,inStock,category,prices{amount,currency{symbol}},brand,attributes{id,name,type,items{id,value}}}}")
        .then(res => {
            this.setState({selected_product : res.data.data.product})
        })
    }

     createMarkup() {
        return {__html: this.state.selected_product.description};
      }

    
    
    render() { 
      

         let images , x 

        if(this.state.selected_product){
            // console.log(this.state.selected_product )
          

            // console.log({product : selected_product} )
    
            x = this.state.selected_product.inStock ? style.inStock : style.outStock
            
    
             images = this.state.selected_product.gallery.map( (image_link,index) => {
                return <img key={index} src={image_link} onClick={ () => {
                    
                     this.setState({selected_index : index})
                } } alt="asdasd"/>
            } )

            if(document.getElementById('desc'))
            {document.getElementById('desc').innerHTML = this.state.selected_product.description}

            
        }

     
        return (
            <div>
                {this.state.selected_product ? <div className={style.flex_container}>
                <div className={[style.images_swapper , style.invisible_scrollbar].join(' ')}>
                    {images}
                </div>

                <div className={style.big_img}>
                    <img src={this.state.selected_product.gallery[this.state.selected_index]} alt="asdasd" />
                </div>

                <div>
                    
                    <div className={style.pad_left}>
                        <p className={style.header}>{this.state.selected_product.name}</p>


                        {this.state.selected_product.attributes.map( (el , index) => {
                    return(
                            <div key={index} style={{padding : '0' , width: '90%'}}>
                                <p className={style.subheader}>{el.id}:</p>


                                
                                { el.type === "swatch" ? 
                                <ul className={[style.ul_padder , style.sizer].join(' ')}>
                                {
                                    el.items.map( (item , index) => {
                                        return  <li key={index}  style={{backgroundColor : item.value  , border : 'none'}} ></li>
                                        } )
                                }
                              
                                   </ul> : 
                               null

                                }
                             

                             
                                {el.type !== "swatch" ? 
                                
                                    <ul className={[style.ul_padder , style.Not_sizer].join(' ')}>
                                        {
                                            el.items.map( (item , index) => {
                                                return  <li key={index}  onClick={ () => this.orderPrep(index)} >{item.value}</li>
                                                } )
                                        }
                                        </ul>
                                  : null}
                             
                             
                            </div>

                    )
                } )}


                        <div>
                            <p>Price:</p>
                            <p className={style.price}>{this.state.selected_product.prices[this.props.currency].currency.symbol}  {this.state.selected_product.prices[this.props.currency].amount}</p>
                        </div>
                     

                    </div>

                    <div className={style.buttonSection}>
                        {/* {this.state.selected_product.inStock ? <h1>instock</h1> : <h2>out of stok</h2> } */}
                            <button className={[x].join(' ')}  onClick={ () => {this.props.ProductAdder(this.state.selected_product.id)} }>{this.state.selected_product.inStock ? 'Add To Cart' : 'Out Of Stock'}</button>

                            <div className={[style.desc , style.invisible_scrollbar2r].join(' ')} dangerouslySetInnerHTML={this.createMarkup()} ></div>
                    </div>

                   
            
                </div>

               
            </div>
             : false}
            </div>
      
        );
    }
}
 
export default PDP;