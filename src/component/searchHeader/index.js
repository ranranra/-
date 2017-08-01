import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'

import SearchInput from '../../component/searchInput'
import './style.scss'

export default class SearchHeader extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	handleClick(){
		window.history.back()
	}

	handleKeyUp(value){
		hashHistory.push("/search/all/"+encodeURIComponent(value))
	}

	render(){
		return (
			<div id="search-header" className="clear-fix">
				<span className="back-icon float-left" onClick={this.handleClick.bind(this)}>
					<i className="icon-chevron-left"></i>
				</span>
				<div className="input-container">
					<i className="icon-search"></i>
					&nbsp;
					<SearchInput value={this.props.keyword||""} handleSearch={this.handleKeyUp.bind(this)} />
				</div>
			</div>
		)
	}
}