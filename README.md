
# Supply Chain Management System

## Overview

This Supply Chain Management System provides a robust platform for managing inventory, tracking orders, analyzing supply chain metrics, and forecasting demand. Built with modern web technologies, it offers an intuitive interface for efficient supply chain operations.

## Features

### Dashboard
- Real-time operational overview
- Interactive supply chain map
- Recent alerts and notifications
- Order summaries and recent order tracking
- Key inventory status indicators

### Inventory Management
- Comprehensive inventory list with search and filtering
- Stock level monitoring with visual indicators
- Add, edit, and remove inventory items
- Category and location-based organization
- Low stock alerts

### Analytics and Insights
- AI-powered predictive analytics
- Anomaly detection with severity classification
- Real-time performance metrics
- Demand forecasting visualization
- Blockchain traceability for supply chain transparency

### Advanced Supply Chain Features
- Digital twin simulation
- Sustainability dashboard with environmental impact metrics
- Strategic roadmap planning
- Supplier performance tracking

### South Africa Localization
- Full UI/UX localization for South Africa's 11 official languages
- High linguistic accuracy (98% target validated by SA Language Board)
- BLEU score metrics for translation quality measurement
- Cultural sensitivity scoring for UI/UX elements
- Support for dialects and tonal markers (isiXhosa, isiNdebele)
- Adaptation of non-text content (imagery, icons, colors)
- Quarterly reviews by regional cultural advisors

## Technology Stack

This application is built using:

- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Tanstack React Query** - Data fetching and state management
- **Recharts** - Charting library for data visualization
- **Lucide Icons** - Icon library
- **i18next** - Internationalization framework
- **Microsoft Translator API** - Machine translation service
- **Unicode CLDR v43** - Comprehensive locale data
- **GeoLite2** - Geolocation-based adaptation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or another package manager

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
```

2. Navigate to the project directory:
```sh
cd supply-chain-management
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/`
  - `components/` - Reusable UI components
    - `analytics/` - Analytics-specific components
    - `ui/` - Base UI components from shadcn/ui
  - `pages/` - Main application pages
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions
  - `lib/` - Library code and helpers
  - `i18n.ts` - Internationalization configuration
- `public/`
  - `locales/` - Translation files for different languages

## Localization

The application is fully localized for South Africa's 11 official languages:

- English
- isiZulu
- isiXhosa
- Sesotho sa Leboa
- Afrikaans
- Sesotho
- Setswana
- Xitsonga
- siSwati
- Tshivenda
- isiNdebele

Translation quality is measured using a 98% BLEU score target and is validated by the SA Language Board. The system also includes cultural sensitivity scoring for UI/UX elements.

## Usage

### Inventory Management
Navigate to the Inventory page to manage your stock items. You can add new items, filter by category or location, and monitor stock levels.

### Analytics
The Analytics section provides insights into your supply chain performance with:
- Real-time metrics
- Anomaly detection
- Demand forecasting
- AI-powered insights

### Advanced Analytics
Explore cutting-edge supply chain analytics with:
- AI & Predictive analytics
- Blockchain traceability
- Sustainability metrics
- Digital twin simulation
- Strategic evolution roadmap

## Deployment

This project can be deployed using your preferred hosting solution.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tanstack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org/)
- [i18next](https://www.i18next.com/)
