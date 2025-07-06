// src/routes.tsx
import express from 'express';
import { GetTime } from './myClasses/GetTime.ts';
import { exec } from 'child_process';
// https://expressjs.com/en/guide/routing.html
import axios from 'axios'; // Add for HTTP requests
import * as cheerio from 'cheerio';

// Simple delay function using setTimeout and promise
export const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

//export const app = express();
export const router = express.Router();

router.get('/hello', async (req, res) => {
  res.json({ message: 'Hello world!' })
});

router.get('/time', async (req, res) => {
  const oTime = new GetTime();
  oTime.SendAsJson(res);
  console.log('served:' + oTime.AsText());
});



router.get('/mocksearchdomain/:dnsname', async (req, res) => {
  const domainname = req.params?.dnsname;
  console.log (domainname)
  if (!domainname) {
    console.log(`}->no domainname provided`);
    res.json({ message: 'no domain provided in the query'})
    return ;
  }
  
  console.log(`searchdomain: ${domainname}`);
  console.log(`will return mock data anyway`);
  const mockFoundDomainList = [{ name: `${domainname}.eu`, provider: 'nametoop', price: 19.9, available: true }, 
    { name: `${domainname}.fr`, provider: 'dnprovidrr', price: 9.9, available: true},
    { name: `${domainname}.com`, provider: 'dnpkaka', price: 9.9, available: false},
    { name: `${domainname}.bs`, provider: 'dnpopo', price: 9.9, available: true}
  ];
  
  // res.json({mockFoundDomainList});
  res.json(mockFoundDomainList);
}); 

/*
command to list local file on the server
irl you don't want do use this so directly :)..
anyway here is how to execute a command on the server it is running
*/
router.get('/ls', async (req, res) => {
  exec('ls', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ls -la: ${stderr}`);
      return res.status(500).json({ error: 'Failed to list directory' });
    }
    
    return res.json({ output: stdout.split('\n') });
  });
});


/* Example of partial result from Mojeek, search: latest hack
  <ul class="results-standard">
    <!--ls-->
    <!--rs--><li class="r1">
    <a title="https://latesthackingnews.com/" href="https://latesthackingnews.com/" class="ob">
    <p class="i">
      <span class="url">https://latesthackingnews.com/</span>
    </p>
    </a>
    <h2>
    <a class="title" title="https://latesthackingnews.com/" href="https://latesthackingnews.com/">
      Latest Hacking News | Cyber Security News, Hacking Tools and
    </a>
    </h2>
      <p class="s">INE Security and RedTeam <strong>Hacker</strong> Academy Announce Partnership to ... 
        <strong>Latest</strong> 
        Cyber Security News | Network Security <strong>Hacking
        </strong> ... <strong>Latest</strong>
        <strong>Hacking</strong> News</p>
      <p class="more"><a href="/search?q=site%3Alatesthackingnews.com+latest+hack">See more results from latesthackingnews.com »</a></p></li><!--re-->

    <!--rs--><li class="r2"><a title="https://portswigger.net/daily-swig/hacking-news" href="https://portswigger.net/daily-swig/hacking-news" class="ob"><p class="i"><span class="url">https://portswigger.net<span> › daily-swig › hacking-news</span></span></p></a><h2><a class="title" title="https://portswigger.net/daily-swig/hacking-news" href="https://portswigger.net/daily-swig/hacking-news">Latest hacking news | The Daily Swig</a></h2><p class="s">Whether it’s the <strong>latest</strong> <strong>hacks</strong> or new offensive security tools , when it comes to <strong>hacking</strong> news, The Daily Swig has got you covered.</p></li><!--re-->
    <!--rs--><li class="r3 clu-result"><a title="https://portswigger.net/daily-swig/hacking-techniques" href="https://portswigger.net/daily-swig/hacking-techniques" class="ob"><p class="i"><span class="url">https://portswigger.net<span> › daily-swig › hacking-techniques</span></span></p></a><h2><a class="title" title="https://portswigger.net/daily-swig/hacking-techniques" href="https://portswigger.net/daily-swig/hacking-techniques">Latest hacking techniques | The Daily Swig</a></h2><p class="s"><strong>Latest</strong> threats ... Industry news Enterprise security news Web <strong>hacking</strong> tools Events ... <strong>Latest</strong> <strong>hacking</strong> techniques</p><p class="more"><a href="/search?q=site%3Aportswigger.net+latest+hack">See more results from portswigger.net »</a></p></li><!--re-->
    <!--rs--><li class="r4"><a title="https://hackread.com/" href="https://hackread.com/" class="ob"><p class="i"><span class="url">https://hackread.com/</span></p></a><h2><a class="title" title="https://hackread.com/" href="https://hackread.com/">Hackread - Latest Cybersecurity News, Press Releases &amp;</a></h2><p class="s">Akamai s <strong>latest</strong> report reveals two Mirai botnets exploiting the critical CVE-2025-24016 flaw in Wazuh. ... HACKREAD is a News Platform that centers ...</p><p class="more"><a href="/search?q=site%3Ahackread.com+latest+hack">See more results from hackread.com »</a></p></li><!--re-->
    <!--rs--><li class="r5"><a title="https://hackwarenews.com/" href="https://hackwarenews.com/" class="ob"><p class="i"><span class="url">https://hackwarenews.com/</span></p></a><h2><a class="title" title="https://hackwarenews.com/" href="https://hackwarenews.com/">Hack Ware News - News, ethical hacking, cyber crime, network</a></h2><p class="s">Top <strong>Hacking</strong> Simulator Games Every Aspiring <strong>Hacker</strong> Should Play: Part 2.&nbsp;Welcome back to our Top <strong>Hacking</strong> Simulator Games Every <strong>Hacker</strong> Should Play.</p></li><!--re-->
    <!--rs--><li class="r6"><a title="https://www.wired.com/2015/06/hack-brief-password-manager-lastpass-got-breached-hard/" href="https://www.wired.com/2015/06/hack-brief-password-manager-lastpass-got-breached-hard/" class="ob"><p class="i"><span class="url">https://www.wired.com<span> › ... › 06 › hack-brief-password-manager-lastpass-g...</span></span></p></a><h2><a class="title" title="https://www.wired.com/2015/06/hack-brief-password-manager-lastpass-got-breached-hard/" href="https://www.wired.com/2015/06/hack-brief-password-manager-lastpass-got-breached-hard/">Hack Brief: Password Manager LastPass Got Breached Hard | WIRED</a></h2><p class="s">The severity of this <strong>latest</strong> LastPass s <strong>hack</strong>---the first it s experienced since it admitted to an earlier possible breach in 2011 ---is contingent on ...</p><p class="more"><a href="/search?q=site%3Awww.wired.com+latest+hack">See more results from www.wired.com »</a></p></li><!--re-->
    <!--rs--><li class="r7"><a title="https://gamingemotion.forumms.net/t80-latest-sudden-attack-sea-hack-19-03-2012-working" href="https://gamingemotion.forumms.net/t80-latest-sudden-attack-sea-hack-19-03-2012-working" class="ob"><p class="i"><span class="url">https://gamingemotion.forumms.net<span> › t80-latest-sudden-attack-sea-hack...</span></span></p></a><h2><a class="title" title="https://gamingemotion.forumms.net/t80-latest-sudden-attack-sea-hack-19-03-2012-working" href="https://gamingemotion.forumms.net/t80-latest-sudden-attack-sea-hack-19-03-2012-working">Latest Sudden Attack SEA Hack 19-03-2012 WORKING~!~!~!</a></h2><p class="s">Help me <strong>Latest</strong> Sudden Attack SEA <strong>Hack</strong> 07-03-2012 WORKING~! » <strong>Latest</strong> Sudden Attack SEA <strong>Hack</strong> 07-03-2012 WORKING~! » GM,can post the <strong>latest</strong> ...</p></li><!--re-->
    <!--rs--><li class="r8 clu-result"><a title="https://gamingemotion.forumms.net/t20-latest-sudden-attack-sea-hack-07-03-2012-working" href="https://gamingemotion.forumms.net/t20-latest-sudden-attack-sea-hack-07-03-2012-working" class="ob"><p class="i"><span class="url">https://gamingemotion.forumms.net<span> › t20-latest-sudden-attack-sea-hack...</span></span></p></a><h2><a class="title" title="https://gamingemotion.forumms.net/t20-latest-sudden-attack-sea-hack-07-03-2012-working" href="https://gamingemotion.forumms.net/t20-latest-sudden-attack-sea-hack-07-03-2012-working">Latest Sudden Attack SEA Hack 07-03-2012 WORKING~!</a></h2><p class="s">Help me <strong>Latest</strong> Sudden Attack SEA <strong>Hack</strong> 07-03-2012 WORKING~! » <strong>Latest</strong> Sudden Attack SEA <strong>Hack</strong> 19-03-2012 WORKING~!~!~! » GM,can post the ...</p></li><!--re-->
    <!--rs--><li class="r9"><a title="https://www.seobasics.net/latest-digital-marketing-hacks/" href="https://www.seobasics.net/latest-digital-marketing-hacks/" class="ob"><p class="i"><span class="url">https://www.seobasics.net<span> › latest-digital-marketing-hacks</span></span></p></a><h2><a class="title" title="https://www.seobasics.net/latest-digital-marketing-hacks/" href="https://www.seobasics.net/latest-digital-marketing-hacks/">11 Latest Digital Marketing Hacks to Use in 2023 - SEO Basics</a></h2><p class="s">With new trends and technologies emerging every year, it ’ s essential to keep up with the <strong>latest</strong> digital marketing <strong>hacks</strong> to stay ahead of the ...</p><p class="more"><a href="/search?q=site%3Awww.seobasics.net+latest+hack">See more results from www.seobasics.net »</a></p></li><!--re-->
    <!--rs--><li class="r10"><a title="https://nybookmark.com/story21454959/top-latest-five-content-hacking-urban-news" href="https://nybookmark.com/story21454959/top-latest-five-content-hacking-urban-news" class="ob"><p class="i"><span class="url">https://nybookmark.com<span> › ... › top-latest-five-content-hacking-urban-news</span></span></p></a><h2><a class="title" title="https://nybookmark.com/story21454959/top-latest-five-content-hacking-urban-news" href="https://nybookmark.com/story21454959/top-latest-five-content-hacking-urban-news">Top latest Five Content Hacking Urban news</a></h2><p class="s">Top <strong>latest</strong> Five Content <strong>Hacking</strong> Urban news ... Growth <strong>hacking</strong> is a knowledge-pushed advertising approach that aims to quickly enhance a corporation ...</p></li><!--re-->
    <!--le-->
    </ul>
*/


interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

function extractSearchResults(html: string): SearchResult[] {
  const $ = cheerio.load(html);

  // Select all list items with class starting with 'r'
  const results: SearchResult[] = [];
  $('li[class^="r"]').each((index, element) => {
    const $element = $(element);

    // Extract title from the h2 > a.title element
    const title = $element.find('h2 a.title').text().trim();

    // Extract URL from the h2 > a.title href attribute
    const url = $element.find('h2 a.title').attr('href') || '';

    // Extract snippet from the p.s element (preserving HTML formatting)
    const snippet = $element.find('p.s').html() || '';

    // Only add if we have all required fields
    if (title && url && snippet) {
      results.push({
        title,
        url,
        snippet
      });
    }
  });

  return results;
}

/*
* will show how to invoke remote API quickly
*/
/**
 * route with an optionnal argument "Yeaye"
 */
router.get('/searchweb{/:searchWords}', async (req, res) => {
  try {
    const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
    const paramSearchWords = req.params.searchWords?? "good+news+today"

    if (!req.params.searchWords || req.params.searchWords?.trim() === "") {
      console.log(`No search term provided, using default: ${paramSearchWords}`);
    }
    const response = await axios.get(`https://www.mojeek.com/search?q=${paramSearchWords}`, {
      headers: { 'User-Agent': userAgent }
    });
    
    const results: SearchResult[] = extractSearchResults(response.data);

    res.json({'search': `${paramSearchWords}`, 'results': results});

  } catch (error) {
    
    console.error('Mojeek search error:', error);
    res.status(500).json({ error: 'Failed to fetch or parse Mojeek results' });
  }
});

