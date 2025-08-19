import React, {useContext} from 'react'
import { CaptainDataContext } from '@/app/context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  return (
    <div><div className='flex items-center justify-between'>
          <div className='flex items-center just-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://pbs.twimg.com/media/BcINeMVCIAABeWd.jpg" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-lg font-semibold'>$295.2</h4>
            <p className='text-sm text-white/60'>earned</p>
          </div>
         </div>

         <div className='flex p-3 mt-6 bg-[#1A1A1A] rounded-2xl justify-center gap-5 items-start'>
          <div className='text-center'>
            <i className="text-2xl font-thin  ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-white/60'>Hoors online</p>
            </div>
          <div className='text-center'>
            <i className="text-2xl font-thin  ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-white/60'>Hoors online</p>
          </div>
          <div className='text-center'>
            <i className="text-2xl  font-thin  ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-white/60'>Hoors online</p>
          </div>
         </div></div>
  )
}

export default CaptainDetails