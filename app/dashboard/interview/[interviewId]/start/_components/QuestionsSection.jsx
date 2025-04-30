import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'

const QuestionsSection = ({mockInterviewQuestions,activeQuestionIndex}) => {
  console.log("Mock Interview Questions:", mockInterviewQuestions);

  const textToSpeech = (text) => {
    if('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }else{
      alert("Your browser does not support text to speech.");
    }
  }

  return mockInterviewQuestions.questions&&(
    <div className='p-5 border border-gray-400 rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {mockInterviewQuestions&&mockInterviewQuestions?.questions?.map((question, index) => (
                <h2 className={`p-2 bg-gray-100 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index && 'bg-green-400 text-white'}`}>Question #{index+1}</h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions.questions[activeQuestionIndex]?.question}</h2>
        <Volume2 className='text-green-600 cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestions.questions[activeQuestionIndex]?.question)}/>
        <div className='border rounded-lg p-5 bg-green-200 border-green-400 mt-10'>
          <h2 className='flex gap-2 items-center text-green-500'>
            <Lightbulb/>
            <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-green-400 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div>
  )
}

export default QuestionsSection