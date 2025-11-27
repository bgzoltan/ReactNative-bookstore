// To provide an option to show a progress bar to the user when uploading a file
// Handle backend data loading state centrally

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
} from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [uploadProgress, setUploadProgress] = useState(0); // file uploading state
  const [isUploaded, setIsUploaded] = useState(false); // when file is uploaded the value is true
  const [isLoading, setIsLoading] = useState(false); // loading state when frontend receive data
  const intervalRef = useRef(null);

  const startUpload = () => {
    // Clear previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsUploaded(false);
    setUploadProgress(0);

    // Increasing the the value of the progress bar
    const id = setInterval(() => {
      setUploadProgress((prev) => {
        const newValue = prev + 0.1;

        if (newValue >= 1) {
          clearInterval(id);
          intervalRef.current = null;
          return 1;
        }

        return newValue;
      });
    }, 10);

    intervalRef.current = id;
  };

  const finishUpload = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setUploadProgress(1);

    setTimeout(() => {
      // To show the progress bar to the user
      setUploadProgress(0);
      setIsUploaded(true);
    }, 1000);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  const value = useMemo(
    () => ({
      uploadProgress,
      isUploaded,
      isLoading,
      startUpload,
      finishUpload,
      setUploadProgress,
      setIsUploaded,
      startLoading,
      endLoading,
    }),
    [uploadProgress, isUploaded, isLoading]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
