import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DocumentLibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Library</p>
        <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          LP reports, capital-call notices, and quarterly statements.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-base">
            <FileText className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
            <span>LP documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The document library and reporting tools will be available here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
