"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Video } from "lucide-react";

const pitchFormSchema = z.object({
  oneLiner: z.string().min(10, { message: "Please provide a concise one-liner." }).max(150, { message: "One-liner is too long."}),
  problem: z.string().min(20, { message: "Please describe the problem in more detail." }),
  solution: z.string().min(20, { message: "Please describe your solution." }),
  traction: z.string().optional(),
  team: z.string().min(10, { message: "Please tell us about your team." }),
});

type PitchFormValues = z.infer<typeof pitchFormSchema>;

export default function StartupPitchPage() {
  const { toast } = useToast();

  const form = useForm<PitchFormValues>({
    resolver: zodResolver(pitchFormSchema),
    defaultValues: {
      oneLiner: "",
      problem: "",
      solution: "",
      traction: "",
      team: "",
    },
  });

  async function onSubmit(data: PitchFormValues) {
    // Mock submission - this form doesn't actually submit data
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast({
      title: "Pitch Saved!",
      description: "Your pitch information has been saved as a draft.",
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Pitch</p>
        <h1 className="text-3xl font-semibold tracking-tight">Submit your pitch</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Fill out the details below and record your video pitch.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Pitch Details</CardTitle>
          <CardDescription>
            Provide some core information about your startup. This will be shared with investors alongside your video.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="oneLiner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Liner</FormLabel>
                    <FormControl>
                      <Input placeholder="A short, catchy sentence describing your startup." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What is the problem you're solving?" {...field} rows={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="solution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solution</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How does your startup solve this problem?" {...field} rows={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Who is on your team and what is their relevant experience?" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="traction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traction (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., number of users, revenue, key partnerships, etc." {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between items-center pt-4">
                 <Button 
                    type="submit" 
                    variant="outline"
                    disabled={form.formState.isSubmitting}
                 >
                    {form.formState.isSubmitting ? "Saving Draft..." : "Save Draft"}
                 </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                        type="button"
                        variant="brand"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Start Video Pitch Recording
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Video Pitch Recording</AlertDialogTitle>
                      <AlertDialogDescription>
                        The primary way to pitch is through a short video recording. When you're ready, we'll open a recorder where you can record up to a 3-minute video.
                        <br /><br />
                        This feature is not yet implemented. In a real application, clicking 'Continue' would open a camera interface to start recording your pitch.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>Got it</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
