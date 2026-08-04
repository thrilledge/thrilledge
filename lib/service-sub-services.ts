export type ServiceSubServiceData = {
    heading: string
    items: string[]
}

const SERVICE_SUB_SERVICES: Record<string, ServiceSubServiceData> = {
    'ai-ml-solutions': {
        heading: 'AI & ML Solutions',
        items: [
            'Generative AI & LLM App Development',
            'AI Chatbots & Virtual Assistants',
            'Custom AI Agent Development (Agentic AI)',
            'Predictive Analytics & Data Modeling',
            'Computer Vision Solutions',
            'NLP & Text Automation',
            'AI Model Integration (OpenAI, Claude, Gemini)',
            'MLOps & Model Deployment',
        ],
    },
    'custom-web-development': {
        heading: 'Custom Web Development',
        items: [
            'Full-Stack Web Application Development',
            'AI-Integrated Web Platforms',
            'API Development & Third-Party Integrations',
            'Progressive Web Apps (PWA)',
            'Website Performance & Speed Optimization',
            'Custom CMS Development',
            'Enterprise Web Solutions',
        ],
    },
    'ui-ux-design': {
        heading: 'UI/UX Design',
        items: [
            'AI-Assisted UX Research & Personas',
            'Wireframing & Prototyping',
            'User Interface Design (Web & Mobile)',
            'Design Systems & Component Libraries',
            'Usability Testing',
            'AI-Powered Personalization Design',
            'Conversion-Focused UX Design',
        ],
    },
    'mobile-app-development': {
        heading: 'Mobile App Development',
        items: [
            'Native iOS & Android Development',
            'Cross-Platform App Development (Flutter/React Native)',
            'AI-Powered Mobile Features (Voice, Recommendations, Chat)',
            'App Maintenance & Support',
            'App Store Optimization Support',
            'On-Device AI Integration',
        ],
    },
    'mvp-product-strategy': {
        heading: 'MVP & Product Strategy',
        items: [
            'Rapid MVP Development',
            'Product Roadmap Planning',
            'AI Feasibility & Readiness Assessment',
            'Market Validation Support',
            'Tech Stack Consulting',
            'Startup Advisory for AI Products',
        ],
    },
    'saas-solutions': {
        heading: 'SaaS Solutions',
        items: [
            'Custom SaaS Platform Development',
            'Multi-Tenant Architecture',
            'AI-Powered SaaS Features (Automation, Insights, Copilots)',
            'Subscription & Billing Integration',
            'SaaS Scalability & Cloud Architecture',
            'Third-Party API & Integration Support',
        ],
    },
    'ai-workflow-automation': {
        heading: 'AI Workflow Automation',
        items: [
            'Business Process Automation with AI',
            'AI Agents for Internal Operations',
            'Document & Data Processing Automation',
            'AI-Powered Customer Support Automation',
            'Workflow Integration (CRM, ERP, Email)',
            'No-Code/Low-Code AI Automation Setup',
        ],
    },
    'digital-marketing-solutions': {
        heading: 'Digital Marketing Solutions',
        items: [
            'SEO (Search Engine Optimization)',
            'AI-Driven Content Strategy',
            'PPC & Paid Ad Campaigns',
            'Social Media Marketing',
            'AI-Powered Marketing Analytics',
            'Email Marketing Automation',
            'Conversion Rate Optimization (CRO)',
        ],
    },
    'shopify-plus-agency': {
        heading: 'Shopify Plus Agency',
        items: [
            'Shopify Plus Store Development',
            'AI-Powered Product Recommendations',
            'Store Migration & Optimization',
            'Custom Shopify App Development',
            'AI Chatbot Integration for E-commerce',
            'Shopify SEO & Performance Optimization',
        ],
    },
}

function normalizeItems(raw: unknown): string[] {
    if (!raw) return []

    if (Array.isArray(raw)) {
        return raw
            .map((item) => {
                if (typeof item === 'string') return item.trim()
                if (item && typeof item === 'object') {
                    const value = 'title' in item ? item.title : 'name' in item ? item.name : ''
                    return typeof value === 'string' ? value.trim() : ''
                }
                return ''
            })
            .filter(Boolean)
    }

    if (typeof raw === 'object') {
        const record = raw as Record<string, unknown>
        const directItems = Array.isArray(record.items) ? record.items : []
        const list = normalizeItems(directItems)
        if (list.length) return list

        return Object.values(record)
            .map((value) => (typeof value === 'string' ? value.trim() : ''))
            .filter(Boolean)
    }

    return typeof raw === 'string' ? [raw.trim()].filter(Boolean) : []
}

export function getServiceSubServices(slug: string, acf?: Record<string, unknown>): ServiceSubServiceData | null {
    const fromAcf =
        acf?.service_sub_services ??
        acf?.sub_services ??
        acf?.service_categories ??
        acf?.sub_services_list

    const items = normalizeItems(fromAcf)

    if (items.length > 0) {
        return {
            heading: typeof acf?.sub_services_title === 'string' && acf.sub_services_title.trim()
                ? acf.sub_services_title.trim()
                : SERVICE_SUB_SERVICES[slug]?.heading || 'Sub Services',
            items,
        }
    }

    return SERVICE_SUB_SERVICES[slug] ?? null
}
