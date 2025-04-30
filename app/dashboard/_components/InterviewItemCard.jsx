import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({interview}) => {
    const router = useRouter();
    const onStart = () => {
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress = () => {
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }
  return (
    <div className='border border-green-300 shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-green-500'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-2'>
            <Button onClick={onFeedbackPress} className="cursor-pointer border-gray-400" size="sm" variant="outline">Feedback</Button>
            <Button onClick={onStart} className="bg-green-400 text-white cursor-pointer" size="sm">Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard