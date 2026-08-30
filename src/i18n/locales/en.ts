export const en = {
  translation: {
    dashboard: "Dashboard",
    employees: "Employees",
    candidates: "Candidates",
    jobs: "Jobs",
    attendance: "Attendance",
    leaves: "Leaves",
    settings: "Settings",

    welcome: "Welcome",
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",

    saveChanges: "Save Changes",
    profileInformation: "Profile Information",
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    email: "Email",
    role: "Role",
    company: "Company",
    language: "Language",

    english: "English",
    arabic: "Arabic",

    profileUpdated: "Profile updated successfully.",

    // Dashboard
    realTimeHrOverview: "Real time HR overview",
    activeTeamMembers: "Active Team Members",

    total: "Total",
    active: "Active",
    inactive: "Inactive",

    totalJobs: "Total Jobs",
    postings: "Postings",
    open: "Open",
    closed: "Closed",

    pipeline: "Pipeline",
    totalActiveApplicants:
      "Total active applicants in recruitment pipeline",

    todaysAttendance: "Today's Attendance",
    present: "Present",
    turnoutRate: "Turnout Rate",

    leavesOverview: "Leaves Overview",
    timeOff: "Time Off",

    pendingRequests: "Pending Requests",
    requiresAction: "Requires action",

    approvedRequests: "Approved Requests",
    approvedThisCycle: "Approved this cycle",

    failedToLoadDashboard: "Failed to load Dashboard",
    noDashboardData: "No dashboard data available",
    noMetricData: "There is no metric data to display.",

    employee: {
      title: "Employees",
      search: "Search",
      add: "Add",

      tableView: "Table View",
      cardView: "Card View",

      name: "Name",
      code: "Code",
      email: "Email",
      designation: "Designation",
      status: "Status",

      noEmployeesFound: "No employees found",
      adjustSearch: "Try adjusting your search or add a new employee.",

      failedToLoad: "Failed to load employees",

      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
    },

    candidatesPage: {
      title: "Candidates",
      search: "Search",
      add: "Add",

      tableView: "Table View",
      cardView: "Card View",

      name: "Name",
      email: "Email",
      designation: "Designation",
      job: "Job",
      status: "Status",

      allStatuses: "All Statuses",
      applied: "Applied",
      screening: "Screening",
      interview: "Interview",
      offer: "Offer",
      hired: "Hired",
      rejected: "Rejected",

      noCandidatesFound: "No candidates found",
      adjustSearch: "Try adjusting your search or add a new candidate.",

      failedToLoad: "Failed to load candidates",

      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
    },

    jobsPage: {
      title: "Jobs",
      search: "Search",
      add: "Add",

      tableView: "Table View",
      cardView: "Card View",

      titleColumn: "Title",
      description: "Description",
      location: "Location",
      status: "Status",
      action: "Action",

      noJobsFound: "No jobs found",
      adjustSearch: "Try adjusting your search or add a new job.",

      copyJobLink: "Copy Job Link",
      generating: "Generating...",
      qrCode: "QR Code",

      jobQrCode: "Job QR Code",
      shareQrCode: "Share this QR code to post this job.",
      copyDirectJobLink: "Copy Direct Job Link",
      downloadQr: "Download QR",
      close: "Close",

      remoteUnspecified: "Remote / Unspecified",
      noDescription: "No description provided.",

      failedToLoadJobs: "Failed to load jobs",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",

      jobLinkCopied: "Job link copied successfully.",
      jobUrlCopied: "Job URL copied successfully.",
      failedToGenerateQr: "Failed to generate QR.",

      jobStatus: {
        open: "Open",
        active: "Active",
        closed: "Closed",
      },
    },

    attendancePage: {
      title: "Attendance",

      tableView: "Table View",
      cardView: "Card View",

      selectEmployee: "Select Employee",
      clockIn: "Clock In",
      clockingIn: "Clocking In...",
      clockOut: "Clock Out",
      clockingOut: "Clocking Out...",
      completed: "Completed",

      employee: "Employee",
      status: "Status",
      clockInTime: "Clock In",
      clockOutTime: "Clock Out",
      totalHours: "Total Hours",
      actions: "Actions",
      hours: "Hours",

      noRecordsFound: "No attendance records found",
      noRecordsForPeriod:
        "There are no log records available for the selected period.",

      failedToLoadRecords: "Failed to load attendance records",
      failedToLoad: "Failed to load attendance.",
    },

    attendanceStatus: {
      present: "Present",
      absent: "Absent",
      late: "Late",
      halfDay: "Half Day",
    },

    leavesPage: {
      title: "Leaves",

      tableView: "Table View",
      cardView: "Card View",
      applyLeave: "Apply Leave",

      employee: "Employee",
      leaveType: "Leave Type",
      startDate: "Start Date",
      endDate: "End Date",
      reason: "Reason",
      status: "Status",
      action: "Action",

      noLeavesFound: "No leaves data found",
      adjustSearch: "Try adjusting your search criteria or refresh the page.",

      failedToLoadLeaves: "Failed to load leaves",

      processing: "Processing...",
      approve: "Approve",
      reject: "Reject",
      viewDetails: "View Details",

      na: "N/A",

      leaveApproved: "Leave approved successfully.",
      leaveRejected: "Leave rejected successfully.",

      leaveStatus: {
        approved: "Approved",
        active: "Active",
        rejected: "Rejected",
        pending: "Pending",
      },
    },

    status: {
      active: "Active",
      inactive: "Inactive",
    },

    employeeForm: {
      title: "Add New Employee",
      description: "Fill in the employee details below to create a new profile.",

      firstName: "First Name",
      lastName: "Last Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      designation: "Designation",
      joiningDate: "Joining Date",
      employmentType: "Employment Type",

      firstNamePlaceholder: "John",
      lastNamePlaceholder: "Doe",
      emailPlaceholder: "john.doe@example.com",
      phonePlaceholder: "+1 (555) 000-0000 (Optional)",
      designationPlaceholder: "Software Engineer",

      fullTime: "Full Time",
      partTime: "Part Time",
      contract: "Contract",
      intern: "Intern",

      firstNameRequired: "First name is required.",
      lastNameRequired: "Last name is required.",
      emailRequired: "Email is required.",
      validEmail: "Please enter a valid email address.",
      designationRequired: "Designation is required.",
      joiningDateRequired: "Joining date is required.",
      employmentTypeRequired: "Employment type is required.",

      creating: "Creating...",
      createEmployee: "Create Employee",

      employeeCreated: "Employee created successfully.",
      failedToCreate: "Failed to create employee",
    },

    addCandidate: {
      title: "Add New Candidate",
      description: "Fill in the candidate details below to create a new profile.",

      firstName: "First Name",
      lastName: "Last Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      designation: "Designation",
      joiningDate: "Joining Date",
      jobType: "Job Type",
      employmentType: "Employment Type",

      firstNamePlaceholder: "John",
      lastNamePlaceholder: "Doe",
      emailPlaceholder: "john.doe@example.com",
      phonePlaceholder: "+1 (555) 000-0000 (Optional)",
      designationPlaceholder: "Software Engineer",

      selectJob: "Select Job",

      fullTime: "Full Time",
      partTime: "Part Time",
      contract: "Contract",
      intern: "Intern",

      jobRequired: "Job is required.",
      firstNameRequired: "First name is required.",
      lastNameRequired: "Last name is required.",
      emailRequired: "Email is required.",
      validEmail: "Please enter a valid email address.",
      designationRequired: "Designation is required.",
      joiningDateRequired: "Joining date is required.",
      employmentTypeRequired: "Employment type is required.",

      creating: "Creating...",
      createCandidate: "Create Candidate",

      createdSuccessfully: "Candidate created successfully.",
      failedToCreate: "Failed to create Candidate",
      failedToFetchJobs: "Failed to fetch jobs",
    },

    applyLeave: {
      title: "Apply Leave",
      description: "Submit a new leave request for an employee for approval.",

      employee: "Employee",
      loadingEmployees: "Loading employees...",
      selectEmployee: "Select employee",

      leaveType: "Leave Type",
      selectLeaveType: "Select leave type",

      casual: "Casual",
      sick: "Sick",
      earned: "Earned",
      unpaid: "Unpaid",

      startDate: "Start Date",
      endDate: "End Date",

      reason: "Reason",
      reasonPlaceholder: "Provide a brief explanation for the leave...",

      cancel: "Cancel",
      applying: "Applying...",
      applyLeave: "Apply Leave",

      employeeRequired: "Employee is required.",
      leaveTypeRequired: "Leave type is required.",
      startDateRequired: "Start date is required.",
      endDateRequired: "End date is required.",
      endDateBeforeStart: "End date cannot be before start date.",
      reasonRequired: "Reason is required.",
      reasonMinLength: "Reason must be at least 5 characters.",
      reasonMaxLength: "Reason cannot exceed 500 characters.",
    },
  },
};