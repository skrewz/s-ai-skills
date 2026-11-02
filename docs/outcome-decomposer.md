# Outcome Decomposer — rationale

Not dispatched. Nothing here is read by a run.

- `prompts/outcome-decomposer.md` carries rules; this file carries why.
- Read it before changing a rule, to know whether you may.
- The split gives the contract: **cut arguments, keep rules.**
  - A slimming pass that shortens a load-bearing rule — prose is not a dependency,
    dissent never in the graph, mirror-don't-duplicate, delete-never-close, dissent
    once — has gone too far.
  - The traps are the rules. Their prose is expendable; this file's is not.

## Why the prompt is short, and why it is ordered as it is

- The prompt enters context on every run, before a single issue is read; this file
  is read once, by whoever edits the rules.
- Rationale in the prompt therefore costs every run's attention to serve a reader
  not in the run.
- Order follows attention:
  - tool results — issue bodies, blocker lists — arrive after the prompt and
    dominate the tail, so the prompt's middle is its worst-attended real estate;
  - hard limits and vocabulary lead;
  - phases in the middle: procedural, recoverable from Phase 5's checklist;
  - loop-breakers last — freshest at the moment of writing a second comment.
- The phases are `###` under **The run**, not `##` siblings of the worked example,
  where they read as steps *of* the example. That heading's first sentence carries
  what nesting cannot: they apply on every run.
- The cap's *number* lives in the operator's instructions only — one place to
  change, no chance of template and deployment disagreeing.

## Hard limits

- **Closure changes venue, not duty.**
  - The old rule said *stop*: commissioning ended curation.
  - Wrong: commissioned forests keep changing — the human comments, an implementer
    mirrors a trouble, a member needs a repository the forest does not touch.
  - Those are plan changes, i.e. this role's job; stopping at closure left forests
    to rot and trouble reports unread.
  - The sweep now dispatches a commissioned tracker for curation; the rule matches.
  - Venue still moves — closure authorised the work, it never said the idea stopped
    being discussed.
  - A question on a closed root reaches nobody: the human is on the tracker.
- **Either input resolves to the root before anything is enumerated.**
  - The engine hands the root while uncommissioned, the tracker once commissioned —
    the tracker stays open, so the pulse comes from there.
  - Both arrive as one URL; the argument's type distinguishes nothing.
  - A tracker blocks nothing, so root-style enumeration on one yields an empty
    forest.
  - The natural answer to an empty forest is to build it all again, doubling every
    member.
  - Resolving first is the only thing separating a re-curation from a duplicate
    forest.
- **A vanished root is a defect; a closed one is not.**
  - Membership is an edge from the root, so a deleted root orphans every member at
    once, and nothing in the tracker says so.
  - Closure is deliberate and meaningful; disappearance is not.
  - First defect on Phase 1's list — the only way anyone learns is this run saying
    it.
- **Delete, never close.**
  - Closing says *finished*: it tells the tracker the work is done and unblocks
    whatever depends on it.
  - Closing to retract says "done" where it means "wrong", and fires the unblock
    cascade for work never completed.
  - While the root is open, deletion carries no downstream semantics at all — the
    only primitive for "this was not the plan".
- **The root is untouchable.**
  - Every member is blocked by it.
  - Deleting it does not delete the forest; it *commissions* it, silently and
    entirely.
- **The create path proves it can delete first.**
  - Creating and deleting are granted separately: issues write lets a collaborator
    create freely; deletion needs owner, or admin on that one repository.
  - A forest spans repositories, so it is a per-repository fact that working there
    before cannot imply — and creating works precisely where deleting does not.
  - Hence one read per repository before Phase 4, and the whole commission refused
    if one answers no.
  - A half-dismantled forest is worse than none: leftovers are invisible to a
    teardown that follows edges, and the root reports the refusal every run.
  - Failing at creation costs a report; failing at teardown costs an operator with a
    mouse.
- **The root carries no scaffolding.**
  - No templates, no checklists, no tidied formatting.
  - A human's idea arrives as a person talks when they know what they want and not
    how to get it; the looseness is information — hesitations, afterthoughts and
    emphatic asides are where the real constraints are.
  - Scaffolding shapes the idea toward what the tool finds easy to ask for: the
    tracker writing the requirements.
- **Replies are caused, not scheduled.**
  - Commenting bumps `updated_at`, and revision dispatches this prompt — so every
    comment written re-triggers a run, tracker or root.
  - The loop is bounded by silence: the echo run finds an empty delta and stops.
  - Earlier drafts read that as a ban on meta-work on the root — the wrong
    conclusion from a real mechanism; tracker reports always self-triggered, and
    moving a comment changes nothing there.
  - The rule guards against the diary, not the loop: commentary nobody asked for,
    accumulating.
  - The test is whose words moved the graph — the human's, or the agent's
    re-reading.
  - This replaced an identity check ("never while an earlier question of yours stands
    unanswered"), which is only this rule's common case.
- **The cap is configured, and refusing cites it.**
  - A number in a public template and a number in a deployment are two numbers; one
    wins quietly.
  - So only the operator's instructions state it; the rule says "a configured
    maximum" and treats absence as a misconfiguration to report.
  - A refusal without its number reads as the agent's discretion — nobody can
    overrule or tune it.
  - Depth counts because the cap counts nodes: a chain of ten is a fan-out of ten.

## Vocabulary

- Only concepts that exist as stored data — objects, edges, fields, labels,
  configured values — earn a row.
- Behaviour words (curation, dissent, venue, trouble, report) are instruction
  vocabulary: defining them implies a tracker field that does not exist, and sends a
  run looking for something the database does not hold.
- `prose` stays: it names stored fields — title, body, comments — that no decision
  function reads, and is the counterpart to "edge" wherever this document argues the
  graph, not the text, is what the system acts on.

## What counts as an instruction

- **A label's direction is not a question.**
  - A label is the cheapest instrument a human has on a root: two clicks, no words.
  - So the set standing now *is* the instruction; a timeline entry saying which way
    one last moved is a fact about the past.
  - A run read a label's *absence* as ambiguous — "order discharged", or "tidying
    up" — stalled, wrote nothing.
  - The stall was the expensive option: an unwanted forest goes in one teardown, an
    unwanted deletion comes back in one curation run, and a stalled root waits for
    the next sweep doing nothing.
  - Prose stays ambiguous, dissent stays worth raising (§Venues). Labels are exempt
    because the site vocabulary defines them exactly — as the graph outranks prose
    everywhere else.

## The shape of a forest

- **Prose cannot be a dependency.** Nothing downstream reads it — reviewer, cascade
  and merge gate consult edges — so an ordering only in prose is one that will be
  violated by whoever did not read that line.
- **Redundant edges are worse than absent ones.** A transitive edge for readability
  hides the real dependency; when the true blocker is rewired the redundant one still
  holds the member down and looks like a justification, so the plan lies about *why*
  it waits.
- **Completeness matters more than tidiness.** Commissioning flips every member to
  eligible at once; afterwards only each member's own predecessors hold work back. So
  a missing work-order edge is not cosmetic but a gate left open, and whoever picks
  that member up first does work that was not ready.
- **Starting and landing are different axes.** A blocking edge gates *starting*;
  nothing in the graph gates *merging*. A co-deployment need written as a blocking
  edge is either too strong (work cannot start) or too weak (both merge apart
  anyway) — a graph that looks careful and protects nothing. Hence name the mechanism
  in the report rather than overload the edge.
- **A person's task gates by edge, not by set.** The example's key revocation is an
  execution dependency on the landing axis, but landing means merging a pull request
  and a human task has none, so it cannot join a set. A blocking edge is the only
  primitive the graph has for it, and its error is the survivable one: the successor
  waits a little longer. The alternative is a set issue nobody can ever land.

## Landing sets

- **Why a set exists at all.**
  - Some changes are individually correct and jointly undeployable: schema and
    migration, image and its deployment, a library bump and its consumer.
  - Between first merge and last, the trunk is broken.
  - Ordering fixes nothing here — ordering decides who waits, and nobody should wait
    to *start*.
  - What is needed is a gate on landing, and a gate needs an object to hang from.
- **A set is a node, not a field.** As a member it inherits what the engine already
  does: gated until commissioning, blocks the tracker, blocks whatever waits on the
  group, listed beside the work it groups. A field on four issues needs new machinery
  for all four, and a human must rebuild the group in their head.
- **Two labels, two roles.** `sync` says *a set lives here*; `agentic-sync-merge`
  says *I may land automatically, only as part of a set*; `agentic-auto-merge` says *I
  may land alone*. Both on one member authorises two agents to act on one change in
  opposite ways — one landing it, one waiting for its peers — hence resolve, not
  record.
- **An omitted set is the most expensive error.** The graph looks right, every member
  merges cleanly and greenly, the trunk is broken anyway. Invisible precisely because
  nothing fails — which is why the report names the groups judged *independently
  deployable*: a set not created is otherwise undetectable.
- **Sets are deleted, not closed.** As with delete-never-close: closing means done,
  and a closed set grouping nothing is a lie about a finished lockstep.

## Human tasks

- **Why they are rare.** A human task stops the branch that reaches it and everything
  downstream of it, while the rest of the forest finishes early and then waits. So the cost
  is the waiting rather than the work inside the issue, paid in wall-clock and in the
  operator's attention. Asking often also trains them to skim, which makes the questions
  that genuinely need an answer harder to get read (the same reason dissent is raised once,
  §Pushing back). Which is why §The shape of a forest says *used sparingly*: a budget of
  attention, not politeness.
- **The one justification: automation cannot take the next step.** Two ways that happens,
  and the issue names which. Either the step is **out of reach** — credentials, a person's
  hands, a system outside every repository the forest touches — or the step stands at a
  **one-way door**. The body carries the reason under "Why this was judged to need a
  human" so a reader can check the call, the way the defect list lets a reader check a
  defect (§Defects).
- **One-way doors and two-way doors**, the Amazon distinction the rules borrow: a two-way
  door is a step or decision that can be reverted with little effort, a one-way door is one
  that cannot. Rollback covers the ordinary engineering decision, so the agent decides it,
  puts it in the report and carries on — being wrong costs a fix-forward, being right costs
  nothing. At a one-way door the decision is the human's and the graph waits: data deleted,
  a key revoked, money spent, something said in public. A go/no-go is filed under the
  one-way doors rather than beside them because that is what makes it worth asking about —
  a go/no-go on something reversible is a two-way door wearing a question mark, and the
  agent's to walk through. Two-way doors still get reported: the human learns what was
  decided, they were simply never in the way of it.
- **What is not a human task.** A question about the shape of the outcome is dissent while
  the root is open (§Venues), not a member. A wish that someone would double-check the
  agent's work is the reviewer's job and the labels' (§Landing sets). Neither needs an issue
  that blocks the graph.
- **Why the issue spells out the ask and the answer.** Whoever reads it arrives with no
  context and no reason to acquire any, so the body says what is wanted, how to do it and
  where to reply — the minimum that closes without a reply-and-wait cycle, which would pay
  the stall twice. Options with a recommendation for a go/no-go, because a question with no
  candidate answer invites a conversation where a choice was wanted.
- **Why later issues link back to the task.** A blocking edge says only *do not start yet*
  and carries no content, so an implementer who never sees the human's answer invents one,
  and nothing fails when that happens. The link is what turns the answer into part of the
  work. This does not contradict "prose is not a dependency": the edge still decides when,
  the prose carries what the human said.
- **Why the landing label is stated at creation.** A work item created without one is
  merged by a person by default (`prompts/pr-reviewer.md`), which is a human task nobody
  meant to open. Nothing breaks when that happens, so it is said in Phase 4 and asserted in
  Phase 5, the way an omitted landing set is.

## The pointer block

- **Every member carries it.** An implementer arrives with one URL and no memory of
  this prompt — a sweep, a re-review, a reassignment. The block says who owns the
  scope question and where troubles go: the difference between an agent that stalls
  quietly and one that raises what it found.
- **Trouble goes on the tracker; only a link lands on the member.** The tracker is
  what this prompt re-reads, so a trouble there is a delta the next run can act on —
  a member, an edge, a re-phrasing. The link exists because whoever arrives at the
  member has no memory of the forest, and a comment is what makes them look. Text in
  one place; a copy in two drifts and the stale one wins. Trouble recorded only where
  nobody looks is a stall wearing a better hat.
- **The tracker carries no block.** It has no forest to point into — it *is* the
  forest's live object. It names the root in its own body: the same information
  without the second-person framing.
- **A mismatched tracker URL is reported, not repaired.** It means two forests were
  merged carelessly. Rewriting the URL hides the merge; reporting leaves the call to
  the only party who can say which forest the member belongs to.
- **"Gates nothing" is said out loud** because that is how this feature rots: a
  flawless block *reads* like a dependency, so a run that adds one may believe it
  expressed an ordering. It expressed nothing to the engine.
- **Why the block is a disclosure.** The two links are the block's load-bearing part;
  the rest is reference material — what counts as a trouble, where it goes, what is not
  one. Collapsed, the reader gets the links without clicking and the detail with one
  click, and the member's own text stays the thing at the top of the page.
- **Why the summary holds HTML anchors, not markdown.** `<details>` opens an HTML block,
  and up to the next blank line everything in it is HTML: `[title](url)` inside a summary
  renders as literal brackets. The same rule picks the placeholder style —
  `IDEATION-TITLE` and `TRACKER-ISSUE-NO`, not `<ideation title>` — because an unknown tag
  is stripped by the forge, and an unfilled placeholder that silently vanishes is worse
  than one that shows up on the page looking unfinished.
- **What the forge keeps of the block.** Issue bodies are rendered and then sanitised
  (`modules/markup/sanitizer.go`: bluemonday's UGCPolicy plus Forgejo's own rules).
  `details` and its `open` attribute survive, `summary` survives, and an anchor keeps its
  `href` — but not `target`, which only the repository-description policy allows. So a
  summary link navigates in the same tab, and writing `target="_blank"` in a body only
  misleads the next reader about what will happen.
- **Why a link in the summary is safe.** A click on a summary toggles the disclosure; a
  click on a link inside one does not. Measured in Chromium through Playwright: clicking
  the anchor produced the navigation and no `toggle` event, clicking the summary's own
  text produced one. Firefox and WebKit were not measured here; the spec agrees, since a
  click's activation behaviour belongs to the nearest element that has one, which for an
  anchor is the anchor.
- **Why the heading stays outside the disclosure.** See the next bullet: the rule Phases 1
  and 5 apply is a literal heading, and a heading inside a summary is either unparsed
  markdown or an `<h2>` in a summary. Either way the string stops being a heading and the
  check becomes a judgement again.
- **The block is named by its heading, and `unchanged` is gated on it.**
  - The back-fill instruction already existed twice — a Phase 4 bullet, Phase 5's
    first assertion — and a live run still left members without it.
  - It read every body, found a hand-written `## Provenance` naming the outcome,
    concluded the forest pointed back, and wrote nothing.
  - No rule was missing; the rule was satisfied *in substance* by prose mentioning
    the root — how a model reasons when asked for a property rather than a string.
  - A literal heading is checkable without judgement.
  - `unchanged` is reserved for a member already ending in it: the manifest is where
    a run commits to leaving something alone, so a gate there bites at the moment of
    decision, while a Phase 5 assertion only reports a decision taken. Prose is where
    a rule is explained; the manifest where it is obeyed.
- **Redundant prose is left alone.** A `## Provenance` section duplicates what the
  edges say, so deleting it while adding the block is tempting. This role deletes
  only what curation makes wrong: that section is not wrong, and the human may have
  written it. Two prose forms of one fact is untidy; an unreviewed deletion is not.

## Illustrating a forest

- **The old 4 500-character budget was never measured.** It arrived with the drawing
  convention carrying the claim that "the forge refuses 5 000 and renders nothing", an
  assumed upstream default. Read from this instance's own page configuration the ceiling
  is `mermaidMaxSourceCharacters: 50000`, so the number guarded a limit ten times away
  and the work it was actually doing was legibility. Recorded so nobody reinstates it as
  a safety margin.
- **Legibility is not the diagram's problem.** A forest too large to read is an
  argument about the fan-out cap — the human's call about scope, not the curator's call
  about aesthetics. Collapsing repositories into single boxes to make a picture restful
  has the graph quietly redrawn, which is the one thing a drawing of the forest must not
  be. So collapse only where the ceiling forces it, and say so in the record.

## The tracker's current state block

- **The description, not another comment.** A record is what a run said; the
  description is what the forest is, and it is the first thing the forge puts in front
  of a human who opens the tracker. The forest's drawing belongs where a person looks,
  not below the eleventh run's prose.
- **It is a projection, and that word is load-bearing.** Everything this role writes is
  otherwise prose that gates nothing (§The pointer block). This block is the exception
  made safe by its placement: a `sync` issue's body *is* read — the engine digests it
  as the landing set's revision, so a stamp inside one would re-dispatch the landing
  every sweep and merge work. Naming that seat as forbidden, rather than trusting the
  agent to sense which bodies are read, is what keeps prose prose.
- **The stamp moves when nothing else does, on purpose.** A reader must be able to tell
  "the forest is quiet" from "nobody is looking". A stamp that advanced only on change
  would say *quiet* for a curator that had silently stopped — the failure mode this
  role is most obliged to make loud, paid for here with a little edit-history churn.
  It is the one write that survives an empty delta, and the silence rule is stated as
  governing *comments* because it was written long before an unconditional write
  existed.
- **Byte-stable rendering is what makes the churn survivable.** If the diagram's own
  bytes wandered (node order, edge order, class order), a human reading the tracker's
  history could not see the changes that were also the graph moving. So the render is
  an order, not an improvisation.
- **First heading, on purpose.** The block answers *where are we*, and a reader who has
  to scroll past a members list to find it will not find it. Placement is stated as a
  rule because leaving it to judgement ends with the block appended to the bottom, where
  it is true, current, and never seen — the exact failure a living picture has to avoid.
- **Every styling rule in §Illustrating a forest is a measurement, not a taste.** The
  frame mermaid renders into carries mermaid's own CSS and no theme variables, so
  anything coloured in diagram source is theme-blind: a hard-coded light `fill` came out
  near-white on the dark theme, an uncoloured anchor came out the user-agent blue
  (`rgb(0, 0, 238)`) on a node the dark theme filled `rgb(31, 32, 32)`, and `click`'s
  `_blank` is discarded under `securityLevel: "strict"` — so that click navigates the
  frame and the forest is replaced by the page. Measured in that frame, an anchor's
  `style='color:inherit'` returns the theme's own label colour (`rgb(204, 204, 204)`, the
  same an unlinked node reports); the same inherit on a `<span>` inside the anchor returns
  the blue, which is why the attribute sits where it does. All of it probed against a
  live Forgejo, 2026-11-01. Change a rule only with a measurement of your own.
- **Two fence pairs stop the run rather than get resolved.** Choosing between two
  regions means guessing which is prose, and a guess there is limit 10 broken with
  confidence. Reporting and writing nothing is the only honest move.
- The markers are HTML comments so the rendered page shows a heading, a line and a
  diagram — the machinery is invisible where a human reads it.

## Venues

- **The shape conversation lives on the root before commissioning.**
  - The venue rule comes from attention, and before commissioning the human's
    attention is on the issue they wrote.
  - Routing it to the tracker sends the most consequential discussion a forest has —
    the part while the shape is still free — to the one place that human is not
    looking, and turns a brainstorm into a monologue answered elsewhere.
  - So the reply goes back where the words came from; the record does not travel with
    it, staying on the tracker in order and complete, with the reply pointing at it.
    Two artefacts, one a pointer, is what stops them drifting.
- **A run before commissioning with a delta posts both.** The reply answers the human,
  the record answers a stranger. Most changes are caused by nothing the human typed —
  a trouble mirrored, a PR landed, a set satisfied, a re-read finding an unwritten
  edge — so those runs post no reply, and had the report gone silent too, half the
  forest's history would live nowhere. §Boundaries' reproducibility test settles it:
  the tracker must be enough to rebuild the graph, and a record parked on an issue
  nobody may edit is not.
- **The report never moves.** It describes the artefact, not the idea. An auditor
  reads the tracker; a record scattered over whichever object was fashionable cannot
  be read in order.
- **The decision venue moves with the root's state.**
  - While it is open the human is there, and a question elsewhere goes unanswered.
  - Once closed the question has no venue there — closed means commissioned, and
    commenting on a commissioned idea re-opens the decision its closure answered. So
    the tracker carries it, root linked.
  - What it does not imply: a moved venue is not a suspended duty. Curation carries on
    (see Hard limits); only the conversation relocates.

## Pushing back

- **Silence about an unachievable outcome is a failure.** Closing commissions the
  work. An agent that saw the flaw and said nothing lets the closure authorise work it
  knew was wrong, and the flaw gets blamed on the plan rather than the silence. Dissent
  is part of the job, not an interruption of it.
- **Dissent may never be encoded in the graph.** A veto expressed as data is a veto
  nobody can review: an invented blocking edge looks exactly like a real dependency,
  survives every Phase 5 validation, and is read by the next agent as the outcome's
  requirement rather than one agent's objection. It is also the one failure here that
  looks like diligence — hence absolute, not a matter of taste. The graph says only
  what the outcome as written implies; disagreement goes in prose, where a human can
  overrule it.
- **"Create nothing further" is allowed in one case.** A contradiction that decides
  which members exist means there is no coherent forest to write yet. The forest stays
  inert because it was never completed, not because a hidden gate was added — an
  observable difference on the tracker, and the reason the run says so in a paragraph.
- **Dissent is raised once.** An answered objection restated by the human *is* the
  decision. Repeating settled objections is noise, and noise trains a human to skim —
  which costs them the unsettled ones.

## The worked example

- Kept deliberately: for a small local model an example buys more correctness per
  token than any paragraph of rules, showing shape rather than properties.
- Commentary is one line per lesson; the reasons are the sections above.
- The lessons, in order: parallel work stays parallel and edges come from consequences;
  one sentence plus its echo justifies a set issue; a judgment not to create a set
  still belongs in the report; a human's task exists only where automation cannot take
  the next step, is placed rather than derived, and is never the set issue; a flaw in the
  instruction is argued in prose, not engineered into the graph.

## The phases

- **Phase 1 is read-only and enumerates both directions.** Membership is one edge,
  stored one way and readable both, and hand-built forests are inconsistent about
  which end got written — enumerating both is the difference between the forest and
  half of it. The in-flight pull-request check is a *report*, never a repair: stopping
  work before commissioning is the gate's job and the implementer's authority, and an
  agent that works around another's breach ends up owning a policy it does not control.
- **Delete-and-recreate is not the default.** Replacing an issue destroys its
  discussion — including the operator's clarifications, which are instruction — and
  burns numbers for nothing. Legitimate only as the degenerate case of a large delta.
- **"Write it as if for a stranger" is literal.** The next agent on a member may be a
  re-review or reassignment with nothing but the body. Bodies naming mechanism, files
  and verification are why an agent that remembers nothing can curate the forest.
- **A written manifest.** Without materialised desired state, "validation" degrades
  into the run agreeing with itself. Phase 5 asserts against the file, and its
  `rationale` column is what makes the report auditable a month later.
- **The apply order is creates → edits → edges → deletes.** Edges need both ends;
  a set must exist before anything is blocked by it; deletes last, so a mistaken
  delete can still be checked against something present.
- **Never give the tracker outbound edges.** It blocks everything and waits on the
  outcome; an outbound edge is a cycle, which most trackers reject with an unhelpful
  HTTP 500 and an empty body.
- **Two failures end the run.** Improvising a mechanism after two refused writes is
  choosing a different system, and the discrepancy it hides is exactly what Phase 5
  exists to report.
- **Dissent is the report's first line, linked not repeated.** A human who commissions
  without seeing the objection is failed twice: once by the idea, once by the ordering.
  Linking keeps one copy.

## Defects

- **Enumerated, not left to judgement.** "Report anything that looks wrong" is
  unverifiable: a run can call its own unfinished work a defect and stay silent
  about a real one. The list makes the boundary — *mine to fix*, *not mine* —
  checkable by the model and auditable by the operator. The failure it guards is
  **repair**: editing the graph until the symptom disappears. Creating a second
  tracker because the first is ambiguous, or closing a member whose repository is
  out of remit, both make the evidence vanish — hence "never make a defect
  disappear by editing the graph" before the list names a single defect.
- **Two stop the run, three do not.** A defect that prevents identifying the
  forest — no resolvable root, no single tracker — means every write rests on a
  guess about which objects the graph contains, and writes are the only thing here
  that can damage a forest. The rest are properties of objects you can still
  describe correctly, so curation continues and the defect rides with the report.
- **A stop has no report.** The report lives on the tracker; a defect about the
  tracker's identity removes its address, so the channel is the only output and the
  run ends. Also why the report's location was never configurable: exactly one
  tracker always — if not, the run has stopped.
- **Defects go to a channel, not a conversation.** §Venues is about the *shape of
  the outcome*; a defect is about the *state of the machinery* — refused writes, an
  object the graph cannot identify, a repository outside the engine's remit. A
  reader in the conversation could do nothing: widening remit, adding a label,
  installing a prompt are operator acts. So it goes to whoever can act, with one
  line in the report keeping the record complete.
- **The channel is named in the preamble, not the template.** The public prompt says
  "the error channel your instructions name"; the private preamble names the room.
  Infrastructure stays out of the public prompt, and moving errors touches the
  deployment, never the rules. Same shape as the cap rule: template states the
  discipline, site states the number or the place.
- **A standing defect is raised every run, not once.**
  - Operators fix defects, not forests; the report is addressed to the human.
  - Once the record exists it *reads* settled — one comment replacing the last —
    so a defect surviving several runs looks like a state everyone accepted.
  - Repetition on the channel is the only notice that survives inattention, and is
    safe where comments are not: no `updated_at` moves, no revision, no dispatch, so
    no loop.
  - The bound is the defect itself — it ends when the write stops failing, the label
    appears, or the repository joins the remit — and a clean run posts nothing.
  - Accepted cost: one message per sweep while it stands. Cheaper than the
    alternative — one message, delivered when nobody was reading.
- **Silence must not absorb a defect.** `decompose` is dispatched every sweep,
  changed or not, and the preamble makes silence on an empty delta that run's
  acceptance test — the most rehearsed output this role has. A defect found on a run
  with nothing else to do is the one moment the model must break the pattern it was
  just told is correct, hence the rule stated twice: §Defects and §Loop-breakers.

## Loop-breakers

- Every comment this role writes is a revision, and every revision a dispatch. Four
  amplifying loops are known, and each rule here closes one:
  - meta-work reported on the root re-triggers the run there (limit 5);
  - an unanswered question answered by another comment from the same agent (the
    identity check — recognise your own comment, post nothing);
  - a trouble mirrored onto a member every run, dispatching whoever reads it, who
    mirrors it again;
  - a report on an empty delta — noise that buries the reports that matter.
- They sit last in the prompt on purpose: freshest at the moment of writing.
- Silence after a question is correct, not stalled — and an empty delta is not
  nothing to say. A no-op run may legitimately have a question: it goes to the
  venue, the report stays silent.
- **"Never promise not to rebuild" sits here.** Having deleted a forest on order the
  agent wrote that it would not recreate it — reassurance to the human, read by the
  next run as a policy its own reports hold, which no label can lift. It is a rule
  about writing, so it lives with the rules freshest at the moment of writing.
