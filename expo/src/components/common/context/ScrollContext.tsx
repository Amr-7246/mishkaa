import { createContext, useContext, useRef } from 'react';
import { Animated } from 'react-native';

interface ScrollContextValue {
  translateY: Animated.Value;
  onScroll: (offsetY: number) => void;
  reset: () => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);
const NAVBAR_HEIGHT = 64 + 44; // height + safe area

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const translateY = useRef(new Animated.Value(0)).current; // useRef here to prevent the value re-set at every sup-render
  const lastOffset = useRef(0);
  const isHidden = useRef(false);

  const onScroll = (offsetY: number) => {
    const diff = offsetY - lastOffset.current;

    //& Ignore tiny movements (jitter)
    if (Math.abs(diff) < 5) return;

    //& Scrolling down => hide
    if (diff > 0 && !isHidden.current && offsetY > NAVBAR_HEIGHT) {
      isHidden.current = true;
      Animated.timing(translateY, {
        toValue: -NAVBAR_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    //& Scrolling up => show
    else if (diff < 0 && isHidden.current) {
      isHidden.current = false;
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    lastOffset.current = offsetY;
  };

  const reset = () => {
    lastOffset.current = 0;
    isHidden.current = false;
    translateY.setValue(0);
  };

  return (
    <ScrollContext.Provider value={{ translateY, onScroll, reset }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScrollContext must be used inside ScrollProvider');
  return ctx;
}
