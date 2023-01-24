import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react'
import {BiSearchAlt} from 'react-icons/bi'
import {GiPerspectiveDiceSixFacesRandom} from 'react-icons/gi'


const App = () => {
  

  const searchRef = useRef();
  const [quote, setQuote] = useState('');
  const [error, setError] = useState(null)

  const handleSearch = async ()=>{
   searchRef.current.value ? await fetch(`https://api.quotable.io/random?tags=${searchRef.current.value}`)
   .then(response => {
    if(!response.ok){
      throw new Error('Error')
    }else{
      return response.json()
    }
   })
   .then(response => {
    setQuote(response)
    searchRef.current.value=''
   })
   .catch(err =>{
    setQuote('');
    setError("Couldn't find anything!");
    searchRef.current.value=''
  }) :
   alert('Please type something!')
  }

  const handleRandomSearch= async ()=>{
    await fetch(`https://api.quotable.io/random`).then(res=>{
      if(!res.ok){
        throw new Error('Something went wrong!')
      }else{
        return res.json()
      }
    }).then(res=>{
      setQuote(res)
    searchRef.current.value=''
    }).catch(err =>{
      setQuote('');
      setError('Something went wrong!');
      searchRef.current.value=''
    })
  }

  useEffect(()=>{
    searchRef.current.focus()
  },[])

  return (
    <div className='bg-gray-900 h-screen text-white flex flex-col items-center pt-[50px]'>
      <h1 className='text-4xl font-bold bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Quote Machine</h1>
      <div>
      <input ref={searchRef} className='mt-10 py-2 px-3 text-black focus:outline-none border-b-2 border-white bg-transparent' type="text" placeholder='Topic of your quote...'/>
      <button className='ml-2 px-3 py-[8px] border-2 border-blue-500  rounded-lg hover:bg-blue-500 transition duration-200' onClick={handleSearch}
      title='Search'
      ><BiSearchAlt/></button>
      <button className='ml-2 px-3 py-[8px] border-2 border-blue-500  rounded-lg hover:bg-blue-500 transition duration-200' onClick={handleRandomSearch}
      title='Random'><GiPerspectiveDiceSixFacesRandom/></button>
      </div>
      <div className='w-[75%] mt-[100px] pb-10 flex justify-center'>
       {quote.content ? <span className='flex flex-col justify-center items-center gap-4'><p className='text-white text-3xl italic font-bold break-normal'>"{quote.content}"</p> <p className='text-2xl'> - {quote.author}</p></span> :   <p className='text-2xl font-bold'>{error}</p>}
      </div>
     <p className='fixed bottom-5 text-gray-300 text-sm font-mono'>Quotable API credits: lukePeavey</p>
    </div>
  )
}

export default App 