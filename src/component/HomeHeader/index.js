import React, {Component} from 'react'
import {Link,hashHistory} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchInput from '../../component/searchInput'
import './index.scss'

export default class HomeHeader extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	handleSearch(value){
		hashHistory.push("/search/all/"+encodeURIComponent(value))
	}

	render(){
		return (
			<div id="home-header" className="clear-fix">
				<div className="home-header-left float-left">
					<Link to="/city" >
						<span>{this.props.cityName}</span>
						&nbsp;
						<i className="icon-angle-down"></i>
					</Link>
				</div>
				<div className="home-header-right float-right">
					<Link to="/login">
						<i className="icon-user"></i>
					</Link>
				</div>
				<div className="home-header-middle">
					<div className="search-container">
						<i className="icon-search"></i>
						<SearchInput value="" handleSearch={this.handleSearch.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}