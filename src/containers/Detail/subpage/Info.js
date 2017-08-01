import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DetailInfo from '../../../component/DetailInfo'

export default class Info extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			info:false
		}
	}

	componentDidMount(){
		const id=this.props.id
		var myFetchOptions={
			method:"GET"
		}
		fetch('/api/detail/info/' + id,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				info:json
			})
		})
	}

	render(){
		return(
			<div>
				{
					this.state.info?
					<DetailInfo data={this.state.info} />:
					"have no"
				}
			</div>
		)
	}
}