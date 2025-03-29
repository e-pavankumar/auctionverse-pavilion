import React, { useState, useEffect } from "react";
import { Menu, Search, MoreVertical, CircleHelp, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

// Fix the import paths to use relative imports
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Skeleton } from "./skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, isCollapsed, ...props }, ref) => {
    const mobile = useMobile();
    const [showSidebar, setShowSidebar] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      if (mobile) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    }, [mobile]);

    const handleLogout = () => {
      // Implement your logout logic here
      navigate("/logout");
    };

    if (!showSidebar) {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle Navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-6">
            <SidebarContent onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full min-w-[250px] flex-col border-r bg-secondary/50 backdrop-blur-sm",
          isCollapsed && "min-w-[70px]",
          className
        )}
        {...props}
      >
        <SidebarContent onLogout={handleLogout} isCollapsed={isCollapsed} />
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

interface SidebarContentProps {
  onLogout: () => void;
  isCollapsed?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onLogout, isCollapsed }) => {
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        {!isCollapsed && <span className="font-semibold text-sm">AuctionVerse</span>}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <TooltipContent>
                  <p>More Options</p>
                </TooltipContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {}}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input type="search" placeholder="Search..." className="my-2" />
      <Separator />
      <div className="flex-1">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Button variant="ghost">
          <CircleHelp className="mr-2 h-4 w-4" />
          Help
        </Button>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export { Sidebar };
