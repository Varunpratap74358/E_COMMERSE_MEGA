import CommanForm from '@/components/comman/form'
import { registerFormControls } from '@/components/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const initialState ={
  userName:"",
  email:"",
  password:""
}

const AuthRegister = () => {

  const dispatch = useDispatch()
  const [formData,setFormData] = useState(initialState)
  const navigate =useNavigate()
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
        navigate('/auth/login')
      }
    })

  }

  
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new Account</h1>
        <p className='mt-2'>Already have an account<Link className='font-medium ml-2 text-primary hover:underline' to={'/auth/login'}>Login</Link></p>
        
      </div>
      <CommanForm formControls={registerFormControls} buttonText={'Sign Up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default AuthRegister
