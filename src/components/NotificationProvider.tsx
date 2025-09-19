import React from 'react';
import { Toaster } from 'react-hot-toast';

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#333333',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '400px',
          },
          // Success toast styling
          success: {
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#059669',
              border: '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          // Error toast styling
          error: {
            duration: 6000,
            style: {
              background: '#ffffff',
              color: '#dc2626',
              border: '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
          // Loading toast styling
          loading: {
            style: {
              background: '#ffffff',
              color: '#6b7280',
              border: '1px solid #d1d5db',
            },
            iconTheme: {
              primary: '#FF833B',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  );
};

export default NotificationProvider;