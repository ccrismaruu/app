import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { AppProvider } from './AppContext';

jest.mock('unsplash-js', () => ({
  createApi: jest.fn(() => ({
    photos: {
      getRandom: jest.fn(() => Promise.resolve({
        response: [{
          urls: { regular: 'testImageUrl' }
        }]
      }))
    }
  }))
}));


const setupFormSubmissionAndImageDisplay = async () => {
  const { getByRole, getByText, getByAltText, getByPlaceholderText, findByText } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );
  
  const nameInput = getByPlaceholderText('Name');
  const surnameInput = getByPlaceholderText('Surname');
  
  fireEvent.change(nameInput, { target: { value: 'John' } });
  fireEvent.change(surnameInput, { target: { value: 'Doe' } });
  
  fireEvent.change(getByRole('combobox'), { target: { value: 'Travel' } });
  
  fireEvent.submit(getByText('Submit'));
  
  await waitFor(() => {
    const image = getByAltText('Selected Topic');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('testImageUrl');
  });

  return { getByRole, getByText, getByAltText, getByPlaceholderText, findByText };
};

describe('App', () => {
  test('renders form initially', () => {
    const { getByText } = render(
      <AppProvider>
        <App />
      </AppProvider>
    );
    const formTitle = getByText('Enter Details');
    expect(formTitle).toBeInTheDocument();
  });

  test('displays image after form submission', async () => {
    await setupFormSubmissionAndImageDisplay();
  });

  test('displays card after image acceptance', async () => {
    const { findByText } = await setupFormSubmissionAndImageDisplay()
    const acceptButton = await screen.findByTestId('accept-button');
  
    fireEvent.click(acceptButton);
  
    const nameText = await findByText('Name: John');
    const surnameText = await findByText('Surname: Doe');
  
    expect(nameText).toBeInTheDocument();
    expect(surnameText).toBeInTheDocument();
  });
  
  test('rejects image and fetches new one', async () => {
    await setupFormSubmissionAndImageDisplay();
    const rejectButton = await screen.findByTestId('reject-button');
  
    fireEvent.click(rejectButton);
  
    expect(screen.queryByTestId('reject-button')).toBeInTheDocument();
  });
});