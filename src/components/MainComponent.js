import React, { Component } from 'react'
import {NavLink,Switch,Route,Redirect} from 'react-router-dom';
import Search from './Search';
import HomeComponent from './HomeComponent';
import Sort from './SortComponent';

class MainComponent extends Component {
    render() {
        const HomePage=()=>{
            return(
                <HomeComponent/>
            )
        }
        return (/*
            <div className="container">
            <div className="row">
            <div className="col-3 col-md-4"></div>
            <div className="col-2 col-md-1">
                <NavLink to='/home' >Home</NavLink>
            </div>
            <div className="col-2 col-md-1">
                <NavLink to='/search' >Search</NavLink>
            </div>
            <div className="col-2 col-md-1">
                <NavLink to='/sort' >Sort</NavLink>
            </div>*/
                <Switch>
                    <Route exact path='/Searching-Sorting-Visualizer/' component={HomePage} />
                    <Route path='/Searching-Sorting-Visualizer/search' component={Search} />
                    <Route path='/Searching-Sorting-Visualizer/sort' component={Sort} />
                    <Redirect to='/Searching-Sorting-Visualizer/' />
                </Switch>
//            </div>
//            </div>
        )
    }
}

export default MainComponent
