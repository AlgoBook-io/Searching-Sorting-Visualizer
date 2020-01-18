import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom';
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
        return (
            <div>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/search' component={Search} />
                    <Route path='/sort' component={Sort} />
                    <Redirect to='/home' />
                </Switch>
            </div>
        )
    }
}

export default MainComponent
