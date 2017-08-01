import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import HomeList from '../../../component/homeList'
import LoadMore from '../../../component/loadMore'

const initialState={
            data:[],
            hasMore:false,
            isLoadingMore:false,
            page:1
        }

class SearchList extends React.Component {
    constructor(){
        super()
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state=initialState
    }

    componentDidMount(){
        var myFetchOptions={
            method:'GET'
        }
        const keyword=this.props.keyword?'/'+this.props.keyword:''
        fetch('/api/search/0/' + this.props.userinfo.cityName+'/'+this.props.type+keyword ,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                hasMore:json.hasMore,
                data:json.data
            })
        })
    }

    componentDidUpdate(prevProps,prevState){
        const type=this.props.type
        var keyword=this.props.keyword

        if(keyword!==prevProps.keyword||type!==prevProps.type){
            var keyword=this.props.keyword?'/'+this.props.keyword:''
            var myFetchOptions={
                method:'GET'
            }
            fetch('/api/search/0/' + this.props.userinfo.cityName+'/'+this.props.type+keyword ,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    hasMore:json.hasMore,
                    data:json.data
                })
            })
        }
    }

    handleLoadMore(){
        this.setState({
            isLoadingMore:true
        })
        const cityName=this.props.userinfo.cityName
        const keyword=this.props.keyword?'/'+this.props.keyword:''
        var myFetchOptions={
            method:'GET'
        }
        console.log(this.state.data)
        fetch('/api/search/'+this.state.page + '/' +cityName+'/'+this.props.type+keyword,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                hasMore:json.hasMore,
                data:this.state.data.concat(json.data)
            })
        })
        console.log(this.state.data)
        this.setState({
            page:this.state.page+1,
            isLoadingMore:false
        })

    }

    render(){
        return(
            <div>                
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

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)