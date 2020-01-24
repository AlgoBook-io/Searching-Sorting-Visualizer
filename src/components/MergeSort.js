export function mergeSortAnimations(ar){
    const animations=[]
//    const aux_arr=ar
    mergeSort(ar,0,ar.length-1,animations)
    return animations
}

function mergeSort(ar,l,r,animations){
    if(l===r)
    return
    let mid=Math.floor((l+r)/2)
    mergeSort(ar,l,mid,animations)
    mergeSort(ar,mid+1,r,animations)
    merge(ar,l,r,mid,animations)
}

function merge(ar,l,r,mid,animations){
    let i=l,j=mid+1,k=l
    while(i<=mid && j<=r)
    {
        animations.push({
            i:i,
            j:j,
            color:'palegreen'
        })
        if(ar[i]<=ar[j])
        {
            animations.push({
                i:i,
                j:j,
                color:'blue'
            })
            i++
        }
        else{
            animations.push({
            i:i,
            j:j,
            color:'swap'
            })
            j++
        }
    }
    while(i<=mid)
    {
        animations.push({
            i:i,
            j:-1,
            color:'green'
        })
        animations.push({
            i:i,
            j:-1,
            color:'blue'
        })
        i++;
    }
    while(j<=r)
    {
        animations.push({
            i:i,
            j:-1,
            color:'green'
        })
        animations.push({
            i:i,
            j:-1,
            color:'blue'
        })
        j++;
    }
}
