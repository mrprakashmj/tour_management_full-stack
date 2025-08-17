import Link from "next/link";
import { Mountain, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8 pl-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">TourVista</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your adventure starts here. Discover and book unique travel experiences.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold font-headline">Company</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold font-headline">Support</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold font-headline">Connect</h4>
            <div className="flex items-center space-x-4">
                <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
                <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
                <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TourVista. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
