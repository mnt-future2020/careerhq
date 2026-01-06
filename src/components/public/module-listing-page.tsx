"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type {
  UniversalModule,
  ModuleType,
  ModuleCategory,
} from "@/types/universal-module";
import { MODULE_DISPLAY_NAMES } from "@/types/universal-module";
import { ProtectedPageWrapper } from "@/components/protected-page-wrapper";
import { BlurText } from "@/components/ui/blur-text";

// Map module types to their route names
const MODULE_TYPE_TO_ROUTE: Record<ModuleType, string> = {
  "study-india": "study-india",
  "placement-india": "placement-india",
  "placement-abroad": "placement-abroad",
  "internship-india": "internship-india",
  "internship-abroad": "internship-abroad",
  "mbbs-india": "mbbs-india",
  "mbbs-abroad": "mbbs-abroad",
  lms: "lms",
  "uni-project": "university-projects",
  "school-project": "school-projects",
  "mou-project": "scholarship",
  loans: "loans",
};

interface ModuleListingModernProps {
  moduleType: ModuleType;
  title: string;
  description: string;
  heroImage?: string;
  initialModules?: UniversalModule[];
  initialCategories?: ModuleCategory[];
  companiesSection?: React.ReactNode;
  showTrainingPlacement?: boolean;
}

export default function ModuleListingModern({
  moduleType,
  title,
  description,
  initialModules = [],
  initialCategories = [],
  companiesSection,
  showTrainingPlacement = false,
}: ModuleListingModernProps) {
  const [modules, setModules] = useState<UniversalModule[]>(initialModules);
  const [categories, setCategories] =
    useState<ModuleCategory[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  // Only fetch data if initial data wasn't provided
  useEffect(() => {
    if (initialModules.length === 0 && initialCategories.length === 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleType]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const modulesRes = await fetch(
        `/api/modules?moduleType=${moduleType}&published=true`
      );
      if (modulesRes.ok) {
        const modulesData = await modulesRes.json();
        setModules(modulesData);
      }

      const categoriesRes = await fetch(
        `/api/modules/categories?moduleType=${moduleType}`
      );
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.size === 0 || selectedCategories.has(module.category);
    return matchesSearch && matchesCategory;
  });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSearchQuery("");
  };

  // For certain module types, show all modules in one section without featured
  const shouldHideFeatured =
    moduleType === "placement-india" ||
    moduleType === "study-india" ||
    moduleType === "placement-abroad" ||
    moduleType === "mbbs-india" ||
    moduleType === "mbbs-abroad" ||
    moduleType === "loans"||
    moduleType === "mou-project";

  const featuredModules = shouldHideFeatured ? [] : filteredModules.slice(0, 3);
  const regularModules = shouldHideFeatured
    ? filteredModules
    : filteredModules.slice(3);

  // Paginated regular modules
  const paginatedModules = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return regularModules.slice(start, end);
  }, [regularModules, page]);

  const totalPages = Math.ceil(regularModules.length / itemsPerPage);

  return (
    <ProtectedPageWrapper requiredFor={MODULE_DISPLAY_NAMES[moduleType]}>
      <div className="min-h-screen gradient-mesh relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
              <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
                <BlurText
                  text={title}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text leading-tight px-2"
                  delay={0.2}
                />

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                  {description}
                </p>

                {/* Training & Placement Badge */}
                {showTrainingPlacement && (
                  <div className="mt-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg">
                      <span>Training & Placement</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {moduleType === "study-india" ? (
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex gap-3 items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
                  <div className="flex-1">
                    <Autocomplete
                      placeholder="Select opportunity..."
                      size="lg"
                      defaultItems={modules}
                      onSelectionChange={(key) => {
                        if (key) {
                          const selectedModule = modules.find(
                            (m) => m.id === key
                          );
                          if (selectedModule) {
                            window.location.href = `/${MODULE_TYPE_TO_ROUTE[moduleType]}/${selectedModule.id}`;
                          }
                        }
                      }}
                      classNames={{
                        base: "w-full",
                        listboxWrapper: "max-h-[400px]",
                        selectorButton: "text-gray-400",
                      }}
                      startContent={
                        <Search size={20} className="text-gray-400" />
                      }
                      inputProps={{
                        classNames: {
                          input: "text-base text-gray-900 dark:text-white",
                          inputWrapper:
                            "bg-gray-50 dark:bg-gray-700 border-0 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300",
                        },
                      }}
                    >
                      {(module) => (
                        <AutocompleteItem
                          key={module.id}
                          textValue={module.title}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{module.title}</span>
                            <span className="text-xs text-gray-500">
                              {module.category}
                            </span>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium px-8"
                    startContent={<Search size={20} />}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          ) : moduleType !== "placement-india" &&
            moduleType !== "placement-abroad" &&
            moduleType !== "mbbs-india" &&
            moduleType !== "mbbs-abroad" &&
            moduleType !== "loans" &&
            moduleType !== "mou-project"? (
            <div className="sticky top-0 z-40 backdrop-blur-xl ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <div className="flex-1 w-full">
                    <Input
                      placeholder="Search opportunities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      size="lg"
                      startContent={
                        <Search size={18} className="text-gray-400" />
                      }
                      classNames={{
                        input:
                          "text-sm sm:text-base bg-transparent text-gray-900 placeholder:text-gray-400",
                        inputWrapper:
                          "glass-strong hover:border-blue-500/50 data-[hover=true]:glass-strong transition-all duration-300",
                      }}
                    />
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      size="lg"
                      className="glass-strong border-gray-200 text-gray-900 hover:border-blue-500/50 transition-all duration-300 flex-1 sm:flex-none sm:min-w-[140px]"
                      startContent={<Filter size={18} />}
                      onPress={() => setShowFilters(!showFilters)}
                    >
                      <span className="text-sm sm:text-base">Filters</span>
                      {selectedCategories.size > 0 && (
                        <Chip size="sm" className="bg-blue-500 text-white ml-2">
                          {selectedCategories.size}
                        </Chip>
                      )}
                    </Button>

                    {selectedCategories.size > 0 && (
                      <Button
                        size="lg"
                        variant="light"
                        className="text-gray-500 hover:text-gray-900 hidden sm:flex"
                        onPress={clearFilters}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                </div>

                {showFilters && (
                  <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500">
                        Filter by category
                      </h3>
                      <Button
                        size="sm"
                        variant="light"
                        className="text-gray-400 hover:text-gray-900"
                        onPress={() => setShowFilters(false)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => toggleCategory(category.name)}
                          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedCategories.has(category.name)
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg glow-purple"
                              : "glass-strong text-gray-700 hover:text-gray-900 hover:border-blue-500/50"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Companies Section */}
          {companiesSection && (
            <div className="border-t border-gray-200/50">
              {companiesSection}
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20 sm:py-32 gap-4">
                <Spinner
                  size="lg"
                  classNames={{
                    circle1: "border-b-blue-500",
                    circle2: "border-b-blue-400",
                  }}
                />
                <p className="text-gray-500">Loading opportunities...</p>
              </div>
            ) : filteredModules.length === 0 ? (
              <div className="text-center py-20 sm:py-32">
                <div className="glass-strong rounded-2xl sm:rounded-3xl p-8 sm:p-12 max-w-md mx-auto">
                  <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 gradient-text">
                    No results found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                    Try adjusting your search or filters to find what
                    you&apos;re looking for
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium"
                    onPress={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 sm:space-y-12">
                {featuredModules.length > 0 && !shouldHideFeatured && (
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                      <Sparkles
                        size={20}
                        className="text-blue-600 sm:w-6 sm:h-6"
                      />
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
                        Featured Opportunities
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="md:col-span-2 lg:col-span-2">
                        <FeaturedModuleCard
                          module={featuredModules[0]}
                          moduleType={moduleType}
                          large={true}
                        />
                      </div>
                      <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                        {featuredModules.slice(1, 3).map((module) => (
                          <FeaturedModuleCard
                            key={module.id}
                            module={module}
                            moduleType={moduleType}
                            large={false}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {regularModules.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        {selectedCategories.size > 0
                          ? "More Results"
                          : "All Opportunities"}
                      </h2>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {regularModules.length}{" "}
                        {regularModules.length === 1 ? "result" : "results"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {paginatedModules.map((module) => (
                        <ModuleCardModern
                          key={module.id}
                          module={module}
                          moduleType={moduleType}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <Pagination
                          total={totalPages}
                          page={page}
                          onChange={setPage}
                          showControls
                          color="primary"
                          size="lg"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedPageWrapper>
  );
}

interface FeaturedModuleCardProps {
  module: UniversalModule;
  moduleType: ModuleType;
  large?: boolean;
}

function FeaturedModuleCard({
  module,
  moduleType,
  large = false,
}: FeaturedModuleCardProps) {
  const getImageUrl = (imageId: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_800,h_600,c_fill/${imageId}`;
  };

  return (
    <Link
      href={`/${MODULE_TYPE_TO_ROUTE[moduleType]}/${module.slug || module.id}`}
      className="group block h-full"
    >
      <div className="relative glass-strong rounded-2xl sm:rounded-3xl overflow-hidden h-full transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/30">
        {module.coverImage && (
          <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
            <Image
              src={getImageUrl(module.coverImage) || "/placeholder.svg"}
              alt={module.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6">
              <div className="bg-white/20 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full border border-white/30">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">
                  {module.category}
                </span>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h3
                  className={`font-bold text-white leading-tight ${
                    large
                      ? "text-lg sm:text-xl md:text-2xl lg:text-3xl line-clamp-2"
                      : "text-base sm:text-lg md:text-xl line-clamp-2"
                  }`}
                >
                  {module.title}
                </h3>

                <p
                  className={`text-white/90 leading-relaxed ${
                    large
                      ? "text-xs sm:text-sm md:text-base line-clamp-2"
                      : "text-xs sm:text-sm line-clamp-2"
                  }`}
                >
                  {module.shortDescription}
                </p>

                {module.highlights && module.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {module.highlights
                      .slice(0, large ? 3 : 2)
                      .map((highlight, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 rounded-lg border border-white/20"
                        >
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <CheckCircle2
                              size={12}
                              className="text-green-400 sm:w-3.5 sm:h-3.5"
                            />
                            <span className="text-[10px] sm:text-xs text-white font-medium line-clamp-1">
                              {highlight}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all pt-1 sm:pt-2">
                  <span className="text-xs sm:text-sm md:text-base">
                    Learn More
                  </span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

interface ModuleCardModernProps {
  module: UniversalModule;
  moduleType: ModuleType;
}

function ModuleCardModern({ module, moduleType }: ModuleCardModernProps) {
  const getImageUrl = (imageId: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_600,h_400,c_fill/${imageId}`;
  };

  return (
    <Link
      href={`/${MODULE_TYPE_TO_ROUTE[moduleType]}/${module.slug || module.id}`}
      className="group block h-full"
    >
      <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col shadow-lg shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30">
        {module.coverImage && (
          <div className="relative w-full h-40 sm:h-48 md:h-52 overflow-hidden">
            <Image
              src={getImageUrl(module.coverImage) || "/placeholder.svg"}
              alt={module.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
                <span className="text-[10px] sm:text-xs font-bold text-blue-600">
                  {module.category}
                </span>
              </div>
            </div> */}
          </div>
        )}

        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors flex-1">
              {module.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 leading-relaxed flex-1">
            {module.shortDescription}
          </p>

          {module.highlights && module.highlights.length > 0 && (
            <div className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8">
              {module.highlights.slice(0, 2).map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-2.5 group/item"
                >
                  <div className="mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2
                      size={12}
                      className="text-green-600 sm:w-3.5 sm:h-3.5"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-2">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 text-blue-600 font-semibold group-hover:gap-4 transition-all mt-auto pt-4 sm:pt-5">
            <span className="text-xs sm:text-sm">View Details</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/30">
              <ArrowRight
                size={16}
                className="text-white transition-transform group-hover:translate-x-0.5 sm:w-5 sm:h-5"
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all duration-500 pointer-events-none" />
      </div>
    </Link>
  );
}
