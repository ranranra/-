import React,{Component} from 'react'
import {Router, Route, IndexRoute,hashHistory} from 'react-router'

import App from '../containers'
import Home from '../containers/Home'
import City from '../containers/City'
import Detail from '../containers/Detail'
import User from '../containers/User'
import Search from '../containers/Search'
import Login from '../containers/Login'
import NotFound from '../containers/NotFound'

export default class RouterMap extends Component{
	render(){	
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}></IndexRoute>
					<Route path="/city" component={City} />
					<Route path="/user" component={User} />
					<Route path="/search/:type(/:keyword)" component={Search} />
					<Route path="/detail/:id" component={Detail} />
					<Route path="/login(/:router)" component={Login} />
					<Route path="*" component={NotFound} />
				</Route>
			</Router>
		)
	}
}