"use client";

import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner";

import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useForm } from "react-hook-form";
import{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {registerSchema} from "../../schemas" ; 
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const poppins= Poppins({
    subsets:["latin"],
    weight:["700"],
});

export const SignUpView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const register = useMutation(
        trpc.auth.register.mutationOptions({
           onError: (error) =>{
              toast.error(error.message);  
           },
           onSuccess: async()=>{
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
                router.push("/");
           },
        }));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode:"all",
        resolver: zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
            username:"",
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>)=>{
        register.mutate(values, {});
    }

    const username = form.watch("username");
    const usernameErrors = form.formState.errors.username;
    const showPreview = username && !usernameErrors;

    return (
        <div className="min-h-screen bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left side - Form */}
                <div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-md">
                        <Form {...form}>
                            <form 
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <Link href="/" className="flex items-center">
                                        <span className={cn(
                                            "text-2xl font-semibold text-foreground", poppins.className
                                        )}>SPA</span>
                                    </Link>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-foreground hover:text-primary"
                                    >
                                        <Link prefetch href="/sign-in">
                                            Zaloguj się
                                        </Link>
                                    </Button>
                                </div>
                                
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-semibold text-foreground">
                                        Dołącz do Spa Relax
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Utwórz swoje konto, aby rozpocząć
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <FormField 
                                        name="username"
                                        render={({field})=> (
                                            <FormItem>
                                                <FormLabel className="text-foreground">
                                                    Nazwa użytkownika
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field}
                                                        className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                                                        placeholder="Wybierz nazwę użytkownika"
                                                    /> 
                                                </FormControl>
                                                <FormDescription
                                                    className={cn("text-muted-foreground", showPreview && "block")}
                                                >
                                                    {showPreview && `Twoja nazwa użytkownika będzie: @${username}`}
                                                </FormDescription>
                                                <FormMessage/> 
                                            </FormItem>
                                        )}
                                    /> 

                                    <FormField 
                                        name="email"
                                        render={({field})=> (
                                            <FormItem>
                                                <FormLabel className="text-foreground">
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field}
                                                        type="email"
                                                        className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                                                        placeholder="Wprowadź swój email"
                                                    /> 
                                                </FormControl>
                                                <FormMessage/> 
                                            </FormItem>
                                        )}
                                    /> 

                                    <FormField 
                                        name="password"
                                        render={({field})=> (
                                            <FormItem>
                                                <FormLabel className="text-foreground">
                                                    Hasło
                                                </FormLabel>
                                                <FormControl>
                                                    <Input  
                                                        {...field} 
                                                        type="password"
                                                        className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                                                        placeholder="Utwórz hasło"
                                                    /> 
                                                </FormControl>
                                                <FormMessage/> 
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button
                                    disabled={register.isPending}
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {register.isPending ? "Tworzenie konta..." : "Utwórz konto"}
                                </Button> 
                            </form>
                        </Form>
                    </div>
                </div>

                {/* Right side - Banner Image */}
                <div className="relative hidden lg:block">
                    <Image
                        src="/banner1.jpg"
                        alt="Spa relaxation"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </div>
        </div>
    )
}