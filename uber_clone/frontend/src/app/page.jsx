import React from 'react'
import Link from 'next/link'


const main = () => {
  return (
    <div>
        <div className='w-full h-screen flex flex-col justify-between bg-black'>
              <div className=' w-full h-full pt-10 bg-cover bg-no-repeatr bg-[url(https://images.unsplash.com/photo-1704476944918-c1258561ebb9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU4fHx8ZW58MHx8fHx8)]' >
                 <h1 className='flex text-white text-4xl justify-center items-center'>Car X</h1>
               </div>

          <div className='h-1/4 pt-3 md:flex flex-col items-center  text-white bg-black px-5'>
            <h1 className='text-2xl font-medium'>Get Started With CarX</h1>
            <Link href="/Userlogin" className=' md:w-1/5  bg-neutral-900 font-extralight py-3 mt-5 rounded-lg flex justify-between px-5 items-center w-full'>
              <span>Continue</span>
              <img className='w-5 h-5 invert' src="move-up-right.png" alt="" />
            </Link> 
              </div>
      </div>
    </div>
  )
}

export default main
