import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Home from '../components/Home/Home';
import WeatherWidget from '../components/WeatherWidget/WeatherWidget';

test('renders Home component with the class name "container"', () => {
    act(() => {
        render(<Home onDetailViewEvent={jest.fn()} selectedUnit="metric" />);
    });
    const containerElement = screen.getByTestId('home-container');
    // Check if the element has the class name "container"
    expect(containerElement.classList.contains('container')).toBe(true);
  });
