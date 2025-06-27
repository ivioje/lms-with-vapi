"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  subject: z.string().min(1, "subject is required"),
  topic: z.string().min(1, "topic is required"),
  voice: z.string().min(1, "voice is required"),
  style: z.string().min(1, "style is required"),
  duration: z.coerce.number().min(1, "duration is required"),

})

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })
  const [building, setBuilding] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setBuilding(true);
    const companion = await createCompanion(values);

    if(companion) {
        redirect(`/companions/${companion.id}`);
    } else {
        console.log('failed to create companion');
        redirect('/');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center md:flex-row flex-col md:gap-2 gap-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="md:w-1/2 w-full">
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the companion name" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="md:w-1/2 w-full">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject} className="capitalize w-full">
                                {subject}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Derivatives & Integrals" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the voice" />
                    </SelectTrigger>
                    <SelectContent>
                     <SelectItem value="male" className="capitalize">Male</SelectItem>
                     <SelectItem value="female" className="capitalize">Female</SelectItem>
                    </SelectContent>
                    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="formal" className="capitalize">Formal</SelectItem>
                        <SelectItem value="casual" className="capitalize">Casual</SelectItem>
                    </SelectContent>
                    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Session Duration</FormLabel>
              <FormControl>
                <Input placeholder="15" type="number" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid || building} type="submit" className={`w-full cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center`}>
          {!building && 'Build Your Companion'}
          { building && <span className="flex items-center gap-2">Building <Loader2 className="animate-spin" /></span> }
        </Button>
      </form>
    </Form>
  )
}

export default CompanionForm