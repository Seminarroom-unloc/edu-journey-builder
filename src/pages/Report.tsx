
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { AlertTriangle, Send } from "lucide-react";

type ReportFormValues = {
  subject: string;
  description: string;
  attachmentUrl?: string;
};

const Report = () => {
  const form = useForm<ReportFormValues>({
    defaultValues: {
      subject: "",
      description: "",
      attachmentUrl: "",
    },
  });

  const onSubmit = (data: ReportFormValues) => {
    // In a real app, you would submit to backend here
    console.log("Report submitted:", data);
    toast.success("Report submitted successfully!");
    form.reset();
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-2xl font-bold">Submit a Report</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Use this form to report any issues you've encountered or to request assistance.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of the issue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide detailed information about the issue..." 
                        rows={6}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include as much detail as possible including steps to reproduce the issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="attachmentUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Link to screenshot or relevant document" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can provide a link to a screenshot or document that helps explain the issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> 
                Submit Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
