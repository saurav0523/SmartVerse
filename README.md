# StreamVerse

StreamVerse is a high-performance React Native (Expo) content discovery and catalog application, offering a premium user interface inspired by modern streaming platforms. The app aggregates movies, TV shows, and series data dynamically using the Streaming Availability API (via RapidAPI). It features dynamic categorized rows, watchlist persistence, offline downloads simulation, dark/light mode preferences, and an optimized, fully responsive layout.

---

## Setup & Installation Instructions

Follow these step-by-step instructions to get the application running locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18.x or v20.x recommended)
- **npm** (comes with Node.js)
- **Expo Go** app (installed on your iOS or Android device from the App Store / Play Store) or a configured Simulator/Emulator (Xcode or Android Studio)

### Step 1: Install Dependencies

Navigate to the project root directory and run:

```bash
npm install
```

This installs all the required dependencies, including Expo, React Navigation, React Native Paper, Zustand, React Native Reanimated, and expo-image.

### Step 2: Configure Environment Variables

Create a file named `.env` in the root of the project directory (or modify the existing one) and fill in your RapidAPI key credentials:

```env
EXPO_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
EXPO_PUBLIC_RAPIDAPI_HOST=streaming-availability.p.rapidapi.com
EXPO_PUBLIC_RAPIDAPI_URL=https://streaming-availability.p.rapidapi.com
```

> [!NOTE]
> The application uses the **Streaming Availability API** from RapidAPI. Make sure your subscription to this API is active and the key is valid.

### Step 3: Run the Development Server

Start the Metro Bundler and development server:

```bash
npm start
```

Once Metro is running, you can launch the app on your preferred platform:
- **Expo Go (Mobile)**: Scan the QR code displayed in the terminal using the Camera app (iOS) or the Expo Go app (Android).
- **iOS Simulator**: Press `i` in the terminal command window.
- **Android Emulator**: Press `a` in the terminal command window.

### Running Tests

Execute the Jest test suite to verify code correctness and mappings:

```bash
npm test
```

---

## Technical Architecture Overview

StreamVerse has been designed with scalability, performance, and modern clean-code architecture in mind. Here are the core technical choices made:

### 1. Component Library: React Native Paper (Material Design 3)
- **Why Paper?** React Native Paper was selected as the UI foundation for the application to standardise UI components such as inputs, buttons, switches, and core text sizing. It gives native-feeling tactile feedback, standardises spacing, and supports automatic theming injection via context.
- **Custom Integration:** While Paper provides atomic primitives, custom layouts like the **HeroBanner** (with linear gradients), the horizontal **ContentRow**, and the **CategoryChips** selection bar are built as bespoke React Native flexbox compositions to ensure design compliance and fluid aesthetics.

### 2. Design and Styling Choices
- **Aesthetic Refactoring:** The application features a curated dark-mode-first aesthetic with a glassmorphism feel (semi-translucent borders and backgrounds), vibrant primary accent colors (`#00E5FF` cyan highlight), and custom linear gradients for hero panels.
- **Maintainability:** All inline styles and dynamically calculated styles have been refactored into structured stylesheets (`StyleSheet.create`), separating presentation from view layout.
- **Custom Theme Hooks:** The custom `useAppTheme` hook unifies `react-native-paper`'s MD3 styling with our custom theme colors, allowing instant, system-wide toggling of Dark/Light modes.

### 3. Performance Optimization Choices
- **List Performance:** The home feed renders a vertical flatlist whose header houses the banners, search, and category selectors, while the main body renders an infinite scrolling grid ("More For You"). The horizontal rows (`ContentRow`) leverage React Native performance keys:
  - `getItemLayout` to bypass dynamic height recalculation.
  - `windowSize={5}` and `maxToRenderPerBatch={6}` to keep active memory low.
  - `removeClippedSubviews` to unmount off-screen cards.
- **Card Memoization:** The `ContentCard` component is wrapped in `React.memo` with a custom props comparator, ensuring cards do not re-render unnecessarily when scrolling or toggling categories.
- **Expo Image:** Standard images are replaced with `<Image />` from `expo-image`, offering out-of-the-box local disk caching, fast decoding, and smooth fade-in transitions.

### 4. Data-Based Rendering (Dynamic UI)
- **Content-Driven Categories:** Instead of displaying hardcoded filters that lead to empty pages, the Category Chips are completely data-driven. The system inspects the active feed data (`banners`, `rows`, and `moreItems`) and dynamically shows only the genre options that actually have available content.
- **Cohesive Filtering:** Selecting a category filters both the horizontal row carousels and the main bottom feed dynamically, providing a seamless browsing experience.

---

## Project Structure

```
StreamVerse/
├── App.tsx                     # App entry point (Theme Providers, Root Navigation)
├── .env                        # Configuration environment variables
├── src/
│   ├── components/
│   │   ├── card/               # ContentCard, ContentRow, HeroBanner, CategoryChips
│   │   ├── header/             # TopHeader, DetailHeader (collapsible animated header)
│   │   ├── loader/             # Skeleton loaders (HomeSkeleton, DetailSkeleton)
│   │   └── common/             # Generic ErrorState and EmptyState views
│   ├── screens/
│   │   ├── Home/               # HomeScreen (Feed + Grid)
│   │   ├── Detail/             # DetailScreen (Media details + trailer links)
│   │   └── Profile/            # ProfileScreen, WatchlistScreen, AboutScreen
│   ├── services/
│   │   └── api/                # apiClient.ts, apiServices.ts (Streaming Availability API)
│   ├── stores/                 # Zustand state stores (useThemeStore, useUserStore)
│   ├── theme/                  # Colors, fonts, and React Native Paper themes
│   ├── utils/                  # Mapping helper functions (tmdbMapper.ts)
│   └── models/                 # Shared TypeScript models and definitions
└── __tests__/                  # Unit testing configurations and test specs
```
