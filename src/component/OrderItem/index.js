import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'
export default class OrderList extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			data:[],
			commentState:0
		}
	}

	componentDidMount(){
		this.setState({
			commentState:this.props.data.commentState
		})

	}

	handlePing(){
		this.setState({
			commentState:1
		})
	}

	handleSubmit(){
		const comment=this.refs.commentText.value.trim()
		var myFetchOptions={
			method:"POST",
			headers: {
	            'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: 'id='+this.props.data.id+'&comment='+encodeURIComponent(comment)
		}
		fetch('/api/submitComment',myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			if(json.errno===0){
				this.setState({
					commentState:2
				})
			}
		})
	}

	handleCancle(){
		this.setState({
			commentState:0
		})
	}

	render(){
		const item =this.props.data
		return(
			<div className="clear-fix order-item-container">
                <div className="order-item-img float-left">
                    <img src={item.img}/>
                </div>
                <div className="order-item-comment float-right">
                	{
                		this.state.commentState===0?
                    	<button className="btn" onClick={this.handlePing.bind(this)}>评价</button>:
                    	(
                    		this.state.commentState===1?
                    		'':
                    		<button className="btn unseleted-btn">已评价</button>
                    	)
                	}
                </div>
                <div className="order-item-content">
                    <span>商户：{item.title}</span>
                    <span>数量：{item.count}</span>
                    <span>价格：￥{item.price}</span>
                </div>
                {
                	this.state.commentState===1
                	?<div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px',marginTop:'10px', outline:'none'}} className="comment-text" ref="commentText"></textarea>
                        <button className="btn" onClick={this.handleSubmit.bind(this)}>提交</button>
                        &nbsp;
                        <button className="btn unseleted-btn" onClick={this.handleCancle.bind(this)} >取消</button>
                    </div>
                	:''
                }
            </div>
		)
	}
}