import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'

export default class LoadMore extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	componentDidMount(){
		let timeoutId
		const wrapper=this.refs.wrapper
		const loadMoreFn=this.props.loadMoreFn
		function callback(){
			const top=wrapper.getBoundingClientRect().top
			const windowHeight=window.screen.height
			if(top&&top<windowHeight){
				loadMoreFn()
			}
		}
		window.addEventListener("scroll",function(){
			if(this.props.isLoadingMore){
				return
			}
			if(timeoutId){
				clearTimeout(timeoutId)
			}
			timeoutId=setTimeout(callback,50)
		}.bind(this),false)
	}

	loadMoreHandle(){
		this.props.loadMoreFn()
	}

	render(){
		return(
			<div className="load-more" ref="wrapper">                
				{
					this.props.isLoadingMore?
					<span>加载中……</span>:
					<span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
				}
			</div>
		)
	}
}
