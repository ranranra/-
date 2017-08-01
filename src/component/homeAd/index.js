import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'

export default class HomeAd extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		const tehui=this.props.data.length?
					this.props.data.map((item,index)=>(
						<div key={index} className="ad-item float-left" >
							<a href={item.link} target="_blank">
								<img src={item.img} alt={item.title} />
							</a>
						</div>
					)):'have no';
		return (
			<div id="home-ad">
				<h2>超值特惠</h2>
				<div className="ad-container clear-fix">
					{tehui}
				</div>
			</div>
		)
	}
}