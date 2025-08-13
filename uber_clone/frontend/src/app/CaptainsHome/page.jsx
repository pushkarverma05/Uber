"use client"
import React from 'react'

import CaptainProtectedWraper from '../../CaptainProtectedWraper'


const page = () => {
  return (
    <CaptainProtectedWraper>
      <div>page</div>
    </CaptainProtectedWraper>

  )
}

export default page