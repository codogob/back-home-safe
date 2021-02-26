import React from "react";
import styled from "styled-components";

export const Disclaimer = () => {
  return (
    <Wrapper>
      <h2>免責聲明</h2>
      <p>
        安心回家（下簡稱「本軟件」）只用作漸進式網路應用程式 (Progressive Web
        Apps) 學術討論用途， 用於示範不同 mobile app 功能於網頁上的實現方式（如
        QR code reader）。
      </p>
      <p>
        本軟件未有以任何方式得到香港特別行政區政府（下簡稱「行政區政府」）的認可。
        與行政區政府推出的「安心出行」應用程式沒有任何關係，亦不是行政區政府官方的追踪程式。
        因此本軟件不應取代行政區政府「安心出行」應用程式。
      </p>
      <p>
        任何人士在使用本軟件作任何用途前，應先尋求獨立的法律意見或其他專業意見。
        用戶若因使用／未能使用本軟件，或以本軟件作任何誤用行為引致的損失、損害、法律責任或其他後果，作者概不會承擔任何法律責任，並保留追究權利。
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  text-align: center;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }
`;
