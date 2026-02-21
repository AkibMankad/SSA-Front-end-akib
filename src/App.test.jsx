import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import './i18n';

describe('App', () => {
  it('renders application wizard heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /social support application/i })).toBeInTheDocument();
  });
});
