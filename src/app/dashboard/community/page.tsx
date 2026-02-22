import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DocumentLibraryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Document Library</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            <span>LP Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The document library and reporting tools will be available here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
