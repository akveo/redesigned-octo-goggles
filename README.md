# Medi-Drive Demo WebApp

A modern React SPA boilerplate with TypeScript, Redux Toolkit, Material-UI, and form validation.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling
- **React Hook Form** - Form management
- **Yup** - Schema validation

## Project Structure

```
src/
├── components/          # React components
│   └── ExampleForm.tsx  # Sample form with validation
├── store/              # Redux store configuration
│   ├── store.ts        # Store setup
│   ├── hooks.ts        # Typed Redux hooks
│   └── slices/         # Redux slices
│       └── exampleSlice.ts
├── theme/              # MUI theme configuration
│   └── theme.ts
├── App.tsx             # Main App component
└── main.tsx            # Application entry point
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

### Redux Integration

- Configured Redux store with TypeScript support
- Example counter slice demonstrating state management
- Typed hooks (`useAppDispatch`, `useAppSelector`)

### Material-UI Setup

- Custom theme configuration
- CssBaseline for consistent styling
- Responsive components with proper spacing

### Form Validation

- React Hook Form for efficient form handling
- Yup schema validation
- MUI TextField integration with error handling
- Example form with name, email, and age validation

## Development

### Adding New Redux Slices

1. Create a new slice in `src/store/slices/`
2. Import and add to the store in `src/store/store.ts`
3. Use typed hooks from `src/store/hooks.ts`

### Customizing Theme

Edit `src/theme/theme.ts` to customize colors, typography, and other theme settings.

### Creating New Forms

Use the `ExampleForm.tsx` component as a template:

- Define your schema with Yup
- Use `Controller` from react-hook-form for MUI integration
- Handle validation errors with `formState.errors`

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
