import classNames from 'classnames';
import { useCallback, useMemo } from 'preact/hooks';

type Props = {
  classes?: string;
  name: string;
  value: string;
  placeholder?: string;
  onInput: (value: string) => void;
};

export default function InputText({ name, classes, value, onInput, placeholder }: Props) {
  const handleInput = useCallback((e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      onInput(e.target.value);
    }
  }, []);

  const valueLength = useMemo(() => value.replaceAll(' ', '').length, [value]);
  return (
    <>
      <label class="sr-only" htmlFor={name}>
        {placeholder}
      </label>
      <input
        name={name}
        class={classNames(
          classes,
          'm-8 h-64 w-400 rounded-base px-44 text-center text-button uppercase transition-[background,color] duration-base ease-linear placeholder:text-white focus:text-black focus:outline-none focus:placeholder:text-grey md:h-56 md:w-full md:text-mButton',
          {
            'bg-black text-white focus:bg-transparentWhite smMin:[&:not(:focus)]:hover:bg-grey': valueLength <= 0,
            'bg-white text-black': valueLength > 0
          }
        )}
        onInput={handleInput}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </>
  );
}
