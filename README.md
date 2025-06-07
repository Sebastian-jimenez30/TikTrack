# TikTrack

**TikTrack** is a Next.js application developed to enhance the visibility of job opportunities in lesser-known or hard-to-access cities in Colombia by connecting Magneto recruiters with local TikTok influencers.

## 🚀 Project Purpose

Magneto struggles to promote job listings effectively in remote areas due to:

- Low platform visibility in smaller cities.
- Difficulty identifying location-specific influencers.

**TikTrack** addresses these challenges by:

- Searching and classifying influencers by city and engagement metrics.
- Enabling automated outreach with AI-enhanced messages and templates.
- Ensuring influencer data quality through a supervised reporting system.

## 🔧 Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript / JavaScript
- **Styles**: Tailwind CSS
- **API Communication**: RESTful APIs
- **Microservices**:
  - `fetch-influencers`: Retrieves influencer data based on location or hashtags using Python and Selenium.
  - `send-messages`: Sends AI-refined or template-based messages to influencers using Python and Selenium.

## 🧩 Key Features

- Influencer search with advanced filtering by location, engagement, followers or last updated.
- Message drafting, sending and enhancement using AI.
- Reporting and deactivate of misclassified influencers.
- Role-based access (Recruiters and Supervisors).
- Influencer comparison feature.
- Influencers that are automatically added daily from the tiktok platform according to each city.

## 🧪 Running the App Locally

```bash
# Clone the repository
git clone https://github.com/your-org/tiktrack.git
cd tiktrack

# Install dependencies
npm install

# Define .env
DATABASE_URL=
OPENAI_API_KEY=
OPENAI_API_MODEL=
OPENAI_API_URL=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
NEXT_PUBLIC_BASE_URL_API=
NEXT_PUBLIC_FETCH_INFLUENCERS_MICROSERVICE_URL=
NEXT_PUBLIC_SEND_MESSAGE_MICROSERVICE_URL=

# Start development server
npm run dev

# Access the app
http://localhost:3000
```
