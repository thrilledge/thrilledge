export type IndustrySubServiceData = {
    heading: string
    items: string[]
}

const INDUSTRY_SUB_SERVICES: Record<string, IndustrySubServiceData> = {
    healthcare: {
        heading: 'Healthcare',
        items: [
            'AI-Powered Diagnostics Support',
            'Patient Data Automation & EHR Integration',
            'AI Chatbots for Patient Engagement',
            'Telemedicine Platform Development',
            'HIPAA-Compliant AI Solutions',
            'Predictive Healthcare Analytics',
        ],
    },
    education: {
        heading: 'Education',
        items: [
            'AI-Powered Personalized Learning Platforms',
            'Learning Management Systems (LMS) Development',
            'AI Tutoring & Chatbot Assistants',
            'Student Performance Analytics',
            'E-Learning App Development',
            'Automated Content Generation for Courses',
        ],
    },
    'real-estate': {
        heading: 'Real Estate',
        items: [
            'AI Property Valuation Tools',
            'AI-Powered Lead Scoring & CRM',
            'Virtual Property Tours (AI/3D)',
            'Real Estate Chatbots',
            'Predictive Market Analytics',
            'Automated Listing Management',
        ],
    },
    blockchain: {
        heading: 'Blockchain',
        items: [
            'Smart Contract Development',
            'AI + Blockchain Integration (Verification, Fraud Detection)',
            'DeFi Platform Development',
            'NFT Marketplace Development',
            'Blockchain Security Audits',
            'Tokenization Solutions',
        ],
    },
    fintech: {
        heading: 'Fintech',
        items: [
            'AI Fraud Detection & Risk Scoring',
            'Automated Financial Reporting',
            'AI-Powered Credit Scoring',
            'Payment Gateway Integration',
            'Robo-Advisory Platforms',
            'Regulatory Compliance Automation (RegTech)',
        ],
    },
    logistics: {
        heading: 'Logistics',
        items: [
            'AI Route Optimization',
            'Predictive Demand Forecasting',
            'Automated Inventory Management',
            'Fleet Management Systems',
            'AI-Powered Supply Chain Analytics',
            'Warehouse Automation Solutions',
        ],
    },
}

export function getIndustrySubServices(slug: string): IndustrySubServiceData | null {
    return INDUSTRY_SUB_SERVICES[slug] ?? null
}
