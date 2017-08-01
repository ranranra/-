import React, {Component} from 'react'
import ReactDOM, {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router'
import Store from './store/store'
import RouterMap from './router/route'

import './static/css/common.scss'
import './static/css/font.css'

const store=Store()


ReactDOM.render(
	<Provider store={store}>
		<RouterMap/>
	</Provider>,
	document.getElementById("root"),
	function(){
		console.log("OK")
	}
)