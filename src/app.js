// Mock data
const courses = {
    BCA: {
        semesters: [
            { id: 1, subjects: 6 },
            { id: 2, subjects: 7 },
            { id: 3, subjects: 6 },
            { id: 4, subjects: 8 },
            { id: 5, subjects: 7 },
            { id: 6, subjects: 6 },
        ]
    },
    MCA: {
        semesters: [
            { id: 1, subjects: 8 },
            { id: 2, subjects: 7 },
            { id: 3, subjects: 8 },
            { id: 4, subjects: 6 },
        ]
    }
};

const subjects = [
    { id: 1, name: "Data Structures", code: "CS201", papers: 5 },
    { id: 2, name: "Database Management", code: "CS202", papers: 4 },
    { id: 3, name: "Operating Systems", code: "CS203", papers: 6 },
    { id: 4, name: "Computer Networks", code: "CS204", papers: 3 },
    { id: 5, name: "Software Engineering", code: "CS205", papers: 4 },
    { id: 6, name: "Web Development", code: "CS206", papers: 5 },
];

// State management
let currentCourse = null;
let currentSemester = null;

// DOM Elements
const courseSelection = document.getElementById('courseSelection');
const semesterGrid = document.getElementById('semesterGrid');
const subjectGrid = document.getElementById('subjectGrid');
const backButton = document.getElementById('backButton');
const searchInput = document.getElementById('searchInput');

// Initialize Lucide icons
lucide.createIcons();

// Smooth scroll for hero CTA
document.querySelector('.hero-cta').addEventListener('click', (e) => {
    e.preventDefault();
    const coursesSection = document.querySelector('#courses');
    coursesSection.scrollIntoView({ behavior: 'smooth' });
});

// Event Listeners
backButton.addEventListener('click', handleBack);
searchInput.addEventListener('input', handleSearch);

// Course selection with link handling
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // If clicking on the course link, allow default behavior (navigation)
        if (e.target.closest('.course-link')) {
            return;
        }
        
        // Otherwise prevent navigation and show semesters
        e.preventDefault();
        const course = card.dataset.course;
        showSemesters(course);
    });
});

function showSemesters(course) {
    currentCourse = course;
    courseSelection.classList.add('hidden');
    semesterGrid.classList.remove('hidden');
    backButton.classList.remove('hidden');
    updateSearchPlaceholder();

    semesterGrid.innerHTML = courses[course].semesters.map(semester => `
        <div class="semester-card fade-in" onclick="showSubjects(${semester.id})">
            <div class="card-header">
                <div class="card-title">Semester ${semester.id}</div>
                <i data-lucide="book-open" class="card-icon"></i>
            </div>
            <div class="card-description">${semester.subjects} Subjects Available</div>
        </div>
    `).join('');

    lucide.createIcons();
}

function showSubjects(semesterId) {
    currentSemester = semesterId;
    semesterGrid.classList.add('hidden');
    subjectGrid.classList.remove('hidden');
    updateSearchPlaceholder();

    subjectGrid.innerHTML = subjects.map(subject => `
        <div class="subject-card fade-in">
            <div class="card-header">
                <div>
                    <div class="card-title">${subject.name}</div>
                    <div class="card-description">${subject.code}</div>
                </div>
                <i data-lucide="file-text" class="card-icon"></i>
            </div>
            <div class="card-description">${subject.papers} Previous Papers Available</div>
        </div>
    `).join('');

    lucide.createIcons();
}

function handleBack() {
    if (currentSemester !== null) {
        currentSemester = null;
        subjectGrid.classList.add('hidden');
        semesterGrid.classList.remove('hidden');
    } else if (currentCourse !== null) {
        currentCourse = null;
        semesterGrid.classList.add('hidden');
        courseSelection.classList.remove('hidden');
        backButton.classList.add('hidden');
    }
    updateSearchPlaceholder();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (currentSemester) {
        filterSubjects(query);
    } else if (currentCourse) {
        // Could implement semester search if needed
    }
}

function filterSubjects(query) {
    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(query) ||
        subject.code.toLowerCase().includes(query)
    );

    subjectGrid.innerHTML = filteredSubjects.map(subject => `
        <div class="subject-card fade-in">
            <div class="card-header">
                <div>
                    <div class="card-title">${subject.name}</div>
                    <div class="card-description">${subject.code}</div>
                </div>
                <i data-lucide="file-text" class="card-icon"></i>
            </div>
            <div class="card-description">${subject.papers} Previous Papers Available</div>
        </div>
    `).join('');

    lucide.createIcons();
}

function updateSearchPlaceholder() {
    const placeholder = currentSemester 
        ? "Search subjects..." 
        : currentCourse 
        ? "Search across semesters..." 
        : "Search across all courses...";
    searchInput.placeholder = placeholder;
}
