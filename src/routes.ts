// src/routes.tsx
import express from 'express';
import { GetTime } from './myClasses/GetTime.ts';
// https://expressjs.com/en/guide/routing.html

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