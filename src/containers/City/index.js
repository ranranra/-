import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import Header from '../../component/header'
import CurrentCity from '../../component/currentCity'
import CityList from '../../component/cityList'

import * as userinfoActions from '../../actions/userinfo'
import {CITYNAME} from '../../config/localStoreKey'
import localStorage from '../../util/localStorage'

class City extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	handleChange(newCity){
		if(newCity==null){
			return
		}

		const userinfo=this.props.userinfo
		userinfo.cityName=newCity
		this.props.userinfoActions.update(userinfo)

		localStorage.setItem(CITYNAME,newCity)

		hashHistory.push("/")
	}

	render(){
		return(
			<div>
				<Header title="选择城市" />
				<CurrentCity cityName={this.props.userinfo.cityName} />
				<CityList changeFn={this.handleChange.bind(this)} />
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log(state)
	return {
		userinfo:state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return {
		userinfoActions:bindActionCreators(userinfoActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(City)
