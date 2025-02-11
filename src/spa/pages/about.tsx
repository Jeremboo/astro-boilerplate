import Button from '~spa/components/Button';

export default () => {
  return (
    <div>
      <h2>ABOUT</h2>
      <ul>
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/projects">PROJECTS</a>
        </li>
        <li>
          <a href="/blog">BLOG</a>
        </li>
        <li>
          <a href="/about">ABOUT</a>
        </li>
      </ul>
      <Button onClick={() => {}}>Click</Button>
    </div>
  );
};
