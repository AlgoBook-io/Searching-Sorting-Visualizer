import React, { Component } from 'react'
import LinearParent from './linear_parent';
import BinaryParent from './Binary_parent';

class Search extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <h1>Linear Search Simulation</h1>
                        <br/>
                        <LinearParent/>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <h1>Binary Search Simulation</h1>
                        <br/>
                        <BinaryParent/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search