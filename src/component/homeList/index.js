import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'

import './style.scss'

export default class HomeList extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		
	}

	render(){
		const listItem=this.props.data.length?
						this.props.data.map((item,index)=>(
							<div key={index} className="list-item clear-fix">
								<Link to={"/detail/"+item.id}>
									<div className="item-img-container float-left">
					                    <img src={item.img} alt={item.title}/>
					                </div>
					                <div className="item-content">
					                    <div className="item-title-container clear-fix">
					                        <h3 className="float-left">{item.title}</h3>
					                        <span className="float-right">{item.distance}</span>
					                    </div>
					                    <p className="item-sub-title">
					                        {item.subTitle}
					                    </p>
					                    <div className="item-price-container clear-fix">
					                        <span className="price float-left">￥{item.price}</span>
					                        <span className="mumber float-right">已售{item.mumber}</span>
					                    </div>
					                </div>
								</Link>
							</div>
						)):"have no";
		return(
			<div>
				<div className="list-container">
					{listItem}
				</div>
			</div>
		)
	}
}
