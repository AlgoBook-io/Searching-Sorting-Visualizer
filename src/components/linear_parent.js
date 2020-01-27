import React, { Component } from 'react'
import Linear from './linear';
import './myStyle.css';

let arr=['372','5','4','1','6','7','54','6','32','8765','99'];
const n=arr.length;
class LinearParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
             index:0,
             start:0,
             flag:false,
             search:'',
             steps:' '
        }
    }
    check=()=>{
        this.setState({
            flag:true
        });
    }


    shouldComponentUpdate(nextProps,nextState){
        if(this.state.flag)
        return false;
        return true;
    }

    linearSearch(){
        if(this.state.search==='')
        return;
        if(this.state.index===n-1)
        {
            if(arr[n-1]!==this.state.search)
            this.setState({
                steps:"Search element not present in array",
                start:0
            })
            else{
                this.setState({
                    steps:`Search element present at position ${n-1}`,
                    start:0
                })
            }
            return;
        }
        if(this.state.flag===true)
        {
            this.setState((prev)=>({
                steps:`Search element found at position ${prev.index}`,
                start:0
            }),function(){
                this.forceUpdate();
            })
            return;
        }
        setTimeout(() => {
            this.setState(prev=>({
                index:prev.index+1,
                start:1,
//                steps:arr[prev.index]==prev.search && `Search element found at position: ${prev.index+1}`
            }))
        }, 200);
    }
    reset(){
        this.setState({
            flag:false,
            index: 0,
            start:0,
            search:'',
            steps:' '
            },function(){
            this.forceUpdate()
        });
    }

    searchElementChange=(event)=>{
        this.setState({
            search:event.target.value
        })
    }
    render() {
        let str=this.state.start===1? <button className="button button4" style={{padding:'5px 14px'}} onClick={this.linearSearch()}>Run</button> : <button className="button button4" style={{padding:'5px 14px'}} onClick={()=>this.linearSearch()}>Run</button>
        return (
            <div>
                <Linear ar={arr} index={this.state.index} srch={this.state.search} check={this.check}/>
                <br/><br/>
                <label>Enter Search Element</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' value={this.state.search} onChange={this.searchElementChange} className='txt txt2'></input>
                <br/>
                {str}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="button button4" type='submit' style={{padding:'5px 14px'}} onClick={()=>this.reset()}>Reset</button>
                <div id="steps">{this.state.steps}</div>
            </div>
        )
    }
}
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export default LinearParent