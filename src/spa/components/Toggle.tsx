import classNames from 'classnames';
import type { ComponentChildren } from 'preact';

type Props = {
  id?: string;
  label: string;
  classes?: string;
  on?: string;
  off?: string;
  icon: ComponentChildren;
  isEnabled: boolean;
  handleToggleClick: () => void;
};

export default function Toggle({
  id,
  label,
  icon,
  classes,
  isEnabled,
  handleToggleClick,
  on = 'ON',
  off = 'OFF'
}: Props) {
  return (
    <button
      aria-label={label}
      id={id}
      role="switch"
      aria-checked={isEnabled}
      class={classNames(
        classes,
        'h-4 relative ml-8 w-10 opacity-70 transition-opacity duration-base before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:opacity-100',
        {
          '': isEnabled
        }
      )}
      onClick={handleToggleClick}
    >
      <div class="absolute -left-5 top-1/2 -translate-y-1/2">{icon}</div>
      <div
        class={classNames(
          'top-0.5 absolute h-3 w-3 rounded-full bg-secondary transition-[left,background] duration-[200ms,500ms]',
          {
            'left-0.5': !isEnabled,
            '!left-[calc(100%-0.875rem)]': isEnabled
          }
        )}
      ></div>
      <p
        aria-hidden
        class={classNames(
          'left-1.5 absolute top-1/2 -translate-y-1/2 whitespace-pre text-[10px] uppercase text-secondary opacity-100 transition-[color,opacity] duration-[500ms,200ms]',
          {
            '!opacity-0': !isEnabled
          }
        )}
      >
        {on}
      </p>
      <p
        aria-hidden
        class={classNames(
          'text-xs right-1.5 absolute top-1/2 -translate-y-1/2 whitespace-pre text-[10px] uppercase text-secondary opacity-100 transition-[color,opacity] duration-[500ms,200ms]',
          {
            '!opacity-0': isEnabled
          }
        )}
      >
        {off}
      </p>
    </button>
  );
}
