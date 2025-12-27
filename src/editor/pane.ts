import { Pane } from 'tweakpane';
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';

// https://github.com/kitschpatrol/svelte-tweakpane-ui/blob/main/src/lib/internal/InternalPaneDraggable.svelte

class CustomPane extends Pane {
  containerElm: HTMLElement;
  headerElm: HTMLElement;

  isDragging = false;
  dragOffsetX = 0;
  dragOffsetY = 0;

  isResizing = false;
  resizeStartX = 0;
  resizeStartWidth = 0;

  constructor(options: PaneConfig) {
    super(options);

    // eslint-disable-next-line no-underscore-dangle
    this.containerElm = (this as any).containerElem_ as HTMLElement;
    this.headerElm = this.containerElm.getElementsByClassName('tp-rotv_b')[0] as HTMLElement;

    this.containerElm.style.zIndex = '9999';
    this.containerElm.style.right = '15px';
    this.containerElm.style.top = '15px';

    // Hover effect
    this.containerElm.style.opacity = '0.5';
    this.containerElm.style.transition = 'opacity 0.2s';
    this.containerElm.addEventListener('mouseenter', () => {
      this.containerElm.style.opacity = '1';
    });
    this.containerElm.addEventListener('mouseleave', () => {
      this.containerElm.style.opacity = '0.5';
    });

    // Drag effect
    this.headerElm.addEventListener('mousedown', this.onDragMouseDown);

    // Resize effect
    // Create an invisible button for this.isResizing
    const resizeBtn = document.createElement('button');
    resizeBtn.style.position = 'absolute';
    resizeBtn.style.left = '0';
    resizeBtn.style.top = '0';
    resizeBtn.style.width = '8px';
    resizeBtn.style.height = '100%';
    resizeBtn.style.opacity = '0';
    resizeBtn.style.cursor = 'col-resize';
    resizeBtn.style.border = 'none';
    resizeBtn.style.background = 'transparent';
    resizeBtn.style.padding = '0';
    resizeBtn.tabIndex = -1;
    this.headerElm.appendChild(resizeBtn);

    resizeBtn.addEventListener('mousedown', this.onResizeMouseDown);
  }

  onDragMouseDown = (e: MouseEvent) => {
    window.addEventListener('mousemove', this.onDragMouseMove);
    window.addEventListener('mouseup', this.onDragMouseUp);

    const rect = this.containerElm.getBoundingClientRect();
    this.dragOffsetX = e.clientX - rect.right;
    this.dragOffsetY = e.clientY - rect.top;
    document.body.style.userSelect = 'none';
  };

  onDragMouseMove = (e: MouseEvent) => {
    const right = e.clientX - this.dragOffsetX;
    const top = e.clientY - this.dragOffsetY;
    if (!this.isDragging) {
      this.headerElm.style.cursor = 'grabbing';
    }
    this.isDragging = true;
    this.containerElm.style.right = `${window.innerWidth - right}px`;
    this.containerElm.style.top = `${top}px`;
  };

  onDragMouseUp = () => {
    window.removeEventListener('mousemove', this.onDragMouseMove);
    window.removeEventListener('mouseup', this.onDragMouseUp);

    if (!this.isDragging) return;
    this.isDragging = false;

    document.body.style.userSelect = '';
    this.headerElm.style.cursor = 'pointer';

    this.expanded = !this.expanded;
  };

  onResizeMouseMove = (e: MouseEvent) => {
    if (!this.isResizing) return;
    const dx = this.resizeStartX - e.clientX;
    const newWidth = Math.max(256, this.resizeStartWidth + dx);
    this.containerElm.style.width = `${newWidth}px`;
  };

  onResizeMouseUp = () => {
    if (!this.isResizing) return;
    this.isResizing = false;
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', this.onResizeMouseMove);
    window.removeEventListener('mouseup', this.onResizeMouseUp);
  };

  onResizeMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    this.isResizing = true;
    this.resizeStartX = e.clientX;
    this.resizeStartWidth = this.containerElm.offsetWidth;

    document.body.style.userSelect = 'none';

    window.addEventListener('mousemove', this.onResizeMouseMove);
    window.addEventListener('mouseup', this.onResizeMouseUp);
  };
}

/** *
 * EXPORTS
 */
const pane = new CustomPane({ title: 'Debug Panel', expanded: true });
const tab = pane.addTab({
  pages: [{ title: 'Props' }, { title: 'Actions' }]
});
const [tabProps, tabActions] = tab.pages;

export { pane, tabActions, tabProps };
