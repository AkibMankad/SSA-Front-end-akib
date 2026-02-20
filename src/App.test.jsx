import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import './i18n';

describe('App boilerplate', () => {
  it('renders wizard heading', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('3-Step Application Form Wizard')).toBeInTheDocument();
  });
});
