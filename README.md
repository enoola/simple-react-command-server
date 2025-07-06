'
# the project
simple server, to quickly handles various command of your choice
the whole idea is that I will checkout the project as base for another one

## Project Layout
```bash
$ tree -L 1
├── dist
│   ├── index.js
│   ├── index.mjs
│   ├── index.test.js
│   ├── myClasses
│   ├── routes.js
│   ├── routes.test.js
│   └── searchDomains.js
├── jest.config.ts
├── myworkmaterial
│   ├── concatenate_files.sh
│   ├── mojeek_resultpage.example.htm
│   ├── notes.md
│   └── watch_transpile_relaunchwebserv.sh
├── nodemon.json
├── package.json
├── project_export.txt
├── README.md
├── src
│   ├── index.test.ts
│   ├── index.ts
│   ├── myClasses
│   ├── routes.test.ts
│   └── routes.ts
└── tsconfig.json

8 directories, 23 files
```

## Setup

clone the project
```bash
git clone https://github.com/enoola/simple-react-command-server.git

```
You probably want to
1. rename the folder to your new project name for example
`cd simple-react-command-server` or `cd "the new folder name"`
2. change this to your git project
```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/YOUR_PROJECT_NAME.git
#shall work for gitlab which I do not use atm
git branch -M main
git push -u origin main
```

### Environment variables
we use variable from .env.local file
which contains non sensible values such as hostname, port

1. Copy .env file to .env.local, 
`cp .env .env.local`

2. Open `.env.local` and update with your values
e.g:
```env
HTTP_FQDN=localhost
HTTP_SERVER_PORT=3000
```

### Install npm package
`npm install`

### Launch the project
#### fastest way from 1 terminal
we use the below
`npm run dev`
which ultimately launches : `nodemon --watch src --exec myworkmaterial/watch_transpile_relaunchwebserv.sh`
cf: https://nodemon.io/

#### Watch then nodemon 2 terminal required
### Retranspile if file changes in the server folder src
`npm run watch`

### will restart the server once a file is modified
node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts
`npm run dev2steps`

## Using the project 
at that point the server should be launched
`npm run dev`

### Query server wuth curl command line tool 
  I assume you have curl installed, if not look at the "From a browser" section
We know the server is accessible by querying : `http://{HTTP_SERVER_FQDN}:{HTTP_SERVER_PORT}/`
  Remember editing `.env.local` file, well time to remember those value 
  from my values, mentionned before:
    ```env
    HTTP_SERVER_FQDN='localhost'
    HTTP_SERVER_PORT=3000
    ```
I will refer to server URL as http://localhost:3000
Open a terminal, and type the following commands, first line of each block.
```bash
curl http://localhost:3000
{"error":"404","message":"Woop woop, Curious you"}
```

Hello
```bash
curl http://localhost:3000/api/hello
{"message":"Hello world!"}
```

we will query searchweb function
 uses [Mojeek](https://www.mojeek.com)
if no argument provided we search for "good news today"
```bash
curl http://localhost:3000/api/searchweb
{"search":"good+news+today","results":[{"title":"Welcome To Good News Today . . . No matter what else is","url":"https://www.gnttv.org/","snippet":"Among churches of Christ, <strong>Good</strong> <strong>News</strong> <strong>Today</strong> is the first magazine-format TV program to be broadcast into homes and businesses around the country via ..."},{"title":"The Good News Today","url":"https://thegoodnewstoday.org/","snippet":"By ZeroHedge <strong>News</strong> Pennsylvania farmers are being “crushed” by the record cost ... 2025 The <strong>Good</strong> <strong>News</strong> <strong>Today</strong> | Invigorated by Small Business Deacon"},{"title":"Today's Good News","url":"https://goodnews.ie/","snippet":"<strong>Today</strong>'s <strong>Good</strong> <strong>News</strong> ... From the Dominican Retreat Centre Tallaght Village, Dublin 24 Email: question@goodnews.ie ... <strong>Good</strong> <strong>News</strong> Android App, click ..."},{"title":"Good News: Inspirational, Uplifting and Happy News | TODAY |","url":"https://www.today.com/news/good-news","snippet":"Inspirational, uplifting, funny and happy <strong>news</strong>, photos, videos and more. ... Bodega owner gives kids free food for <strong>good</strong> grades: ‘I like seeing the ..."},{"title":"Good News for Today | A Daily Podcast from Baptist Press","url":"https://podcast.baptistpress.com/","snippet":"Your listeners will be introduced to Christians and churches making a difference for the glory of God through <strong>Good</strong> <strong>News</strong> for <strong>Today</strong>."},{"title":"Today’s Good News | Lifesongs.com","url":"https://www.lifesongs.com/goodnews/","snippet":"Home <strong>News</strong> <strong>Today</strong>'s <strong>Good</strong> <strong>News</strong> ... <strong>Today</strong>'s <strong>Good</strong> <strong>News</strong> - Heroes &amp; Helpers ... That in and of itself is a “ <strong>Good</strong> <strong>News</strong> story ” – but John ..."},{"title":"Today’s good news | Power Line","url":"https://www.powerlineblog.com/archives/2025/04/todays-good-news-3.php","snippet":"<strong>Today</strong> ’ s <strong>good</strong> <strong>news</strong> ... It would be easy to miss <strong>today</strong> ’ s <strong>good</strong> <strong>news</strong>, which comes via the Trump Department of Justice."},{"title":"Good News Today | Only Good News Daily","url":"https://www.onlygoodnewsdaily.com/good-news-today","snippet":"It s <strong>good</strong> <strong>news</strong> <strong>today</strong> and every day. ... <strong>Good</strong> <strong>News</strong> - Inspiring <strong>News</strong> - Uplifting <strong>News</strong> - <strong>News</strong> <strong>Good</strong> for Wellbeing - <strong>News</strong> Beneficial to Mental Health - OGN ..."},{"title":"Good News Bible - Wikipedia","url":"https://en.wikipedia.org/wiki/Good_News_Bible","snippet":"In 1976, the Old Testament was completed and published as the <strong>Good</strong> <strong>News</strong> Bible: The Bible in <strong>Today</strong>'s English Version ."},{"title":"Today's Top Good News Stories | Good Good Good","url":"https://www.goodgoodgood.co/goodnews","snippet":"<strong>Today</strong>’s <strong>Good</strong> <strong>News</strong> » ... Your weekly roundup of the best <strong>good</strong> <strong>news</strong> worth celebrating... ... Goodnewspaper mailed to their home, get exclusive ..."}]}
```

You can add your search I've used "1984 book visionary"
```bash
curl http://localhost:3000/api/searchweb/1984+book+visionary
{"search":"1984+book+visionary","results":[{"title":"1984: 75th Anniversary | Charter Books","url":"https://charterbookstore.com/book/9780451524935","snippet":"... timeless, structure-bending classic that explores how actions of individual lives impact the past, present and future—from a postmodern <strong>visionary</strong> ..."},{"title":"Book review: 1984 by George Orwell","url":"https://bookart101.com/1984bygeorgeorwellreview/","snippet":"The <strong>book</strong> is about abusing and misusing power, It is about filtering those out who cannot conform to the standard rules of society."},{"title":"1984 by George Orwell ePub Download - AllBooksWorld.com","url":"https://allbooksworld.com/1984-by-george-orwell-pdf-epub-novel-audibook-read-online-novel1/","snippet":"This <strong>book</strong> is drowned in hopelessness, but it is something we all need to read and keep close to our hearts, because during these troubling times it ..."},{"title":"Fiction and Non-Fiction Books and Essays by Famous Author","url":"https://www.mybooklist.com/page/Fiction-and-Non-Fiction-Books-and-Essays-by-Famous-Author-George-Orwell","snippet":"Now, Penguin brings you the works of the great thinkers, pioneers, radicals and <strong>visionaries</strong> whose ideas shook civilization, and helped make us who we ..."},{"title":"1984 – Eleni Papanou","url":"http://www.elenipapanou.com/tag/1984/","snippet":"... tapping into? In a critique on Orwell’s writing style, Sam Jordison reveals something about “<strong>1984</strong>” that will resonate with <strong>visionary</strong> fiction ..."},{"title":"1984: 75th Anniversary by George Orwell (9780451524935)","url":"https://www.allbookstores.com/1984-75th-Anniversary-George-Orwell/9780451524935","snippet":"He wrote quite a few <strong>books</strong>, but many believe that his more influential ones were \"Animal farm\" (1944) and \"<strong>1984</strong>\" (1948).In those two <strong>books</strong> he ..."},{"title":"1984: 75th Anniversary | Antigone Books","url":"https://antigonebooks.com/book/9780451524935","snippet":"NATIONAL BESTSELLER • <strong>BOOKER</strong> PRIZE FINALIST • From the internationally acclaimed, <strong>Booker</strong> Prize-winning author of The English Patient: “an ..."},{"title":"1984 by George Orwell | Literal","url":"https://literal.club/book/george-orwell-1984-4w1fe","snippet":"... <strong>1984</strong>, London is a grim city in the ... Lionel Trilling said of Orwell’s masterpiece, “<strong>1984</strong> is a profound, terrifying, and wholly fascinating <strong>book</strong>."},{"title":"George Orwell - 1984 Audiobook Online Free","url":"https://101audiobooks.cloud/george-orwell-1984-audiobook-online/","snippet":"I would like to create some feedback relating to the second <strong>book</strong>, “ <strong>1984</strong> ” . ... George Orwell – <strong>1984</strong> Audio E <strong>book</strong> Online Free."},{"title":"surveillance Archives - Visionary Fiction Alliance","url":"https://visionaryfictionalliance.com/tag/surveillance/","snippet":"In part one of the dystopian <strong>book</strong> series, we discussed how tales like <strong>1984</strong> raised our collective consciousness to the horrors of totalitarian systems."}]}
```

Finaly we use exec function to list local folder (don't do this irl )
```bash
curl http://localhost:3000/api/ls
{"output":["coverage","dist","jest.config.ts","myworkmaterial","node_modules","nodemon.json","package-lock.json","package.json","project_export.txt","README.md","src","tsconfig.json",""]}
```
### From a browser
Open a browser (or browser tab),
Remember editing .env.local file, well time to remember those value 
Go to http://{.env.local:HTTP_SERVER_FQDN:HTTP_SERVER_PORT}/
from my value, mentionned before:
will respond with a json error (HTTP code 404)


http://localhost:3000
{"error":"404","message":"Woop woop, Curious you"}

http://localhost:3000/api/hello

you can add your search I've used "1984 book visionary"
http://localhost:3000/searchweb/1984 book visionary

http://localhost:3000/searchweb


## Testing
we use Jest, 
supertest : library to test HTTP request 
```bash
npm run jtest
```

## Useful : 
 -[] https://expressjs.com/en/guide/routing.html
 -[] https://cheerio.js.org/docs/intro


## todo:
 - implement 1 function calling open remote APIs 
 - implement 1 function to execute command localy ?
