import React, { Component } from 'react'
import Interpolation from './interpolation';
import './myStyle.css';
let ar=['-4','5','53','66','96','100','200','326','646','777','932'];
let n=ar.length;

class InterpolationParent extends Component{
    constructor(props){
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

    interpolationSearch(){
        if(this.state.search==='')
        return;
        if(this.state.l>this.state.r || parseInt(this.state.search) < ar[this.state.l] || parseInt(this.state.search) > ar[this.state.r])
        {
            this.setState({
                steps:'Search element not present in array',
                start:0
            },function(){
                this.forceUpdate();
            })
            return;
        }
        if(this.state.l === this.state.r)
        {
            if(ar[this.state.l] === parseInt(this.state.search)){
                this.setState(prev=>({
                    flag:true,
                    start:0,
                    steps:`Search element found at position ${this.state.l}`
                }))
                return;
            }
            else{
                this.setState({
                    steps:'Search element not present in array',
                    start:0
                },function(){
                    this.forceUpdate();
                })
                return;
            }
        }
        if(this.state.flag===true)
        return;
        setTimeout(() => {
            let pos  = this.state.l + Math.floor(((Math.round(this.state.r - this.state.l) / ( ar[this.state.r] - ar[this.state.l])) * ( parseInt(this.state.search) - ar[this.state.l])));
            console.log(this.state.search+" "+ar[pos]);
            if(parseInt(this.state.search)>parseInt(ar[pos]))
            {
                this.setState(prev=>({
                    l:pos+1,
                    start:1,
//                    steps:'l= '+this.state.l+' r= '+this.state.r+' pos= '+pos+' x > ar[pos]'
                }),function(){
                    console.log("D "+this.state.l);
                })
            }
            else if(parseInt(this.state.search)<parseInt(ar[pos])){
                this.setState(prev=>({
                    r:pos-1,
                    start:1,
//                    steps:`l= ${this.state.l} r= ${this.state.r} pos= ${pos} x < ar[pos]`
                }),function(){
                    console.log("S "+this.state.r);
                })
            }
            else
            {
                this.setState(prev=>({
                    flag:true,
                    start:0,
                    steps:`Search element found at position ${pos}`
                }))
            }
        }, 1500);
    }

    searchElementChange=(event)=>{
        this.setState({
            search:event.target.value
        })
    }

    removeItem=(index)=>{
        ar.splice(index, 1);
        n = ar.length;
        this.setState({
            r: n-1
        })
    }

    addItem=()=>{
        if(this.title.value !== ''){
            var el = parseInt(this.title.value);
            n = ar.length;
            ar.splice(this.findLoc(el, ar, 0, n - 1) + 1, 0, this.title.value);
            n = ar.length;
            this.setState({
                r: n-1
            })
            this.title.value = '';
        }
    }

    findLoc=(el, arr, st, en)=>{
        if (en === st){
            if (ar[en] > el) return (en - 1);
            else return en;
        }
        if (ar[st] >= el) return (st - 1);
        if (ar[en] <= el) return en;
        var pos  = st + Math.floor(((Math.round(en - st) / ( ar[en] - ar[st])) * ( el - ar[st])));
        if (en - st <= 1 || parseInt(arr[pos]) == el) return pos;
        if (parseInt(arr[pos]) < el) {
            return this.findLoc(el, arr, pos + 1, en);
        }
        if (parseInt(arr[pos]) > el) {
            return this.findLoc(el, arr, st, pos - 1);
        }
    }

    render(){
        let str=this.state.start===1? <button className="button button4" style={{padding:'5px 14px'}} onClick={this.interpolationSearch()}>Run</button> : <button className="button button4" style={{padding:'5px 14px'}} onClick={()=>this.interpolationSearch()}>Run</button>
        let items = ar.map((n, index) => {return(<span id="items" key={index}>{n} <button key={index} onClick={() => {this.removeItem(index)}} type="button" className="close"><span>&times;</span></button></span>)})
        return (
            <center>
                <div>
                    <div className="container main-container">
                        <Interpolation l={this.state.l} r={this.state.r} ar={ar} srch={this.state.search} />
                        <br/><br/>
                        <div className="row ml-2">
                            <label style={{fontFamily:'Georgia', paddingTop: '10px'}}>Elements are: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {items}
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-sm-4 col-lg-3 col-xl-2 text-sm-right">
                                <label style={{fontFamily:'Georgia'}}>Add New Element</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="col-12 col-sm-8 col-lg-9 col-xl-10 text-sm-left">
                                <input type='text' ref={(c) => this.title = c} name="title" className='txt txt2'></input>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="button button4" type='submit' style={{padding:'5px 14px'}} onClick={()=>this.addItem()}>Add</button>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <label style={{fontFamily:'Georgia'}}>Enter Search Element</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default InterpolationParent