import { useCallback, useState } from 'react'

import './App.css'

function App() {
  
  const [displaydata,setdisplay]=useState([]);
const [show,setshow]=useState(false)
  const [page,setpage]=useState(1);
const [containdata,setcontain]=useState([])
const [input,setinput]=useState("")
  const getdata=async(e)=>{
    // console.log("hi",input)
    const {value}=e.target
    // console.log(value)

    let res=await fetch(`https://api.unsplash.com/search/photos?query=${value}&client_id=RevnaG31AMpHH_WlfUfeXEv60XLhKez_h9aSnPCuRYQ&page=${page}&per_page=50`)
    let data=await res.json();
    // console.log("data",data)
    setcontain(data.results);
  }

  function debounce(func,delay)
     {
      let TimerId;
      return function(...args){
        const context=this;
        if(TimerId) {
          clearTimeout(TimerId)
      }
      TimerId = setTimeout(function (){
        TimerId=null;
       //  console.log(input)
       setshow(false)
       func.apply(context,args)
    },delay)
      }
         
         
     }

     const optimised=useCallback(debounce(getdata,1500),[]) 
     const showdisplay=async(value,page)=>{
      // console.log("hi",input)
      // const {value}=e.target
      // console.log(value)
  setinput(value)
      let res=await fetch(`https://api.unsplash.com/search/photos?query=${value}&client_id=RevnaG31AMpHH_WlfUfeXEv60XLhKez_h9aSnPCuRYQ&page=${page}&per_page=50`)
      let data=await res.json();
      // console.log("data",data)
     setdisplay(data.results)
     setshow(true)
    }
      


 
  return (
    <div className="App">
       <div id="search_box">
            <input type="search" id="search" placeholder='Search...'  onChange={optimised} />
            </div>
            {!show?
          <div className="container">
          {containdata.map(e=>(
             <div id="contain-div" key={e.id} onClick={()=>{showdisplay(e.alt_description,1)}} >
             <img id="contain-img" src={e.urls.raw} alt="" />
             <p>{e.alt_description==null?e.description:e.alt_description}</p>
           </div>
          ))}
          </div>:null}
          {show?
         <div className="display">
           {displaydata.map(e=>(
             <div key={e.id}>
               <img src={e.urls.raw} alt="" />
             </div>
           ))}
         </div>:null}
         <div className="page">
           <button onClick={()=>{
             setpage((page)=>{
              return page-1
            })
            showdisplay(input,page)
           }} disabled={page<1}>Previous</button>
           <button  onClick={()=>{
             setpage((page)=>{
               return page+1
             })
             showdisplay(input,page)
           }}>Next</button>
         </div>
    </div>
  )
}

export default App
