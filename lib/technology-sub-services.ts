export type TechnologySubServiceData = {
    heading: string
    items: string[]
}

const TECHNOLOGY_SUB_SERVICES: Record<string, TechnologySubServiceData> = {
    'ai-machine-learning': {
        heading: 'AI & ML Capabilities',
        items: [
            'LLM & Generative AI Development (GPT, Claude, Gemini)',
            'Agentic AI with LangChain / LangGraph',
            'Custom Model Training (TensorFlow, PyTorch)',
            'Computer Vision (OpenCV)',
            'NLP & Text Processing',
            'RAG & Knowledge Bases',
            'MLOps & Model Deployment',
        ],
    },
    'cloud-devops': {
        heading: 'Cloud & DevOps Services',
        items: [
            'AWS, Azure & Google Cloud Architecture',
            'Docker & Containerization',
            'Kubernetes Orchestration',
            'CI/CD Pipelines',
            'Infrastructure as Code (Terraform)',
            'Monitoring, Logging & Observability',
            'Cloud Migration & Cost Optimization',
        ],
    },
    'data-engineering-big-data': {
        heading: 'Data Engineering & Big Data',
        items: [
            'Data Pipeline Design (Airflow, dbt)',
            'Data Warehousing & Lakehouse Architecture',
            'Real-time Data Streaming (Kafka, Spark)',
            'ETL / ELT Automation',
            'Big Data Analytics',
            'AI Data Readiness & Feature Engineering',
        ],
    },
    cybersecurity: {
        heading: 'Cybersecurity Services',
        items: [
            'Security Architecture & Threat Modeling',
            'Application Security (OWASP Top 10)',
            'IAM & Access Control',
            'Compliance Readiness (SOC 2, GDPR, HIPAA)',
            'Penetration Testing',
            'Security Operations & Monitoring',
        ],
    },
    'qa-testing-automation': {
        heading: 'QA & Testing Automation',
        items: [
            'End-to-End UI Automation (Playwright, Cypress)',
            'API & Contract Testing',
            'Performance & Load Testing',
            'Regression Automation',
            'Quality Gates in CI/CD',
            'AI-Assisted Test Intelligence',
        ],
    },
    'frontend-development': {
        heading: 'Frontend Development',
        items: [
            'React.js & Next.js Development',
            'Vue.js Applications',
            'TypeScript & Tailwind CSS',
            'Design Systems & Component Libraries',
            'Performance & Core Web Vitals Optimization',
            'Accessibility (a11y)',
        ],
    },
    'backend-development': {
        heading: 'Backend Development',
        items: [
            'Node.js Backend Development',
            'Python Backend (Django, FastAPI)',
            'Java & .NET',
            'Microservices Architecture',
            'REST & GraphQL APIs',
            'Authentication & Security',
        ],
    },
    'mobile-development': {
        heading: 'Mobile Development',
        items: [
            'Flutter Cross-Platform Apps',
            'React Native Apps',
            'Native iOS (Swift) & Android (Kotlin)',
            'On-Device AI & ML Integration',
            'App Store Optimization',
            'Push Notifications & Analytics',
        ],
    },
    databases: {
        heading: 'Database Services',
        items: [
            'PostgreSQL & MySQL',
            'MongoDB (NoSQL)',
            'Redis Caching',
            'Vector Databases (Pinecone, Weaviate)',
            'Database Migrations & Replication',
            'Backup & Disaster Recovery',
        ],
    },
    'ai-workflow-automation': {
        heading: 'AI Workflow Automation',
        items: [
            'AI Agent Development',
            'LLM-Powered Document Processing',
            'Business Process Automation',
            'Intelligent Data Pipelines',
            'Custom Workflow Orchestration',
            'Monitoring & Observability',
        ],
    },
    'blockchain-web3': {
        heading: 'Blockchain & Web3',
        items: [
            'Smart Contract Development',
            'DeFi Protocol Engineering',
            'NFT Platforms & Marketplaces',
            'Web3 Frontend Integration',
            'Token Design & Launch',
            'Smart Contract Auditing',
        ],
    },
    'ecommerce-cms': {
        heading: 'E-commerce & CMS',
        items: [
            'Shopify Development',
            'Headless Commerce',
            'WordPress & WooCommerce',
            'Webflow Development',
            'Headless CMS Integration',
            'Performance & SEO',
        ],
    },
}

export function getTechnologySubServices(slug: string): TechnologySubServiceData | null {
    return TECHNOLOGY_SUB_SERVICES[slug] ?? null
}
