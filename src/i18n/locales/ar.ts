export const ar = {
  translation: {
    dashboard: "لوحة التحكم",
    employees: "الموظفون",
    candidates: "المرشحون",
    jobs: "الوظائف",
    attendance: "الحضور",
    leaves: "الإجازات",
    settings: "الإعدادات",

    welcome: "مرحباً",
    goodMorning: "صباح الخير",
    goodAfternoon: "مساء الخير",
    goodEvening: "مساء الخير",

    saveChanges: "حفظ التغييرات",
    profileInformation: "معلومات الملف الشخصي",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    username: "اسم المستخدم",
    email: "البريد الإلكتروني",
    role: "الدور",
    company: "الشركة",
    language: "اللغة",

    english: "الإنجليزية",
    arabic: "العربية",

    profileUpdated: "تم تحديث الملف الشخصي بنجاح.",

    // Dashboard
    realTimeHrOverview: "نظرة عامة فورية على الموارد البشرية",
    activeTeamMembers: "أعضاء الفريق النشطون",

    total: "الإجمالي",
    active: "نشط",
    inactive: "غير نشط",

    totalJobs: "إجمالي الوظائف",
    postings: "إعلانات الوظائف",
    open: "مفتوحة",
    closed: "مغلقة",

    pipeline: "مسار التوظيف",
    totalActiveApplicants:
      "إجمالي المتقدمين النشطين في مسار التوظيف",

    todaysAttendance: "حضور اليوم",
    present: "حاضر",
    turnoutRate: "نسبة الحضور",

    leavesOverview: "نظرة عامة على الإجازات",
    timeOff: "الإجازات",

    pendingRequests: "الطلبات المعلقة",
    requiresAction: "يتطلب إجراءً",

    approvedRequests: "الطلبات الموافق عليها",
    approvedThisCycle: "تمت الموافقة عليها خلال هذه الدورة",

    failedToLoadDashboard: "فشل تحميل لوحة التحكم",
    noDashboardData: "لا تتوفر بيانات لوحة التحكم",
    noMetricData: "لا توجد بيانات لعرضها.",


    employee: {
      title: "الموظفون",
      search: "بحث",
      add: "إضافة",

      tableView: "عرض الجدول",
      cardView: "عرض البطاقات",

      name: "الاسم",
      code: "الرمز",
      email: "البريد الإلكتروني",
      designation: "المسمى الوظيفي",
      status: "الحالة",

      noEmployeesFound: "لم يتم العثور على موظفين",
      adjustSearch: "حاول تعديل معايير البحث أو إضافة موظف جديد.",

      failedToLoad: "فشل تحميل الموظفين",

      previous: "السابق",
      next: "التالي",
      page: "صفحة",
      of: "من",
    },

    candidatesPage: {
      title: "المرشحون",
      search: "بحث",
      add: "إضافة",

      tableView: "عرض الجدول",
      cardView: "عرض البطاقات",

      name: "الاسم",
      email: "البريد الإلكتروني",
      designation: "المسمى الوظيفي",
      job: "الوظيفة",
      status: "الحالة",

      allStatuses: "جميع الحالات",
      applied: "تم التقديم",
      screening: "قيد الفحص",
      interview: "المقابلة",
      offer: "عرض وظيفي",
      hired: "تم التوظيف",
      rejected: "مرفوض",

      noCandidatesFound: "لم يتم العثور على مرشحين",
      adjustSearch: "حاول تعديل معايير البحث أو إضافة مرشح جديد.",

      failedToLoad: "فشل تحميل المرشحين",

      previous: "السابق",
      next: "التالي",
      page: "صفحة",
      of: "من",
    },

    jobsPage: {
      title: "الوظائف",
      search: "بحث",
      add: "إضافة",

      tableView: "عرض الجدول",
      cardView: "عرض البطاقات",

      titleColumn: "العنوان",
      description: "الوصف",
      location: "الموقع",
      status: "الحالة",
      action: "الإجراء",

      noJobsFound: "لم يتم العثور على وظائف",
      adjustSearch: "حاول تعديل معايير البحث أو إضافة وظيفة جديدة.",

      copyJobLink: "نسخ رابط الوظيفة",
      generating: "جارٍ الإنشاء...",
      qrCode: "رمز QR",

      jobQrCode: "رمز QR للوظيفة",
      shareQrCode: "شارك رمز QR هذا لنشر الوظيفة.",
      copyDirectJobLink: "نسخ رابط الوظيفة المباشر",
      downloadQr: "تنزيل رمز QR",
      close: "إغلاق",

      remoteUnspecified: "عن بُعد / غير محدد",
      noDescription: "لم يتم تقديم وصف.",

      failedToLoadJobs: "فشل تحميل الوظائف",
      previous: "السابق",
      next: "التالي",
      page: "صفحة",
      of: "من",
      jobLinkCopied: "تم نسخ رابط الوظيفة بنجاح.",
      jobUrlCopied: "تم نسخ رابط الوظيفة بنجاح.",
      failedToGenerateQr: "فشل إنشاء رمز QR.",

      jobStatus: {
        open: "مفتوحة",
        active: "نشطة",
        closed: "مغلقة",
      },
    },

    attendancePage: {
      title: "الحضور",

      tableView: "عرض الجدول",
      cardView: "عرض البطاقات",

      selectEmployee: "اختر موظفًا",
      clockIn: "تسجيل الدخول",
      clockingIn: "جارٍ تسجيل الدخول...",
      clockOut: "تسجيل الخروج",
      clockingOut: "جارٍ تسجيل الخروج...",
      completed: "مكتمل",

      employee: "الموظف",
      status: "الحالة",
      clockInTime: "وقت الدخول",
      clockOutTime: "وقت الخروج",
      totalHours: "إجمالي الساعات",
      actions: "الإجراءات",
      hours: "الساعات",

      noRecordsFound: "لم يتم العثور على سجلات الحضور",
      noRecordsForPeriod:
        "لا توجد سجلات متاحة للفترة المحددة.",

      failedToLoadRecords: "فشل تحميل سجلات الحضور",
      failedToLoad: "فشل تحميل الحضور.",
    },

    attendanceStatus: {
      present: "حاضر",
      absent: "غائب",
      late: "متأخر",
      halfDay: "نصف يوم",
    },

    leavesPage: {
      title: "الإجازات",

      tableView: "عرض الجدول",
      cardView: "عرض البطاقات",
      applyLeave: "تقديم طلب إجازة",

      employee: "الموظف",
      leaveType: "نوع الإجازة",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      reason: "السبب",
      status: "الحالة",
      action: "الإجراء",

      noLeavesFound: "لم يتم العثور على بيانات الإجازات",
      adjustSearch: "حاول تعديل معايير البحث أو تحديث الصفحة.",

      failedToLoadLeaves: "فشل تحميل الإجازات",

      processing: "جارٍ المعالجة...",
      approve: "موافقة",
      reject: "رفض",
      viewDetails: "عرض التفاصيل",

      na: "غير متوفر",

      leaveApproved: "تمت الموافقة على طلب الإجازة بنجاح.",
      leaveRejected: "تم رفض طلب الإجازة بنجاح.",

      leaveStatus: {
        approved: "موافق عليها",
        active: "نشطة",
        rejected: "مرفوضة",
        pending: "قيد الانتظار",
      },
    },

    status: {
      active: "نشط",
      inactive: "غير نشط",
    },

    employeeForm: {
      title: "إضافة موظف جديد",
      description: "أدخل بيانات الموظف أدناه لإنشاء ملف شخصي جديد.",

      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      emailAddress: "عنوان البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      designation: "المسمى الوظيفي",
      joiningDate: "تاريخ الانضمام",
      employmentType: "نوع التوظيف",

      firstNamePlaceholder: "جون",
      lastNamePlaceholder: "دو",
      emailPlaceholder: "john.doe@example.com",
      phonePlaceholder: "+1 (555) 000-0000 (اختياري)",
      designationPlaceholder: "مهندس برمجيات",

      fullTime: "دوام كامل",
      partTime: "دوام جزئي",
      contract: "عقد",
      intern: "متدرب",

      firstNameRequired: "الاسم الأول مطلوب.",
      lastNameRequired: "اسم العائلة مطلوب.",
      emailRequired: "البريد الإلكتروني مطلوب.",
      validEmail: "يرجى إدخال عنوان بريد إلكتروني صالح.",
      designationRequired: "المسمى الوظيفي مطلوب.",
      joiningDateRequired: "تاريخ الانضمام مطلوب.",
      employmentTypeRequired: "نوع التوظيف مطلوب.",

      creating: "جارٍ الإنشاء...",
      createEmployee: "إنشاء موظف",

      employeeCreated: "تم إنشاء الموظف بنجاح.",
      failedToCreate: "فشل إنشاء الموظف",
    },

    addCandidate: {
      title: "إضافة مرشح جديد",
      description: "أدخل تفاصيل المرشح أدناه لإنشاء ملف شخصي جديد.",

      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      emailAddress: "عنوان البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      designation: "المسمى الوظيفي",
      joiningDate: "تاريخ الانضمام",
      jobType: "نوع الوظيفة",
      employmentType: "نوع التوظيف",

      firstNamePlaceholder: "محمد",
      lastNamePlaceholder: "أحمد",
      emailPlaceholder: "john.doe@example.com",
      phonePlaceholder: "+1 (555) 000-0000 (اختياري)",
      designationPlaceholder: "مهندس برمجيات",

      selectJob: "اختر الوظيفة",

      fullTime: "دوام كامل",
      partTime: "دوام جزئي",
      contract: "عقد",
      intern: "متدرب",

      jobRequired: "الوظيفة مطلوبة.",
      firstNameRequired: "الاسم الأول مطلوب.",
      lastNameRequired: "اسم العائلة مطلوب.",
      emailRequired: "البريد الإلكتروني مطلوب.",
      validEmail: "يرجى إدخال عنوان بريد إلكتروني صالح.",
      designationRequired: "المسمى الوظيفي مطلوب.",
      joiningDateRequired: "تاريخ الانضمام مطلوب.",
      employmentTypeRequired: "نوع التوظيف مطلوب.",

      creating: "جارٍ الإنشاء...",
      createCandidate: "إنشاء مرشح",

      createdSuccessfully: "تم إنشاء المرشح بنجاح.",
      failedToCreate: "فشل إنشاء المرشح",
      failedToFetchJobs: "فشل تحميل الوظائف",
    },

    applyLeave: {
      title: "تقديم طلب إجازة",
      description: "أرسل طلب إجازة جديدًا للموظف للموافقة عليه.",

      employee: "الموظف",
      loadingEmployees: "جارٍ تحميل الموظفين...",
      selectEmployee: "اختر الموظف",

      leaveType: "نوع الإجازة",
      selectLeaveType: "اختر نوع الإجازة",

      casual: "إجازة اعتيادية",
      sick: "إجازة مرضية",
      earned: "إجازة مستحقة",
      unpaid: "إجازة بدون راتب",

      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",

      reason: "السبب",
      reasonPlaceholder: "أدخل شرحًا مختصرًا لسبب الإجازة...",

      cancel: "إلغاء",
      applying: "جارٍ التقديم...",
      applyLeave: "تقديم طلب الإجازة",

      employeeRequired: "الموظف مطلوب.",
      leaveTypeRequired: "نوع الإجازة مطلوب.",
      startDateRequired: "تاريخ البدء مطلوب.",
      endDateRequired: "تاريخ الانتهاء مطلوب.",
      endDateBeforeStart: "لا يمكن أن يكون تاريخ الانتهاء قبل تاريخ البدء.",
      reasonRequired: "السبب مطلوب.",
      reasonMinLength: "يجب ألا يقل السبب عن 5 أحرف.",
      reasonMaxLength: "لا يمكن أن يتجاوز السبب 500 حرف.",
    },
  },
};