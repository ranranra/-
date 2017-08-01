import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'
export default class LoginForm extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			username:''
		}
	}

	handleChange(e){
		this.setState({
			username:e.target.value
		})
	}

	handleClick(){
		this.props.loginFn(this.state.username)
	}

	render(){
		return(
			<div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input type="text" placeholder="输入手机号" onChange={this.handleChange.bind(this)} value={this.state.username} />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"></i>
                    <button>发送验证码</button>
                    <input type="text" placeholder="输入验证码"/>
                </div>
                <button className="btn-login" onClick={this.handleClick.bind(this)}>登录</button>
            </div>
		)
	}
}
