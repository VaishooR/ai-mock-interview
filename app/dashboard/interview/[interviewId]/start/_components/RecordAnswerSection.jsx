"use client"
import { Button } from '@/components/ui/button'
import { ChatSession } from '@google/generative-ai'
import { Mic, StopCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { toast } from 'sonner'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import moment from 'moment'
import { UserAnswer } from '@/utils/schema'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);


const RecordAnswerSection = ({mockInterviewQuestions,activeQuestionIndex,interviewData}) => {

    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useUser()

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map((result) => {
          console.log("Result:", result);
          setUserAnswer(prevAns=>prevAns+result?.transcript);
        });
      },[results])

      useEffect(() => { 
        if(!isRecording && userAnswer?.length>10){
          UpdateUserAnswer()
        }
      },[userAnswer])

      const StartStopRecording = async () => {

        if(isRecording){
            stopSpeechToText()
            // if(userAnswer?.length<10){
            //     setLoading(false)
            //     toast("Please speak for at least 10 seconds.")
            //     return;
            // }
            

        }else{
            startSpeechToText()
        }
      }

      const UpdateUserAnswer = async () => {
            setLoading(true)
            const feedbackPrompt = "Question: "+mockInterviewQuestions?.questions[activeQuestionIndex]?.question+" Answer: "+userAnswer+" ,Based on question and user answer for the given interview question "+ "please give us rating and feedback on the answer in not more than five lines and mention area of improvement if any " + "in JSON format with rating field and feedback field.";
           
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // <-- CREATE MODEL FIRST
            const result = await model.generateContent(feedbackPrompt);              // <-- THEN CALL generateContent
            const response = result.response;
            const text = response.text();
            const cleanedText = text.replace(/```json/i, '').replace(/```/g, '').trim();
            const JsonFeedbackResp = JSON.parse(cleanedText);

            console.log("Mock Json Response:", JsonFeedbackResp);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef:interviewData?.mockId,
                question:mockInterviewQuestions?.questions[activeQuestionIndex]?.question,
                correctAns:mockInterviewQuestions?.questions[activeQuestionIndex]?.answer,
                userAns:userAnswer,
                feedback:JsonFeedbackResp?.feedback,
                rating:JsonFeedbackResp?.rating,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format("DD-MM-YYYY HH:mm:ss")
            })

            if(resp){
                toast("Your answer has been recorded successfully.")
                setUserAnswer('')
                setResults([])
            }
            setResults([])
            
            setLoading(false)
      }

    return (
        <div className='flex flex-col items-center justify-center'>

           <div className='flex flex-col items-center justify-center bg-gray-100 mt-10 rounded-lg'>
               <Image src={'/webcam4.png'} width={400} height={400} className='absolute'/>
               <Webcam style={{ height:350, width:'120%', zIndex:10}}/>
           </div>
           <Button disabled={loading} onClick={StartStopRecording} variant="outline" className="my-10 cursor-pointer">
               {isRecording?<h2 className='text-red-600 flex gap-2'><StopCircle/> Stop Recording</h2>:<h2  className=' flex gap-2'><Mic/>Record Answer</h2>}
           </Button>
           
        </div>
    )
}

export default RecordAnswerSection



