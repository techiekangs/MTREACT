import Home from './Header.jsx';
import Statistic from './Statistic.jsx';
import About from './About.jsx';
import Advocacy from './Advocacy.jsx';

export default function Main() {
  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="snap-start">
        <Home />
      </section>
      <section className="snap-start">
        <About />
      </section>
      <section className="snap-start">
        <Advocacy />
      </section>
    </div>
  );
}
