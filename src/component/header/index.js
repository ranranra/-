import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'

import './style.scss'

export default class Header extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	handleClick(){
		const backRouter=this.props.backRouter
		if(backRouter){
			hashHistory.push(backRouter)
		}else{
			window.history.back()
		}
		
	}

	render(){
		return(
			<div id="common-header">
				<span className="back-icon" onClick={this.handleClick.bind(this)}>
					<i className="icon-chevron-left"></i>
				</span>
				<h1>{this.props.title}</h1>
			</div>
		)
	}
}