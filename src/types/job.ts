export interface Job {
  id: string;
  title: string;
  description: string;
  location: string | null;
  status: "OPEN" | "CLOSED";
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: {
    items: Job[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
}