import { Pages } from "~types/enum"
import Link from "./Link"

export default () => (
  <ul className="flex gap-2">
    <li><Link page={Pages.home}>Home</Link></li>
    <li><Link page={Pages.about}>About</Link></li>
    <li><Link page={Pages.projects}>Project</Link></li>
    <li className="text-black"><Link page={Pages.blog}>Blog</Link></li>
    <a class="text-black" href="/blog">BlogNavite</a>
    <a class="text-black" href="https://jeremieboulay.fr/portfolio">external link</a>
    <a class="text-black" target="_blank" href="https://jeremieboulay.fr/portfolio">external link in another tab</a>


    <button onClick={() => {
      console.log('history.length', history.length);
      history.back();
    }}>BACK</button>
  </ul>
)