"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getInterviewQuestions } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
// import { mock } from "node:test";



const AddNewInterview = () => {

  const [openDialog,setOpenDialog] = useState(false)
  const [jobPosition,setJobPosition] = useState('')
  const [jobDesc,setJobDesc] = useState('')
  const [jobExperience,setJobExperience] = useState()
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useUser()
  const router = useRouter()

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await getInterviewQuestions(jobPosition, jobDesc, jobExperience);
      setQuestions(result);
      console.log("Generated Questions:", result);
      setError(null);

      if(result){

      const resp = await db.insert(MockInterview).values({
        mockId:uuidv4(),
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        jsonMockResp: JSON.stringify(result),
        createdBy : user?.primaryEmailAddress?.emailAddress,
        createdAt : moment().format("DD-MM-YYYY HH:mm:ss")
      }).returning({mockId: MockInterview.mockId});
      console.log("Inserted Mock Interview:", resp);

      if(resp){
        setOpenDialog(false)
        router.push(`/dashboard/interview/${resp[0].mockId}`)
      }

    }
    } catch (err) {
      setError('Something went wrong while generating questions.');
      console.error('Error generating interview questions:', err);
    }
    setLoading(false);
  }

  return (
    <div>
      <div onClick={()=>{setOpenDialog(true)}} className="p-10 border border-gray-300 rounded-lg bg-green-200 hover:scale-105 hover:shadow-md cursor-pointer">
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} >
        <DialogTrigger className="focus:outline-none"></DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="bg-gray-100 border-0 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
             <form onSubmit={onSubmit}>
             <div>
                <h2 className="text-gray-600 text-sm">Add Details about your job position/role, Job description</h2>
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position :</label>
                  <Input placeholder="Ex. Full Stack Developer" required className=" mt-1 focus:outline-none outline-none border-gray-300" onChange={(e)=>setJobPosition(e.target.value)}/>
                </div>
                <div className="mt-7 my-3">
                  <label>Job Description/ Tech Stack (In Short) :</label>
                  <Textarea placeholder="Ex. React, Angular, Node.js etc" required className=" mt-1 focus:outline-none outline-none border-gray-300" onChange={(e)=>setJobDesc(e.target.value)}/>
                </div>
                <div className="mt-7">
                  <label>Years of Experience :</label>
                  <Input placeholder="Ex.5" type="number" max="30" required className=" mt-1 focus:outline-none outline-none border-gray-300" onChange={(e)=>setJobExperience(e.target.value)}/>
                </div>
              </div>
              <div className="flex gap-6 justify-end mt-4">
                <Button type="button" onClick={()=>{setOpenDialog(false)}} className="border-none bg-gray-200 hover:cursor-pointer">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-green-300 border-green-400 hover:cursor-pointer">{loading?<><LoaderCircle className="animate-spin"/>Generating From AI</>:"Start Interview"}</Button>
              </div>
             </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
