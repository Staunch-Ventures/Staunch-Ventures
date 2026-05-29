import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function StartupResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Library</p>
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Helpful documents, templates, and guides from the Staunch Ventures team.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-base">
            <BookOpen className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
            <span>Founder resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Helpful documents, templates, and guides will be available here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
