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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDeals } from "@/lib/mock-data";


const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  website: z.string().url({ message: "Please enter a valid URL." }),
  sector: z.string({ required_error: "Please select a sector." }),
  stage: z.string({ required_error: "Please select your current stage." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export default function StartupProfilePage() {
  const { toast } = useToast();
  // Mock existing data
  const existingData = {
    companyName: "AfriTech Innovators",
    website: "https://afritechinnovators.com",
    sector: "FinTech",
    stage: "Seed",
    description: "Pioneering mobile payment solutions for underserved markets across Africa, enabling financial inclusion through technology.",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: existingData,
  });

  const sectors = [...Array.from(new Set(mockDeals.map(d => d.sector)))];
  const stages = [...Array.from(new Set(mockDeals.map(d => d.stage)))];

  async function onSubmit(data: ProfileFormValues) {
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast({
      title: "Profile Updated!",
      description: "Your company profile has been saved successfully.",
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your startup's information for investors.</p>
      </header>
       <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. My Awesome Startup" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. https://my-startup.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sector</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a sector..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {sectors.map(sector => (
                                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your current stage..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {stages.map(stage => (
                                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Tell investors about your company..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button 
                type="submit" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-lg shadow-primary-glow"
                disabled={form.formState.isSubmitting}
                >
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
