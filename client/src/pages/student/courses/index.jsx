import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { filterOptions } from "@/config";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";

function StudentViewCoursesPage() {


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">All Courses</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <aside className="w-full md:w-64 space-y-4">
                    <div>
                        {
                            Object.keys(filterOptions).map((ketItem) => (
                                <div className="p-4 border-b">
                                    <h3 className="font-bold mb-3">{ketItem.toUpperCase()}</h3>
                                    <div className="grid gap-2 mt-2">
                                        {filterOptions[ketItem].map((option) => (
                                            <Label className="flex font-medium items-center gap-3">
                                                <Checkbox
                                                    checked={
                                                        filters &&
                                                        Object.keys(filters).length > 0 &&
                                                        filters[ketItem] &&
                                                        filters[ketItem].indexOf(option.id) > -1
                                                    }
                                                    onCheckedChange={() =>
                                                        handleFilterOnChange(ketItem, option)
                                                    }
                                                />
                                                {option.label}
                                            </Label>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </aside>
                <main>
                    <div className="flex justify-end items-center mb-4 gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 p-5"
                                >
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span className="text-[16px] font-medium">Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="space-y-4">
                    </div>

                </main>
            </div>
        </div>
    );
}

export default StudentViewCoursesPage;

