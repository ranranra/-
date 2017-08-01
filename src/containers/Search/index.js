import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../component/searchHeader'
import SearchList from './subpage/searchList'

export default class Search extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		return(
			<div>
				<SearchHeader keyword={this.props.params.keyword}/>
				<SearchList keyword={this.props.params.keyword} type={this.props.params.type} />
			</div>
		)
	}
}