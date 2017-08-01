import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import Header from '../../component/header'
import UserInfo from '../../component/userInfo'
import OrderList from './subpage/orderList'

class User extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	componentDidMount(){
		if(!this.props.userinfo.username){
			hashHistory.push("/login")
		}
	}

	render(){
		console.log(this.props.userinfo)
		return(
			<div>
				<Header title="个人中心" backRouter="/" />
				<UserInfo username={this.props.userinfo.username} cityname={this.props.userinfo.cityName} />
				<OrderList username={this.props.userinfo.username} />
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		userinfo:state.userinfo
	}
}
function mapDispatchToProps(dispatch){
	return {

	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)