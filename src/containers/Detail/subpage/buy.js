import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import * as storeActions from '../../../actions/store'

import BuyAndStore from '../../../component/buyAndStore'

class Buy extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			isStore:false
		}
	}

	componentDidMount(){
		const id=this.props.id
		const store=this.props.store

		store.some(item=>{
			if (item.id===id) {
				this.setState({
					isStore:true
				})
			};
			return true;
		})
	}

	loginCheck(){
		const id=this.props.id
		const userinfo=this.props.userinfo
		if(!userinfo.username){
			hashHistory.push("/login/"+encodeURIComponent('/detail/' + id))
			return false
		}
		return true
	}

	handleBuy(){
		const loginFalg=this.loginCheck()
		if(!loginFalg){
			return
		}

		/*购买过程省略*/

		hashHistory.push('/user')
	}

	handleStore(){
		const loginFalg=this.loginCheck()
		if(!loginFalg){
			return
		}

		const id=this.props.id
		const storeActions=this.props.storeActions
		if(this.state.isStore){
			storeActions.rm({id:id})
		}else{
			storeActions.add({id:id})
		}

		this.setState({
			isStore:!this.state.isStore
		})
	}

	render(){
		return(
			<div>
				<BuyAndStore isStore={this.state.isStore} handleStore={this.handleStore.bind(this)} handleBuy={this.handleBuy.bind(this)} />
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		userinfo:state.userinfo,
		store:state.store
	}
}
function mapDispatchToProps(dispatch){
	return {
		storeActions:bindActionCreators(storeActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Buy)
