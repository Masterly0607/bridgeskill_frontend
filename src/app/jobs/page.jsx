"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { getJobsApi } from "@/services/jobs.service";
import { JobCard } from "@/components/jobs/job-card";
import { JobsFilterBar } from "@/components/jobs/jobs-filter-bar";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keywordFromUrl = searchParams.get("keyword") || "";
  const categoryFromUrl = searchParams.get("category") || "";
  const statusFromUrl = searchParams.get("status") || "";

  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [draftFilters, setDraftFilters] = useState({
    keyword: "",
    category: "",
    status: "",
  });

  const currentFilters = useMemo(
    () => ({
      keyword: keywordFromUrl,
      category: categoryFromUrl,
      status: statusFromUrl,
    }),
    [keywordFromUrl, categoryFromUrl, statusFromUrl]
  );

  useEffect(() => {
    setDraftFilters(currentFilters);
  }, [currentFilters]);

  const categoryOptions = useMemo(() => {
    const categories = allJobs.map((job) => job.category).filter(Boolean);
    return [...new Set(categories)];
  }, [allJobs]);

  const fetchJobs = async (activeFilters = currentFilters) => {
    try {
      setLoading(true);

      const params = {};

      if (activeFilters.keyword) params.keyword = activeFilters.keyword;
      if (activeFilters.category) params.category = activeFilters.category;
      if (activeFilters.status) params.status = activeFilters.status;

      const response = await getJobsApi(params);
      setJobs(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllJobsForCategories = async () => {
    try {
      const response = await getJobsApi();
      setAllJobs(response.data || []);
    } catch (error) {
      console.error("Failed to load category source jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    fetchAllJobsForCategories();
  }, []);

  const updateUrlFilters = (nextFilters) => {
    const params = new URLSearchParams();

    if (nextFilters.keyword.trim()) {
      params.set("keyword", nextFilters.keyword.trim());
    }

    if (nextFilters.category.trim()) {
      params.set("category", nextFilters.category.trim());
    }

    if (nextFilters.status.trim()) {
      params.set("status", nextFilters.status.trim());
    }

    const queryString = params.toString();
    router.replace(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  const handleFilterChange = (field, value) => {
    setDraftFilters((prev) => {
      const next = {
        ...prev,
        [field]: value,
      };

      if (field === "category" || field === "status") {
        updateUrlFilters(next);
      }

      return next;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (draftFilters.keyword !== currentFilters.keyword) {
        updateUrlFilters(draftFilters);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [draftFilters.keyword, draftFilters.category, draftFilters.status, currentFilters.keyword]);

  const handleReset = () => {
    const cleared = {
      keyword: "",
      category: "",
      status: "",
    };

    setDraftFilters(cleared);
    router.replace("/jobs");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 rounded-3xl bg-slate-900 px-8 py-10 text-white md:flex-row md:items-center">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
              Public Jobs
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Explore opportunities
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Browse available jobs, review details, and sign in to apply as a
              student.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="rounded-xl">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/20 bg-transparent text-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>

        <JobsFilterBar
          filters={draftFilters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          categoryOptions={categoryOptions}
        />

        {loading ? (
          <PageLoader />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No jobs found"
            description="Try changing your search or filter values to find available positions."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}