import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center align-middle flex-1 min-h-screen max-h-screen h-screen">
      <SignIn />
    </div>
  )
}