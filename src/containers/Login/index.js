import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'

import * as userInfoActions from '../../actions/userinfo'

import Header from '../../component/header'
import LoginForm from '../../component/LoginForm'

class Login extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			checking:true
		}
	}

	componentDidMount(){
		const userinfo=this.props.userinfo
		if(userinfo.username){
			this.goUserPage();
		}else{
			this.setState({
				checking:false
			})
		}
	}

	handleLogin(username){
		var userinfo=this.props.userinfo
		userinfo.username=username
		this.props.userInfoActions.update(userinfo)

		const router=this.props.params.router
		if(router){
			hashHistory.push(router)
		}else{
			this.goUserPage()
		}
	}

	goUserPage(){
		hashHistory.push('/user')
	}

	render(){
		return(
			<div>
				<Header title="登录" />
				{
					this.state.checking?
					<div>{/*等待中*/}</div>:
					<LoginForm loginFn={this.handleLogin.bind(this)} />
				}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		userinfo:state.userinfo
	}
}
function mapDispatchToProps(dispatch){
	return {
		userInfoActions:bindActionCreators(userInfoActions,dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)