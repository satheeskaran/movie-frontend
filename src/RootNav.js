import React, { Fragment  } from 'react'
import logo from './logo.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import Home from './components/Pages/Home'
import AddMovie from './components/Pages/AddMovie'
import TopBar from './components/TopBar/TopBar'

import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";


const Root = () => {
  const user = useSelector(state => state.user)

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {user.isLogged ? (
            <Fragment>
              <TopBar/>
              <Route path="/home" component={Home} />
              <Route path="/addMovie" component={AddMovie} />
            </Fragment>
          ): (
            <Redirect to="/login"/>
          )}
        </Switch>
      </BrowserRouter>
  )
}

export default Root
