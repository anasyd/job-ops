import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { OrchestratorPage } from "./OrchestratorPage";
import type { Job } from "../../shared/types";

const jobFixture: Job = {
  id: "job-1",
  source: "linkedin",
  sourceJobId: null,
  jobUrlDirect: null,
  datePosted: null,
  title: "Backend Engineer",
  employer: "Acme",
  employerUrl: null,
  jobUrl: "https://example.com/job",
  applicationLink: null,
  disciplines: null,
  deadline: null,
  salary: null,
  location: "London",
  degreeRequired: null,
  starting: null,
  jobDescription: "Build APIs",
  status: "ready",
  suitabilityScore: 90,
  suitabilityReason: null,
  tailoredSummary: null,
  tailoredHeadline: null,
  tailoredSkills: null,
  selectedProjectIds: null,
  pdfPath: null,
  notionPageId: null,
  jobType: null,
  salarySource: null,
  salaryInterval: null,
  salaryMinAmount: null,
  salaryMaxAmount: null,
  salaryCurrency: null,
  isRemote: null,
  jobLevel: null,
  jobFunction: null,
  listingType: null,
  emails: null,
  companyIndustry: null,
  companyLogo: null,
  companyUrlDirect: null,
  companyAddresses: null,
  companyNumEmployees: null,
  companyRevenue: null,
  companyDescription: null,
  skills: null,
  experienceRange: null,
  companyRating: null,
  companyReviewsCount: null,
  vacancyCount: null,
  workFromHomeType: null,
  discoveredAt: "2025-01-01T00:00:00Z",
  processedAt: null,
  appliedAt: null,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-02T00:00:00Z",
};

const createMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

vi.mock("./orchestrator/useOrchestratorData", () => ({
  useOrchestratorData: () => ({
    jobs: [jobFixture],
    stats: {
      discovered: 0,
      processing: 0,
      ready: 1,
      applied: 0,
      skipped: 0,
      expired: 0,
    },
    isLoading: false,
    isPipelineRunning: false,
    setIsPipelineRunning: vi.fn(),
    loadJobs: vi.fn(),
  }),
}));

vi.mock("./orchestrator/usePipelineSources", () => ({
  usePipelineSources: () => ({
    pipelineSources: ["linkedin"],
    setPipelineSources: vi.fn(),
    toggleSource: vi.fn(),
  }),
}));

vi.mock("./orchestrator/OrchestratorHeader", () => ({
  OrchestratorHeader: () => <div data-testid="header" />,
}));

vi.mock("./orchestrator/OrchestratorSummary", () => ({
  OrchestratorSummary: () => <div data-testid="summary" />,
}));

vi.mock("./orchestrator/OrchestratorFilters", () => ({
  OrchestratorFilters: () => <div data-testid="filters" />,
}));

vi.mock("./orchestrator/JobDetailPanel", () => ({
  JobDetailPanel: () => <div data-testid="detail-panel" />,
}));

vi.mock("./orchestrator/JobListPanel", () => ({
  JobListPanel: ({ onSelectJob, selectedJobId }: { onSelectJob: (id: string) => void; selectedJobId: string | null }) => (
    <div>
      <div data-testid="selected-job">{selectedJobId ?? "none"}</div>
      <button type="button" onClick={() => onSelectJob("job-1")}>Select job</button>
    </div>
  ),
}));

vi.mock("../components", () => ({
  ManualImportSheet: () => <div data-testid="manual-import" />,
}));

describe("OrchestratorPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens the detail drawer on mobile when a job is selected", () => {
    window.matchMedia = createMatchMedia(false) as unknown as typeof window.matchMedia;

    render(
      <MemoryRouter>
        <OrchestratorPage />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("detail-panel")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /select job/i }));

    expect(screen.getByTestId("detail-panel")).toBeInTheDocument();
  });

  it("renders the detail panel inline on desktop", () => {
    window.matchMedia = createMatchMedia(true) as unknown as typeof window.matchMedia;

    render(
      <MemoryRouter>
        <OrchestratorPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("detail-panel")).toBeInTheDocument();
  });
});
