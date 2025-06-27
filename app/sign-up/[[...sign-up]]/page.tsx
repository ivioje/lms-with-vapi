import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/images/pattern.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
    >
      <SignUp />
    </div>
  );
}
