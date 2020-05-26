import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './myStyle.css'
import srchimg from './images/Search_img.png'
import sortimg from './images/Sortimg.png'

class HomeComponent extends Component {
    render() {
        return (
            <div className="container" style={{borderLeft:'1px outset black',borderRight:'1px groove black'}}>
            <div className="row">
            <div className="col-12">
                <br/>
                <h1 className="mainHeading">Searching and Sorting Visualizer</h1>
                <br/>
            </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                <center>
                <div className="card box" style={{width: '22rem',backgroundColor:'#fafafa'}}>
                <img className="card-img-top" style={{height:'138px'}} src={srchimg} alt="Searching image"/>
                <div className="card-body">
                    <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Searching Visualizer</h3>
                    <p style={{fontFamily: 'Georgia'}} className="card-text">A simple simulation of Linear Search and Binary Search on an array of integers meant for understanding them better.</p>
                    <center>
                    <NavLink to='/search' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Searching Algorithms</NavLink>
                    </center>
                </div>
                </div>
                </center>
                </div>
                <div className="col-12 col-md-6">
                <center>
                <div className="card box" style={{width: '22rem',backgroundColor:'#fafafa'}}>
                <img className="card-img-top" src={sortimg} alt="Sorting image"/>
                <div className="card-body">
                    <h3 className="card-title" style={{fontFamily:'Georgia'}}>Sorting Visualizer</h3>
                    <p style={{fontFamily: 'Georgia'}} className="card-text">Simulation of Bubble Sort, Selection Sort, Insertion Sort, Merge Sort and Quick Sort on randomly chosen data values.</p>
                    <center>
                    <NavLink to='/sort' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Sorting Algorithms</NavLink>
                    </center>
                </div>
                </div>
                </center>
                </div>
                </div>
                <div className="row">
                <div className="col-12">
                <br/><br/>
                </div>
                </div>
                <div className="row">
                    <div className="col-12 box" style={{backgroundColor:'#fafafa'}}>
                        The application is aimed to help the users better understand Searching and Sorting algorithms by visualizing the steps and realizing how the algorithm actually works. The data is randomly generated and can be changed by the click of a button. The number of data items and the speed(inverse of the transition delay) is left for the user to choose according to his/her convenience. There are also options to skip the remaining animations. The application is still under development and new algorithms will be added soon.
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent
