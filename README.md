This is a [Next.js](https://nextjs.org) project

##
Frontend Project: Reactive Data Table in Next.js with Supabase and TailwindCSS

Vercel preview: https://reactive-data-table-liard.vercel.app/

## Objective:
Build a reactive, editable data table using Next.js, TailwindCSS, and Supabase that behaves similarly to Clay/Airtable. The table should support CRUD operations,pagination, and real-time updates. Please feel free to sign up for a free account at https:/ /clay.com and create a table for yourself.

## Demo Features:
- new column popup click name to edit
- futures progress:
Data Table Features
 - Data Display: Fetch and display data from Supabase in a table format. [done]
 - Update and Enter Columns: Allow users to directly edit the cell content and add
new columns dynamically.  [user can update type + custom columns content, user can add column + delete column]
 - Pagination: Implement pagination controls, allowing users to navigate through
the data. Include options to select pagination size (e.g., 10, 50, 100 rows per
page) [done][click rows button, select start + limit]
 - Large Data Handling: Efficiently handle and render up to 50,000 rows of data
without performance degradation
 - Real- Time Updates: Utilize Supabase's real-time capabilities to reflect changes
made to the data across all clients immediately[done]

Advanced Features:
- Implement search
- Implement column sorting and filtering [sort by time + filter type]
- Implement drag drop reordering
- Ability to insert images into a cell (<2MB)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
