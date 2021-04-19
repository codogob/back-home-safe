# 安心回家

[![pipeline status](https://gitlab.com/codogo-b/back-home-safe/badges/master/pipeline.svg)](https://gitlab.com/codogo-b/back-home-safe/-/commits/master)

![logo](https://gitlab.com/codogo-b/back-home-safe/-/raw/master/public/icon-192x192.png)

以 PWA(progressive web app) 形式模擬及實現安心出行功能\
立即試試: <https://codogo-b.gitlab.io/back-home-safe/>

## 免責聲明

安心回家（下簡稱「本軟件」）只用作漸進式網路應用程式 (Progressive Web Apps) 學術討論用途，
用於示範不同 mobile app 功能於網頁上的實現方式（如 QR code 掃瞄，前端資料加密等等）。\
本軟件未有以任何方式得到香港特別行政區政府（下簡稱「特區政府」）的認可。\
與特區政府推出的「安心出行」應用程式沒有任何關係，亦不是特區政府官方的追踪程式。\
因此本軟件不應取代特區政府「安心出行」應用程式。\
任何人士在使用本軟件作任何用途前，應先尋求獨立的法律意見或其他專業意見。\
用戶若因使用／未能使用本軟件，或以本軟件作任何誤用行為引致的損失、損害、法律責任或其他後果，作者概不會承擔任何法律責任，並保留追究權利。

## 功能

- [x] 紀錄出行場所
- [x] 紀錄的士號碼
- [x] 自動離開
- [x] 查看/刪除訪問出行記錄
- [x] 加密出行紀錄
- [x] 隱私模式(不儲存出行紀錄)
- [x] 生成二維碼
- [ ] i18n
- [ ] 查看確診個案

## 開發者專區

### Local testing

```bash
npm install
npm start
```

### 自己 Host

```bash
npm install
npm run build
```

將/build 放入自己 web server 就 okay

\*\*註：一定要用 https serve
