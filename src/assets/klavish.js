function handleKeyboardEvent(event) {
    // Ignore if following modifier is active.
    if (event.getModifierState("Fn") ||
        event.getModifierState("Hyper") ||
        event.getModifierState("OS") ||
        event.getModifierState("Super") ||
        event.getModifierState("Win") /* hack for IE */) {
      return;
    }
  
    // Also ignore if two or more modifiers except Shift are active.
    if (event.getModifierState("Control") +
        event.getModifierState("Alt") +
        event.getModifierState("Meta") > 1) {
      return;
    }
  
    // Handle shortcut key with standard modifier
    if (event.getModifierState("Accel")) {
      switch (event.key.toLowerCase()) {
        case "c":
          if (event.getModifierState("Shift")) {
            // Handle Accel + Shift + C
            event.preventDefault(); // consume the key event
          }
          break;
        case "k":
          if (!event.getModifierState("Shift")) {
            // Handle Accel + K
            event.preventDefault(); // consume the key event
          }
          break;
      }
      return;
    }
  
    // Do something different for arrow keys if ScrollLock is locked.
    if ((event.getModifierState("ScrollLock") ||
          event.getModifierState("Scroll") /* hack for IE */) &&
        !event.getModifierState("Control") &&
        !event.getModifierState("Alt") &&
        !event.getModifierState("Meta")) {
      switch (event.key) {
        case "ArrowDown":
        case "Down": // hack for IE and old Gecko
          event.preventDefault(); // consume the key event
          break;
        case "ArrowLeft":
        case "Left": // hack for IE and old Gecko
          // Do something different if ScrollLock is locked.
          event.preventDefault(); // consume the key event
          break;
        case "ArrowRight":
        case "Right": // hack for IE and old Gecko
          // Do something different if ScrollLock is locked.
          event.preventDefault(); // consume the key event
          break;
        case "ArrowUp":
        case "Up": // hack for IE and old Gecko
          // Do something different if ScrollLock is locked.
          event.preventDefault(); // consume the key event
          break;
      }
    }
    alert(event)
  }

  