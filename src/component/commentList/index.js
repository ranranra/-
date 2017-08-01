import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Star from '../start'
import './style.scss'

export default class CommentList extends Component{
	constructor(){
		super()
		this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
        console.log(this.props.data)
        const CommentItem=this.props.data.length?
                            this.props.data.map((item,index)=>(
                                <div key={index} className="comment-item">
                                    <h3>
                                        <i className="icon-user"></i>
                                        &nbsp;
                                        {item.username}
                                    </h3>
                                    <Star star={item.star}/>
                                    <p>{item.comment}</p>
                                </div>
                            )):"have no"
		return(
			<div className="comment-list">
                {CommentItem}
            </div>
		)
	}
}