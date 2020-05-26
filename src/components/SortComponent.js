import React, { Component } from 'react'
import './sort.css';
import './myStyle.css';
//import {mergeSortAnimations} from './MergeSort'
var bubblectr=0;
var sorted=false;
var width=50;
var reset=true;
var color1='rgb(0, 204, 0)';
var timeouts=[]
var skip=false
//var ctr1=0;
class BubbleSort extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ar:[],
             n:20,
             delay:250
        }
        this.resetArray=this.resetArray.bind(this);
    }

    componentDidMount(){
        this.changeArrSize();
        reset=true;
        sorted=false;
        document.getElementById('skip').disabled=true;
    }
    componentDidUpdate(){
        if(skip===true)
        {
            for(let i=0;i<this.state.n;i++)
            {
                const arr_bar=document.getElementsByClassName('array-bar');
                arr_bar[i].style.backgroundColor='blue';
            }
        }
//        else console.log("ASDDF");
    }
    resetCSS(){
        let arr=this.state.ar;
            arr.sort(function(a, b){return a - b});
            this.setState({
                ar:arr
            })
        for(let i=0;i<this.state.n;i++)
        {
            const arr_bar=document.getElementsByClassName('array-bar');
            arr_bar[i].style.backgroundColor='blue';
        }
    }

    resetArray(){
        reset=true;
        sorted=false;

        let array = [];
        for (let i = 0; i < this.state.n; i++) {
            array.push(randomIntFromInterval(5, 480));
        }
        array[randomIntFromInterval(0,this.state.n-1)]=480
        this.setState({
            ar:array
        });
        if(bubblectr===1)
        for(let i=0;i<this.state.n;i++)
        {
            const arr_bar=document.getElementsByClassName('array-bar');
            arr_bar[i].style.transform='translateX(0px)';
            arr_bar[i].style.backgroundColor='blue';
        }
        bubblectr=1;
    }
    
    buttons(x,dly){
        document.getElementById('reset').disabled=x;
        document.getElementById('selectionsort').disabled=x;
        document.getElementById('bubblesort').disabled=x;
        document.getElementById('insertionsort').disabled=x;
        document.getElementById('mergesort').disabled=x;
        document.getElementById('quicksort').disabled=x;
        document.getElementById('arr_size').disabled=x;
        document.getElementById('delay').disabled=x;
        document.getElementById('skip').disabled=!x;
        const arr_bar=document.getElementsByClassName('array-bar');
        if(x===true)
        {
            for(let i=0;i<this.state.n;i++)
            {
                arr_bar[i].style.transform='translateX(0px)';
                arr_bar[i].style.backgroundColor='blue';
            }
        }
        else{
            setTimeout(() => {
                for(let i=0;i<this.state.n;i++)
                {
                    arr_bar[i].style.backgroundColor='blue';
                }
            }, 1000);
        }
        sorted= !x;
    }

    changeArrSize(){
        var x=document.getElementById('arr_size');
        bubblectr=0;
        let wdth=.8*window.innerWidth;
        let n1=Math.floor(x.value*3.6);
//doubt about width formula
        width=Math.floor(wdth/n1)-2;
        this.setState({
            n:n1
        },function(){
            this.resetArray();
            const arr_bar=document.getElementsByClassName('array-bar');
            if(typeof arr_bar==='undefined')
            for(let i=0;i<this.state.n;i++)
            {
                arr_bar[i].style.backgroundColor='blue';
            }
        })
    }

    changeDelay(){
        let x=document.getElementById('delay');
        let val;
        if(x.value>=1450)
        val=.05;
        else if(x.value>=1350)
        val=.1;
        else if(x.value>=1250)
        val=.25;
        else if(x.value>=1150)
        val=.5;
        else if(x.value>1000)
        val=.75;
        else val=1001-x.value;
        this.setState({
            delay:val
        },function(){
            if(sorted===true)
            {
                let arr=this.state.ar;
                arr.sort(function(a, b){return a - b});
                this.setState({
                    ar:arr
                })
            }
            for(let i=0;i<this.state.n;i++)
            {
                const arr_bar=document.getElementsByClassName('array-bar');
                arr_bar[i].style.backgroundColor='blue';
            }
        })
    }

    skipAnimations(){
        skip=true;
        for(let i=0;i<timeouts.length;i++)
        window.clearTimeout(timeouts[i]);
        const arr_bar=document.getElementsByClassName('array-bar');
        for(let i=0;i<this.state.n;i++)
        {
            arr_bar[i].style.transform='translateX(0px)';
            arr_bar[i].style.backgroundColor=color1;
        }
        let arr=this.state.ar;
        arr.sort(function(a, b){return a - b});
        this.setState({
            ar:arr
        })
        this.buttons(false,800);
        timeouts=[];
        skip=false;
    }

    //Bubble Sort
    BubbleSortAnimations(){
        let animations=[];
        let ar=this.state.ar;
        for(let i=0;i<this.state.n-1;i++)
        {
            for(let j=0;j<this.state.n-1-i;j++)
            {
                if(ar[j]>ar[j+1])
                {
                    animations.push({
                        i:j,
                        j:j+1,
                        color:'red',
                        swap:false
                    })
                    let t=ar[j];
                    ar[j]=ar[j+1];
                    ar[j+1]=t;
                    animations.push({
                        i:j,
                        j:j+1,
                        color:'green',
                        swap:true
                    })
                    animations.push({
                        i:j,
                        j:j+1,
                        color:'green',
                        swap:false
                    })
                }
                else{
                    animations.push({
                        i:j,
                        j:j+1,
                        color:'green',
                        swap:false
                    })
                }
            }
            animations.push({
                i:this.state.n-1-i,
                j:-1,
                color:'orange',
                swap:false
            })
        }
        animations.push({
            i:0,
            j:-1,
            color:'orange',
            swap:false
        })
        return animations;
    }

    bubbleSort()
    {
        timeouts=[]
        if(reset===false)
        this.resetCSS();
        this.buttons(true,0);
        const animations=this.BubbleSortAnimations();
        let ptr=[];
        for(let i=0;i<this.state.ar.length;i++)
        ptr[i]={
            i:i,
            ctr:0
        };
        let len=animations.length;
        const arr_bar=document.getElementsByClassName('array-bar');
        for(let i=0;i<len;i++)
        {
            let idx1=animations[i].i;
            let idx2=animations[i].j;
            if(idx2===-1)
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=color1;
                    if(idx1>0 && arr_bar[ptr[idx1-1].i].style.backgroundColor==='palegreen')
                    arr_bar[ptr[idx1-1].i].style.backgroundColor='blue';
                }, i*this.state.delay);
                timeouts.push(qq)
                continue;
            }
            if(animations[i].swap===true)
            {
                let qq=setTimeout(() => {
                         ptr[idx1].ctr+=1;
                         let y=ptr[idx1].ctr*(width+2);
                         arr_bar[ptr[idx1].i].style.transform=`translateX(${y}px)`
                         ptr[idx2].ctr-=1;
                         y=ptr[idx2].ctr*(width+2);
                         arr_bar[ptr[idx2].i].style.transform=`translateX(${y}px)`
                         let tm=ptr[idx1];
                         ptr[idx1]=ptr[idx2];
                         ptr[idx2]=tm;
                         arr_bar[ptr[idx1].i].style.backgroundColor='palegreen';
                         arr_bar[ptr[idx2].i].style.backgroundColor='palegreen';
                     }, i*this.state.delay);
                     timeouts.push(qq);
            }
            else
            {
                if(animations[i].color==='green')
                {
                    let qq=setTimeout(() => {
                        if(idx1>0&&arr_bar[ptr[idx1-1].i].style.backgroundColor==='palegreen')
                        arr_bar[ptr[idx1-1].i].style.backgroundColor='blue';
                        arr_bar[ptr[idx1].i].style.backgroundColor='palegreen';
                        arr_bar[ptr[idx2].i].style.backgroundColor='palegreen';
                    }, i*this.state.delay);
                    timeouts.push(qq);
                }
                else
                {
                    let qq=setTimeout(() => {
                        if(idx1>0&&arr_bar[ptr[idx1-1].i].style.backgroundColor==='palegreen')
                        arr_bar[ptr[idx1-1].i].style.backgroundColor='blue';
                        arr_bar[ptr[idx1].i].style.backgroundColor='red';
                        arr_bar[ptr[idx2].i].style.backgroundColor='red';
                    }, i*this.state.delay);
                    timeouts.push(qq);
                }
            }
        }
        let qq=setTimeout(() => {
            this.buttons(false,(animations.length)*this.state.delay);
            reset=false;
        }, (animations.length)*this.state.delay);
        timeouts.push(qq);
    }

    //Selection Sort
    selectionSortAnimations(){
        let animations=[]
        let ar=this.state.ar
        for(let i=0;i<this.state.n;i++)
        {
            let min=1000000001,minpos;
            for(let j=i+1;j<this.state.n;j++)
            {
                if(min>ar[j])
                {
                    min=ar[j];
                    minpos=j;
                    animations.push({
                        i:i,
                        j:j,
                        color:'orange'
                    })
                }
                else{
                    animations.push({
                        i:i,
                        j:j,
                        color:'palegreen'
                    })
                }
            }
            animations.push({
                i:-1,
                j:0,
                color:'dummy'
            })
            if(ar[i]>ar[minpos])
            {
                let temp=ar[i];
                ar[i]=ar[minpos];
                ar[minpos]=temp;
                animations.push({
                    i:i,
                    j:minpos,
                    color:'swap'
                })
            }
            animations.push({
                i:i,
                j:-1,
                color:'green'
            })
        }
        return animations;
    }

    selectionSort(){
        timeouts=[]
        if(reset===false)
        this.resetCSS();
        this.buttons(true,0);
        const animations=this.selectionSortAnimations();
        let ptr=[];
        let previdx=-1;
        for(let i=0;i<this.state.ar.length;i++)
        ptr[i]={
            i:i,
            ctr:0
        };
        let len=animations.length;
        const arr_bar=document.getElementsByClassName('array-bar');
        for(let i=0;i<len;i++)
        {
            let idx1=animations[i].i;
            let idx2=animations[i].j;
            if(idx1===-1)
            {
                let qq=setTimeout(() => {
                    if(arr_bar[ptr[this.state.n-1].i].style.backgroundColor==='palegreen')
                    arr_bar[ptr[this.state.n-1].i].style.backgroundColor='blue';
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(idx2===-1)
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=color1;
                }, i*this.state.delay);
                previdx=-1;
                timeouts.push(qq);
            }
            else
            {
                if(animations[i].color==='swap')
                {
                    let qq=setTimeout(() => {
                        ptr[idx1].ctr+=idx2-idx1;
                        let y=ptr[idx1].ctr*(width+2);
                        arr_bar[ptr[idx1].i].style.transform=`translateX(${y}px)`
                        ptr[idx2].ctr-=idx2-idx1;
                        y=ptr[idx2].ctr*(width+2);
                        arr_bar[ptr[idx2].i].style.transform=`translateX(${y}px)`
                        let tm=ptr[idx1];
                        ptr[idx1]=ptr[idx2];
                        ptr[idx2]=tm;
                        arr_bar[ptr[idx1].i].style.backgroundColor='palegreen';
                        arr_bar[ptr[idx2].i].style.backgroundColor='blue';
                    }, i*this.state.delay);
                    timeouts.push(qq);
                }
                else
                {
                    if(animations[i].color==='palegreen')
                    {
                        let qq=setTimeout(() => {
                            arr_bar[ptr[idx1].i].style.backgroundColor='palegreen';
                            arr_bar[ptr[idx2].i].style.backgroundColor='palegreen';
                            if(arr_bar[ptr[idx2-1].i].style.backgroundColor==='palegreen')
                            arr_bar[ptr[idx2-1].i].style.backgroundColor='blue';
                        }, i*this.state.delay);
                        timeouts.push(qq);
                    }
                    else
                    {
                        let qq=setTimeout(() => {
                            arr_bar[ptr[idx1].i].style.backgroundColor='palegreen';
                            if(previdx>=0&&arr_bar[previdx].style.backgroundColor==='orange')
                            arr_bar[previdx].style.backgroundColor='blue';
                            previdx=ptr[idx2].i;
                            arr_bar[ptr[idx2].i].style.backgroundColor='orange';
                            if((ptr[idx2-1].i !== ptr[idx1].i) && (arr_bar[ptr[idx2-1].i].style.backgroundColor==='palegreen' || arr_bar[ptr[idx2-1].i].style.backgroundColor==='orange'))
                            arr_bar[ptr[idx2-1].i].style.backgroundColor='blue';
                        }, i*this.state.delay);
                        timeouts.push(qq);
                    }
                }
            }
        }
        let qq=setTimeout(() => {
            this.buttons(false,(animations.length)*this.state.delay);
            reset=false;
        }, (animations.length)*this.state.delay)
        timeouts.push(qq);
    }

    //Insertion Sort
    insertionSortAnimations(){
        let animations=[]
        let ar=this.state.ar;
        for(let i=0;i<this.state.n;i++)
        {
            let j=i;
            animations.push({
                i:i,
                j:-2,
                color:'red'
            })
            while(j>0 && ar[j]<ar[j-1])
            {
                animations.push({
                    i:j,
                    j:j-1,
                    color:'swap'
                })
                animations.push({
                    i:-1,
                    j:-1,
                    color:'delay'
                })
                let temp=ar[j];
                ar[j]=ar[j-1];
                ar[j-1]=temp;
                j--;
            }
            animations.push({
                i:j,
                j:-1,
                color:'green'
            })
        }
        return animations;
    }

    insertionSort(){
        timeouts=[]
        if(reset===false)
        this.resetCSS();
        this.buttons(true,0);
        const animations=this.insertionSortAnimations();
        let ptr=[];
        for(let i=0;i<this.state.ar.length;i++)
        ptr[i]={
            i:i,
            ctr:0
        };
        let len=animations.length;
        const arr_bar=document.getElementsByClassName('array-bar');
        for(let i=0;i<len;i++)
        {
            let idx1=animations[i].i;
            let idx2=animations[i].j;
            if(idx1===-1)
            {
                let qq=setTimeout(() => {
                    
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(idx2===-1)
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=color1;
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(animations[i].color==='red')
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor='red';
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else
            {
                let qq=setTimeout(() => {
                    ptr[idx1].ctr+=idx2-idx1;
                    let y=ptr[idx1].ctr*(width+2);
                    arr_bar[ptr[idx1].i].style.transform=`translateX(${y}px)`
                    ptr[idx2].ctr-=idx2-idx1;
                    y=ptr[idx2].ctr*(width+2);
                    arr_bar[ptr[idx2].i].style.transform=`translateX(${y}px)`
                    let tm=ptr[idx1];
                    ptr[idx1]=ptr[idx2];
                    ptr[idx2]=tm;
                    arr_bar[ptr[idx2].i].style.backgroundColor='red';
                }, i*this.state.delay);
                timeouts.push(qq);
            }
        }
        let qq=setTimeout(() => {
            this.buttons(false,(animations.length)*this.state.delay);
            reset=false;
        }, (animations.length)*this.state.delay);
        timeouts.push(qq);
    }

    //Merge Sort
    mergeSortAnimations(ar){
        const animation=[]
        if(ar.length===1)
        return animation
        this.mergeSort1(ar,0,ar.length-1,animation)
        return animation
    }
    mergeSort1(ar,l,r,animation){
        if(l<r)
        {
            let mid=Math.floor((l+r)/2)
            this.mergeSort1(ar,l,mid,animation)
            this.mergeSort1(ar,mid+1,r,animation)
            this.merge(ar,l,r,mid,animation)
        }
    }
    
    merge(ar,l,r,mid,animation){
        let i=l,j=mid+1,k=l
        let i1=l,j1=mid+1
        while(i1<=mid && j1<=r)
        {
            animation.push({
                i:i,
                j:j,
                color:'palegreen'
            })
            if(ar[i]<=ar[j])
            {
                animation.push({
                    i:i,
                    j:j,
                    color:'blue'
                })
                i++
                k++
                i1++
            }
            else{
                animation.push({
                i:k,
                j:j,
                color:'swap'
                })
                animation.push({
                    i:k,
                    j:j,
                    color:'blue'
                })
                let tmp=ar[j]
                for(let z=j;z>i;z--)
                ar[z]=ar[z-1]
                ar[i]=tmp
                i++
                j++
                j1++
                k++;
            }
        }
        while(i<=mid)
        {
            animation.push({
                i:i,
                j:-1,
                color:'palegreen'
            })
            animation.push({
                i:i,
                j:-1,
                color:'blue'
            })
            i++;
        }
        while(j<=r)
        {
            animation.push({
                i:j,
                j:-1,
                color:'palegreen'
            })
            animation.push({
                i:j,
                j:-1,
                color:'blue'
            })
            j++;
        }
    }
    mergeSort(){
        timeouts=[]
        if(reset===false)
        this.resetCSS();
        this.buttons(true,0);
        let animations=this.mergeSortAnimations(this.state.ar);
        let ptr=[];
        let previdx=-1;
        for(let i=0;i<this.state.ar.length;i++)
        ptr[i]={
            i:i,
            ctr:0
        };
        let len=animations.length;
        let arr_bar=document.getElementsByClassName('array-bar');
        for(let i=0;i<len;i++)
        {
            let idx1=animations[i].i;
            let idx2=animations[i].j;
            if(idx2===-1)
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=animations[i].color
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(animations[i].color==='swap')
            {
                let qq=setTimeout(() => {
                for(let pq=idx1;pq<idx2;pq++)
                {
                    ptr[pq].ctr+=1
                    let y=ptr[pq].ctr*(width+2);
                    arr_bar[ptr[pq].i].style.transform=`translateX(${y}px)`
                }
                ptr[idx2].ctr-=idx2-idx1;
                let y=ptr[idx2].ctr*(width+2);
                arr_bar[ptr[idx2].i].style.transform=`translateX(${y}px)`
                let pqq=ptr[idx2]
                for(let pq=idx2-1;pq>=idx1;pq--)
                ptr[pq+1]=ptr[pq];
                ptr[idx1]=pqq
                for(let it=0;it<this.state.n;it++)
                if(arr_bar[it].style.backgroundColor==='palegreen')
                arr_bar[it].style.backgroundColor='blue'
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=animations[i].color
                    arr_bar[ptr[idx2].i].style.backgroundColor=animations[i].color
                }, i*this.state.delay);
                timeouts.push(qq);
            }
        }
        let qq=setTimeout(() => {
            for(let it=0;it<this.state.n;it++)
            arr_bar[it].style.backgroundColor=color1
        }, animations.length*this.state.delay);
        timeouts.push(qq);
        qq=setTimeout(() => {
            this.buttons(false,(animations.length)*this.state.delay);
            reset=false;
        }, (animations.length+1)*this.state.delay);
        timeouts.push(qq);
    }

    //quick sort
    quickSortAnimations(ar){
        const animation=[]
        this.quickSort1(ar,0,ar.length-1,animation)
        return animation
    }
    quickSort1(ar,low,high,animation){
        console.log(low+" "+high);    
        if(low===high)
            animation.push({
                i:low,
                j:-1,
                color:color1
            })
            else if(low<high){
                let par=this.partition(ar,low,high,animation)
                animation.push({
                    i:-1,
                    j:-1,
                    color:'clean'
                })
                this.quickSort1(ar,low,par-1,animation)
                this.quickSort1(ar,par+1,high,animation)
            }
        }
    partition(ar,low,high,animation){
        let pivot=ar[high]
        let i=low-1;
        animation.push({
            i:high,
            j:-1,
            color:'yellow'
        })
        for(let j=low;j<high;j++)
        {
            animation.push({
                i:j,
                j:-1,
                color:'palegreen'
            })
            if(ar[j]<=pivot)
            {
                i++;
                animation.push({
                    i:i,
                    j:j,
                    color:'swap'
                })
                let tmp=ar[i]
                ar[i]=ar[j]
                ar[j]=tmp;
                animation.push({
                    i:i,
                    j:j,
                    color:'op'//op=orangepurple
                })
            }
            else{
                animation.push({
                    i:j,
                    j:-1,
                    color:'orange'
                })
            }
        }
        animation.push({
            i:i+1,
            j:high,
            color:'swap'
        })
        let tmp=ar[i+1]
        ar[i+1]=ar[high]
        ar[high]=tmp
        animation.push({
            i:i+1,
            j:-1,
            color:color1
        })
        return i+1;
    }

    quickSort(){
        timeouts=[]
        if(reset===false)
        this.resetCSS();
        this.buttons(true,0);
        let animations=this.quickSortAnimations(this.state.ar);
//        return;
        let ptr=[];
        for(let i=0;i<this.state.ar.length;i++)
        ptr[i]={
            i:i,
            ctr:0
        };
        let len=animations.length;
        const arr_bar=document.getElementsByClassName('array-bar');
        for(let i=0;i<len;i++)
        {
            let idx1=animations[i].i;
            let idx2=animations[i].j;
            if(animations[i].color==='clean')
            {
                let qq=setTimeout(() => {
                    for(let it=0;it<this.state.n;it++)
                    {
                        if(arr_bar[ptr[it].i].style.backgroundColor!==color1){
                        arr_bar[ptr[it].i].style.backgroundColor='blue'
                        }
                    }
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(idx2===-1)
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=animations[i].color;
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(animations[i].color==='swap')
            {
                let qq=setTimeout(() => {
                    ptr[idx1].ctr+=idx2-idx1;
                    let y=ptr[idx1].ctr*(width+2);
                    arr_bar[ptr[idx1].i].style.transform=`translateX(${y}px)`
                    ptr[idx2].ctr-=idx2-idx1;
                    y=ptr[idx2].ctr*(width+2);
                    arr_bar[ptr[idx2].i].style.transform=`translateX(${y}px)`
                    let tm=ptr[idx1];
                    ptr[idx1]=ptr[idx2];
                    ptr[idx2]=tm;
                }, i*this.state.delay);
                timeouts.push(qq);
            }
            else if(animations[i].color===color1)
            {
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor=color1
                    for(let it=0;it<this.state.n;it++)
                    {
                        if(arr_bar[ptr[it].i].style.backgroundColor!==color1)
                        arr_bar[ptr[it].i].style.backgroundColor='blue'
                    }
                }, i*this.state.delay);
                timeouts.push(qq)
            }
            else{
                let qq=setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor='orange';
                    arr_bar[ptr[idx1].i].style.backgroundColor='purple';
                }, i*this.state.delay);
                timeouts.push(qq)
            }
        }
        let qq=setTimeout(() => {
            this.buttons(false,(animations.length)*this.state.delay);
            reset=false;
        }, (animations.length)*this.state.delay);
        timeouts.push(qq);
    }
    render() {
        let i;
        for(i=1000;i>=0;i--)
        {
            let wdth=.8*window.innerWidth;
            let n1=Math.floor(i*3.6);
            let width1=Math.floor(wdth/n1)-2;
            if(width1>0)
            break;
        }
        let maxn=i;
        let str,dly=this.state.delay,strdly;
        if(dly===.5)
        strdly='0.50'
        else if(dly===.1)
        strdly='0.10'
        else if(dly>=1&&dly<=9)
        strdly='00'+dly.toString()
        else if(dly>=10&&dly<=99)
        strdly='0'+dly.toString()
        else strdly=dly.toString()
        if(dly===1000)
        strdly+='ms delay'
        else strdly+=' ms delay'
        let ctr1=0;
        if(reset===false)
        str=this.state.ar.map((x) => (
            <div className="array-bar" key={ctr1++ + 'e'} style={{backgroundColor: 'blue',height: `${x}px`, width:`${width}px`}}> </div>
            ))
        else
        str=this.state.ar.map((x) => (
            <div className="array-bar" key={ctr1++ + 'w'} style={{backgroundColor: 'blue',height: `${x}px`, width:`${width}px`, transform:'translateX(0px)', transition:`transform ${this.state.delay}ms linear,height 0.1s linear`}}> </div>
            ))
        return (
            <center>
            <h1 className="mainHeading" style={{color:'black'}}>Sorting Visualizer</h1>
            <div className="row" style={{width:'95%',borderTop:'5px'}}>
            <div className="col-md-6 box">
            
            <button className="button button4" onClick={()=>this.bubbleSort()} id='bubblesort'>Bubble Sort</button>
            <button className="button button4" onClick={()=>this.selectionSort()} id='selectionsort'>Selection Sort</button>
            <button className="button button4" onClick={()=>this.insertionSort()} id='insertionsort'>Insertion Sort</button>
            <button className="button button4" onClick={()=>this.mergeSort()} id='mergesort'>Merge Sort</button>
            <button className="button button4" onClick={()=>this.quickSort()} id='quicksort'>Quick Sort</button>
            <button className="button button4" onClick={()=>this.resetArray()} id='reset'>Reset Values</button>
            <button className="button button4" onClick={()=>this.skipAnimations()} id='skip'>Skip</button>
            </div>
            <div className="col-md-3 box">
            <div>
            <span style={{fontFamily:'Georgia',cursor:'default'}}><b>No. of bars </b></span>
            <input type="range"  min={2} max={maxn} defaultValue={4} onChange={()=>this.changeArrSize()} className="slider" id="arr_size"/>
            <span style={{backgroundColor:'rgb(212, 210, 231)',color:'black',borderRadius:'4px',cursor:'default'}}> {this.state.n}&nbsp;
            </span>
            </div>
            </div>
            <div className="col-md-3 box">
            <span style={{fontFamily:'Georgia',cursor:'default'}}><b> Speed </b></span>
            <input type="range"  min={1} max={1505} defaultValue={751} onChange={()=>this.changeDelay()} className="slider" id="delay"/>
            <span style={{backgroundColor:'rgb(212, 210, 231)',color:'black',borderRadius:'4px',cursor:'default',float:''}}> {strdly}&nbsp;</span>
            </div>
            <div className="box array-container" style={{border:'1px solid #ccc',paddingTop:'2%',paddingBottom:'1%',backgroundColor:'#fafafa'}}>
            
            { str }
            <div className="array-bar" style={{backgroundColor: '#f2f2f2',height: `480px`, width:`0.1px`}}> </div>
            </div>
            </div>
            </center>
        )
    }
}
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export default BubbleSort
