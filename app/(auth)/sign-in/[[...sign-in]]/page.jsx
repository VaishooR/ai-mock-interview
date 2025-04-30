import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="overflow-hidden h-screen bg-gray-50 sm:grid sm:grid-cols-2  ">
      <img
        alt=""
        src="https://interviewdesk.ai/wp-content/uploads/2024/07/Master-Interviews-with-Confidence-Boosting-Mock-Sessions.jpg"
        className=" sm:h-full"
      />

      <div className="flex justify-center items-center bg-yellow-100">
        <SignIn />
      </div>
    </section>





  );
}
