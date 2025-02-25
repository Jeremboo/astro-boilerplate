import SPALink from "./SPALink";

export default () => (
  <ul className="flex gap-2">
    <li><SPALink href={'/'}>Home</SPALink></li>
    <li><SPALink href={'/about'}>About</SPALink></li>
    <li><SPALink href={'/projects'}>Project</SPALink></li>

    <li className="text-black"><SPALink href={'/blog'}>Blog</SPALink></li>

    <a class="text-black" href="https://jeremieboulay.fr/portfolio">external link</a>
    <a class="text-black" target="_blank" href="https://jeremieboulay.fr/portfolio">external link in another tab</a>
  </ul>
)