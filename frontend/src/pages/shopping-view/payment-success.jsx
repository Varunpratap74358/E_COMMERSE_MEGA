import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccessPage = () => {
  const navigate = useNavigate()
  return (
   <div className='p-20'>
     <Card className={'p-10'}>
      <CardHeader className={'p-0'}>
        <CardTitle className="text-4xl font-bold">Payment Successfully...</CardTitle>
      </CardHeader>
      <Button className={'mt-5'} onClick={()=>navigate('/shop/account')} >View Orders</Button>
    </Card>
   </div>
  )
}

export default PaymentSuccessPage
