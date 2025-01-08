# SpendWise Ena-Ema Task

> Created by Farhan Pavel
> 
> SpendWise is a cutting-edge expense tracking platform crafted with Next.js, designed to offer an intuitive and organized way to manage your finances. With SpendWise, users can effortlessly track daily expenses, set personalized spending limits, and receive detailed financial summaries. Combining streamlined budgeting with categorized expense tracking and real-time alerts, SpendWise empowers you to take control of your finances and make informed, smarter decisions for a financially secure future.

![image](https://github.com/user-attachments/assets/ae363b69-dfd8-42bd-ab63-f023f142a7ef)



## 🚀 Features

#### Set Spending Limits

-  Users can set spending limits for six categories: Groceries, Transportation, Healthcare, Utility, Charity, and Miscellaneous.


#### Track Expenses by Category

-  Users can add their expenses for each category with a designated purpose. The date is automatically stored without manual input.

#### Limit Exceeded Alerts

-  If the user exceeds the set spending limit for a category, a message is displayed notifying the user that the limit has been exceeded for the day.


#### Daily Spending Overview

-  A summary of the total spending for each day is displayed to help users track their expenses.

#### Automatic New Entries:

- At the start of a new day, users can enter fresh expenses and the app will track them separately, with data automatically categorized.

#### Hover Tooltip for Spending Details:

-  Display the purpose of each expense in a tooltip when hovering over table entries 


## 📁 Project Structure

```
📦 
LICENSE
├─ README.md
├─ client
│  ├─ public
│  │  ├─ images
│  │  │  ├─ Hero1.gif
│  │  │  └─ Logo.png
│  │  ├─ next.svg
│  │  └─ vercel.svg
│  ├─ src
│  │  ├─ app
│  │  │  ├─ (user)
│  │  │  │  ├─ layout.tsx
│  │  │  │  └─ userdashboard
│  │  │  │     └─ analytics
│  │  │  │        ├─ edit
│  │  │  │        │  └─ page.tsx
│  │  │  │        ├─ new
│  │  │  │        │  └─ page.tsx
│  │  │  │        └─ page.tsx
│  │  │  ├─ _home
│  │  │  │  ├─ Feature.tsx
│  │  │  │  └─ Hero.tsx
│  │  │  ├─ globals.css
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.module.css
│  │  │  └─ page.tsx
│  │  ├─ components
│  │  │  ├─ Footer
│  │  │  │  └─ page.tsx
│  │  │  ├─ Header
│  │  │  │  └─ page.tsx
│  │  │  ├─ Sidebar
│  │  │  │  └─ page.tsx
│  │  │  └─ Url
│  │  │     └─ page.tsx
│  │  ├─ redux
│  │  │  ├─ provider
│  │  │  │  └─ storeProvide.tsx
│  │  │  ├─ slice
│  │  │  │  └─ sliceForm..tsx
│  │  │  └─ store
│  │  │     └─ storeForm.tsx
│  │  └─ styles
│  │     ├─ Analytics.css
│  │     ├─ Home.css
│  │     ├─ Newform.css
│  │     └─ Sidebar.css
│  └─ tsconfig.json
└─ server
   ├─ .gitignore
   ├─ app.js
   ├─ controllers
   │  ├─ limitController.js
   │  └─ taskController.js
   ├─ models
   │  ├─ limitSchema.js
   │  └─ taskSchema.js
   ├─ package-lock.json
   ├─ package.json
   └─ routes
      ├─ limitRoute.js
      └─ taskRoute.js
```



## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Pure CSS
- **Database**: MongoDB with Mongoose
- **Library**: Redux-Toolkit


## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone [https://github.com/farhanpavel/SpendWise]
```

2. **Install dependencies in Both client & Server Folder**
```bash
npm install
```

3. **Set up environment variables in Server Folder**
Create a `.env` file with the following variables:

```env
# MongoDB
DATABASE_URL="mongodb://localhost:27017/expense"
PORT=4000
```

4. **Run the development server in client folder by**
```bash
npm run dev
```
5. **Run the Database in server folder by**
 ```bash
nodemon app
```
7. **Build for production**
```bash
npm run build
```
7. **For Using The Deployment Version**
```bash
cd client/src/components/Url
change the url="https://spendwise-je8f.onrender.com"
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📜 License

This project is licensed under the MIT License.

---
Created with 💻 by Farhan Pavel
