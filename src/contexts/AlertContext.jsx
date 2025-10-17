import { createContext, useState } from "react";
import { Snackbar, Alert } from '@mui/material';

const AlertContext = createContext();

export { AlertContext };

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const showAlert = (message, severity = 'info') => {
    setAlert({
      open: true,
      message,
      severity
    });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  const value = {
    showAlert,
    closeAlert
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};