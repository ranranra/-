import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeList from '../../../component/homeList'
import LoadMore from '../../../component/loadMore'

import './style.scss'

export default class List extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			data:[],
			hasMore:false,
			isLoadingMore:false,
			page:1
		}
	}

	componentDidMount(){
		var myFetchOptions={
			method:'GET'
		}
		fetch('/api/homelist/' + encodeURIComponent(this.props.cityName) + '/0',myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				hasMore:json.hasMore,
				data:json.data
			})
		})
	}

	handleLoadMore(){
		this.setState({
			isLoadingMore:true
		})
		const cityName=this.props.cityName
		var myFetchOptions={
			method:'GET'
		}
		fetch('/api/homelist/' + encodeURIComponent(cityName) + '/'+this.state.page,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				hasMore:json.hasMore,
				data:this.state.data.concat(json.data)
			})
		})
		this.setState({
			page:this.state.page+1,
			isLoadingMore:false
		})

	}

	render(){
		return(
			<div>                
				<h2 className="home-list-title">猜你喜欢</h2>
				{
					this.state.data.length?
					<HomeList data={this.state.data} />:
					<div>加载中……</div>
				}
				{
					this.state.hasMore?
					<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.handleLoadMore.bind(this)} />:
					""
				}
			</div>
		)
	}
}
