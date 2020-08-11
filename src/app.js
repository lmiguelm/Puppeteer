const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto('https://www.instagram.com/lmiguel10/');

  const images = await page.evaluate(() => {

    const nodeList = document.querySelectorAll('article img');

    const ArrayList = [...nodeList];
    
    const images = ArrayList.map(img => ({img: img.currentSrc}))

    return images;
  });

    await browser.close();

    fs.writeFile('instagram.json', JSON.stringify(images, null, 2), err => {
        if(err) throw new Error('Ocorreu um erro ao salvar as imagens');

        console.log('ok')
    })

})();