import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";

import {
    checkCoursePurchaseInfoService,
    fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon, SearchIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams, searchQuery) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }

    if (searchQuery) {
        queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
    }

    return queryParams.join("&");
}

function StudentViewCoursesPage() {
    const [sort, setSort] = useState("price-lowtohigh");
    const [filters, setFilters] = useState({});
    const [purchaseStatus, setPurchaseStatus] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        studentViewCoursesList,
        setStudentViewCoursesList,
        loadingState,
        setLoadingState,
    } = useContext(StudentContext);
    //search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    function handleFilterOnChange(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSeection =
            Object.keys(cpyFilters).indexOf(getSectionId);

        console.log(indexOfCurrentSeection, getSectionId);
        if (indexOfCurrentSeection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption.id],
            };

            console.log(cpyFilters);
        } else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
                getCurrentOption.id
            );

            if (indexOfCurrentOption === -1)
                cpyFilters[getSectionId].push(getCurrentOption.id);
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }

        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    async function fetchAllStudentViewCourses(filters, sort, search) {
        const query = new URLSearchParams({
            ...filters,
            sortBy: sort,
            search: search || "",
        });
        const response = await fetchStudentViewCourseListService(query);
        if (response?.success) {
            setStudentViewCoursesList(response?.data);
            setLoadingState(false);
        }
    }

    async function handleCourseNavigate(getCurrentCourseId) {
        const response = await checkCoursePurchaseInfoService(
            getCurrentCourseId,
            auth?.user?._id
        );

        if (response?.success) {
            if (response?.data) {
                navigate(`/course-progress/${getCurrentCourseId}`);
            } else {
                navigate(`/course/details/${getCurrentCourseId}`);
            }
        }
    }

    async function handleBuyButtonDisplay(courseId) {
        if (!auth?.user?._id) return false; 
        const response = await checkCoursePurchaseInfoService(
          courseId,
          auth.user._id
        );
        if (response?.success) {
          return response?.data; 
        }
        return false;
      }
    
      async function fetchPurchaseStatuses() {
        if (studentViewCoursesList?.length > 0) {
          const statuses = {};
          for (const course of studentViewCoursesList) {
            const status = await handleBuyButtonDisplay(course?._id);
            statuses[course?._id] = status;
          }
          setPurchaseStatus(statuses);
        }
      }

    function handleSearchInputChange(event) {
        const value = event.target.value;
        setSearchInput(value);

        if (searchTimeout) clearTimeout(searchTimeout);

        const timeout = setTimeout(() => {
            setSearchQuery(value);
        }, 500); // debounce delay 500ms

        setSearchTimeout(timeout);
    }


    useEffect(() => {
        const buildQueryStringForFilters = createSearchParamsHelper(filters, searchQuery);
        setSearchParams(new URLSearchParams(buildQueryStringForFilters));
    }, [filters, searchQuery]);

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
        setSearchQuery(searchParams.get("search") || "");
        setSearchInput(searchParams.get("search") || "");
    }, []);

    useEffect(() => {
        if (filters !== null && sort !== null)
            fetchAllStudentViewCourses(filters, sort, searchQuery);
    }, [filters, sort, searchQuery]);

    useEffect(() => {
        return () => {
            sessionStorage.removeItem("filters");
        };
    }, []);

    useEffect(() => {
        fetchPurchaseStatuses();
    }, [studentViewCoursesList]);


    console.log(loadingState, "loadingState");

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">All Courses</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <aside className="w-full md:w-64 space-y-4">
                    <div>
                        {Object.keys(filterOptions).map((ketItem) => (
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
                        ))}
                    </div>
                </aside>
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-4 gap-5">
                        <div className="flex items-center border border-gray-300 rounded-md p-2 ">
                            <SearchIcon className="h-5 w-5 text-gray-500 mr-2"/>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                className="flex-1 outline-none"
                            />

                        </div>

                        
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
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuRadioGroup
                                    value={sort}
                                    onValueChange={(value) => setSort(value)}
                                >
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            value={sortItem.id}
                                            key={sortItem.id}
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                    </div>
                    <div className="text-left"> 
                        <span className="text-[18px] text-black font-semibold">
                            {studentViewCoursesList.length} Results
                        </span>
                    </div>
                    <div className="space-y-4">
                        {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                            studentViewCoursesList.map((courseItem) => (
                                <Card
                                    onClick={() => handleCourseNavigate(courseItem?._id)}
                                    className="cursor-pointer"
                                    key={courseItem?._id}
                                >
                                    <CardContent className="flex gap-4 p-4">
                                        <div className="w-48 h-32 flex-shrink-0">
                                            <img
                                                src={courseItem?.image}
                                                className="w-ful h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-left text-xl mb-2">
                                                {courseItem?.title}
                                            </CardTitle>
                                            <div className="flex flex-wrap justify-start gap-2 mb-2">
                                                {courseItem?.category && (
                                                    <span
                                                        className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                                                    >
                                                        #{courseItem?.category}
                                                    </span>
                                                )}
                                            </div>                                        

                                            <p className="text-left text-sm text-gray-600 mb-1">
                                                Created By{" "}
                                                <span className="font-bold">
                                                    {courseItem?.instructorName}
                                                </span>
                                            </p>
                                            <p className="text-left text-[16px] text-gray-600 mt-3 mb-2">
                                                {`${courseItem?.curriculum?.length} ${courseItem?.curriculum?.length <= 1
                                                    ? "Lecture"
                                                    : "Lectures"
                                                    } - ${courseItem?.level.toUpperCase()} Level`}
                                            </p>
                                            {/* <p className="text-left font-bold text-lg">
                                                ${courseItem?.pricing}
                                            </p> */}
                                            {purchaseStatus[courseItem?._id] ? (
                                                <Button className="w-full bg-green-500 text-white text-[17px] font-semibold hover:bg-green-600">
                                                Continue Learning
                                                </Button>
                                            ) : (
                                                <Button className="w-full bg-red-500 text-white text-[17px] font-semibold hover:bg-red-600">
                                                Buy now ${courseItem?.pricing}
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : loadingState ? (
                            <Skeleton />
                        ) : (
                            <h1 className="font-extrabold text-4xl">No Courses Found</h1>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default StudentViewCoursesPage;
