import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeAd from '../../../component/homeAd'

export default class Ad extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			data:[]
		}
	}

	componentDidMount(){
		var myFetchOptions={
			method:"GET"
		}
		fetch("/api/homead",myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}

	render(){
		return (
			<div>
				{
					this.state.data.length?
					<HomeAd data={this.state.data} />:
					<div>加载中……</div>
				}
			</div>
		)
	}
}