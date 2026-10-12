export const DEPARTMENTS = [
  { id: 1, name: 'Computer Science', code: 'CS', hod: 'Dr. Priya Sharma', students: 240, faculty: 18, courses: 12, color: '#4F46E5' },
  { id: 2, name: 'Mechanical Engineering', code: 'ME', hod: 'Dr. Rajesh Kumar', students: 180, faculty: 14, courses: 10, color: '#0EA5E9' },
  { id: 3, name: 'Electronics & Communication', code: 'EC', hod: 'Dr. Sunita Patel', students: 200, faculty: 16, courses: 11, color: '#F59E0B' },
  { id: 4, name: 'Civil Engineering', code: 'CE', hod: 'Dr. Arjun Singh', students: 160, faculty: 12, courses: 9, color: '#10B981' },
  { id: 5, name: 'Business Administration', code: 'BA', hod: 'Dr. Meena Joshi', students: 220, faculty: 15, courses: 14, color: '#EF4444' },
  { id: 6, name: 'Mathematics', code: 'MA', hod: 'Dr. Vikram Nair', students: 120, faculty: 10, courses: 8, color: '#8B5CF6' },
];

export const STUDENTS = [
  { id: 'CS2021001', name: 'Aryan Gupta', email: 'aryan@edumail.com', dept: 'Computer Science', semester: 6, cgpa: 8.7, attendance: 88, fees: 'Paid', phone: '9876543210', dob: '2003-04-12', address: 'Ludhiana, Punjab', avatar: 'AG', gender: 'Male', status: 'Active', admYear: 2021 },
  { id: 'CS2021002', name: 'Priya Mehta', email: 'priya@edumail.com', dept: 'Computer Science', semester: 6, cgpa: 9.2, attendance: 94, fees: 'Paid', phone: '9876543211', dob: '2003-06-22', address: 'Chandigarh', avatar: 'PM', gender: 'Female', status: 'Active', admYear: 2021 },
  { id: 'ME2022001', name: 'Rohit Sharma', email: 'rohit@edumail.com', dept: 'Mechanical Engineering', semester: 4, cgpa: 7.8, attendance: 72, fees: 'Pending', phone: '9876543212', dob: '2004-01-15', address: 'Amritsar, Punjab', avatar: 'RS', gender: 'Male', status: 'Active', admYear: 2022 },
  { id: 'EC2021003', name: 'Anjali Singh', email: 'anjali@edumail.com', dept: 'Electronics & Communication', semester: 6, cgpa: 8.4, attendance: 91, fees: 'Paid', phone: '9876543213', dob: '2003-09-30', address: 'Delhi', avatar: 'AS', gender: 'Female', status: 'Active', admYear: 2021 },
  { id: 'BA2023001', name: 'Karan Verma', email: 'karan@edumail.com', dept: 'Business Administration', semester: 2, cgpa: 8.1, attendance: 85, fees: 'Pending', phone: '9876543214', dob: '2005-03-18', address: 'Jalandhar, Punjab', avatar: 'KV', gender: 'Male', status: 'Active', admYear: 2023 },
  { id: 'CS2022001', name: 'Sneha Patel', email: 'sneha@edumail.com', dept: 'Computer Science', semester: 4, cgpa: 9.5, attendance: 97, fees: 'Paid', phone: '9876543215', dob: '2004-07-11', address: 'Patiala, Punjab', avatar: 'SP', gender: 'Female', status: 'Active', admYear: 2022 },
  { id: 'CE2021001', name: 'Amit Kumar', email: 'amit@edumail.com', dept: 'Civil Engineering', semester: 6, cgpa: 7.5, attendance: 68, fees: 'Overdue', phone: '9876543216', dob: '2003-12-05', address: 'Mohali, Punjab', avatar: 'AK', gender: 'Male', status: 'Active', admYear: 2021 },
  { id: 'MA2023001', name: 'Neha Sharma', email: 'neha@edumail.com', dept: 'Mathematics', semester: 2, cgpa: 9.0, attendance: 92, fees: 'Paid', phone: '9876543217', dob: '2005-08-25', address: 'Bathinda, Punjab', avatar: 'NS', gender: 'Female', status: 'Active', admYear: 2023 },
];

export const FACULTY = [
  { id: 'FAC001', name: 'Dr. Priya Sharma', email: 'p.sharma@edumail.com', dept: 'Computer Science', designation: 'HOD & Professor', subjects: ['Data Structures', 'Algorithms', 'DBMS'], experience: 15, phone: '9812345678', avatar: 'PS', status: 'Active', qualification: 'Ph.D. IIT Delhi' },
  { id: 'FAC002', name: 'Prof. Aman Thakur', email: 'a.thakur@edumail.com', dept: 'Computer Science', designation: 'Associate Professor', subjects: ['Operating Systems', 'Computer Networks'], experience: 10, phone: '9812345679', avatar: 'AT', status: 'Active', qualification: 'M.Tech NIT Chandigarh' },
  { id: 'FAC003', name: 'Dr. Rajesh Kumar', email: 'r.kumar@edumail.com', dept: 'Mechanical Engineering', designation: 'HOD & Professor', subjects: ['Thermodynamics', 'Fluid Mechanics'], experience: 18, phone: '9812345680', avatar: 'RK', status: 'Active', qualification: 'Ph.D. IIT Roorkee' },
  { id: 'FAC004', name: 'Dr. Sunita Patel', email: 's.patel@edumail.com', dept: 'Electronics & Communication', designation: 'HOD & Professor', subjects: ['Digital Electronics', 'Signal Processing'], experience: 14, phone: '9812345681', avatar: 'SP', status: 'Active', qualification: 'Ph.D. IIT Bombay' },
  { id: 'FAC005', name: 'Prof. Vikram Nair', email: 'v.nair@edumail.com', dept: 'Mathematics', designation: 'Professor', subjects: ['Calculus', 'Linear Algebra', 'Statistics'], experience: 12, phone: '9812345682', avatar: 'VN', status: 'Active', qualification: 'M.Sc., M.Phil. Mathematics' },
  { id: 'FAC006', name: 'Dr. Meena Joshi', email: 'm.joshi@edumail.com', dept: 'Business Administration', designation: 'HOD & Professor', subjects: ['Marketing', 'Finance', 'HRM'], experience: 16, phone: '9812345683', avatar: 'MJ', status: 'Active', qualification: 'Ph.D. Management' },
];

export const COURSES = [
  { id: 'CS301', name: 'Data Structures & Algorithms', dept: 'Computer Science', credits: 4, semester: 3, faculty: 'Dr. Priya Sharma', type: 'Core', enrolled: 65 },
  { id: 'CS302', name: 'Database Management Systems', dept: 'Computer Science', credits: 4, semester: 3, faculty: 'Prof. Aman Thakur', type: 'Core', enrolled: 65 },
  { id: 'CS401', name: 'Operating Systems', dept: 'Computer Science', credits: 4, semester: 4, faculty: 'Prof. Aman Thakur', type: 'Core', enrolled: 60 },
  { id: 'CS501', name: 'Machine Learning', dept: 'Computer Science', credits: 4, semester: 5, faculty: 'Dr. Priya Sharma', type: 'Elective', enrolled: 45 },
  { id: 'ME301', name: 'Thermodynamics', dept: 'Mechanical Engineering', credits: 4, semester: 3, faculty: 'Dr. Rajesh Kumar', type: 'Core', enrolled: 58 },
  { id: 'EC401', name: 'Digital Signal Processing', dept: 'Electronics & Communication', credits: 3, semester: 4, faculty: 'Dr. Sunita Patel', type: 'Core', enrolled: 52 },
  { id: 'MA101', name: 'Engineering Mathematics I', dept: 'Mathematics', credits: 4, semester: 1, faculty: 'Prof. Vikram Nair', type: 'Core', enrolled: 200 },
  { id: 'BA301', name: 'Marketing Management', dept: 'Business Administration', credits: 3, semester: 3, faculty: 'Dr. Meena Joshi', type: 'Core', enrolled: 70 },
];

export const NOTICES = [
  { id: 1, title: 'End Semester Examination Schedule Released', category: 'Academic', date: '2026-06-12', priority: 'High', content: 'The schedule for end semester examinations has been released. Students are advised to check the notice board and college website for detailed timetable.', author: 'Examination Cell' },
  { id: 2, title: 'College Annual Day Celebration - June 25th', category: 'Events', date: '2026-06-10', priority: 'Medium', content: 'The college annual day will be celebrated on June 25th, 2026. All students and faculty are invited to participate in cultural programs.', author: 'Admin Office' },
  { id: 3, title: 'Fee Payment Deadline - Last Date June 30th', category: 'Administrative', date: '2026-06-08', priority: 'High', content: 'Students with pending fees are reminded that the last date for fee payment is June 30th, 2026. Late fee will be charged after this date.', author: 'Accounts Department' },
  { id: 4, title: 'Placement Drive: TechCorp India - June 20th', category: 'Placement', date: '2026-06-07', priority: 'High', content: 'TechCorp India will be conducting a campus placement drive on June 20th. Eligible students from CS and EC departments should register.', author: 'Placement Cell' },
  { id: 5, title: 'Library Book Return Notice', category: 'Academic', date: '2026-06-05', priority: 'Low', content: 'Students are requested to return all library books before the examination period begins. Fine will be levied for overdue books.', author: 'Library' },
  { id: 6, title: 'Workshop on AI & Machine Learning - June 18th', category: 'Events', date: '2026-06-04', priority: 'Medium', content: 'A one-day workshop on AI and Machine Learning will be conducted on June 18th by industry experts.', author: 'CS Department' },
];

export const ASSIGNMENTS = [
  { id: 1, title: 'Binary Search Tree Implementation', course: 'CS301', faculty: 'Dr. Priya Sharma', dueDate: '2026-06-20', marks: 20, submissions: 45, total: 65, status: 'Active' },
  { id: 2, title: 'ER Diagram Design Project', course: 'CS302', faculty: 'Prof. Aman Thakur', dueDate: '2026-06-18', marks: 30, submissions: 60, total: 65, status: 'Active' },
  { id: 3, title: 'Process Scheduling Algorithms', course: 'CS401', faculty: 'Prof. Aman Thakur', dueDate: '2026-06-15', marks: 25, submissions: 58, total: 60, status: 'Due Today' },
  { id: 4, title: 'Neural Network from Scratch', course: 'CS501', faculty: 'Dr. Priya Sharma', dueDate: '2026-06-25', marks: 50, submissions: 12, total: 45, status: 'Active' },
  { id: 5, title: 'Heat Transfer Analysis', course: 'ME301', faculty: 'Dr. Rajesh Kumar', dueDate: '2026-06-10', marks: 20, submissions: 58, total: 58, status: 'Closed' },
];

export const EXAMS = [
  { id: 1, name: 'End Semester Exam - CS301', course: 'CS301', date: '2026-07-01', time: '10:00 AM', duration: '3 hours', hall: 'Hall A', maxMarks: 100, type: 'Theory' },
  { id: 2, name: 'End Semester Exam - CS302', course: 'CS302', date: '2026-07-03', time: '10:00 AM', duration: '3 hours', hall: 'Hall B', maxMarks: 100, type: 'Theory' },
  { id: 3, name: 'Mid Semester Exam - CS501', course: 'CS501', date: '2026-06-22', time: '2:00 PM', duration: '2 hours', hall: 'Lab 1', maxMarks: 50, type: 'Practical' },
  { id: 4, name: 'End Semester Exam - MA101', course: 'MA101', date: '2026-07-05', time: '10:00 AM', duration: '3 hours', hall: 'Hall C', maxMarks: 100, type: 'Theory' },
];

export const ATTENDANCE_DATA = [
  { month: 'Jan', present: 88, absent: 12 },
  { month: 'Feb', present: 92, absent: 8 },
  { month: 'Mar', present: 85, absent: 15 },
  { month: 'Apr', present: 90, absent: 10 },
  { month: 'May', present: 87, absent: 13 },
  { month: 'Jun', present: 91, absent: 9 },
];

export const FEE_STRUCTURE = [
  { id: 1, category: 'Tuition Fee', amount: 45000, period: 'Per Semester' },
  { id: 2, category: 'Examination Fee', amount: 2500, period: 'Per Semester' },
  { id: 3, category: 'Library Fee', amount: 1500, period: 'Annual' },
  { id: 4, category: 'Sports & Cultural', amount: 2000, period: 'Annual' },
  { id: 5, category: 'Laboratory Fee', amount: 5000, period: 'Per Semester' },
  { id: 6, category: 'Development Fee', amount: 3000, period: 'Annual' },
];

export const BOOKS = [
  { id: 'B001', title: 'Introduction to Algorithms', author: 'Cormen et al.', isbn: '978-0262046305', dept: 'Computer Science', total: 10, available: 4, borrowed: 6 },
  { id: 'B002', title: 'Database System Concepts', author: 'Silberschatz', isbn: '978-0078022159', dept: 'Computer Science', total: 8, available: 3, borrowed: 5 },
  { id: 'B003', title: 'Thermodynamics: An Engineering Approach', author: 'Cengel & Boles', isbn: '978-0073398174', dept: 'Mechanical Engineering', total: 12, available: 8, borrowed: 4 },
  { id: 'B004', title: 'Signals and Systems', author: 'Oppenheim & Willsky', isbn: '978-0138147570', dept: 'Electronics & Communication', total: 6, available: 2, borrowed: 4 },
  { id: 'B005', title: 'Higher Engineering Mathematics', author: 'B.S. Grewal', isbn: '978-9325965218', dept: 'Mathematics', total: 20, available: 12, borrowed: 8 },
];

export const PLACEMENTS = [
  { id: 1, company: 'TechCorp India', role: 'Software Engineer', package: '8-12 LPA', date: '2026-06-20', eligibility: 'CS/EC, CGPA >= 7.5', status: 'Upcoming', registered: 42 },
  { id: 2, company: 'Infosys', role: 'Systems Engineer', package: '6.5 LPA', date: '2026-07-05', eligibility: 'All Branches, CGPA >= 6.0', status: 'Upcoming', registered: 128 },
  { id: 3, company: 'KPMG', role: 'Business Analyst', package: '7-10 LPA', date: '2026-05-15', eligibility: 'BA/CS, CGPA >= 7.0', status: 'Completed', registered: 35 },
  { id: 4, company: 'L&T Construction', role: 'Site Engineer', package: '5-7 LPA', date: '2026-07-12', eligibility: 'CE/ME, CGPA >= 6.5', status: 'Upcoming', registered: 28 },
];

export const EVENTS = [
  { id: 1, title: 'College Annual Day', date: '2026-06-25', type: 'Cultural', venue: 'Main Auditorium', organizer: 'Student Council', registrations: 350 },
  { id: 2, title: 'National Level Tech Fest - TechAvenir', date: '2026-07-10', type: 'Technical', venue: 'College Campus', organizer: 'CS Department', registrations: 220 },
  { id: 3, title: 'AI & ML Workshop', date: '2026-06-18', type: 'Workshop', venue: 'CS Seminar Hall', organizer: 'CS Department', registrations: 80 },
  { id: 4, title: 'Sports Week', date: '2026-07-20', type: 'Sports', venue: 'Sports Ground', organizer: 'Sports Committee', registrations: 180 },
];

export const STUDENT_GROWTH = [
  { year: '2020', students: 850 },
  { year: '2021', students: 920 },
  { year: '2022', students: 1080 },
  { year: '2023', students: 1150 },
  { year: '2024', students: 1200 },
  { year: '2025', students: 1320 },
];

export const FEE_COLLECTION = [
  { month: 'Jan', collected: 1200000, pending: 150000 },
  { month: 'Feb', collected: 980000, pending: 80000 },
  { month: 'Mar', collected: 1100000, pending: 200000 },
  { month: 'Apr', collected: 850000, pending: 100000 },
  { month: 'May', collected: 1300000, pending: 180000 },
  { month: 'Jun', collected: 950000, pending: 220000 },
];

export const TIMETABLE = {
  Monday: [
    { time: '9:00-10:00', subject: 'Data Structures', faculty: 'Dr. Priya Sharma', room: 'CS-101' },
    { time: '10:00-11:00', subject: 'Mathematics', faculty: 'Prof. Vikram Nair', room: 'LH-201' },
    { time: '11:15-12:15', subject: 'DBMS', faculty: 'Prof. Aman Thakur', room: 'CS-102' },
    { time: '1:00-2:00', subject: 'Operating Systems', faculty: 'Prof. Aman Thakur', room: 'CS-103' },
    { time: '2:00-4:00', subject: 'DS Lab', faculty: 'Dr. Priya Sharma', room: 'Lab-1' },
  ],
  Tuesday: [
    { time: '9:00-10:00', subject: 'Computer Networks', faculty: 'Prof. Aman Thakur', room: 'CS-101' },
    { time: '10:00-11:00', subject: 'Data Structures', faculty: 'Dr. Priya Sharma', room: 'CS-101' },
    { time: '11:15-12:15', subject: 'Mathematics', faculty: 'Prof. Vikram Nair', room: 'LH-201' },
    { time: '1:00-2:00', subject: 'Machine Learning', faculty: 'Dr. Priya Sharma', room: 'CS-104' },
  ],
  Wednesday: [
    { time: '9:00-10:00', subject: 'DBMS', faculty: 'Prof. Aman Thakur', room: 'CS-102' },
    { time: '10:00-11:00', subject: 'Operating Systems', faculty: 'Prof. Aman Thakur', room: 'CS-103' },
    { time: '11:15-12:15', subject: 'Machine Learning', faculty: 'Dr. Priya Sharma', room: 'CS-104' },
    { time: '2:00-4:00', subject: 'DBMS Lab', faculty: 'Prof. Aman Thakur', room: 'Lab-2' },
  ],
  Thursday: [
    { time: '9:00-10:00', subject: 'Data Structures', faculty: 'Dr. Priya Sharma', room: 'CS-101' },
    { time: '10:00-11:00', subject: 'Computer Networks', faculty: 'Prof. Aman Thakur', room: 'CS-101' },
    { time: '11:15-12:15', subject: 'DBMS', faculty: 'Prof. Aman Thakur', room: 'CS-102' },
    { time: '1:00-2:00', subject: 'Mathematics', faculty: 'Prof. Vikram Nair', room: 'LH-201' },
  ],
  Friday: [
    { time: '9:00-10:00', subject: 'Operating Systems', faculty: 'Prof. Aman Thakur', room: 'CS-103' },
    { time: '10:00-11:00', subject: 'Machine Learning', faculty: 'Dr. Priya Sharma', room: 'CS-104' },
    { time: '11:15-12:15', subject: 'Computer Networks', faculty: 'Prof. Aman Thakur', room: 'CS-101' },
    { time: '2:00-4:00', subject: 'Project Work', faculty: 'Dr. Priya Sharma', room: 'Lab-3' },
  ],
};

export const RESULTS = [
  { subject: 'Data Structures', code: 'CS301', internal: 38, external: 72, total: 110, max: 125, grade: 'A', credits: 4 },
  { subject: 'Database Management', code: 'CS302', internal: 40, external: 78, total: 118, max: 125, grade: 'A+', credits: 4 },
  { subject: 'Operating Systems', code: 'CS401', internal: 35, external: 68, total: 103, max: 125, grade: 'B+', credits: 4 },
  { subject: 'Mathematics III', code: 'MA301', internal: 42, external: 80, total: 122, max: 125, grade: 'A+', credits: 4 },
  { subject: 'Machine Learning', code: 'CS501', internal: 36, external: 71, total: 107, max: 125, grade: 'A', credits: 4 },
];
