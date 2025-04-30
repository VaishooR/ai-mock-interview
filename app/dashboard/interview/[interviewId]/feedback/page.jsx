"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'


const Feedback = ({params}) => {

  const [feedbackList,setFeedbackList] = useState([]);
  const router = useRouter()

  useEffect(()=>{
    GetFeedback()
  },[])

  const GetFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id)
    console.log("Result",result)
    setFeedbackList(result)
  }
  return (
    <div className='p-10'>

      {feedbackList?.length==0?<h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Found</h2>:<>
      <h2 className='text-3xl font-bold text-green-500 mb-2'>Congrajulations</h2>
      <h2 className='font-bold text-2xl'>Here is your interview Feedback</h2>
      <h2 className='text-purple-700 text-lg my-3'>Your overall interview rating : <strong>7/10</strong></h2>
      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
      {console.log("Feedback List",feedbackList)}
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-gray-200 rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
          {item?.question} <ChevronsUpDown className='h-5 w-5'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 border border-gray-300 rounded-lg'><strong>Rating : </strong>{item.rating}</h2>
            <h2 className='p-2 border border-red-100 rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : </strong>{item.userAns}</h2>
            <h2 className='p-2 border border-green-100 rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong>{item.correctAns}</h2>
            <h2 className='p-2 border border-blue-100 rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback : </strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
        </Collapsible>
      
      ))}
      </>}
      <Button className="bg-green-400 text-white cursor-pointer mt-10" onClick={()=>router.replace('/dashboard')}>Go Home</Button>
      
    </div>
  )
}

export default Feedback