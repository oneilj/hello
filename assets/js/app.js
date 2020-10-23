// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import "./react/src/app.js"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './react/src/components/Login'
import Test from './react/src/components/Test'

class HelloReact extends React.Component {
	render() {
	  return (
	    <Router>
	      <div>
	        <Route exact path="/" component={Home}/>
	        <Route path="/login" component={Login}/>
	        <Route path="/user/:user_id" component={Test}/>
	      </div>
	    </Router>
	  )
	}
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <Link to="/login">Login</Link>
      </div>
    )
  }
}


ReactDOM.render(
  <HelloReact/>,
  document.getElementById("hello-react")
)
