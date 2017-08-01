import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../component/header'
import Info from './subpage/Info'
import Comment from './subpage/Comment'
import Buy from './subpage/buy'

export default class Detail extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		const id=this.props.params.id
		return(
			<div>
				<Header title="商品详情" />
				<Info id={id} />
				<Buy id={id} />
				<Comment id={id} />
			</div>
		)
	}
}