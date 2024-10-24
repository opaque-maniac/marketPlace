import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

const DropdownWrapper = ({ isOpen, children }: Props) => {
  // Dropdown animation variants
  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="dropdown-wrapper"
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          style={{
            position: "absolute",
            zIndex: 1000,
            // Adjust position as needed
          }}
        >
          <div className="dropdown-content">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownWrapper;
