1.1 Design Philosophy
Clean, data-dense, and trustworthy. This is a professional operations tool — not a consumer app. Every pixel earns its place. The person using this is making decisions that affect real customers and real revenue. The design must communicate clarity, confidence, and control.
Aesthetic direction: Modern enterprise — think Linear, Notion, and Vercel's dashboard combined. Dark sidebar, clean white content area, sharp typography, purposeful color only where it signals something meaningful.
1.2 Color Tokens
--navy:           #1B2A4A   primary brand, sidebar, headers
--navy-deep:      #0F1B30   sidebar background, persona bar
--teal:           #006D77   primary CTA, active states, agent indicators
--teal-light:     #E8F4F5   teal surface, hover backgrounds
--teal-mid:       #004D55   teal hover state

--critical:       #C0392B   score 91–100, danger
--critical-light: #FADBD8   critical fills
--high:           #D35400   score 71–90, warning
--high-light:     #FDEBD0   high fills
--medium:         #D4AC0D   score 40–70
--medium-light:   #FEF9E7   medium fills
--low:            #1A6B3C   score below 40, success
--low-light:      #D5F0E0   low fills

--ai-purple:      #7C3AED   AI insight accent
--ai-purple-light:#F3E8FF   AI insight background

--white:          #FFFFFF
--off-white:      #F5F7FA   page background
--gray-1:         #F0F2F5   card backgrounds, table alt rows
--gray-2:         #D0D5DD   borders, dividers
--gray-3:         #8896A7   secondary text, metadata
--black:          #1A1A2E   primary body text

--ga-orange:      #E37400   GA4 system tag
--salesforce:     #00A1E0   Salesforce system tag
--shopify:        #96BF48   Shopify system tag
--yotpo:          #FF4438   Yotpo system tag
--klaviyo:        #F9E04B   Klaviyo system tag
--zendesk:        #03363D   Zendesk system tag
1.3 Typography
Display:      IBM Plex Sans Bold     48px / 56px
H1:           IBM Plex Sans SemiBold 32px / 40px
H2:           IBM Plex Sans SemiBold 24px / 32px
H3:           IBM Plex Sans Medium   18px / 26px
Body large:   IBM Plex Sans Regular  16px / 24px
Body:         IBM Plex Sans Regular  14px / 22px
Body small:   IBM Plex Sans Regular  13px / 20px
Label:        IBM Plex Sans Medium   12px / 16px — UPPERCASE + 0.5px spacing
Score:        IBM Plex Mono Bold     all numbers, scores, KPIs
Code/Ref:     IBM Plex Mono Regular  13px — system citations, technical refs
1.4 Spacing / Radius / Shadow
Spacing:   4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80px
Radius:    Button=8px  Card=12px  Modal=16px  Tag=100px  Input=8px
Shadow L1: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)
Shadow L2: 0 4px 16px rgba(0,0,0,0.12)
Shadow L3: 0 20px 48px rgba(0,0,0,0.18)
1.5 Core Components
Score Badge:
CRITICAL: bg=critical-light  text=critical  border-left=4px critical  IBM Plex Mono Bold 18px
HIGH:     bg=high-light      text=high      border-left=4px high
MEDIUM:   bg=medium-light    text=medium    border-left=4px medium
LOW:      bg=low-light       text=low       border-left=4px low
Shape: pill, padding 6px 12px
System Tag:
Small pill per system — coloured tint background
Salesforce / Shopify / Yotpo / Klaviyo / Zendesk / GA4
IBM Plex Mono Regular 11px
AI Insight Tag:
bg=ai-purple-light  text=ai-purple  border=1px ai-purple (20% opacity)
✨ sparkle icon + "AI Insight" label  12px Medium
Appears on every agent-generated block
Why GA Tag (new — technical context tag):
bg=#FFF7ED  text=#92400E  border=1px #FDE68A
⚡ "Why GA #1" — explains the 14-day mechanism
Shows on any screen referencing GA as primary trigger
Buttons:
Primary:    bg=teal      text=white   hover=teal-mid   h=40px  radius=8px  px=20px
Secondary:  bg=white     text=navy    border=gray-2    hover=gray-1
Danger:     bg=critical  text=white
Ghost:      transparent  text=teal    underline hover
Icon btn:   36×36px      bg=gray-1    radius=8px
Table:
Header:   bg=navy  text=white  14px Medium  h=44px
Odd row:  bg=white
Even row: bg=gray-1
Hover:    bg=teal-light  cursor=pointer
Border:   1px gray-2 bottom only
Cell padding: 12px 16px
Input / Search:
h=40px  border=1px gray-2  radius=8px  focus=teal border
Placeholder: gray-3  Label above: 12px uppercase gray-3
Accordion:
Header: h=52px  bg=gray-1  hover=teal-light  chevron right
Expanded: bg=white  border=1px gray-2  border-top=none
Smooth 200ms expand/collapse

2. STICKY LAYOUT SYSTEM
Three fixed zones — every screen:
┌──────────────────────────────────────────────────────────┐
│  TOP NAV — 64px — sticky top:0 — z-index:999             │
│  bg=navy — never scrolls — always visible                 │
├────────────────┬─────────────────────────────────────────┤
│                │                                          │
│  LEFT SIDEBAR  │   CONTENT AREA                          │
│  240px wide    │   overflow-y: auto                      │
│  bg=#0F1B30    │   padding: 32px                         │
│  sticky        │   This is the ONLY zone that scrolls    │
│  top: 64px     │                                         │
│  height:       │                                         │
│  calc(100vh    │                                         │
│  - 64px)       │                                         │
│  overflow-y:   │                                         │
│  auto          │                                         │
└────────────────┴─────────────────────────────────────────┘
Top Nav contents:
Left:   Apex Retail logo (white wordmark) + divider + "Retention Ops" label (teal, 13px)
Center: Global search bar — "Search customers, briefs, campaigns..." (400px wide)
Right:  [🔔 Bell] (red dot badge with count)
        [⚡ Agent Status] green pulsing dot + "Live"
        [Avatar] Jordan — Retention Ops Lead + chevron

3. LEFT SIDEBAR — NAVIGATION
bg=#0F1B30  width=240px  padding=16px

TOP SECTION — logo repeat + role chip
[Apex] [Retention Ops Lead chip — teal]

─────────────────────────────────

MAIN NAV (section label: "OVERVIEW" — gray-3 10px uppercase)

🏠  Global Dashboard          ← home, always first
📊  Performance               ← KPI trends, before/after

─────────────────────────────────

SECTION LABEL: "OPERATIONS"

✅  Approval Queue            [badge: pending count — red pill]
👥  Customer List
⏱   Customer Timeline
🤖  Agent Activity Log        ← NEW — every agent action

─────────────────────────────────

SECTION LABEL: "CAMPAIGNS"

📅  Campaign Manager
🎁  Offer Library
🧪  A/B Test Results

─────────────────────────────────

SECTION LABEL: "CONFIGURATION"

⚙️  Automation & Guardrails
📐  Rules Engine
🛡   Guardrail Settings

─────────────────────────────────

SECTION LABEL: "REPORTING"

📈  Segment Dashboard
📋  Weekly Review
📤  Export & Reports

─────────────────────────────────

BOTTOM (pinned)
❓  Help
⚙️  Settings
[Avatar] Jordan  Retention Ops Lead
Active item: bg=teal 15% opacity, border-left=3px teal, text=white
Inactive: text=gray-3, hover=white 200ms
Section labels: gray-3, 10px, uppercase, letter-spacing 1px

4. GLOBAL DASHBOARD
Screen 01: Global Dashboard
Page header:
H1: "Good morning, Jordan."
Subtitle: "Here is where things stand right now."
Right: [Last 30 days ∨] date range + [Export] button
       + ⚡ Agent Live indicator (pulsing green dot)

ROW 1 — 6 KPI STAT TILES (full width, equal columns)
Each tile design:
bg=white  border=1px gray-2  radius=12px  padding=24px  shadow L1
Top: metric label (gray-3, 12px uppercase)
Middle: value (IBM Plex Mono Bold, 40px, navy)
Below value: vs target (green ↑ or red ↓) + target label
Bottom: 7-day sparkline (60px wide, teal line)
Hover: shadow L2, border=teal
Click: opens KPI detail page
Tile 1          Tile 2              Tile 3
Annual Churn    Active At-Risk      Briefs Pending
21.4%           1,847               7
target <14% ↓   vs 3,200 last mo ↓  — needs action ⚠
[sparkline]     [sparkline]         [sparkline]

Tile 4          Tile 5              Tile 6
Launch Time     Redemption Rate     Revenue Protected
1m 47s          18%                 $1.2M
target <2min ✅  target >35% ↑       target >$7M ↑
[sparkline]     [sparkline]         [sparkline]

ROW 2 — THREE COLUMNS
Column 1 (40%) — Churn Risk Distribution
Card: bg=white  border=1px gray-2  radius=12px  padding=24px

Donut chart (200px diameter):
- CRITICAL: red segment
- HIGH: amber segment
- MEDIUM: yellow segment
- LOW: green segment
Center of donut: "6,831 total" IBM Plex Mono

4 stat rows below chart:
CRITICAL  847   12.4%  ↑ +3% vs last month  [View →]
HIGH     1,203  17.6%  ↓ –2%                [View →]
MEDIUM   2,841  41.6%  → stable             [View →]
LOW      1,940  28.4%  ↑ +5%                [View →]

"View full breakdown →" — teal link bottom
Column 2 (35%) — Agent Activity Feed
Card: same styling

Header: "Agent Activity" + "Last 24 hours" (gray-3)
+ "View all →" link top right

Feed rows (newest first):
Time    Event                           Outcome
────────────────────────────────────────────────
2m ago  Brief approved — Sam C.        ✅ Sent
14m ago CRITICAL alert: Marcus L.      ⚠ Review
1h ago  Offer redeemed — Jenny K.      ✅ 91→22
2h ago  Override logged — Jordan       📝 Noted
3h ago  Guardrail blocked — ticket     🛡 Held
4h ago  Brief dismissed — duplicate    ✕ Logged

Each row: left icon circle + description + right outcome badge
Row hover: bg=gray-1
Row click: opens event detail side panel
Column 3 (25%) — Action Required
Card: same styling

Header: "Needs Your Attention"

4 action cards stacked (each clickable):
┌────────────────────────────────────────────┐
│ 🔴 7 Briefs Awaiting Approval              │
│ Oldest: 3h 42min ago          [Review →]  │
└────────────────────────────────────────────┘
┌────────────────────────────────────────────┐
│ ⚠ 3 CRITICAL Customers Unactioned         │
│ Scores: 91, 88, 85            [View →]    │
└────────────────────────────────────────────┘
┌────────────────────────────────────────────┐
│ 📊 Campaign #14 Results Ready              │
│ Double Points Weekend         [View →]    │
└────────────────────────────────────────────┘
┌────────────────────────────────────────────┐
│ 🛡 2 Guardrail Rules Flagged               │
│ Budget cap at 89%             [Review →]  │
└────────────────────────────────────────────┘

ROW 3 — TWO COLUMNS
Column 1 (60%) — Churn Rate Trend
Card: full height  radius=12px  padding=24px

Title: "Churn Rate — 12 Month View"

Line chart:
X axis: 12 months labels
Y axis: 0% to 35%
Line 1: Before — dashed red — flat at 28%
Line 2: After — solid teal — declining 28% → 21.4%
Line 3: Target — dotted green — 14%

Annotations on chart:
- "Agent deployed →" vertical dashed marker
- "Pilot expanded →" second marker
- Hover tooltip: exact % + date

Legend below: [─ Before] [─ After] [⋯ Target]
Column 2 (40%) — Top 5 At-Risk Right Now
Card: radius=12px  padding=24px

Title: "Highest Risk — Act Today"
Subtitle: "Composite scores above 80"

Mini table (no header, just rows):
Name + ID      Score badge    Trigger           Action
Sam Chen       [CRIT 91]      GA+Redemption     [Review Brief]
SC-00291

Marcus Lee     [CRIT 88]      AOV+Support       [Review Brief]
ML-00445

Janet Roy      [HIGH 85]      Zero Redemption   [Review Brief]
JR-00812

Kevin Patel    [HIGH 81]      Session Collapse  [Review Brief]
KP-01203

Amy Wong       [HIGH 79]      Discount Dep.     [Review Brief]
AW-00654

"View all 1,847 at-risk customers →" — teal link

ROW 4 — THREE COLUMNS
Column 1 — Offer Performance
Card: radius=12px  padding=24px

Title: "Offer Performance"

Horizontal bar chart — top 5 offers by acceptance rate:
First Redemption Guide  ████████████████  83%
Double Points Weekend   ██████████████    71%
Free Returns Upgrade    █████████████     68%
Personal Outreach       ██████████████████91%
10% Discount            ████████          44% ← paused

3 stat chips below:
Best:     First Redemption  83%
Revenue:  Double Points     $68,946
Worst:    10% Discount      44% paused

"Manage offers →" link
Column 2 — Campaign Summary
Card: radius=12px  padding=24px

Title: "Active Campaigns"

Stats row:
Active: 3    Scheduled: 2    Completed(30d): 8

Campaign rows (3):
● Double Points Weekend    Active   412 sent   38.2% open
● First Redemption Drive   Active   289 sent   44.1% open
● Exit Intent Capture      Active   1,204 sent 12.4% open

"View all campaigns →" link
Column 3 — AI Insights
Card: bg=ai-purple-light  border=1px (ai-purple 20%)  radius=12px  padding=24px

Header:
✨ "AI Insights"  — ai-purple  14px SemiBold
"Updated 12 minutes ago"  — gray-3  12px

3 insight rows (each with ✨ icon):

Insight 1:
"Session collapse accelerating in 25–34
age segment. 43 new CRITICAL customers
this week vs 28 last week."
[View Segment →]

Insight 2:
"Double Points offer performs 2× better
when sent within 24h of GA trigger
vs 72h. Tighten the send window."
[View Analysis →]

Insight 3:
"Override rate fell from 34% to 18%
in 4 weeks. Team trust is growing."
[View Overrides →]

ROW 5 — BEFORE vs AFTER (full width)
Card: bg=navy  radius=12px  padding=32px  full width

Title: "Impact — Before vs After Agentification"  white  H2

Two columns inside:

LEFT — BEFORE (manual)           RIGHT — AFTER (agent)
bg=rgba(255,255,255,0.05)        bg=rgba(0,109,119,0.2)
radius=8px  padding=24px         radius=8px  padding=24px

Churn Rate:       28%            Churn Rate:       21.4% ↓
Launch Time:      4–7 days       Launch Time:      <2 min ↓
Redemption:       0%             Redemption:       18% ↑
Personalised:     ~8%            Personalised:     82% ↑
Analyst hrs:      4–8 hrs        Analyst hrs:      <5 min ↓
Audit trail:      None           Audit trail:      100% ↑
Signal lead:      0 days         Signal lead:      +14 days ↑
Revenue tracked:  $0             Revenue tracked:  $286 avg ↑

All values: IBM Plex Mono Bold
Before values: red tint
After values: teal/green tint

5. APPROVAL QUEUE
Screen 02: Approval Queue
Page header:
H1: "Approval Queue"
Subtitle: "7 briefs awaiting your decision — sorted by churn risk"
Right: [Mark all reviewed] [Filter ∨] [Sort ∨]
Stats bar (4 tiles, compact):
🔴 CRITICAL: 3    🟠 HIGH: 4    🟡 MEDIUM: 12    ⏱ Avg wait: 2h 14m
Filter + search row:
[🔍 Search customer name or ID...]
[All ∨] [CRITICAL ∨] [HIGH ∨] [Date ∨] [Signal type ∨]

BRIEF CARD — COLLAPSED:
bg=white  border=1px gray-2  radius=12px  padding=20px  shadow L1
hover: shadow L2  border=teal

Left:    [Score badge] — CRITICAL 91
         Customer name bold 15px + ID gray-3 12px
         "3h 42m in queue" — gray-3 12px

Center:  3 signal chips:
         [⚡ GA Collapse] [🎯 Zero Redemption] [🎫 Open Ticket]
         "Double Points + Free Returns" — offer preview gray-3

Right:   [Approve ✅] [Override ✏️] [Dismiss ✕]
         [∨ expand] chevron

Border-left=4px red for CRITICAL
Border-left=4px amber for HIGH
BRIEF CARD — EXPANDED (Sam's card, pre-open):
Full detail inline — same structure as brief detail page but embedded:
Expanded card adds below the header row:

SECTION 1 — Why GA is Trigger #1
┌─────────────────────────────────────────────────────┐
│ ⚡ Why GA Session Collapse is Signal #1              │
│ bg=#FFF7ED  border-left=4px #E37400                 │
│                                                      │
│ "Salesforce returned 72/100 — healthy. It only       │
│ reads last-purchase recency. GA session data shows   │
│ behavioural intent collapse 2–3 weeks earlier.       │
│ GA is weighted at 25pts — highest single signal.     │
│ This is what creates the +14 day lead time."         │
└─────────────────────────────────────────────────────┘

SECTION 2 — Composite Score Breakdown
Horizontal segmented bar (6 segments):
GA Sessions    █████  25pts
Zero Redempt   ████   20pts
AOV Decline    ████   18pts
Email Engmt    ███    15pts
Open Ticket    ███    12pts
CRM Recency    █      1pt  ← "CRM excluded from composite"
────────────────────────────
TOTAL: 91/100  CRITICAL

SECTION 3 — Signal Evidence Table
System tag | Finding | Implication | Weight
[GA4]    Sessions –60% 30d, homepage only    25pts  🔴
[Yotpo]  420pts, 0 redeemed, 8 weeks        20pts  🔴
[Shopify] AOV –34%, 3/5 discount orders     18pts  🟠
[Klaviyo] 14 emails, 8.2% open, expiry ignored 15pts 🟠
[Zendesk] Ticket #4421 open 6 days          12pts  🟠
[Salesforce] Score 72/100 — overridden       1pt  🟢

SECTION 4 — Agent Recommendation
┌────────────────────────────────────────────────────────┐
│ ✨ AI Insight                                           │
│                                                         │
│ Recommended: Double Points Weekend + Free Returns       │
│                                                         │
│ Why not 10% discount:                                   │
│ "3 of last 5 orders used discount codes. Generic        │
│ discount would increase dependency further — margin     │
│ erodes. GPT-4o prompt explicitly forbids this          │
│ anti-pattern. Offer addresses zero-redemption signal   │
│ (highest weight after GA) instead."                    │
│                                                         │
│ Confidence: 87%  [████████████████░░░░]                 │
└────────────────────────────────────────────────────────┘

SECTION 5 — Guardrail Status
✅  No offer sent in last 7 days
⚠️  Open ticket #4421 — resolve before outreach fires
✅  Email + push opted in
✅  Budget available: $18.40 of $24 cap
✅  Quiet hours: 10:42 AM — permitted

SECTION 6 — Outreach Drafts
Tabs: [Email] [SMS] [Push]

Email tab (active):
Email preview card:
Subject: "Sam, your rewards are about to make a difference"
Body preview: 3 personalised paragraphs
"Edit draft" ghost button

SMS tab: bubble preview + char count 148/160
Push tab: phone notification mockup

FOOTER ACTION BAR (sticky bottom of expanded card):
[Escalate to DRI] ghost    [Dismiss ✕] ghost red
                           [Override ✏️] secondary
                           [✅ Approve and Send] primary large

Screen 02-Detail: Full Brief Detail Page
Breadcrumb: ← Approval Queue / Sam Chen — Brief #4821
Two-column layout:
Left (65%): full analysis
Right (35%): sticky action panel
(Same full content as expanded card above — full-page version with more breathing room)
Additional block — Why Async Parallel Reads:
┌────────────────────────────────────────────────────────┐
│ ⚡ Why This Brief Took 2 Seconds, Not 8 Hours           │
│ bg=#F0FDF4  border-left=4px teal                        │
│                                                          │
│ "All 6 systems were queried simultaneously — not        │
│ one at a time. Total data assembly: ~2 seconds of       │
│ network IO. This is the architectural decision          │
│ behind the 4–7 days → <2 min KPI. Not AI.              │
│ Parallel execution."                                    │
└────────────────────────────────────────────────────────┘

6. CUSTOMER LIST
Screen 03: Customer List
Page header:
H1: "Customer List"
Subtitle: "2,147,000 registered — 680K active in last 90 days"
Right: [Export CSV] [+ Add Filter]

SEARCH + FILTER BAR (sticky within content area):
bg=white  border-bottom=1px gray-2  padding=16px 24px
position: sticky  top: 0  z-index: 100

Row 1 — Search:
[🔍 Search by name, email, customer ID, phone number...    ] [Search]
Width: 100%  h=44px

Row 2 — Quick Filters (chip row):
[Churn Risk ∨]  [Tier ∨]  [Last Purchase ∨]
[Points Status ∨]  [Redemption ∨]  [Support Status ∨]
[Segment ∨]  [Signal Type ∨]  [More ∨]
                              [Clear All]  [Save Filter]

Row 3 — Active filter tags (appear when filters applied):
🔴 CRITICAL ×    🥇 Gold ×    🎫 Never Redeemed ×    [Clear All]
Filter dropdown — Churn Risk:
☑ CRITICAL (91–100)  847 customers
☑ HIGH (71–90)       1,203 customers
☐ MEDIUM (40–70)     2,841 customers
☐ LOW (<40)          1,940 customers
[Apply Filter]
Filter dropdown — Signal Type:
☑ GA Session Collapse
☑ Zero Redemption
☐ AOV Decline
☐ Discount Dependency
☐ Open Support Ticket
☐ Email Disengagement
[Apply Filter]
Results bar:
Showing 847 customers    [Sort: Churn Score ↓ ∨]    [Columns ∨]

CUSTOMER TABLE:
Columns:
[ ] | Customer | Tier | Score | Last Purchase | Points | Redeemed | Support | Last Offer | Action

Header: bg=navy  text=white  h=44px  sticky

Row (Sam Chen):
☐  [● red] Sam Chen          [🥇 Gold]  [CRIT 91]  47d ago  420pts  0      1 open  None    [View] [Brief]
           SC-00291
           s.chen@email.com

Row (Marcus Lee):
☐  [● amber] Marcus Lee      [🥇 Gold]  [CRIT 88]  32d ago  310pts  1      0 open  10d ago [View]
             ML-00445

Row (Janet Roy):
☐  [● amber] Janet Roy       [💎 Plat]  [HIGH 85]  21d ago  890pts  3      0 open  5d ago  [View]
             JR-00812
Row styling:

Odd: bg=white
Even: bg=gray-1
Hover: bg=teal-light cursor=pointer
CRITICAL rows: subtle red-light left border 2px
HIGH rows: subtle amber-light left border 2px

Row click: opens Customer Detail page
[Brief] button: opens pending brief directly
[View] button: opens Customer Detail page
Bulk actions (appear when rows checked):
3 selected:
[Generate Briefs]  [Add to Campaign]  [Export Selected]  [Flag for Review]  [Dismiss ×]
Pagination:
← Prev   1  2  3  ...  57   Next →    Rows per page: [15 ∨]    Showing 1–15 of 847

Screen 03-Detail: Customer Detail Page
Breadcrumb: ← Customer List / Sam Chen
Two-column layout:
Left (65%) — all detail blocks
Right (35%) — sticky action panel

PROFILE HEADER CARD:
bg=white  border=1px gray-2  radius=12px  padding=24px

Row 1:
[● Avatar 48px red]  "Sam Chen"  H1
                      #SC-00291  gray-3
                      [🥇 Gold Member]  [CRITICAL 91/100 badge]

Row 2 — 6 stat chips:
[Member 2yr]  [14 Orders]  [LTV $842]  [Last: 47d ago]
[420 pts]  [0 Redeemed]

Row 3 — actions:
[Review Brief →]  [Send Manual Message]
[Flag for Review]  [Edit Profile]

Contact info (small, gray-3):
📧 s.chen@email.com  📱 +1 (555) 012-3456
Last login: 2 days ago

AI INSIGHTS BLOCK:
bg=ai-purple-light  border=1px (ai-purple 20%)  border-left=4px ai-purple
radius=12px  padding=24px

Header: ✨ "AI Insights — Sam Chen"  ai-purple  16px SemiBold
Subheader: "Based on 6-month cohort of 2,847 similar customers"

4 insight cards (2×2 grid):

Card 1 — CHURN PREDICTION
"Matches profile of 94% of customers who churned
within 21 days. Primary driver: zero redemption
at 8 weeks + session collapse."
Confidence: 91%
Source: 6mo cohort, 2,847 customers

Card 2 — OFFER RECOMMENDATION
"Double Points has 71% acceptance for Gold +
zero redemption. Pairing with Free Returns
increases conversion 23% when ticket is open."
Confidence: 87%
Source: A/B test Oct 1–31, 134 customers

Card 3 — OPTIMAL TIMING
"Best window: Tue–Thu, 10am–2pm local time
based on historical email open patterns."
Confidence: 74%
Source: Klaviyo 6mo engagement history

Card 4 — RISK IF NO ACTION
"If no intervention in 48 hours, churn
probability increases to 96% based on
session decay curve."
Confidence: 88%
Source: GA4 session model

[Generate Retention Brief →] — teal button

COMPOSITE SCORE ACCORDION:
▼ Composite Score — 91/100 CRITICAL  [Why not CRM? ⚡]

Why GA tag shown inline:
⚡ "Salesforce returned 72/100 healthy — wrong.
GA collapse detected 14 days earlier. CRM
excluded from composite by design."

Segmented bar:
GA Sessions   █████  25pts  ← highest weighted signal
Zero Redempt  ████   20pts
AOV Decline   ████   18pts
Email Engmt   ███    15pts
Open Ticket   ███    12pts
CRM Recency   █      1pt   ← "overridden — excluded"
──────────────────────────
TOTAL: 91/100  CRITICAL

Signal evidence table:
[System tag] | Finding | Churn signal | Weight | Status

PURCHASE HISTORY ACCORDION:
▼ Purchase History — 14 orders | LTV: $842 | AOV: $68 → $34 ↓

Mini AOV line chart (8 data points, clear decline)

Table (6 recent):
Order #  Date       Amount  Discount   Status    Points
#8821    4wks ago   $34     20% off    Delivered +120pts
#8764    6wks ago   $38     15% off    Delivered +180pts
#8501    2mo ago    $41     10% off    Delivered +120pts
#8102    3mo ago    $62     None       Delivered +186pts
#7802    4mo ago    $59     None       Delivered +177pts
#7491    6mo ago    $68     None       Delivered +204pts

⚠ Amber warning row:
"3 of last 5 orders used discount codes
— discount dependency flag active.
Agent has blocked generic discount offers."

[View all 14 orders →]

LOYALTY ACTIVITY ACCORDION:
▼ Loyalty Activity | 420pts accrued | 0 redeemed | ⚠ Zero redemption at 8 weeks

Stats row:
Enrolled: 8 weeks ago    Points: 420    Redeemed: 0 🔴
Value: $21.00             Expiry: Dec 31, 2024 ⚠

Points history:
+120pts  Order #8821   4wks ago
+180pts  Order #8764   6wks ago
+120pts  Order #8501   2mo ago
─────────────────────────────────────
ZERO REDEMPTIONS SINCE ENROLMENT  ← amber row
"This is the highest-weight loyalty signal
after GA. Agent weighted at 20pts."

EMAIL ENGAGEMENT ACCORDION:
▼ Email & SMS Engagement | Open rate 8.2% | ⚠ Below 10% threshold

Stats:
Sent (8wks): 14    Open rate: 8.2% 🔴 (avg 22%)
Click rate: 0.4%   Last opened: 6wks ago
SMS opt-in: ✅     Push opt-in: ✅

Last 8 campaigns bar chart:
Each bar = campaign, split open/not-open
Clear visual decline over time

SUPPORT HISTORY ACCORDION:
▼ Support History | 2 tickets | ⚠ 1 open — 6 days unresolved

Table:
#4421   3d ago   Returns    OPEN 🔴   3 days   Unassigned
#3891   6wk ago  Points     Resolved  6 days   Support Team

Ticket #4421 inline expanded:
Subject: Return request — Order #8821
Status: ⚠ Unresolved — 3 days
"Guardrail active — outreach held until resolved"
[Resolve Ticket]  [Assign Agent]  [View in Zendesk →]

WEB BEHAVIOUR ACCORDION:
▼ Web Behaviour | Sessions –60% in 30 days | 🔴 GA Collapse trigger active

Stats:
Sessions (30d): 8    was 21 — down 62% 🔴
Sessions (7d): 1     Last session: 2 days ago
Pages/session: 1.2   Product pages: 0 in last 3 sessions
Checkout visits: 1 (abandoned)

30-day bar chart: clear collapse visual weeks 3–4

⚡ Why GA tag:
"This is the #1 trigger signal. Session collapse
detected 14 days before transaction churn.
Weighted 25pts — highest in composite model."

IMPACT COMPARISON BLOCK (not accordion — always visible):
Card: bg=gray-1  radius=12px  padding=24px

Title: "What Happens Next — With and Without Action"

Two columns:
LEFT — No Action               RIGHT — With Intervention
bg=critical-light  radius=8px  bg=low-light  radius=8px

Churn probability:  94%        Churn probability:   38%
Revenue at risk:    $186       Revenue saved:        $286
Points expire:      $21 lost   Redemption prob:      71%
Platform ROI hit:   –$186      Net intervention:     $267.60

ACTIVITY TIMELINE ACCORDION:
▼ Activity Timeline | Last event: 2 days ago

Score trend line (full width, 6mo, 0–100)
Overlaid with timeline events as dots

Timeline (vertical, newest first):
Today       [GA4 🟠]    Collapse trigger → Agent activated
3d ago      [Zendesk 🔴] Ticket #4421 OPEN — unresolved ← amber row
5d ago      [GA4 🟠]    –60% threshold crossed
8d ago      [Klaviyo 🟡] Expiry warning — not opened
2wks ago    [GA4 🟠]    Last product page view
3wks ago    [Klaviyo 🟡] Campaign #12 — 8.2% open
4wks ago    [Shopify 🟢] Order #8821 — 20% disc — $34
6wks ago    [Shopify 🟢] Order #8764 — 15% disc — $38
8wks ago    [Yotpo 🔴]  Enrolled — 420pts — 0 redeemed ← flag
3mo ago     [Shopify 🟢] Order #7491 — full price — $62
6mo ago     [Shopify 🟢] First order — $68 — no discount

Row click: side panel with full event detail

RIGHT COLUMN — STICKY ACTION PANEL:
Card: bg=white  border=1px gray-2  radius=12px
shadow L2  position=sticky  top=96px

[CRITICAL 91/100 badge — large]

Customer: Sam Chen
Status: Brief pending approval

━━━━━━━━━━━━━━━━━━━━━━

[✅ Review & Approve Brief]  ← primary full width
[✏️ Override Offer]          ← secondary full width
[⬆ Escalate to DRI]         ← ghost full width
[✕ Dismiss Brief]            ← ghost red full width

━━━━━━━━━━━━━━━━━━━━━━

📋 Brief Summary:
Offer: Double Points + Free Returns
Confidence: 87%
⚠ Resolve ticket first

━━━━━━━━━━━━━━━━━━━━━━

⚡ Quick Stats:
Member: 2 years
Points expiring: Dec 31
Open ticket: 1 (3 days)
Last purchase: 47 days

━━━━━━━━━━━━━━━━━━━━━━

🔗 System Links:
View in Salesforce →
View in Shopify →
View in Yotpo →
View in Zendesk →
View in GA4 →

7. AGENT ACTIVITY LOG
Screen 04: Agent Activity Log
Page header:
H1: "Agent Activity Log"
Subtitle: "Every action the agent took — fully auditable"
Right: [Date range ∨] [Event type ∨] [Export]
Stats row:
Total actions (30d): 2,847    Briefs generated: 412
Approved: 389 (94%)           Guardrails hit: 43
Overrides: 74                 Avg confidence: 84%
Filter bar:
[🔍 Search customer, event, outcome...]
[All events ∨] [Briefs ∨] [Guardrails ∨] [Overrides ∨]
[Date range ∨]  [Agent confidence ∨]
Full log table:
Timestamp    Customer       Event                  Outcome        Score  Confidence  Guardrail
──────────────────────────────────────────────────────────────────────────────────────────────
Nov 15 10:42  Sam Chen      Brief generated        Pending        91     87%         ⚠ Ticket
Nov 15 10:38  Marcus Lee    CRITICAL alert         Queued         88     91%         None
Nov 15 09:14  Jenny K.      Offer redeemed         Score 91→22    22     —           None
Nov 14 03:22  Marcus Lee    Brief approved         Sent           88     91%         None
Nov 14 01:18  Kevin P.      Override logged        Manual offer   81     79%         None
Nov 14 11:04  Amy W.        Brief dismissed        Duplicate      79     82%         None
Nov 13 04:33  [Customer]    Guardrail blocked      Ticket open    85     88%         ✅ Hit
Row click → event detail side panel

8. CAMPAIGN MANAGER
Screen 05: Campaign List
Page header:
H1: "Campaign Manager"
Subtitle: "Agent-powered and manual campaigns"
Right: [+ New Campaign]
Stats row:
Active: 3    Scheduled: 2    Completed(30d): 8
Avg open rate: 34.2%    Total revenue: $68,946
Filter + search:
[🔍 Search campaign...]
[Status ∨] [Type ∨] [Segment ∨] [Date ∨]
Campaign table:
Name                    Type    Status     Sent   Open%  Conv%  Revenue   Action
Double Points Weekend   Agent   Active     412    38.2%  18.4%  $68,946   [View]
First Redemption Drive  Agent   Active     289    44.1%  22.8%  $41,230   [View]
Exit Intent Capture     Agent   Active    1,204   12.4%  8.2%   $22,180   [View]
Platinum Re-engagement  Manual  Scheduled  —      —      —      —         [View]
10% Discount            Manual  Paused     —      —      —      —         [View]
Oct Churn Prevention    Agent   Complete   847    36.4%  19.1%  $54,200   [View]

Screen 05-Detail: Campaign Detail
Breadcrumb: ← Campaign Manager / Double Points Weekend
Two columns:
Left:

Campaign overview card (name, type, status, trigger rule, offer, channels, dates)
Performance metrics (sent, opened, accepted, redeemed, revenue, ROI)
A/B test results card
Channel performance bar chart
Customer table for this campaign (paginated, each row → Customer Detail)

Right sticky:

Campaign status
Revenue: $68,946
ROI: 8.6×
[Pause] [Edit Rules] [Export] [Duplicate]


Screen 05-Builder: New Campaign (4-step wizard)
Step 1: Define Segment — IF/AND condition builder + audience preview
Step 2: Choose Offer — offer card selection grid
Step 3: Set Channels — email/SMS/push toggles + previews + send timing
Step 4: Review & Launch — summary + guardrail pre-check + [Launch]

9. AUTOMATION & GUARDRAILS
Screen 06: Automation & Guardrails
Page header:
H1: "Automation & Guardrails"
Subtitle: "Configure how the agent triggers, acts, and protects"
Right: "All systems operational" — green dot
4 horizontal tabs:
[Trigger Rules]  [Guardrail Settings]  [Automation Log]  [Override Analysis]

Tab 1 — Trigger Rules
5 rules, each expandable:
[●ON] GA Session Collapse     "Sessions –40% in 7d → Score weight +25pts"   [Edit] [∨]
[●ON] Zero Redemption         "Day 28 + 0 redeemed → First Redemption offer" [Edit] [∨]
[●ON] Support Ticket Hold     ">48h open → Hold all outreach"                [Edit] [∨]
[●ON] AOV Decline             "AOV –25% over 3 orders → Score +20pts"        [Edit] [∨]
[●ON] Discount Dependency     "3+ of 5 discounted → Block cash offers"       [Edit] [∨]
[+ Add New Rule]
GA Session Collapse — expanded:
Visual rule builder:
IF   [GA sessions]     [drop by more than]  [40%]   [in 7 days]
THEN [Add score]       [+25 points]
AND  [Wake orchestrator agent]

⚡ Why GA is #1:
"CRM returns 72/100 healthy for customers
who then churn. GA detects behavioural intent
collapse 2–3 weeks earlier. Highest single
weight signal in the composite model.
This is the mechanism behind +14 day KPI."

Performance (30 days):
Triggered: 412    Actioned: 389    Churn prevented: 61

[Save] [Disable]

Tab 2 — Guardrail Settings
Full configuration UI:
Pre-generation:
Minimum score threshold: [40] slider
Offer cooldown: [7] days
Support ticket hold: [ON ●]
Post-purchase blackout: [3] days
Post-redemption blackout: [24] hours
Offer guardrails:
Standard max discount: [15]%
Gold max discount: [20]%
Platinum: [Non-monetary preferred ∨]
Weekly budget cap: $[2,400]
Discount dependency block: [ON ●]
Route to instead: [Points multiplier ∨]

⚡ Why no generic discounts:
"Customers with 3+ of 5 discounted orders
become more discount-dependent when given
another discount. Margin erodes further.
GPT-4o prompt explicitly forbids this
anti-pattern. This drives the 8%→85%
personalisation KPI."
Outreach:
Max per customer per 7 days: [1]
Quiet hours: [10pm] to [8am] local
SMS: blocked if no opt-in [ON ●]
Push: blocked if no permission [ON ●]
Email: blocked if unsubscribed [ON ●]
Approval:
Human approval required: [ON ● locked]
CRITICAL escalation to DRI: [ON ●]
DRI: [Jordan — Retention Ops Lead ∨]
Flag confidence below: [70%] slider
Override logging: [ON ● locked]

Tab 3 — Automation Log
Same as Agent Activity Log — filtered view within guardrails context

Tab 4 — Override Analysis
Summary card:
Last 30 days: 12 overrides
Agent right: 9 of 12 (75%)
Override right: 3 of 12 (25%)
Override rate: 34% → 18% ↓ improving
Comparison table:
Customer | Date | Agent Rec | Override | Outcome | Verdict
Sam C.   | Nov 2 | Dbl Points | 15% disc | Churned | ❌ Agent right
Jenny K. | Nov 1 | Free Return| Approved | Retained| ✅ Override right

10. WEEKLY REVIEW
Screen 07: Weekly Review
Page header:
H1: "Weekly Review"
Subtitle: "Week of Nov 11–15 — with CRM Analyst + Marketing Ops"
Right: [Schedule next →] [Export report]
3 sections:
Section 1 — What happened this week:
Briefs generated: 89    Approved: 82    Overridden: 7    Dismissed: 0
Customers reached: 82   Accepted offer: 34   Came back: 28
Revenue attributed: $8,008
Section 2 — Agent vs manual comparison:
Where agent was right: 9 cases — detail table
Where override was right: 3 cases — detail table
Where neither worked: 2 cases — flag for rule review
Section 3 — What changes next week:
[+ Add action item]
Action items list:
☐ Tighten GA send window from 72h to 24h — Jordan
☐ Pause 10% discount offer — Jordan + Marketing Ops
☐ Add birthday signal to composite score — Digital Analytics Lead

11. PROTOTYPE FLOW — COMPLETE WIRING
Primary Demo Flow:
G1: Global Dashboard
→ "Review Now" in action panel
→ Screen 02: Approval Queue (Sam pre-expanded)
→ "View Full Brief"
→ Screen 02-Detail: Brief Detail
→ "View Customer Profile"
→ Screen 03-Detail: Customer Detail (all accordions)
→ "Approve and Send" in sticky panel
→ Toast: "Sent — 3 channels queued"
→ Back to Screen 02: Sam card now RESOLVED LOW 22
→ Sidebar: Agent Activity Log
→ Screen 04: Log — Sam's intervention entry
→ Sidebar: Campaign Manager
→ Screen 05: Campaign list — Double Points active
→ Screen 05-Detail: Campaign detail — revenue updated
→ Sidebar: Weekly Review
→ Screen 07: This week's results updated
All secondary flows:
G1 KPI tile click → KPI detail
G1 top-5 row → Customer Detail
G1 AI insight → Segment Dashboard
G1 "View campaigns" → Campaign Manager

CL1 search/filter → filtered results
CL1 row click → Customer Detail
CL1 [Brief] → Brief Detail directly

Customer Detail accordions → all expand/collapse
Customer Detail system links → external (simulate)
Customer Detail ticket → resolve action

Approval Queue card → expand inline
Approval Queue card → Brief Detail page
Brief Detail → Customer Detail
Brief Detail approve → toast + resolved state

Campaign list → Campaign Detail
Campaign Detail → customer rows → Customer Detail
New Campaign → 4-step builder

Automation tabs → all 4 tab states
Rule row → expand inline
Guardrail settings → toggles/sliders interactive
Override row → override detail

Weekly Review action items → checkable

12. FIGMA FILE STRUCTURE
Page 01: 🎨 Design System
         Colors, typography, all components, system tags,
         AI insight tag, Why GA tag, score badges

Page 02: 🏠 Global Dashboard (Screen 01)

Page 03: ✅ Approval Queue (Screen 02)
         Collapsed cards, Sam expanded, Brief Detail page

Page 04: 👥 Customer List (Screen 03)
         List with search/filter, Customer Detail full page

Page 05: 🤖 Agent Activity Log (Screen 04)

Page 06: 📅 Campaign Manager (Screen 05)
         List, Campaign Detail, New Campaign builder

Page 07: ⚙️ Automation & Guardrails (Screen 06)
         All 4 tabs fully designed

Page 08: 📋 Weekly Review (Screen 07)

Page 09: 📈 Performance / KPI Detail pages

Page 10: 🔗 Prototype Flow
         All screens wired, demo flow annotated

Page 11: 📝 Annotations
         Agent logic callouts, guardrail notes,
         Why GA markers, async parallel note,
         discount anti-pattern note

13. ANNOTATION STANDARDS
Agent action block (teal):
🤖 AGENT ACTION
Trigger: [what fired]
Systems queried: [parallel — all 6]
Time: ~2 seconds
Human required: approval only
Why GA marker (orange):
⚡ WHY GA IS #1
CRM returned 72/100 — excluded.
GA detects collapse 14 days earlier.
Weight: 25pts — highest single signal.
Delivers: +14 day signal lead KPI.
No discount marker (purple):
🚫 WHY NO GENERIC DISCOUNT
3 of 5 orders discounted.
Another discount = more dependency.
GPT-4o prompt forbids this anti-pattern.
Drives: 8% → 85% personalisation KPI.
Parallel reads marker (green):
⚡ ASYNC PARALLEL READS
All 6 APIs fired simultaneously.
Not sequential — not AI.
~2 seconds total read time.
Delivers: 4–7 days → <2 min KPI.