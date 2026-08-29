# Values and Beliefs

The working agreements in [`AGENTS.md`](AGENTS.md) rest on the values and
beliefs below. They are the "why" behind how this project is built.

## How to phrase these

- **Values** state a preference: "X is better than Y," or simply "X is a good
  thing."
- **Beliefs** state an if/then: "if we X, then Y will happen too."
- If something could be phrased as either, **prefer the belief**: it argues for
  its own logic, whereas a value cannot necessarily argue for itself.

## Beliefs

- **If agentic code development is driven from the specification, then it
  benefits.**
  A written specification is a durable, shared statement of intent. When agents
  and humans work from the same spec, their contributions compose instead of
  colliding, and intent survives beyond any single session.

- **If agentic development is run against a test suite, then it benefits.**
  A fast, trustworthy test suite is the feedback loop that lets an agent verify
  its own work. A change that cannot be expressed as a test is an assertion of
  correctness, not a demonstration of it.

## Values

- **Being able to develop from a local system is a good thing.**
  Everything required to build, test, and run the project must work on a
  developer's local machine. No step may depend on a service, secret, or
  environment that cannot be reproduced locally.

- **Testability beats complexity.**
  Where a design choice trades testability for cleverness or compactness,
  choose testability. A simpler, more testable design is preferred over a more
  complex one.
