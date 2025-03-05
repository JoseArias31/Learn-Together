import { useState } from "react";

const useSidebarToggle = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return { isSidebarVisible, toggleSidebar };
};

export default useSidebarToggle;