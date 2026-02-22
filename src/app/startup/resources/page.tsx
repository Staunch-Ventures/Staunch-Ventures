import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function StartupResourcesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Resource Library</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen />
            <span>Founder Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Helpful documents, templates, and guides from the Staunch Ventures team will be available here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
