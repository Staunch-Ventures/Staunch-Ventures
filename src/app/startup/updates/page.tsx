"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";

export default function StartupUpdatesPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        toast({
            title: "Update Sent!",
            description: "Your monthly update has been shared with investors.",
        });
        // Here you would typically clear the textarea
    };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Investor Updates</h1>
        <p className="text-muted-foreground mt-2">Share your progress with investors and stakeholders.</p>
      </header>
       <Card>
        <CardHeader>
          <CardTitle>New Monthly Update</CardTitle>
          <CardDescription>
            Provide a summary of your achievements, challenges, and key metrics from the last month.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent>
                <Textarea
                    placeholder="Start writing your update here... e.g., 'This month, we increased our user base by 20% and launched our new feature...'"
                    rows={10}
                />
            </CardContent>
            <CardFooter>
                 <Button 
                    type="submit" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-lg shadow-primary-glow"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sending..." : "Send Update"}
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
