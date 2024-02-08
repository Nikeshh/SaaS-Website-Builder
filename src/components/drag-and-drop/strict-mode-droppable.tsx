import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

/**
 * Used to avoid the error "Unable to find draggable id: <id>"
 * One option is to turn off the nextjs strict mode. Other option is to replace the <Droppable> with this component
 * https://stackoverflow.com/questions/60029734/react-beautiful-dnd-i-get-unable-to-find-draggable-with-id-1
 */

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};