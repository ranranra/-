import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderItem from '../../../component/OrderItem'

import './style.scss'
export default class OrderList extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			data:[]
		}
	}

	componentDidMount(){
		const username=this.props.username
		if(username){
			var myFetchOptions={
				method:"GET"
			}
			fetch('/api/orderlist/' + username,myFetchOptions)
			.then(response=>response.json())
			.then(json=>{
				this.setState({
					data:json
				})
			})
		}
	}

	render(){
		const OrderListItem=this.state.data.length?
							this.state.data.map((item,index)=>(
								<OrderItem key={index} data={item} />
							)):'have no'
		return(
			<div className="order-list-container">
				<h1>您的订单</h1>
				{OrderListItem}
			</div>
		)
	}
}