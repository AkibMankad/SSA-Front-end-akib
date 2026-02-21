# SSA Front-end Application

Social Support Application with AI-Powered Assistance - A multi-step application form wizard built with React and Ant Design, featuring AI-powered text generation using OpenAI GPT API.

## Features

- **Multi-Step Wizard**: 3-step application form with progress bar
- **AI Writing Assistant**: "Help Me Write" feature powered by OpenAI GPT-3.5-turbo for Step 3 textarea fields
- **Language-Aware AI**: AI generates text in user's selected language (English/Arabic) with proper RTL support
- **Form Validation**: Ant Design Form with custom field-specific error messages
  - Phone number validation (10 digits, starting with 6-9)
  - Email address pattern validation
  - National ID validation (10-20 digits)
  - Text length constraints with min/max validation
  - Number inputs restricted to numeric values only
  - Date format: DD/MM/YYYY
  - All fields include helpful placeholders
- **Bilingual Support**: Full English and Arabic language support with RTL
- **Form Persistence**: Auto-save form progress to localStorage
- **Responsive Design**: Mobile, tablet, desktop friendly layout with Ant Design components
- **Accessibility**: ARIA labels and keyboard navigation

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Configure real OpenAI API for production:

Create a `.env` file in the root directory:

Edit `.env` and add your OpenAI API key:

```
VITE_OPENAI_API_KEY=your-actual-openai-api-key
```

Get your API key from: https://platform.openai.com/api-keys

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run test` - run tests

## Included stack

- React 19.2.4 with Vite 7.3.1
- Ant Design 6.3.0 + Less 4.5.1
- react-i18next 16.5.4 for internationalization
- OpenAI API integration for AI-powered text generation
- dayjs 1.11.19 for date handling
- React Testing Library + Vitest for testing

## Architecture Highlights

- **Ant Design Form**: Native form validation with rules-based approach
- **Smart Validation**: Field-level validation with pattern matching, min/max length, and type checking
- **Custom Hooks**: Separation of concerns with dedicated hooks for form persistence, submission, and AI suggestions
- **Performance Optimized**: All components use React.memo to prevent unnecessary re-renders
- **Modern Patterns**: useCallback and useMemo for optimal performance
- **Modular Structure**: Feature-based folder structure with clear separation between components, hooks, services, and utilities

## Project Structure

```
src/
├── features/
│   └── application-form/
│       ├── components/         # Reusable wizard components (all memoized)
│       │   ├── AISuggestionModal.jsx
│       │   ├── LanguageSwitcher.jsx
│       │   ├── StepContent.jsx
│       │   └── WizardProgress.jsx
│       ├── hooks/              # Custom React hooks
│       │   ├── useAISuggestion.js      # AI suggestion logic
│       │   ├── useFormPersistence.js   # localStorage management
│       │   └── useFormSubmission.js    # Form submission with timeout
│       ├── steps/              # Form step components (all memoized)
│       │   ├── PersonalInformationStep.jsx
│       │   ├── FamilyFinancialStep.jsx
│       │   └── SituationDescriptionsStep.jsx
│       ├── services/           # API services
│       │   ├── mockSubmitApplication.js
│       │   └── openaiService.js
│       ├── utils/              # Helper utilities
│       │   ├── formStorage.js          # localStorage utilities
│       │   └── validationRules.js      # Form validation rules
│       ├── constants.js        # Form field constants
│       ├── ApplicationFormWizard.jsx   # Main orchestrator
│       ├── ApplicationFormWizard.less
│       └── index.js
├── styles/
│   └── app.less               # Global styles
├── i18n.js                    # i18next configuration
├── App.jsx                    # Application entry point
└── main.jsx                   # React root
```

## AI Features

The application includes an AI-powered "Help Me Write" feature for Step 3 textarea fields:

- **Current Financial Situation**: AI generates descriptions of financial circumstances
- **Employment Circumstances**: AI helps articulate employment status and challenges
- **Reason for Applying**: AI assists in explaining why support is needed

### Language-Aware AI Generation
The AI automatically detects the user's language preference and generates text accordingly:

- **English Mode**: Generates natural, first-person English text
- **Arabic Mode**: Generates native Arabic text with proper RTL (right-to-left) formatting
- **Natural Output**: ~100 words, 3-4 sentences in conversational first-person tone

### How It Works
Each field has a "Help Me Write" button that:
1. Detects current language setting (English/Arabic)
2. Calls OpenAI GPT-3.5-turbo API with language-specific prompts (when API key is configured)
3. Generates context-aware, personalized suggestions in the selected language
4. Shows suggestions in an editable modal with proper RTL support for Arabic
5. Allows users to Accept, Edit, or Discard suggestions
6. Save accepted text to form with automatic localStorage persistence

To enable real AI generation, add your OpenAI API key to the `.env` file.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI text generation | Yes (for AI features) |
