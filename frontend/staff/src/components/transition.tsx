import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  time?: number;
}

const Transition = ({ children, time }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: time ?? 0.5 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
