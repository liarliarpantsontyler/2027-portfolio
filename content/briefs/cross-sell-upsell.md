# PROJECT BRIEF

## Project

Oats Overnight Cross-sell + Upsell System

## Working title

**Turning subscription management into a revenue channel**

## Core story

Most Oats Overnight members did not open the app to shop.

Roughly 70% of logged-in users took no measurable action, while most of the remaining activity centered around managing an existing subscription.

People behaved more like they were checking a banking app than browsing an ecommerce store.

A relatively simple request to increase pack size became a larger design problem:

**How do we create new revenue from an existing customer base that rarely comes here intending to buy something?**

I designed a system that introduced relevant cross-sell and upsell opportunities into the behaviors customers were already performing, turning subscription management into a new growth surface.

---

# HERO

## Headline

**Turning subscription management into a revenue channel**

## Intro

Oats Overnight had hundreds of thousands of active subscriptions, but its logged-in experience wasn't naturally a shopping destination.

I designed a cross-sell and upsell system that introduced relevant purchase opportunities into existing customer behavior instead of waiting for customers to go looking for them.

## Hero metrics

Use up to three:

**~70%**
of logged-in users took no measurable action

**+$[NEED: incremental revenue estimate]**
estimated incremental revenue since launch

**[NEED: conversion / attach / upgrade metric]**
from eligible offers

## Role

Product Design / Growth Design

## Year

2026

## Hero visual

Show several parts of the system together rather than one isolated screen.

Ideally include:

* pack-size upsell
* cross-sell / QuickSell offer
* subscription-management context
* final upgraded state

The hero should immediately communicate that this is a **system**, not one modal.

---

# THE PROBLEM

## The app wasn't really a store

Customers were already logging into Oats Overnight regularly.

The problem was what happened once they got there.

Approximately **70% of logged-in users took no measurable action**.

Most of the remaining behavior centered around practical subscription tasks:

* checking an upcoming order
* changing a subscription
* adjusting flavors
* changing quantity
* skipping or managing delivery

Very little of the experience encouraged customers to discover or purchase something additional.

### Large statement

**People used the app more like a banking app than an ecommerce store.**

They came in with a specific task, checked or changed something, and left.

That meant simply adding a Shop tab or waiting for customers to browse wasn't likely to create much new revenue.

---

# THE ORIGINAL ASK

The work started much smaller.

The business wanted to encourage customers to move into larger subscription sizes.

What could have been treated as:

**"Add an upsell."**

became:

**"How should Oats systematically create additional revenue from an existing subscriber throughout their relationship with us?"**

That changed the project from an isolated feature into a growth system.

---

# THE INSIGHT

## Shopping intent wasn't something we could assume.

Customers already had strong behaviors inside the product.

Instead of trying to manufacture an entirely new shopping habit, I could introduce relevant offers inside the behaviors that already existed.

### Large statement

**If customers weren't naturally going shopping, commerce had to meet them where they already were.**

This meant deliberately introducing interruptions into otherwise utilitarian flows.

---

# THE PRODUCT TENSION

Good UX often tries to remove interruptions.

Here, interruption was part of the strategy.

If a customer entered the app to check their next shipment and could complete that task without ever encountering another product or subscription option, the experience worked perfectly for the customer but left a major business opportunity untouched.

The design problem became:

**Where can we interrupt an existing task with a relevant offer without making the core experience feel harder to use?**

The goal wasn't maximum interruption.

It was finding moments where the commercial opportunity made sense in context.

---

# THE STRATEGY

I designed around three principles.

### 1. Meet existing behavior

Put offers inside or adjacent to high-frequency subscription behaviors instead of depending on customers entering a dedicated store.

### 2. Make the next step obvious

Don't show every possible option.

Show the most relevant step up from the customer's current state.

Example:

8 → 16
16 → 24
24 → 32

The customer should understand:

**"Here's what I have. Here's the logical next step. Here's what I get for moving up."**

### 3. Build a system, not a campaign

Offers should respond to customer context rather than being hardcoded promotional banners.

The system should eventually be able to consider:

* current subscription
* pack size
* products owned
* products never tried
* flavor history
* customer tenure
* current order
* inventory
* active promotions
* previous offer exposure
* previous offer response

This creates infrastructure that can support future growth ideas without redesigning the product every time.

---

# HOW THE SYSTEM WORKS

Create a simple visual diagram:

**Customer context**

Current products
Subscription size
Order state
Behavior
History

↓

**Eligibility**

What could this customer meaningfully buy or upgrade?

↓

**Priority**

Which opportunity is most valuable and relevant right now?

↓

**Placement**

Where should the offer appear in the customer's existing journey?

↓

**Offer**

Upgrade
Add-on
Cross-sell
Trial

↓

**Action**

Add to next order
Upgrade subscription
Try product
Dismiss

↓

**Measurement**

Exposure
Acceptance
Incremental revenue
Future behavior

The diagram should make the project feel like a growth engine rather than a collection of UI screens.

---

# EXPERIENCE 01

## Creating a pack-size ladder

One of the first opportunities was subscription size.

Rather than treating every pack size as equally important, I designed the experience around progression.

**8 → 16 → 24 → 32**

The interface distinguishes between:

* what the customer currently has
* the next logical upgrade
* the additional product they receive
* the incremental price
* any improvement in per-meal economics

The goal is to reduce the decision from:

**"Which subscription should I choose?"**

to:

**"Is the next step worth it?"**

### Visuals

Show:

* complete pack ladder
* current-state treatment
* recommended next step
* expanded state / upgrade confirmation

---

# EXPERIENCE 02

## Turning a 16-pack into a 24-pack opportunity

A customer already subscribed to 16 meals has demonstrated significantly more commitment than a first-time shopper.

That creates a different upsell opportunity.

Instead of showing another generic subscription promotion, the experience can frame the upgrade incrementally:

**Get 8 more meals for $X more**

rather than asking the customer to reconsider their entire subscription.

Show the 16 → 24 experience prominently.

### Explain

The design keeps the customer's existing choice as the anchor and presents the upgrade as a small step forward.

[NEED: exact messaging used in production]

[NEED: acceptance / conversion data]

---

# EXPERIENCE 03

## The 8-pack modal

Show the 8-pack upsell / modal experience.

Explain:

* what causes it to appear
* which customers are eligible
* why this particular moment was chosen
* what happens after acceptance
* what happens after dismissal

Do not present this as an isolated modal.

Place it within the larger system diagram so the reader understands **why this customer saw this offer at this moment.**

[NEED: exact trigger]

[NEED: screenshots / video]

[NEED: measured result]

---

# EXPERIENCE 04

## Cross-selling another product

Pack size isn't the only way an existing subscriber can become more valuable.

The same system can support product cross-sells, including introducing Protein Coffee or another relevant product to an Oats subscriber.

The important shift is from:

**"Here's another thing we sell."**

to:

**"Here's something relevant to what we already know about you."**

Potential inputs include:

* existing products
* flavor preferences
* purchase history
* upcoming order
* ratings
* tenure

Show the strongest production example available.

[NEED: identify final production example]

[NEED: cross-sell conversion / attach data]

---

# OPTIONAL SYSTEM EXAMPLE

## One slot, multiple business opportunities

If the live implementation uses the QuickSell system, show how a single high-value placement may have multiple competing offers.

Potential examples:

* pack upgrade
* additional product
* Protein Coffee
* sampling / smaller pack
* other active growth initiatives

The interesting design problem becomes:

**Which offer deserves the slot for this specific customer?**

Show the prioritization logic if this is representative of the shipped product.

[VERIFY: include only if this reflects production behavior]

This can become one of the strongest examples of the difference between designing a banner and designing a system.

---

# KEY DECISION

## Interrupting customers intentionally

### Observation

Customers had little organic shopping behavior inside the logged-in experience.

### Decision

Place commerce opportunities directly inside high-frequency customer journeys.

### Why

A perfectly unobtrusive experience would preserve the existing behavior: customers would complete their task and leave.

Introducing a relevant offer creates some additional friction, but also creates a commercial opportunity that otherwise barely exists.

### Principle

**The goal wasn't zero friction. It was productive friction.**

The offer needed to be relevant enough that the business value justified the interruption.

---

# KEY DECISION

## Show the next step, not the whole catalog

### Observation

Large choice sets make an upsell feel like another shopping task.

### Decision

Anchor the experience around the customer's current subscription and highlight the next logical step.

### Why

The customer is already committed to their current purchase.

The easiest decision is therefore incremental:

**"Do I want a little more?"**

instead of:

**"What should I buy?"**

---

# IMPACT

## Primary result

**+$[NEED] estimated incremental revenue**

generated during approximately the first five months after launch.

Do not invent this number.

Calculate it from production data before publishing.

---

# REVENUE ESTIMATION

Use the strongest data available.

Preferred calculation:

**Eligible offer exposures**

×

**incremental conversion attributable to the experience**

×

**incremental revenue per accepted offer**

=

**estimated incremental revenue**

Where possible, compare against:

* control group
* pre-launch baseline
* customers not exposed
* equivalent behavior before the feature existed

If clean incrementality isn't available, explicitly label the number as **estimated influenced revenue** or **revenue associated with the experience** rather than claiming causal incrementality.

Show the methodology briefly in the case study.

---

# SECONDARY IMPACT

Include any available metrics for:

* offer acceptance
* pack upgrade rate
* cross-sell attach rate
* additional units sold
* AOV increase
* revenue per exposed user
* percentage of upgraded subscriptions
* downstream retention / LTV
* dismissal rate

[NEED: production metrics]

---

# WHAT THIS BECAME

What started as a request to increase subscription size became a reusable way to think about growth inside the logged-in Oats experience.

Instead of treating ecommerce as a separate destination, the system makes commerce part of the customer lifecycle.

The same framework can eventually connect:

**subscription behavior → product discovery → ratings → flavor preferences → loyalty → personalized recommendations**

That creates a much larger opportunity than any individual upsell.

---

# WHAT HAPPENED NEXT

The system opened the door to increasingly contextual growth experiences:

* smarter pack-size recommendations
* product cross-sells
* add-to-next-order experiences
* flavor-driven recommendations
* ratings-informed recommendations
* loyalty incentives
* personalized discovery

Use only examples that actually shipped or clearly label future concepts as future work.

---

# RELATED WORK

Link to:

**Ratings & Notes**
Using structured customer feedback to understand individual taste and improve products.

**Loyalty & Rewards**
Rewarding behaviors that create value for both the customer and Oats Overnight.

**Survey / FID**
Turning customer research into something people actively want to participate in.

Eventually:

**Oontelligence**
Connecting these signals into a larger flavor intelligence system.

---

# ASSETS NEEDED BEFORE FINAL POLISH

Collect:

* current app/dashboard overview
* pack-size ladder
* 16 → 24 upsell
* 8-pack modal
* strongest product cross-sell
* accepted/upgraded states
* mobile versions
* short interaction recordings where useful
* any experiment/control variants
* relevant analytics screenshots for internal reference

Analytics screenshots do not necessarily need to appear publicly.

They can be used to build clean portfolio-specific visualizations instead.

---

# DATA NEEDED

Before publishing, fill in:

* [NEED: exact launch date]
* [NEED: source / precise definition for ~70% no measurable action]
* [NEED: breakdown of remaining subscription-management behavior]
* [NEED: total eligible offer exposures]
* [NEED: acceptance / conversion]
* [NEED: average incremental order value]
* [NEED: estimated incremental revenue]
* [NEED: pack upgrade numbers]
* [NEED: cross-sell performance]
* [NEED: any guardrail metrics such as retention, cancellation or negative behavior]

Do not delay building the page while these are gathered.

Use clearly marked placeholders until the final numbers are available.

---

# IMPORTANT STORY GUARDRAILS

This case study is **not**:

"Here are some upsell screens I designed."

It is:

**"I recognized that Oats had a large captive audience with very little organic shopping intent, then turned isolated upsell requests into a system for creating incremental revenue inside existing customer behavior."**

Keep returning to that story.

The strongest thing about the project is the shift from:

**feature → behavior → system → revenue.**
