import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'

export default class Star extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
        let star=this.props.star||0
        if(star>5){
            star=star%5
        }
		return(
			<div className="star-container">
                {
                    [1,2,3,4,5].map((item,index)=>{
                        const light=star>=item?' light':''
                        return <i key={index} className={"icon-star"+light }></i>
                    })
                }
            </div>
		)
	}
}