import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";

export const dynamic = 'force-dynamic';

const SignUpPageContent = async() =>{

    const session = await caller.auth.session();

    if(session.user){
        redirect("/");
    }

    return <SignUpView/>
}

const Page = async() =>{
    return (
        <Suspense fallback={<LoadingPage text="Loading sign up..." />}>
            <SignUpPageContent />
        </Suspense>
    );
}

export default Page;
