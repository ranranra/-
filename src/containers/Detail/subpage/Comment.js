import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CommentList from '../../../component/commentList'
import LoadMore from '../../../component/loadMore'

import './style.scss'

export default class Comment extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			data:[],
			page:0,
			hasMore:false,
			isLoadingMore:false
		}
	}

	componentDidMount(){
		var myFetchOptions={
			method:"GET"
		}
		const id=this.props.id
		const page=this.state.page
		fetch('/api/detail/comment/' + page + '/' + id,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				data:json.data,
				hasMore:json.hasMore
			})
		})
	}

	handleLoadMore(){
		this.setState({
			isLoadingMore:true
		})

		var myFetchOptions={
			method:"GET"
		}
		const id=this.props.id
		const page=this.state.page
		fetch('/api/detail/comment/' + page + '/' + id,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				page:this.state.page+1,
				data:this.state.data.concat(json.data),
				hasMore:json.hasMore
			})
			console.log(this.state.data)
			console.log(this.state.page)
		})

		this.setState({
			isLoadingMore:false
		})
	}

	render(){
		return(
			<div className="detail-comment-subpage">
				<h2>用户评价</h2>
				{
					this.state.data.length?
					<CommentList data={this.state.data} />:
					"have no"
				}
				{
					this.state.hasMore?
					<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.handleLoadMore.bind(this)} />
					:''
				}
			</div>
		)
	}
}