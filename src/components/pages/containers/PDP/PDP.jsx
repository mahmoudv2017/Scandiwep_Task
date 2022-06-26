import { Component } from 'react';
import style from './PDP.module.css'
// import axios from '../../../../Axios';
import {Link} from 'react-router-dom'
import React from 'react';
import scrollbar from './scrollbar/scrollbar.module.css'
import {get_product} from '../../../../context/models'
import {Interweave} from 'interweave'

const selected_attr = []

class PDP extends Component {


    state = {
        selected_index: 0,

        selected_product: null
    }

    orderPrep = (e, x, type = 'Color', index = 0) => {
        x = '.' + x
        document.querySelectorAll(x + ' li').forEach(list => {
            list.classList.remove(style.selected, style.color_selected)
        })
        type === 'Color' ? e.target.classList.add(style.color_selected) : e.target.classList.add(style.selected)

        const checker = selected_attr.find(attr => attr.id === type)
        if (checker) { checker.value = index }
        else {
            selected_attr.push({
                id: type, value: index
            })
        }




        const product = this.state.selected_product
        product.selectedAttr.map(attr => {

            selected_attr.forEach(selected => {
                if (attr.id === selected.id) {
                    attr.value = selected.value
                }
            })
            return attr

        })

        this.setState({ selected_product: product })
    }


    componentDidMount = (id) => {

        const stringer = window.location.pathname
        const jsoner = '{"' + stringer.replace('/', '').replace(/=/g, '":"').replace(/ /g, ',') + '"}'
        const jk =JSON.parse(jsoner).id
        get_product(jk).then(res => {
                const product = res.data.data.product
                product.selectedAttr = []
                product.attributes.forEach(attr => {
                    const x = {
                        id: attr.id, value: 0
                    }

                    product.selectedAttr.push(x)
                })
                this.setState({ selected_product: product })
        })
        
    }

    createMarkup() {
        return this.state.selected_product.description ;
    }


    render() {

        let images, x, selected_attr , y

   
        if (this.state.selected_product) {

            x = this.state.selected_product.inStock ? style.inStock : style.outStock
            selected_attr = this.state.selected_product.selectedAttr

            images = this.state.selected_product.gallery.map((image_link, index) => {
                return <img key={index} src={image_link} onClick={() => {
                  
                    this.setState({ selected_index: index })
                    
                }} alt="asdasd" />
            })




            //  y.innerHTML = this.state.selected_product.description 
         // document.querySelector(style.desc).innerHTML = this.state.selected_product.description 


        }


        return (
            <div>
                {this.state.selected_product ? <div className={style.flex_container}>

                    <div className={[style.images_swapper, scrollbar.invisible_scrollbar].join(' ')}>

                        {images}


                    </div>


                    <div className={style.big_img}>
                        <img src={this.state.selected_product.gallery[this.state.selected_index]} alt="asdasd" />
                    </div>

                    <div>

                        <div className={style.pad_left}>
                            <div>
                                <p className={style.header}> {this.state.selected_product.brand}</p>
                                <p className={style.brand}>{this.state.selected_product.name}</p>
                            </div>
                            


                            {this.state.selected_product.attributes.map((el, index) => {

                                const x = this.state.selected_product.id + index

                                return (
                                    <div key={index} style={{ padding: '0', width: '90%' }}>
                                        <p className={style.subheader}>{el.id}:</p>



                                        {el.id === "Color" ?
                                            <ul className={[style.ul_padder, style.sizer, x].join(' ')}>
                                                {
                                                    el.items.map((item, index) => {
                                                        const selected = selected_attr.filter(attr => attr.id === el.id)[0]

                                                        const classes = selected.value === index ? style.color_selected : null
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
                                                        const selected = selected_attr.filter(attr => attr.id === el.id)[0]

                                                        const classes = selected.value === index ? style.selected : null
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
                            <Link to="/">
                            <button className={[x].join(' ')} onClick={() => {
                                selected_attr = []
                                this.props.ProductAdder(this.state.selected_product)

                            }}>{this.state.selected_product.inStock ? 'Add To Cart' : 'Out Of Stock'}</button>
                            </Link>
                          
                            <div  className={[style.desc, scrollbar.invisible_scrollbar].join(' ')}>
                                <Interweave content={this.state.selected_product.description} />
                            </div>
                          
                             {/* <div html className={[style.desc, scrollbar.invisible_scrollbar].join(' ')} >325</div>  */}

                            {/* {document.getElementsByClassName(style.desc).innerHTML = "<h1>asd</h1>"} */}


                        </div>



                    </div>


                </div>
                    : false}
            </div>

        );
    }
}

export default PDP;