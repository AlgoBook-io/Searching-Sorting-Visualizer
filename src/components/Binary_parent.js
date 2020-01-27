import React, { Component } from 'react'
import Binary from './binary';
import './myStyle.css';
const ar=['-4','5','53','66','96','100','200','326','646','777','932'];
const n=ar.length;


class BinaryParent extends Component {
    constructor(props) {
        super(props)
        this.state = {
             l:0,
             r:n-1,
             start:0,
             search:'',
             flag:false,
             steps:' '
        }
    }
    
    check=()=>{
        this.setState({
            flag:true
        })
    }
    shouldComponentUpdate(nextProps,nextState){
            if(this.state.flag)
            return false;
            return true;
    }

    reset=()=>{
        this.setState({
             l:0,
             r:n-1,
             start:0,
             search:'',
             flag:false,
             steps:' '
        },function(){
            this.forceUpdate()
        })
    }

    binarySearch(){
        if(this.state.search==='')
        return;
        if(this.state.l>this.state.r)
        {
            this.setState({
                steps:'Search element not present in array',
                start:0
            },function(){
                this.forceUpdate();
            })
            return;
        }
        if(this.state.flag===true)
        return;
        setTimeout(() => {
            let mid=Math.floor((this.state.l+this.state.r)/2);
            console.log(this.state.search+" "+ar[mid]);
            if(parseInt(this.state.search)>parseInt(ar[mid]))
            {
                this.setState(prev=>({
                    l:mid+1,
                    start:1,
//                    steps:'l= '+this.state.l+' r= '+this.state.r+' mid= '+mid+' x > ar[mid]'
                }),function(){
                    console.log("D "+this.state.l);
                })
            }
            else if(parseInt(this.state.search)<parseInt(ar[mid])){
                this.setState(prev=>({
                    r:mid-1,
                    start:1,
//                    steps:`l= ${this.state.l} r= ${this.state.r} mid= ${mid} x < ar[mid]`
                }),function(){
                    console.log("S "+this.state.r);
                })
            }
            else
            {
                this.setState(prev=>({
                    flag:true,
                    start:0,
                    steps:`Search element found at position ${mid}`
                }))
            }
        }, 1500);
    }

    searchElementChange=(event)=>{
        this.setState({
            search:event.target.value
        })
    }

    render() {
        let str=this.state.start===1? <button className="button button4" style={{padding:'5px 14px'}} onClick={this.binarySearch()}>Run</button> : <button className="button button4" style={{padding:'5px 14px'}} onClick={()=>this.binarySearch()}>Run</button>
        return (
            <center>
            <div>
                <Binary l={this.state.l} r={this.state.r} ar={ar} srch={this.state.search} check={this.state.check} />
                <br/><br/>
                <label>Enter Search Element</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' value={this.state.search} onChange={this.searchElementChange} className='txt txt2'></input>
                <br/>
                {str}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="button button4" type='submit' style={{padding:'5px 14px'}} onClick={()=>this.reset()}>Reset</button>
                <div id="steps">{this.state.steps}</div>
            </div>
            </center>
        )
    }
}

export default BinaryParent
