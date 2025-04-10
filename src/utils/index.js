const apiBase = import.meta.env.VITE_BACKEND_BASE_URL;

export const userBaseURL = `${apiBase}/user`;
export const comapnyBaseURL = `${apiBase}/company`;
export const jobBaseURL = `${apiBase}/job`;
export const applicationBaseURL = `${apiBase}/application`;
export const questionBaseURL = `${apiBase}/question`;
export const examBaseURL = `${apiBase}/exam`;

export const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
    withCredentials: true,
};

export const languages = [
    "Assamese",
    "English",
    "Hindi",
    "Bengali",
    "Gujrati",
    "Tamil",
    "Telegu",
    "Chinese",
    "French",
    "Japanese",
];

export const navlinks = [
    { name: "Home", path: "/" },
    { name: "My profile", path: "/profile/view" },
    { name: "My bookmarks", path: "/my/bookmarks" },
    { name: "My applications", path: "/my/applications" },
    { name: "My Resume", path: "/resume" },
    { name: "My Preferences", path: "/my/preferences" },
];

export const manageAccount = [
    { name: "Change password", path: "/change/password" },
    { name: "Change email", path: "/update-email" },
    { name: "Delete account", path: "/acc/delete" },
];

export const career_fields = [
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "Mobile App Development",
    "Game Development",
    "DevOps Engineering",
    "Data Analysis",
    "Machine Learning Engineering",
    "Data Visualization",
    "Business Intelligence",
    "Big Data Engineering",
    "Graphic Design",
    "UI/UX Design",
    "Web Design",
    "Motion Graphics",
    "Product Design",
    "Digital Marketing",
    "Social Media Marketing",
    "Content Marketing",
    "Search Engine Optimization (SEO)",
    "Advertising Copywriting",
    "Project Management",
    "Human Resources Management",
    "Financial Analysis",
    "Management Consulting",
    "Operations Management",
    "Medicine",
    "Medical Research",
    "Healthcare Administration",
    "Medical Writing",
    "Healthcare IT",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Teaching",
    "Corporate Training",
    "Curriculum Development",
    "Online Course Instruction",
    "Educational Technology (EdTech)",
    "Writing",
    "Film and Video Production",
    "Photography",
    "Music Production",
    "Performing Arts",
    "Lawyer",
    "Law Enforcement Officer",
    "Legal Consultant",
    "Paralegal",
    "Compliance Officer",
];

export const location = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
];

export const profile = [
    ".NET Development",
    "3D Printing",
    "ASP.NET Development",
    "Accounts",
    "Acting",
    "Aerospace Engineering",
    "Agriculture & Food Engineering",
    "Analytics",
    "Anchoring",
    "Android App Development",
    "Angular.js Development",
    "Animation",
    "Architecture",
    "Artificial Intelligence (AI)",
    "Audio Making/Editing",
    "Auditing",
    "Automobile Engineering",
    "Backend Development",
    "Bank",
    "Big Data",
    "Bioinformatics",
    "Biology",
    "Biotechnology Engineering",
    "Blogging",
    "Brand Management",
    "Business Development",
    "Business/MBA",
    "CA Articleship",
    "CAD Design",
    "CMA Articleship",
    "CS Articleship",
    "Campus Ambassador",
    "Chartered Accountancy (CA)",
    "Chemical Engineering",
    "Chemistry",
    "Cinematography",
    "Civil Engineering",
    "Client Servicing",
    "Cloud Computing",
    "Commerce",
    "Company Secretary (CS)",
    "Computer Science",
    "Computer Vision",
    "Content Writing",
    "Copywriting",
    "Creative Design",
    "Creative Writing",
    "Culinary Arts",
    "Customer Service",
    "Cyber Security",
    "Data Entry",
    "Data Science",
    "Database Building",
    "Design",
    "Dietetics/Nutrition",
    "Digital Marketing",
    "E-commerce",
    "Editorial",
    "Electrical Engineering",
    "Electronics Engineering",
    "Embedded Systems",
    "Energy Science & Engineering",
    "Engineering",
    "Engineering Design",
    "Engineering Physics",
    "Environmental Sciences",
    "Event Management",
    "Facebook Marketing",
    "Fashion Design",
    "Film Making",
    "Finance",
    "Flutter Development",
    "Front End Development",
    "Full Stack Development",
    "Fundraising",
    "Game Development",
    "General Management",
    "Government",
    "Graphic Design",
    "Hospitality",
    "Hotel Management",
    "Human Resources (HR)",
    "Humanities",
    "Image Processing",
    "Industrial & Production Engineering",
    "Industrial Design",
    "Information Technology",
    "Instrumentation & Control Engineering",
    "Interior Design",
    "International",
    "Internet of Things (IoT)",
    "Java Development",
    "Javascript Development",
    "Journalism",
    "Law",
    "Legal Research",
    "Machine Learning",
    "Magento Development",
    "Manufacturing Engineering",
    "Market/Business Research",
    "Marketing",
    "Material Science",
    "Mathematics",
    "Mathematics & Computing",
    "Mechanical Engineering",
    "Mechatronics",
    "Media",
    "Medicine",
    "Merchandise Design",
    "Mobile App Development",
    "Motion Graphics",
    "Music",
    "NGO",
    "Naval Architecture and Ocean Engineeering",
    "Network Engineering",
    "Node.js Development",
    "Operations",
    "PHP Development",
    "Petroleum Engineering",
    "Pharmaceutical",
    "Photography",
    "Physics",
    "Political/Economics/Policy Research",
    "Product Management",
    "Programming",
    "Project Management",
    "Proofreading",
    "Psychology",
    "Public Relations (PR)",
    "Python/Django Development",
    "Quality Analyst",
    "Recruitment",
    "Robotics",
    "Ruby on Rails",
    "Sales",
    "Science",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Social Work",
    "Software Development",
    "Software Testing",
    "Sports",
    "Statistics",
    "Stock/Market Trading",
    "Strategy",
    "Subject Matter Expert (SME)",
    "Supply Chain Management (SCM)",
    "Talent Acquisition",
    "Teaching",
    "Telecalling",
    "Transcription",
    "Translation",
    "Travel & Tourism",
    "UI/UX Design",
    "Video Making/Editing",
    "Videography",
    "Volunteering",
    "Web Development",
    "Wordpress Development",
    "iOS App Development",
];

export const experiences = [
    "Fresher",
    "1 Years",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
    "6 Years",
    "7 Years",
    "8 Years",
    "9 Years",
    "10 Years",
];

export function formatDateString(dateString) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate} at ${time}`;
}

export const multiFormatDateString = (timestamp) => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date = new Date(timestampNum * 1000);
    const now = new Date();

    const diff = now.getTime() - date.getTime();
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    switch (true) {
        case Math.floor(diffInDays) >= 30:
            return formatDateString(timestamp);
        case Math.floor(diffInDays) === 1:
            return `${Math.floor(diffInDays)} day ago`;
        case Math.floor(diffInDays) > 1 && diffInDays < 30:
            return `${Math.floor(diffInDays)} days ago`;
        case Math.floor(diffInHours) >= 1:
            return `${Math.floor(diffInHours)} hours ago`;
        case Math.floor(diffInMinutes) >= 1:
            return `${Math.floor(diffInMinutes)} minutes ago`;
        default:
            return "Just now";
    }
};

export function getStatusColor(status) {
    switch (status) {
        case "applied" || "assigned":
            return "text-blue-500";
        case "shortlist" || "verified":
            return "text-yellow-500";
        case "reject" || "N/A":
            return "text-red-500";
        case "hire" || "appeared":
            return "text-green-500";
        default:
            return "text-light-2";
    }
}

export const introTexts = [
    "Join JobShala: Your gateway to a world of career opportunities and exceptional talent.",
    "Find your next great job or the perfect candidate with JobShala.",
    "Explore thousands of job listings and connect with top employers on JobShala.",
    "JobShala: Bridging the gap between job seekers and hiring organizations.",
    "Elevate your career or build your dream team with JobShala's comprehensive platform.",
    "Discover your next career move or recruit top talent effortlessly on JobShala.",
    "JobShala: Where ambition meets opportunity and employers meet exceptional talent.",
    "Unlock your potential with JobShala, your trusted job search and hiring partner.",
    "Step into your future career or find the right fit for your company on JobShala.",
    "JobShala: Connecting people to possibilities and businesses to the best candidates.",
];
