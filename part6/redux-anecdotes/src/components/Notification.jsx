import { useDispatch, useSelector } from "react-redux";
import { notification } from "../reducers/anecdoteReducer";
import { useEffect } from "react";


const Notification = () => {
  const dispatch = useDispatch()
  const selector = useSelector(({noti})=>noti)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  
useEffect(()=>{
    dispatch(notification({message:"render here notification...",display:true}))
    console.log(selector)
},[])
  

  return (
    <div style={style}>
   <h1>{selector.map((val)=>{
   { val.display && <div>
    <p>{val.message}</p>
   </div> }
   })}</h1>
      </div>
  ) 
}

export default Notification