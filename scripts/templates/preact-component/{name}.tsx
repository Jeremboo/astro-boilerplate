import { useStore } from '@nanostores/preact';
import classNames from 'classnames';

type Props = {
  classes?: string
};

export default function {{name}}({ classes }: Props) {
  return <div class={classNames('', classes)}>{{name}}</div>;
}
