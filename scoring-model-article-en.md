# How to Evaluate a Stock? A Scoring Model Explained in Plain English

## Where does this model come from?

The model is based on the teachings of [Tomasz Trela's Investment University](https://www.uniwersytet-inwestycyjny.pl/) (Uniwersytet Inwestycyjny) – a course that teaches investing the way professionals managing large funds do it. It draws on the **[CFA](https://www.cfainstitute.org/)** program – an international qualification for financial analysts that is widely regarded as the gold standard in the industry. Tomasz Trela also runs an excellent [YouTube channel](https://www.youtube.com/@TomaszTrading) about investing – a great place to get to know his approach for free before deciding on the course.

Instead of chasing "hot tips" or guessing from charts, this approach asks three simple questions about every company:

1. **Is the company growing?**
2. **Are its shares cheap or expensive?**
3. **Is the company safe – will it stay in business?**

The scoring model is a way to answer these questions with numbers. It is implemented in the Scrab platform.

## How does it work? The school analogy

Think of a school report card. A student gets grades in several subjects, and then an average is calculated – but a weighted one, because maths counts for more than art.

The scoring model works the same way:
- **"Subjects"** are financial indicators (e.g. "how much did revenue grow over 5 years").
- **"Grade"** is the number of points a company gets for a given indicator.
- **"Subject weight"** tells you how much each indicator counts towards the final result.
- **Final score** is the sum of all points. The higher it is, the better the company according to the model.

This makes it possible to quickly compare hundreds of companies and pick the best ones – instead of reading hundreds of reports.

## Where does the grade come from? The purpose of grading scales

How do you turn "revenue grew by 80%" into a grade? This is where **grading scales** come in.

For every indicator, two thresholds are set – "poor" and "excellent". For example, for 5-year revenue growth the scale is **50–250%**:

- Growth of **50% or less** → 0 points ("poor, doesn't count")
- Growth of **250% or more** → maximum points ("excellent, no need for more")
- Growth of **150%** → roughly half the points (proportionally)

It's like percentage thresholds at school: below 50% you fail, above 90% you get an A, and in between the grade goes up gradually.

Why do it this way?

- **So that different things can be added together.** Percentages, multiples and probabilities are different "units" – the scale converts them all into points that can be summed.
- **So that mediocrity isn't rewarded.** A company that grew 10% gets the same as one that shrank – zero. The model looks for genuinely good companies, not "okay" ones.
- **So that one record-breaking number doesn't hide everything else.** A company that grew 1000% gets the same as one that grew 250% – the maximum. This way a single spectacular result can't mask, say, a risk of bankruptcy.

For some indicators "lower = better" (e.g. bankruptcy risk) – in that case the scale works in reverse.

## The three pillars of the model

![The three pillars of the scoring model: Growth, Valuation, Fundamentals](assets/three-pillars-en.png)

### 1. Growth – weight 40 points

**Question: is the company really growing?**

The model looks backwards (what the company achieved over the last 5 years) and forwards (what analysts expect over the next 2 years). It checks three things: **revenue** (how much the company sells), **earnings per share** (how much it earns per single share) and **cash from operations** (how much real money actually comes in).

Why does cash carry the most weight? Because accounting profit can be "tweaked" with various tricks, but cash in the bank cannot. If a company says it's making money but cash isn't piling up, something is wrong.

These are the indicators that make up this pillar:

- **Cash from Ops TTM 5y** (10 pts, scale 100–350%) – how much cash from day-to-day operations grew over 5 years. The most important growth indicator.
- **Return on Invested Capital** (5 pts, scale 10–30) – how much the company earns for every dollar invested in it. Think of it as the "interest rate" the business pays. 10% is decent, 30% is excellent.
- **Cash Average Estimates 2fy** (5 pts, scale 5–40) – how much analysts expect cash flow to grow over the next 2 years.
- **EPS TTM 5y** (7.5 pts, scale 35–200%) – how much earnings per share grew over 5 years.
- **EPS Average Estimate 2y** (2.5 pts, scale 5–30) – how much analysts expect earnings per share to grow over the next 2 years.
- **Revenue Average Estimate 2FY** (5 pts, scale 5–20) – how much analysts expect revenue to grow over the next 2 years.
- **Revenue TTM 5y** (5 pts, scale 50–250%) – how much revenue grew over 5 years.

Note that the thresholds are high. The model isn't looking for companies that "grow somewhat" – it's looking for those that grow fast.

### 2. Valuation – weight 50 points

**Question: are the shares too expensive?**

Even a great company can be a bad investment if you overpay. It's like buying a flat: beautiful and well located, but at three times the market price – a bad deal.

The first three indicators are **multiples** – they tell you how many dollars you pay for every dollar the company generates. The lower the multiple, the cheaper the stock. The indicators in this pillar:

- **P/S** (5 pts) – price to sales. How much you pay for every dollar of the company's revenue.
- **EV/EBITDA** (5 pts) – the value of the whole company (including its debt) relative to profit from its core business. Better than P/S because it accounts for debt – a heavily indebted company is "more expensive" than it looks.
- **P/CFO** (5 pts) – price to cash from operations. How much you pay for every dollar of real cash the company produces.

The next two indicators are based on **price targets** – that is, what professional analysts think the share should be worth in a year:

- **Upside** (15 pts) – by what percentage the price target exceeds the current price. If a share costs $100 and analysts say "it should be worth $130", the upside is 30%. The bigger, the more potential gain.
- **Price Target** (20 pts, scale -10% – 0%) – whether the share trades below the price target. If it costs **more** than analysts consider fair – it gets 0 points. That's a warning sign: "the market has already priced in all the good news".

Together, 35 of the 50 points depend on analyst opinions – the model treats their consensus as an important reference point.

Analysts can be wrong, of course. But they usually specialise in a single sector for years and know it far better than an individual investor ever could. We should not follow them blindly – yet their consensus is a credible signal and deserves a place in the assessment.

### 3. Fundamentals – weight 45 points

**Question: will the company stay in business?**

This is the safety pillar. You can find a fast-growing, cheap company, but if it goes bankrupt next year, you lose everything.

Instead of checking dozens of debt ratios, the model uses two ready-made "bankruptcy tests", developed by academics based on thousands of companies that actually failed or survived. Each test takes a handful of numbers from the financial statements (debt, profits, liquidity, size) and calculates a single risk score. The indicators in this pillar:

- **Ohlson default probability** (25 pts, scale 2 → 0) – the Ohlson test. The lower the value, the lower the risk of bankruptcy. Here "lower = better", so the scale is reversed: 2 is poor, 0 is excellent.
- **Altman default probability** (20 pts, scale 1.25–3.00) – the Altman test (the so-called Z-score), the best-known indicator of this kind, in use since the 1960s. Values below about 1.8 mean the "distress zone", above about 3 the "safe zone". The model's scale covers exactly this transition.

Why does this pillar carry as many as 45 points? Because investing follows one rule: **first don't lose, then make money**.

## How does it work in practice? The Scrab platform

Calculating all these indicators by hand for hundreds of companies would be impossible. This is where the **[Scrab](https://scrab.com/)** platform comes in: it scans companies listed on stock exchanges all over the world and applies our scoring model to each of them. The result is a ready-made ranking – a list of companies that, according to the model, have the greatest potential.

What's more, the system pulls fresh data **every day**, recalculates all indicators and shows a new score. The ranking is alive – a company that was in the top ten yesterday may drop to twentieth place today, because, say, the share price rose and the Upside shrank, or analysts cut their forecasts.

This of course **does not mean you have to sell a stock right away** when it drops a few places in the ranking. Daily fluctuations are normal, and the ranking is mainly there to find candidates for your portfolio and to monitor whether anything worrying is happening – not for nervous trading.

You don't have to use Scrab, of course. It is simply the platform where this model is available out of the box, but other tools on the market offer similar screening features – what matters is the method, not the brand.

## Numbers aren't everything

A high ranking score is an invitation to do more work, not a ready-made decision. The model tells you **what** the numbers show – but not **why**. That's why, on top of the scoring, you need **qualitative analysis** (sometimes called "soft" analysis): understanding how the industry the company operates in is developing, how the company makes money, and what protects it from competitors. Indicators describe the past (financial statements) and forecasts (analysts), but both sources react with a delay – before a new competitor, a regulatory change or the loss of a key contract shows up in revenue and margins, several quarters may pass, even if the event itself was known immediately. The ranking tells you **where to look** – qualitative analysis helps you decide **whether to buy**.

## Summary

At its core, the scoring model is a professional analyst's checklist turned into points:

| Pillar | Question | Weight |
|---|---|---|
| Growth | Is the company growing? | 40 |
| Valuation | Is the price reasonable? | 50 |
| Fundamentals | Is the company safe? | 45 |

We're looking for companies that **grow fast, are reasonably priced and are not at risk of bankruptcy**. No single pillar is enough on its own:

- A fast-growing company at an absurd price → high Growth, but low Valuation.
- A cheap company on the brink of collapse → high Valuation, but low Fundamentals.
- A safe, cheap company that has been standing still for years → low Growth points.

Only a company that does well across all three pillars gets a high final score. This balance – rather than a single "magic indicator" – is the essence of the CFA approach on which the Investment University is built.

How and when to rebalance your portfolio based on the ranking – in the next article.
