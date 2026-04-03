"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { toast } from "sonner";

import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { JobCard } from "@/components/jobs/job-card";
import { JobsFilterBar } from "@/components/jobs/jobs-filter-bar";
import { getJobsApi } from "@/services/jobs.service";
import { Card, CardContent } from "@/components/ui/card";

const QUICK_FILTERS = [
  {
    label: "Part-Time",
    apply: {
      jobType: "PART_TIME",
    },
  },
  {
    label: "Beginner",
    apply: {
      skillLevel: "BEGINNER",
    },
  },
  {
    label: "Remote",
    apply: {
      workMode: "REMOTE",
    },
  },
  {
    label: "Weekend",
    apply: {
      jobType: "WEEKEND",
    },
  },
  {
    label: "Freelance",
    apply: {
      jobType: "FREELANCE",
    },
  },
];

const DEFAULT_FILTERS = {
  keyword: "",
  category: "",
  jobType: "",
  skillLevel: "",
  workMode: "",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobsApi();
      setJobs(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleQuickFilter = (applyValues) => {
    setFilters((prev) => ({
      ...prev,
      ...applyValues,
    }));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchStatus = job.status === "OPEN";

      const matchKeyword =
        !filters.keyword ||
        job.title?.toLowerCase().includes(filters.keyword.toLowerCase());

      const matchCategory =
        !filters.category ||
        job.category?.toLowerCase().includes(filters.category.toLowerCase());

      const matchJobType =
        !filters.jobType || job.jobType === filters.jobType;

      const matchSkillLevel =
        !filters.skillLevel || job.skillLevel === filters.skillLevel;

      const matchWorkMode =
        !filters.workMode || job.workMode === filters.workMode;

      return (
        matchStatus &&
        matchKeyword &&
        matchCategory &&
        matchJobType &&
        matchSkillLevel &&
        matchWorkMode
      );
    });
  }, [jobs, filters]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <BackButton href="/" label="Back to Home" />

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Sparkles className="h-4 w-4" />
              Flexible jobs for students
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Browse Student-Friendly Jobs
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Discover part-time, weekend, freelance, remote, and beginner-friendly
              opportunities designed to better fit student life.
            </p>
          </div>
        </section>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Quick Explore
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Jump into the most useful job types for students.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {QUICK_FILTERS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleQuickFilter(item.apply)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <BriefcaseBusiness className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Built for practical work
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    These jobs are meant to help students earn money and gain useful
                    real-world experience in a manageable way.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <GraduationCap className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Suitable for different student levels
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    High school students, university students, and beginners can all
                    explore opportunities that better match their current level.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <JobsFilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {loading ? "Loading jobs..." : `${filteredJobs.length} job(s) found`}
          </p>
        </div>

        {loading ? (
          <PageLoader />
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            title="No jobs found"
            description="Try changing your filters to find more student-friendly opportunities."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}