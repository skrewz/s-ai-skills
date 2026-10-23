# Outcome Decomposer — rationale

Not dispatched. Nothing here is read by a run.

`outcome-decomposer.md` carries rules only. This file carries the reasons those
rules exist: the damage each one prevents, the failure it was written after, and
the reasoning that convinced a human to accept it. Read it when you are about to
change a rule and want to know whether you may.

The maintenance contract follows from the split: **cut arguments, keep rules.** If
a slimming pass makes one of the load-bearing rules shorter — prose is not a
dependency, dissent never in the graph, mirror-don't-duplicate, delete-never-close,
dissent once — it has gone too far. Those are the traps; their prose is not.

## Why the prompt is short, and why it is ordered as it is

The prompt is expanded into context on every run, before the run has read a single
issue. It is billed every time; this file is read once, by whoever edits the
rules. Rationale that lives in the prompt therefore costs a run's attention to
serve a reader who is not in the run.

Order follows where attention is cheapest. Tool results — issue bodies, blocker
lists — arrive after the prompt and dominate the tail, so the middle of the prompt
is its worst-attended real estate. Hence: hard limits and vocabulary at the front,
the phases in the middle (procedural, recoverable from Phase 5's checklist), and
the loop-breakers last, because those are the rules that must be freshest at the
moment of writing a second comment.

The five phases were `##` siblings of the worked example until late in drafting,
which made them read as steps *of* the example. They are `###` under **The run**
now, and that heading's first sentence carries the only fact the nesting cannot:
they apply on every run.

The fan-out cap's *number* lives in the operator's instructions, never here. One
place to change, and no chance of the public template and the deployment disagreeing.

## Hard limits

**Why closure changes venue, not duty.** This limit used to say *stop*: commissioning
the forest was also the end of curation. That was wrong in one specific way. After
commissioning the forest still needs maintaining — the human keeps commenting, an
implementer discovers a dependency and mirrors a trouble to the tracker, a member
turns out to need a repository the forest does not touch — and every one of those
is a change to the *plan*, which is this agent's job. Stopping at closure left a
commissioned forest to rot, and left trouble reports with no reader. The engine's
sweep now dispatches a commissioned forest's tracker for curation, and this rule
matches that.

The venue still changes, because closure was never a claim that the idea had
finished being discussed: it was the gesture that authorised the work. A comment on
a closed root cannot be answered by the human who moved on to the tracker, so a
question posted there is a question nobody will read.

**Why the input may be either issue, and why that must be resolved first.** The
engine hands this prompt the root while the forest is uncommissioned, and the tracker
once it is commissioned — the tracker is where the pulse comes from, since it is the
object that stays open. Both are one issue URL, and the prompt is handed the same
kind of argument either way. A tracker blocks nothing, so the forest enumeration
that works from a root returns an empty forest when given a tracker by mistake —
and the natural response to an empty forest is to create the whole thing again,
doubling every member. Resolve to the root before enumerating; that is the only
thing separating a re-curation from a duplicate forest.

**Why a vanished root is an error and a closed one is not.** Membership is an edge
from the ideation issue, so a deleted root orphans every member at once and nothing
in the tracker says so. Closure is a deliberate act with a meaning; disappearance
is the first defect on Phase 1's list, and the only way anyone learns is if this
run says it out loud.

**Why delete, never close.** In this system closing says *this work is finished*: it
tells the tracker the work is done and unblocks whatever depends on it. Using it to
retract an issue therefore says "done" when it means "wrong", and it fires the
unblock cascade for work that was never completed. While the ideation issue is
open, deletion carries no downstream semantics at all — it is the only primitive
that expresses "this was not the plan".

**Why the root is untouchable.** Every member is blocked by the ideation issue.
Deleting it does not delete the forest; it *commissions* it, silently and entirely.

**Why the ideation issue carries no scaffolding.** No templates, no checklists, no
tidied formatting. The human's idea arrives the way a person talks when they know
what they want and not how to get it, and that looseness is information: the
hesitations, the afterthoughts and the emphatic asides are where the real
constraints are. Scaffolding shapes the idea toward what the tool finds easy to
ask for, which is a way of letting the tracker write the requirements.

**Why replies are caused, not scheduled.** Commenting bumps an issue's
`updated_at`, and revision is what dispatches this prompt — so every comment the
decomposer writes re-triggers it, on the tracker as much as on the ideation issue.
That loop is bounded by silence: the echo run finds an empty delta and says nothing,
and stops. Earlier drafts took this as a reason to forbid meta-work on the ideation
issue entirely, which was the wrong conclusion from a real mechanism — the tracker
report has always self-triggered, and nothing about moving a comment to the root
changes that. What the *caused* rule guards against is not the loop but the diary: a
root that accumulates a running commentary nobody asked for. The test is whose words
moved the graph — the human's, or the agent's own re-reading of them.

This also replaced an identity check. The old rule said "never while an earlier
question of yours stands unanswered", which is only the common case of the new one:
no new words from the human, therefore nothing to reply to.

**Why the cap is configured, and why refusing must cite it.** A number in a public
template and a number in the deployment are two numbers, and one will win quietly.
So the number is stated only in the operator's instructions; the public rule says
"a configured maximum" and treats its absence as a misconfiguration to report. A
refusal that does not cite its number reads as the agent's own discretion, which
no one can overrule and no one can tune. Depth counts because the cap counts
nodes, and a chain of ten is a fan-out of ten.

## Vocabulary

Only concepts that exist as stored data — objects, edges, fields, labels,
configured values — earn a row. Words for agent behaviour (curation, dissent,
venue, trouble, report) are instruction vocabulary: defining them would imply a
tracker field where there is none, and imply that a run should look for something
the database does not hold.

`prose` is in the list because it names stored fields — an issue's title, body and
comments — that no decision function reads. It is the correct counterpart to
"edge" everywhere the document argues that the graph, not the text, is what the
system acts on.

## The shape of a forest

**Why prose cannot be a dependency.** Nothing downstream reads it. The reviewer,
the cascade and the merge gate consult edges; a sentence in a body is invisible to
all of them, so an ordering described only in prose is an ordering that will be
violated by someone who did not happen to read that line.

**Why redundant edges are worse than absent ones.** A transitive edge added for
readability hides the real dependency. When the true blocker is removed or
rewired, the redundant edge keeps holding the member down and looks like a
justification, so the plan now lies about *why* it waits.

**Why completeness matters more than tidiness.** Release flips every member to
eligible at once. After that, only each member's own predecessors stop work
starting early — so a missing work-order edge is not a cosmetic omission but a
gate left open, and the first agent to pick the member up will do work that was
not ready.

**Why starting and landing are different axes.** A blocking edge gates *starting*.
Nothing in the graph gates *merging*, so a co-deployment requirement written as a
blocking edge is either too strong (work cannot start) or too weak (both merge
apart anyway). Conflating them produces a graph that looks careful and protects
nothing, which is why the rule says to name the mechanism in the report rather
than overload the edge.

**Why a person's task gates by edge and not by set.** The example's key-revocation
task is an execution dependency — the landing axis — but landing means merging a
pull request, and a human task has none, so it cannot join a landing set. A
blocking edge is the only primitive the graph has for it, and the mistake it makes
is the survivable one: the successor waits a little longer than strictly necessary.
The alternative is worse: a set issue whose members nobody can ever land.

## Landing sets

**Why a set exists at all.** Some changes are individually correct and jointly
undeployable: schema and migration, image and its deployment, a library bump and
the consumer adopting it. Between the first merge and the last, the trunk is
broken. No ordering fixes that — ordering decides who waits, and here nobody
should have to wait to *start*. What is needed is a gate on landing, and a gate
needs an object to hang it from.

**Why a set is a node rather than a field.** As a member it inherits everything
the engine already knows how to do: it is gated until commissioning, it blocks the tracker,
anything that waits on the group is blocked by it, and it is visible in the same
list as the work it groups. A field on four issues would need new machinery for
all four, and a human reading the forest would have to reconstruct the group.

**Why two labels.** The **set issue** carries `sync` and says "a set lives here".
The **members** carry `agentic-sync-merge` and say "I may land automatically, but
only as part of a set". `agentic-auto-merge` says "I may land on my own". A member
carrying both authorises two agents to act on the same change in opposite ways —
one landing it, one waiting for its peers — which is why the prompt says resolve,
not record.

**Why an omitted set is the most expensive thing this role can get wrong.** The
graph looks
right, every member merges cleanly and greenly, and the trunk is broken anyway.
It is invisible precisely because nothing fails, which is also why the report must
name the groups judged *independently deployable*: a set you chose not to create
is otherwise undetectable.

**Why sets are deleted, not closed.** The same reasoning as limit 2 — closing
means done. A closed set issue grouping nothing is a lie about a finished
lockstep.

## The pointer block

**Why every member carries it.** An implementer arrives at a member with one URL
and no memory of this prompt: a sweep, a re-review, a reassignment. The block
tells them who owns the scope question and where troubles go, which is the whole
difference between an agent that stalls quietly and one that raises the thing it
found.

**Why the trouble goes on the tracker and only a link lands on the member.** The
tracker is the issue this prompt re-reads, so a trouble recorded there is a delta
the next run can act on — a new member, a new edge, a re-phrased issue. The link
on the member exists because whoever arrives there next has no memory of the
forest, and a comment is what makes them look. Text lives in one place; a copy in
two places drifts and the stale one wins. A trouble recorded only where nobody is
looking is a stall wearing a better hat.

**Why the tracker does not carry the block.** It has no forest to point into: it
*is* the forest's live object. It names the ideation issue in its own body, which
is the same information without the second-person framing.

**Why a mismatched tracker URL is reported, not repaired.** A member pointing at
another forest's tracker means two forests were merged carelessly. Silently
rewriting the URL hides the merge; reporting it leaves the decision to the human,
who is the only party that can say which forest the member belongs to.

**Why the block "gates nothing" is said out loud.** Because it is the most likely
way for this feature to rot: a flawless pointer block *reads* like a dependency,
so a run that adds it may believe it has expressed an ordering. It has expressed
nothing to the engine.

**Why the block is named by its heading, and `unchanged` gated on it.** The
instruction to back-fill the block already existed in two places — a Phase 4 bullet
and Phase 5's first assertion — and a live run still left members without it. It
fetched every member's body, found a hand-written `## Provenance` section naming
the outcome, concluded the forest already pointed back, and wrote nothing. No rule
was missing; the rule was satisfied *in substance* by prose that mentions the root,
which is how a model reasons when asked for a property rather than a string. Hence
two changes. The block is identified by a literal heading, which is checkable
without judgement. And `unchanged` in the manifest is reserved for a member that
already ends with it — the manifest is where the run commits to leaving something
alone, so a gate there bites at the moment of decision, whereas an assertion in
Phase 5 only reports a decision already taken. Prose is where a rule is explained;
the manifest is where it is obeyed.

**Why the redundant prose is left alone.** A `## Provenance` section naming the
root duplicates what the membership edges already say, so it is tempting to delete
it while adding the block. This role deletes only what curation makes wrong. The
section is not wrong, and the human may have written it; two prose forms of one
fact is untidy, an unreviewed deletion is not.

## Venues

**Why the shape conversation lives on the ideation issue before commissioning.** The
venue rule was derived from attention, and before commissioning the human's attention is
on the issue they wrote. Routing the shape conversation to the tracker sends the
most consequential discussion a forest ever has — the part that happens while the
shape is still free — to the one place that human is not looking, and turns their
brainstorm into a monologue answered somewhere else. So the reply goes back where
the words came from. The record does not travel with it: it stays on the tracker,
in order and complete, and the reply points at it. Two artefacts, one of them a
pointer, is what keeps them from drifting.

**Why both are posted when a run before commissioning has a delta.** The reply answers the
human; the record answers a stranger. Most of a forest's changes are never caused by
anything the human typed: an implementer mirrors a trouble, a pull request lands, a
landing set is satisfied, a re-read finds an edge nobody wrote down. Those runs post
no reply at all, so if the report fell silent before commissioning, half the forest's
history would live nowhere. §Boundaries' reproducibility test settles it — what the
tracker says must be enough to rebuild the graph, and a record parked on an issue
nobody may edit cannot do that.

**Why the report never moves.** It describes the artefact, not the idea. Someone
auditing the forest reads the tracker; a curation record scattered across
whichever object was fashionable at the time cannot be read in order.

**Why the decision-venue moves with the ideation issue's state.** While it is open
the human is looking at that issue, and a question elsewhere is a question nobody
will answer. Once it is closed the question has no venue there — closed means
commissioned, and commenting on a commissioned idea re-opens a decision the closure was
the answer to. So the tracker carries it, with the ideation issue linked. Note what
this does *not* imply: a moved venue is not a suspended duty. The curation carries
on after commissioning (see Hard limits); only the conversation relocates.

## Pushing back

**Why silence about an unachievable outcome is a failure.** Closing the ideation
issue commissions the work. If
an agent that could see the flaw said nothing, the closure authorises work it
already knew was wrong, and the flaw is then attributed to the plan rather than to
the silence. Dissent is part of the job, not an interruption of it.

**Why dissent may never be encoded in the graph.** A veto expressed as data is a
veto nobody can review. A blocking edge invented to slow disapproved work looks
identical to a real dependency; it survives every validation Phase 5 runs; and it
will be read by the next agent as the outcome's requirement rather than as one
agent's objection. It is also the one failure of this role that looks like
diligence, which is why the rule is absolute rather than a matter of taste. The
graph is only allowed to say what the outcome as written implies; disagreement
belongs in prose, where a human can see it and overrule it.

**Why "create nothing further" is allowed in one case.** A contradiction that
decides which members exist means there is no coherent forest to write yet. The
forest stays inert because it was never completed, not because a hidden gate was
added — an observable difference for anyone reading the tracker, and the reason
the run must say so in one paragraph.

**Why dissent is raised once.** If the human answers the objection and restates the
instruction, that is the decision. Repeating a settled objection every run is
noise, and noise is what trains a human to skim — which costs them the objections
that were not settled.

## The worked example

Kept deliberately: for a small local model a worked example buys more correctness
per token than any paragraph of rules, because it shows shape rather than
properties. The commentary was cut to one line per lesson; the reasoning behind
each is the sections above. The lessons it exists to teach, in order: parallel
work stays parallel and edges come from consequences; one sentence plus its echo
justifies a set issue; a judgment not to create a set still belongs in the report;
a human's own task is placed, not derived, and is not a set issue; and a flaw in
the instruction is argued in prose rather than engineered into the graph.

## The phases

**Why Phase 1 is read-only and enumerates both directions.** Membership is one
edge, stored in one direction but readable in both, and hand-built forests are
inconsistent about which end got written. Enumerating both directions is the
difference between seeing the forest and seeing half of it. The check for an
in-flight pull request is a *report*, never a repair: stopping work before commissioning
is the gate's job and the implementer's authority, and an agent that works around
another agent's breach ends up owning a policy it does not control.

**Why delete-and-recreate is not the default.** Replacing an issue destroys the
discussion on it, including the operator's own clarifications — which are
instruction — and burns issue numbers for no reason. It is legitimate only as a
degenerate case when the delta is large.

**Why "write it as if for a stranger".** Because the stranger is literal: the next
agent to touch that member may be a re-review or a reassignment with no context
beyond the body. Bodies that name the mechanism, the files and the verification are
the reason the forest can be curated by an agent that remembers nothing.

**Why a written manifest.** Without a materialised desired state, "validation"
degrades into the run agreeing with itself. The file is what Phase 5 asserts
against, and the `rationale` column is what makes the report auditable a month
later.

**Why the apply order is creates → edits → edges → deletes.** Edges need both ends
to exist; a set issue must exist before anything is blocked by it; and deletes go
last so a mistaken delete can still be checked against something that is present.

**Why never to give the tracker outbound edges.** It blocks everything and waits
for the outcome; an outbound edge from it creates a cycle, which most trackers
reject with an unhelpful HTTP 500 and an empty body.

**Why two failures end the run.** An agent that improvises a mechanism after two
refused writes is choosing a different system, and the discrepancy it hides is
exactly what Phase 5 exists to report.

**Why dissent is the first line of a report, and linked rather than repeated.** A
human who commissions a forest without seeing the objection has been failed twice: once
by the idea, once by the ordering. Linking rather than repeating keeps one copy.

## Defects

**Why the defects are enumerated rather than left to judgement.** "Report anything
that looks wrong" is unverifiable: it lets a run describe its own unfinished work
as a defect and stay silent about a real one. The list makes the boundary — *mine
to fix* versus *not mine to fix* — checkable by the model and auditable by the
operator. The failure mode it is guarding against is **repair**: an agent that
edits the graph until the symptom disappears. Creating a second tracker because
the first is ambiguous, or closing a member whose repository is out of the
engine's remit, both make the evidence vanish. That is why the section says
"never make a defect disappear by editing the graph" before it lists a single
defect.

**Why two of them stop the run and three do not.** A defect that prevents you
identifying the forest — no resolvable root, no single tracker — means every
write would rest on a guess about which objects the graph contains, and writes
are the only thing here that can damage a forest. The other three are properties
of objects you can still describe correctly, so curation continues and the defect
travels with the report.

**Why a stop has no report.** The report lives on the tracker. A defect about the
tracker's identity removes its address, so the error channel is the only output,
and the run ends. This is also why the report's location was never made
configurable: there is always exactly one tracker, and if there is not, the run
has already stopped.

**Why defects go to a channel and not to a conversation.** The venues in §Venues
are about the *shape of the outcome*. A defect is about the *state of the
machinery* — refused writes, an object the graph cannot identify, a repository the
engine was never told to look at. A human reading it could do nothing with it:
widening the engine's remit, adding a label, installing a missing prompt are all
operator acts. So the defect goes to whoever can act, and one line rides along in
the tracker's report so the record stays complete.

**Why the channel is named in the preamble, not the template.** The public prompt
says "the error channel your instructions name". The private preamble names the
actual room. Splitting it that way keeps the public prompt free of infrastructure,
and means changing where errors go touches the deployment, never the rules. It
also inherits the shape of the fan-out cap rule: the template states the discipline,
the site states the number or the place.

**Why a standing defect is raised on every run, not once.** A defect is fixed by
an operator, not by the forest, and the report is addressed to the human. Once the
record exists it *reads* settled — one comment per run, replacing the last — so a
defect that survives several runs looks, from the tracker, like a state everyone
has accepted. Repetition on the channel is the only notice that survives
inattention, and it is safe for a reason comments are not: posting there moves no
`updated_at`, records no revision and dispatches nothing, so it cannot start the
loop that makes comment discipline so tight elsewhere. The bound is the defect
itself — it ends when the write stops failing, the missing label appears, or the
repository joins the engine's remit — and a run that finds nothing wrong posts
nothing there. The cost accepted is a message every sweep for as long as a defect
stands. That is the cheaper failure: the alternative is one message, delivered at
whatever moment nobody was reading.

**Why silence must not absorb a defect.** `decompose` is dispatched on every
sweep, changed or not, and the preamble makes an empty delta's silence that run's
acceptance test. Silence is therefore the most rehearsed output this role has.
A defect found on a run with nothing else to do is the one moment the model must
break the pattern it has just been told is correct — which is why the rule is
stated twice, once in §Defects and once in §Loop-breakers.

## Loop-breakers

Every comment this role writes is a revision, and every revision is a dispatch.
Four amplifying loops are known, and each rule here closes one:

- meta-work reported on the ideation issue re-triggers the run there (limit 5);
- an unanswered question answered by another comment from the same agent (the
  identity check — recognise your own comment, post nothing);
- a trouble mirrored onto a member every run, which dispatches whoever reads it,
  who mirrors it again;
- a report on an empty delta, which is noise that buries the reports that matter.

The loop-breakers sit last in the prompt on purpose: they are the rules that must
be freshest at the moment of writing.

Silence after a question is the correct state, not a stalled one — and an empty
delta is not the same as nothing to say. A no-op run can legitimately have a
question; the question goes to the venue, the report stays silent.
