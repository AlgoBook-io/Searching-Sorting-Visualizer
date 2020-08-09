import React, { Component } from 'react'
import LinearParent from './linear_parent';
import BinaryParent from './Binary_parent';
import InterpolationParent from './interpolation_parent';
import './myStyle.css';

class Search extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <h1 className="mainHeading">Linear Search</h1>
                        <br/>
                        <LinearParent/>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <h1 className="mainHeading">Binary Search</h1>
                        <br/>
                        <BinaryParent/>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <h1 className="mainHeading">Interpolation Search</h1>
                        <br/>
                        <InterpolationParent/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search