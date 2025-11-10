// Inspiration : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/

// TODO 2025-07-04 jeremboo: Check https://mantine.dev/hooks/use-focus-trap/
export default class FocusTrap {
  static OPENED_TRAPS: Array<FocusTrap> = [];

  private readonly $wrapper: HTMLElement;
  private readonly $focusFirst: HTMLElement;
  private readonly $focusLast: HTMLElement;

  private $focusAfterClosed: HTMLElement | null = null;
  private $focusCurrent: HTMLElement | null = null;

  private isOpen = false;
  private isFocus = false;

  constructor($wrapper: HTMLElement) {
    this.$wrapper = $wrapper;

    // Find $focusFirst & $focusLast
    this.$wrapper.removeAttribute('inert');
    const $focusableEls = this.getFocusableElements(this.$wrapper);
    this.$focusFirst = $focusableEls[0] as HTMLElement;
    this.$focusLast = $focusableEls[$focusableEls.length - 1] as HTMLElement;
    this.$wrapper.setAttribute('inert', '');
  }

  open($focusAfterClosed?: HTMLElement, $focusCurrent?: HTMLElement) {
    if (this.isOpen) return;
    this.isOpen = true;
    this.$focusAfterClosed = $focusAfterClosed ?? document.activeElement as HTMLElement;

    // Check if a previous trap is opened
    if (FocusTrap.OPENED_TRAPS.length > 0) {
      FocusTrap.OPENED_TRAPS[FocusTrap.OPENED_TRAPS.length - 1].blur();
    }
    FocusTrap.OPENED_TRAPS.push(this);

    if ($focusCurrent != null && this.isInWrapper($focusCurrent)) {
      this.$focusCurrent = $focusCurrent;
    } else {
      this.$focusCurrent = this.$focusFirst;
    }

    this.$wrapper.removeAttribute('inert');
    this.focus();
  }

  close() {
    if (!this.isOpen) return;
    this.blur();
    this.isOpen = false;
    this.$focusCurrent = this.$focusFirst;

    // Remove the trap from the list of opened traps and refocus the previous one if exist
    FocusTrap.OPENED_TRAPS.pop();
    if (FocusTrap.OPENED_TRAPS.length > 0) {
      FocusTrap.OPENED_TRAPS[FocusTrap.OPENED_TRAPS.length - 1].focus();
    } else {
      this.$focusAfterClosed?.focus();
      this.$focusAfterClosed = null;
    }
    this.$wrapper.setAttribute('inert', '');
  }

  focus() {
    if (!this.isOpen || this.isFocus) return;
    this.isFocus = true;
    this.$focusCurrent?.focus();
    document.addEventListener('focusin', this.handleTrapFocus);
  }

  blur() {
    if (!this.isOpen || !this.isFocus) return;
    this.isFocus = false;
    document.removeEventListener('focusin', this.handleTrapFocus);
  }

  /*
   * * *******************
   * * UTILS
   * * *******************
   */

  private isInWrapper(element: Element) {
    return this.$wrapper.contains(element);
  }

  private static isFocusable(element: Element): boolean {
    const el = element as HTMLElement;
    if (el.tabIndex < 0) {
      return false;
    }
    if ('disabled' in el && el.disabled) {
      return false;
    }
    if (el.getAttribute('role') === 'button') {
      return true;
    }
    switch (el.nodeName) {
      case 'A':
        return !!(el as HTMLAnchorElement).href && (el as HTMLAnchorElement).rel !== 'ignore';
      case 'INPUT':
        return (el as HTMLInputElement).type !== 'hidden';
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  }

  private getFocusableElements(element: Element): Array<Element> {
    const arr: Array<Element> = [];
    Array.from(element.children).forEach((child) => {
      if (FocusTrap.isFocusable(child)) {
        arr.push(child);
      } else if (element.children.length > 0 && element.getAttribute('inert') === null) {
        arr.push(...this.getFocusableElements(child));
      }
    });
    return arr;
  }

  /*
   * * *******************
   * * HANDLER
   * * *******************
   */

  private handleTrapFocus = (e: FocusEvent) => {
    if (!this.isInWrapper(e.target as Element)) {
      if (this.$focusCurrent === this.$focusFirst) {
        this.$focusLast.focus();
      } else {
        this.$focusFirst.focus();
      }
    }
    if (document.activeElement) {
      this.$focusCurrent = document.activeElement as HTMLElement;
    }
  };
}
