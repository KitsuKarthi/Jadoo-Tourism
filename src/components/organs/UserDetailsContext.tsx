import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the user details
interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

// Define the shape of the context
interface UserDetailsContextType {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
}

// Create the context
const UserDetailsContext = createContext<UserDetailsContextType | undefined>(undefined);

// Custom hook to use the UserDetails context
export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};

// Context provider component
export const UserDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    // Retrieve the initial state from localStorage
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails
      ? JSON.parse(savedUserDetails)
      : { id: '', firstName: '', lastName: '', username: '', password: '' };
  });

  useEffect(() => {
    // Store the userDetails in localStorage whenever it changes
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
