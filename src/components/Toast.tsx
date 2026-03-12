import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/fonts';
import { Icon, IconSizes } from './Icon';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  show: (message: string, type?: ToastType, duration?: number) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

/**
 * Toast notification system
 * Displays temporary notifications at the bottom of the screen
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastIdRef = useRef(0);

  const show = (message: string, type: ToastType = 'info', duration = 2000) => {
    const id = `toast-${++toastIdRef.current}`;
    const toast: ToastMessage = { id, message, type, duration };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <View style={styles.toastContainer} pointerEvents="none">
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

interface ToastMessageProps {
  toast: ToastMessage;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ toast }) => {
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const getTypeConfig = (type: ToastType) => {
    const configs = {
      success: {
        backgroundColor: colors.success,
        icon: 'checkmark-circle',
      },
      error: {
        backgroundColor: colors.error,
        icon: 'close-circle',
      },
      warning: {
        backgroundColor: colors.warning,
        icon: 'warning',
      },
      info: {
        backgroundColor: colors.primary,
        icon: 'information-circle',
      },
    };
    return configs[type];
  };

  const config = getTypeConfig(toast.type);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          transform: [{ translateY: slideAnim }],
          backgroundColor: config.backgroundColor,
        },
      ]}
    >
      <Icon
        name={config.icon}
        size={IconSizes.md}
        color="#FFFFFF"
        family="ionicon"
        style={{ marginRight: spacing.md }}
      />
      <Text style={styles.message}>{toast.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    marginVertical: spacing.sm,
    justifyContent: 'center',
  },
  message: {
    ...typography.body,
    color: '#FFFFFF',
    flex: 1,
  },
});
