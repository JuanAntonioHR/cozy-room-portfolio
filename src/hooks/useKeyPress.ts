'use client';

import { useSyncExternalStore } from 'react';

/**
 * Global state to track all currently pressed keys.
 * Using a Set for O(1) lookups and to handle multiple hook instances efficiently.
 * This pattern ensures we only have ONE set of event listeners for the entire application.
 */
const pressedKeys = new Set<string>();
const subscribers = new Set<() => void>();

/**
 * Notifies all subscribers that the keyboard state has changed.
 */
function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

/**
 * Handle key down events.
 * Adds the key to the set of pressed keys and notifies subscribers.
 */
function handleKeyDown(event: KeyboardEvent) {
  // Avoid redundant notifications when a key is held down (repeat events)
  if (!pressedKeys.has(event.key)) {
    pressedKeys.add(event.key);
    notifySubscribers();
  }
}

/**
 * Handle key up events.
 * Removes the key from the set and notifies subscribers.
 */
function handleKeyUp(event: KeyboardEvent) {
  if (pressedKeys.has(event.key)) {
    pressedKeys.delete(event.key);
    notifySubscribers();
  }
}

/**
 * Handle window blur events.
 * Clears all pressed keys when the window loses focus to prevent "stuck" keys.
 */
function handleBlur() {
  if (pressedKeys.size > 0) {
    pressedKeys.clear();
    notifySubscribers();
  }
}

/**
 * Subscription manager for useSyncExternalStore.
 * Attaches global event listeners when the first hook mounts,
 * and removes them when the last hook unmounts.
 */
function subscribe(callback: () => void) {
  subscribers.add(callback);

  // Initialize listeners only on the client and only if it's the first subscriber
  if (subscribers.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
  }

  // Cleanup function to remove the subscriber and potentially the listeners
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    }
  };
}

/**
 * useKeyPress Hook
 * 
 * Real-time keyboard event tracking with TypeScript support and SSR compatibility.
 * Optimized with a single event listener pattern shared across all instances.
 * 
 * @param targetKey - The key to monitor (e.g., "a", "Enter", "Escape", "Control", "ArrowUp")
 * @returns boolean - Whether the specified key is currently pressed.
 * 
 * @example
 * const isEscapePressed = useKeyPress("Escape");
 * const isControlPressed = useKeyPress("Control");
 */
export function useKeyPress(targetKey: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => pressedKeys.has(targetKey),
    () => false // SSR snapshot
  );
}
