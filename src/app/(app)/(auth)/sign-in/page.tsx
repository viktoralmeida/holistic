import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";

export const dynamic = 'force-dynamic';

const SignInPageContent = async() =>{
    const session = await caller.auth.session();

    if(session.user){
        redirect("/");
    }

    return <SignInView/>
}

const Page = async() =>{
    return (
        <Suspense fallback={<LoadingPage text="Loading sign in..." />}>
            <SignInPageContent />
        </Suspense>
    );
}

export default Page;
