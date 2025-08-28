import { WorkExperience } from './utils.js'

const email = "email@email.com";
const password = "To@void3rrors-->"; // Most applications require 8 characters (some require 16), a capital letter, a numeric character, and a special character
const fullName = "Hire Me Jr";
const firstName = "Hire";
const lastName = "Me";
const suffix = "Jr";
const street = "1600 Amphitheatre Parkway";
const city = "Mountain View"
const state = "California";
const postalCode = "94043";
const phoneType = "Mobile";
const phoneNumber = "(650)-253-0000";

const workexperiences = [
    new WorkExperience({
        jobtitle: 'Intern',
        company: 'Acme Metals LLC',
        location: 'New York, New York',
        startDateMonth: '05',
        startDateYear: '1990',
        endDateMonth: '06',
        endDateYear: '2020',
        description: `At HypeTech.ai, I've had the incredible opportunity to sit at the intersection of innovation, disruption, and impact, leading cross-functional teams to architect and deploy cutting-edge AI solutions that are redefining what’s possible.

I've been driving synergy between product, engineering, and go-to-market teams to deliver scalable, human-centric AI platforms that empower users and elevate enterprise value. My work has spanned everything from LLM-powered automation to responsible AI governance frameworks, all while championing a culture of continuous innovation and design thinking.

Highlights:

Spearheaded the go-to-market launch of our proprietary GenAI solution, resulting in a 3x increase in client engagement and a 25% reduction in time-to-insight.

Partnered with C-level stakeholders to align our AI roadmap with mission-critical OKRs, accelerating digital transformation across global verticals.

Evangelized AI literacy across the organization through lunch-and-learns, internal workshops, and a monthly “AI for Impact” newsletter.

Co-authored our Responsible AI Playbook, positioning HypeTech.ai as a thought leader in the ethical AI space.

Every day, I'm humbled to work alongside brilliant minds who are just as passionate about pushing the envelope as they are about making a positive societal impact. Let's build the future—one model at a time.`
    }),
    new WorkExperience({
        jobtitle: 'Machine Learning Lead',
        company: 'VisionaryAI Labs',
        location: 'Redmond, Washington',
        startDateMonth: '05',
        startDateYear: '2021',
        endDateMonth: '07',
        endDateYear: '2025',
        description: `At VisionaryAI Labs, I have been leading high-impact initiatives at the intersection of data science, machine learning, and product innovation. My role focuses on driving the end-to-end development of scalable, production-ready AI systems that solve real-world problems and deliver measurable business outcomes.

Key responsibilities and accomplishments:

Directed a cross-functional team of ML engineers, data scientists, and product stakeholders to develop and deploy computer vision models powering over 10 million edge devices globally.

Spearheaded the implementation of MLOps workflows, reducing deployment timelines by 80% and improving experiment traceability and model reproducibility.

Led efforts in fine-tuning transformer-based NLP architectures, resulting in a 27% improvement in multilingual text classification performance across key markets.

Partnered with leadership to align AI initiatives with strategic business goals, enabling data-driven decision-making and accelerating product development cycles.

Established internal knowledge-sharing frameworks, including technical deep dives, code reviews, and mentorship programs to elevate team capability and foster a culture of continuous learning.

This role has allowed me to combine technical rigor with strategic thinking to deliver AI solutions that are not only innovative but also ethical, reliable, and aligned with long-term organizational objectives.

Let me know if you'd like one tailored to a different role (e.g., AI Product Manager, Research Scientist, Prompt Engineer, etc.) or with a different tone (e.g., more concise, more academic, etc.).`
    })
]

const school = "Meta University";
const degree = "Bachelors";
const fieldOfStudy = "Computer Science";
const gpa = "3.75";
const skills = ["Python", "SQL"];
const startDate = "2022";
const endDate = "2026";
const resumeFilePath = "./blank.txt";
const linkedInLink = "https://www.linkedin.com/in/username/";
const githubLink = "https://github.com/username";

const gender = "Male";
const ethnicity = "Black";
const hispanicOrLatino = "No";
const veteranStatus = "I am not a veteran";
const disability = "no"; // Either "yes", "no", or "abstain" (prefer not to say)

export { email, password, fullName, firstName, lastName, suffix, street, city, state, postalCode, phoneType, phoneNumber, workexperiences, school, degree, fieldOfStudy, gpa, skills, startDate, endDate, resumeFilePath, linkedInLink, githubLink, gender, ethnicity, hispanicOrLatino, veteranStatus, disability };