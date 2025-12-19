import { useCallback, useState } from "react";

const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe gesture

/**
 * Interface for drag handlers.
 */
export interface DragHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

/**
 * Interface for drag event handlers.
 */
export interface DragEventHandlers {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

/**
 * Interface for drag result.
 */
export interface DragResult {
  dragOffset: number;
  dragHandlers: DragEventHandlers;
}

/**
 * A custom hook to handle both mouse and touch drag gestures.
 *
 * @param handlers - Object containing swipe callbacks
 * @returns Object containing drag offset and event handlers
 *
 * @example
 * const { dragOffset, dragHandlers } = useDrag({
 *   onSwipeLeft: () => console.log('Swiped left'),
 *   onSwipeRight: () => console.log('Swiped right')
 * });
 *
 * return (
 *   <div {...dragHandlers}>
 *     Drag me! Offset: {dragOffset}
 *   </div>
 * );
 */
export const useDrag = ({
  onSwipeLeft,
  onSwipeRight,
}: DragHandlers): DragResult => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartPos(clientX);
    document.body.style.cursor = "grabbing";
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const offset = clientX - startPos;
      setDragOffset(offset);
    },
    [isDragging, startPos]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    if (dragOffset < -SWIPE_THRESHOLD) {
      onSwipeLeft?.();
    } else if (dragOffset > SWIPE_THRESHOLD) {
      onSwipeRight?.();
    }

    // Reset states
    setIsDragging(false);
    setDragOffset(0);
    setStartPos(0);
    document.body.style.cursor = "";
  }, [isDragging, dragOffset, onSwipeLeft, onSwipeRight]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e?.touches?.[0]?.clientX) handleDragStart(e?.touches?.[0]?.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e?.touches?.[0]?.clientX) handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  return {
    dragOffset,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
};
