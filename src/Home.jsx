import React, { useState } from 'react'
import './Home.css'

const Home = () => {

    const[person1 , setperson] = useState([])
    const[data , setdata] = useState("")
     const[number , setnumber] = useState(0);
     const[total , settotal] = useState(0);
     const[boolean , setboolean] = useState(false)
    let adder =()=>{
        setperson(newperson1=>[...newperson1 , data])
        setdata("");
    }

let del = (index)=>{
    setperson(person1.filter((_,i)=>i!==index))
}

// let answer = person1.index.length;
// console.log(answer)

let check = ()=>{
   
    if (person1.length > 0) {
    let divide = total / person1.length;
    setnumber(divide);
    setboolean(true);
  } else {
    alert("Please add at least one member before dividing!");
  }
}

  return (
    <div>
      <h1> S-p-l-i-t</h1>

  <div className="usercontainer">
    <input className='userinput' value={data} type="text" onChange={(e)=> setdata(e.target.value)}  /><br />
<button onClick={adder} >Add Member</button> 
<div className='gap'>
<div className="adder">
  {person1.map((item, index) => {
    return (
      <div key={index}>
        <h4>{item}</h4>
        <button onClick={()=>del(index)}>delete</button>

      </div>
    );
  })}
</div>
</div>

  </div>

<div className='main-container'>
    <h3>Enter the Total Amount</h3>
      <input type="text"  onChange={(e)=>settotal(e.target.value)} /> <button onClick={check} >check</button>
      <div className='split-main-container'>
    {boolean && person1.map(( item , index)=>{
       return(
        <>
        <div className='inner'>

            <label htmlFor="item">{item}</label> 
           <h2>{number}</h2>
        </div>
        
        </>
       )
    })}
      </div>
</div>

<div className='container1'>

</div>
    </div>
  )
}

export default Home
