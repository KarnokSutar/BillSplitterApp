 export function Test(){
    const array = [{
        name: "Karnok",
        value: 1980
    }, {
        name: "Karno",
        value: 1890
    }, {
        name: "Karn",
        value: 5980
    }, {
        name: "Kar",
        value: -9450
    },{
        name: "Ka",
        value: -400
    }]
    
    const value = [{
        name: "Karnok",
        value: 0,
        give:[],
        geT:[]
    }, {
        name: "Karno",
        value: 0,
        give:[],
        geT:[]
    }, {
        name: "Karn",
        value: 0,
        give:[],
        geT:[]
    }, {
        name: "Kar",
        value:0,
        give:[],
        geT:[]
    },{
        name: "Ka",
        value:0,
       give:[],
       geT:[]
    }]
    
    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }  
    console.log(array)
    array.sort(GetSortOrder('value'));
    
    console.log(array)
    console.log(array.length);
    while(array.length<=0){
       array.sort(GetSortOrder('value'));
       if (array[array.length].value>array[0].value){
           array[array.length].value = array[array.length].value+array[0].value
           console.log(array[array.length].value)
           let name = array[0].name;
           console.log('hello');
           
         let index = value.findIndex((val)=>val = name);
           value[index].value = value[index].value + array[0].value;
           value[index].give.push(array[array.length].name);
           
           index = value.findIndex((val)=>{val = array[array.length].name});
           value[index].value = value[index].value+ array[0].value;
           value[index].geT.push(array[0].name);
           console.log(value)
           array.shift();
            console.log(array)
       } else {
           array[0].value = array[array.length].value+array[0].value
           let name = array[array.length].name;
           let index = value.findIndex((val)=>{val = name});
           value[index].value =  value[index].value + array[array.length].value;
           value[index].geT.push(array[0].name);
           
           index = value.findIndex((val)=>{val = array[0].name});
           value[index].value =  value[index].value + array[array.length].value;
           value[index].give.push(array[array.length].name);
           console.log(value)
           array.pop();
            console.log(array)
       }
       
    }
    
    console.log(value)


return (
    <div></div>
)}