import React, { Component } from 'react'
import './myStyle.css';

class Interpolation extends Component{
    render(){
        const {l,r,ar,srch}=this.props;
        let pos  = l + Math.floor(((Math.round(r - l) / ( ar[r] - ar[l])) * ( srch - ar[l])));

        const ui=ar.map((x,index)=>{
            if(pos===index)
            {
                if(ar[pos]===srch)
                    return(<div key={index} className="def green col-2 col-sm-2 col-md-1 align-self-center">{x}</div>);
                else
                    return(<div key={index} className="def red col-2 col-sm-2 col-md-1 align-self-center">{x}</div>);
            }
            else
            {
                if(index===l)
                return(<div key={index} className="def lblue col-2 col-sm-2 col-md-1 align-self-center">{x}</div>);
                else if(index===r)
                return(<div key={index} className="def lblue col-2 col-sm-2 col-md-1 align-self-center">{x}</div>);
                else if(index>l&&index<r)
                return(<div key={index} className="def inrange col-2 col-sm-2 col-md-1 align-self-center">{x}</div>);
                else
                return(<div key={index} className="def q col-2 col-sm-2 col-md-1 align-self-center">{x}</div>);
            }
        });

        return (
            <center>
            <div className="mystl container">
                <div className="row">
                    {ui}
                </div>
            </div>
            </center>
        )
    }
}

export default Interpolation