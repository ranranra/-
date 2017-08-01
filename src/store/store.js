import {createStore} from 'redux'
import Reducer from '../reducers/index'

export default function Store(initialState){
	const store=createStore(Reducer,initialState)
	return store
}