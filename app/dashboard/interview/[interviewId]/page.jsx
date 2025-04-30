"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log("Interview ID:", params);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log("Interview Details:", result);
    setInterviewData(result[0]);
    console.log("Interview Data:", interviewData);
  };
  return (
    <div className="my-10 flex flex-col ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-6 ">
          <div className="flex flex-col p-5 gap-3 rounded-lg border border-gray-400">
            <h2 className="text-lg"> <strong>Job Role/Job Position : </strong>{interviewData?.jobPosition}</h2>
            <h2 className="text-lg"> <strong>Job Description/Tech Stack : </strong>{interviewData?.jobDesc}</h2>
            <h2 className="text-lg"> <strong>Years of Experience : </strong>{interviewData?.jobExperience}</h2>
          </div> 
          <div className="p-5 border  rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb/><strong>Information</strong></h2>
            <h2 className="mt-3 text-yellow-500 text-xs">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            style={{ height: 300, width: 300 }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-gray-100 rounded-lg border border-gray-400" />
            <Button variant="ghost" onClick={()=>setWebCamEnabled(true)} className="border border-gray-200 bg-gray-100 hover:bg-green-400 hover:text-white font-sm hover:cursor-pointer">Enable Web Cam and Microphone</Button>
          </div>
        )}
        </div>
      </div>
      
      <div className="flex justify-end items-end">
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}><Button className="bg-green-400 text-white font-sm hover:cursor-pointer">Start Interview</Button></Link>
      </div>
      

    </div>
  );
};

export default Interview;
