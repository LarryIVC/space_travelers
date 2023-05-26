import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dragon from './Dragon';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Dragon component', () => {
  let mockDispatch;
  let mockDragons;
  const mockDragon = {
    id: 'Dragon1',
    name: 'Dragon 1',
    type: 'capsule',
    flickrImage: 'https://i.imgur.com/9fWdwNv.jpg',
    reserved: false,
  };

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    mockDragons = [mockDragon];
    useSelector.mockReturnValue({
      dragonsItems: mockDragons,
      loading: true,
      error: false,
    });
  });

  afterEach(() => {
    useSelector.mockReset();
    useDispatch.mockReset();
    jest.clearAllMocks();
  });

  test('render content name', () => {
    // component.debug();
    const component = render(<Dragon dragon={mockDragon} />);
    expect(component.getByText('Dragon 1')).toMatchSnapshot();
  });

  test('render content type', () => {
    const component = render(<Dragon dragon={mockDragon} />);
    expect(component.getByText('CAPSULE')).toMatchSnapshot();
    // component.getByText('CAPSULE');
  });

  test('render content button reserve', () => {
    const component = render(<Dragon dragon={mockDragon} />);
    expect(component.getByText('Reserve Dragon')).toMatchSnapshot();
  });

  test('render content button reserved', () => {
    mockDragon.reserved = true;
    const component = render(<Dragon dragon={mockDragon} />);
    expect(component.getByText('Cancel Reservation')).toMatchSnapshot();
  });
});
