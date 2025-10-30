import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteFiltering = () => {
    const dispatch = useDispatch()

    const handleFiltering = (e)=>{
        e.preventDefault()
       dispatch(filterAnecdotes(e.target.filter.value))
        // console.log(e.target.filter.value)
    }
  return (
    <div>
      <form onSubmit={handleFiltering} >
        <label >
            Filter
            <input type="text" name='filter' />
        </label>
      </form>
    </div>
  )
}

export default AnecdoteFiltering
