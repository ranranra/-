import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'

export default class SearchInput extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			value:""
		}
	}

	componentDidMount(){
		this.setState({
			value:this.props.value||""
		})
	}

	handleChange(e){
		this.setState({
			value:e.target.value
		})
	}

	handleKeyUp(e){
		if(e.keyCode!==13){
			return
		}
		this.props.handleSearch(e.target.value)
	}

	render(){
		return (
			<input className="search-input" type="text" placeholder="请输入关键字!!!" value={this.state.value} onChange={this.handleChange.bind(this)} onKeyUp={this.handleKeyUp.bind(this)} />
		)
	}
}