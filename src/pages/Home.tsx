// Home.tsx
// Composes all scenes in narrative order.
// Each scene is separated by breathing space.
import { Hero }       from '../components/scenes/Hero';
import { Listening }  from '../components/scenes/Listening';
import { Thoughts }   from '../components/scenes/Thoughts';
import { Priority }   from '../components/scenes/Priority';
import { Workflow }   from '../components/scenes/Workflow';
import { People }     from '../components/scenes/People';
import { Product }    from '../components/scenes/Product';
import { Code }       from '../components/scenes/Code';
import { Technology } from '../components/scenes/Technology';
import { FlowAlive }  from '../components/scenes/FlowAlive';
import { Feedback }   from '../components/scenes/Feedback';
import { Comparison } from '../components/scenes/Comparison';
import { Philosophy } from '../components/scenes/Philosophy';
import { Final }      from '../components/scenes/Final';

export function Home() {
  return (
    <main aria-label="Philosophy — Software starts with people">
      <Hero />
      <Listening />
      <Thoughts />
      <Priority />
      <Workflow />
      <People />
      <Product />
      <Code />
      <Technology />
      <FlowAlive />
      <Feedback />
      <Comparison />
      <Philosophy />
      <Final />
    </main>
  );
}
