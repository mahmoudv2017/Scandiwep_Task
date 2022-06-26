import { Component } from 'react';
import style from './PDP.module.css'
import React from 'react';
import scrollbar from './scrollbar/scrollbar.module.css'
import {get_product} from '../../../../context/models'
import {Interweave} from 'interweave'



class PDP extends Component {

    state = {
        selected_index: 0,
        selected_attr : [],
        selected_product: {}
    }

    orderPrep = (e, x, type = 'Color', index = 0) => {
        x = '.' + x
        document.querySelectorAll(x + ' li').forEach(list => {
            list.classList.remove(style.selected, style.color_selected)
        })
        type === 'Color' ? e.target.classList.add(style.color_selected) : e.target.classList.add(style.selected)
        const attributes = {...this.state.selected_product}
        let new_arr = []
        for (let index = 0; index < attributes.selectedAttr.length; index++) {
            
            new_arr.push({...attributes.selectedAttr[index]})
           
        }

        const checker = new_arr.findIndex(attr => attr.id === type)
        
        if (checker !== -1) { new_arr[checker].value = index }
        
        let product = {...this.state.selected_product}
        product.selectedAttr = [...new_arr]

        this.setState({ selected_product: product })


       
    }


    componentDidMount = (id) => {

        const stringer = window.location.pathname
       
        const jsoner = '{"' + stringer.replace('/', '').replace(/=/g, '":"').replace(/ /g, ',') + '"}'
        const jk =JSON.parse(jsoner).id
        get_product(jk).then(res => {
                const product ={...res.data.data.product} 
                product.selectedAttr = []
                product.attributes.forEach(attr => {
                    const x = {
                        id: attr.id, value: 0
                    }

                    product.selectedAttr.push(x)
         
                })
                this.setState({ selected_product: product})
        })
        
    }

    createMarkup() {
        return this.state.selected_product.description ;
    }


    render() {

        let images, x 

        let product = {...this.state.selected_product}
        if (Object.keys(product).length > 0) {

            x = product.inStock ? style.inStock : style.outStock

            images = product.gallery.map((image_link, index) => {
                return <img key={index} src={image_link} onClick={() => {
                  
                    this.setState({ selected_index: index })
                    
                }} alt="asdasd" />
            })





        }


        return (
            <div>
                {Object.keys(product).length > 0 ? <div className={style.flex_container}>

                    <div className={[style.images_swapper, scrollbar.invisible_scrollbar].join(' ')}>

                        {images}


                    </div>


                    <div className={style.big_img}>
                        <img src={product.gallery[this.state.selected_index]} alt="asdasd" />
                    </div>

                    <div>

                        <div className={style.pad_left}>
                            <div>
                                <p className={style.header}> {product.brand}</p>
                                <p className={style.brand}>{product.name}</p>
                            </div>
                            


                            {product.attributes.map((el, index) => {

                                const x = product.id + index

                                return (
                                    <div key={index} style={{ padding: '0', width: '90%' }}>
                                        <p className={style.subheader}>{el.id}:</p>



                                        {el.id === "Color" ?
                                            <ul className={[style.ul_padder, style.sizer, x].join(' ')}>
                                                {
                                                    el.items.map((item, index) => {
                                                       // const selected = selected_attr.filter(attr => attr.id === el.id)[0]

                                                        const classes = index === 0 ? style.color_selected : null
                                                        return <li key={index} className={classes} onClick={(e) => this.orderPrep(e, x, el.id, index)} style={{ backgroundColor: item.value, border: 'none' }} ></li>
                                                    })
                                                }

                                            </ul> :
                                            null

                                        }



                                        {el.id !== "Color" ?

                                            <ul className={[style.ul_padder, style.Not_sizer, x].join(' ')}>
                                                {
                                                    el.items.map((item, index) => {
                                                        //const selected = selected_attr.filter(attr => attr.id === el.id)[0]

                                                        const classes = index === 0 ? style.selected : null
                                                        return <li key={index} className={classes} onClick={(e) => this.orderPrep(e, x, el.id, index)} >{item.value}</li>
                                                    })
                                                }
                                            </ul>
                                            : null}


                                    </div>

                                )
                            })}


                            <div>
                                <p>Price:</p>
                                <p className={style.price}>{this.state.selected_product.prices[this.props.currency].currency.symbol}  {this.state.selected_product.prices[this.props.currency].amount}</p>
                            </div>


                        </div>

                        <div className={style.buttonSection}>
                                <button className={[x].join(' ')} onClick={() => {
                                    this.props.ProductAdder(this.state.selected_product)

                                }}>{this.state.selected_product.inStock ? 'Add To Cart' : 'Out Of Stock'}</button>
                          
                            <div  className={[style.desc, scrollbar.invisible_scrollbar].join(' ')}>
                                <Interweave content={this.state.selected_product.description} />
                            </div>
                          
                          


                        </div>



                    </div>


                </div>
                    : false}
            </div>

        );
    }
}

export default PDP;