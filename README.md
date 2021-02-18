# 安心回家

[![pipeline status](https://gitlab.com/codogo-b/back-home-safe/badges/master/pipeline.svg)](https://gitlab.com/codogo-b/back-home-safe/-/commits/master)

一個以安心出行為例嘅 PWA

## 有用連結

[原 post](https://lihkg.com/thread/2409365/page/1)

[Build Status](https://gitlab.com/codogo-b/back-home-safe/-/pipelines)

## 聲明

對於政府與社會各界將第一個 post 嘅標題以及文章重點放響 "安心出行" 以及 "翻版"
本人深表遺憾

我原本只係想將自己 IT 學習嘅知識分享，為咗一個噱頭用咗安心出行嚟呃上位

上個 post 足以引證只有標題黨先可以響連登立足，本人亦十分無奈，只能繼續用呢個咁爆嘅標題搵食

[【正視聽】是咁的，我整咗人生第一個 PWA (2)](https://lihkg.com/thread/2404315)

我再重再再再申一次

此帖只以安心出行為例討論 PWA 相關技術

並非鼓勵任何人以此成品作任何堂食用途

引用[政府新聞處公告](https://www.info.gov.hk/gia/general/202102/16/P2021021600529.htm)

不知名的網站或流動應用程式可能帶有電腦病毒或為木馬軟件，千祈唔好拎嚟認真用

請大家遵從[大律師意見](http://cablenews.i-cable.com/ci/news/article/37/722934)

唔好被誤導，用了翻版「安心出行」，有法律風險，包括不誠實使用電腦或其他詐騙、行騙的罪行。

任何人利用此作任何犯法行為，本人並不負責

若果作品有觸犯任何法例，歡迎局方透過 GitLab/email 同我聯絡，我會將作品下架

## Local test

```bash
npm install
npm start
```

## 自己 Host

```bash
npm install

# windows

set PUBLIC_URL=https://dsomething.cloudfront.net&&npm run build

# linux/mac
PUBLIC_URL=https://dsomething.cloudfront.net npm run build
```

將/build 放入自己 web server 就 okay

\*\*註：一定要用 https serve
