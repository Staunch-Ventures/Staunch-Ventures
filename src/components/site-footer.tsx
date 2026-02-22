import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
            </Link>
            <p className="text-muted-foreground text-sm">
              Backing Africa's Boldest Founders
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="https://www.linkedin.com/company/staunchventures" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h4 className="font-semibold mb-2">Company</h4>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="/impact" className="text-muted-foreground hover:text-primary transition-colors">Impact</Link>
             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h4 className="font-semibold mb-2">Legal</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Staunch Ventures. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
