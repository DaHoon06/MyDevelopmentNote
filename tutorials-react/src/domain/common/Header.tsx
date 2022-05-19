import React, { useState } from "react";
import styled from "styled-components";
import '../../css/common/Navigation.scss';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100vw;
  height: 4.5em;
  background: hsl(210deg 18% 96%);
  opacity: 0.85;
  justify-content: space-around;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 16px;
  -webkit-box-align: center;
  align-items: center;
  padding: 16px 0;
  margin: 0;
  vertical-align: baseline;
  justify-content: space-between;
`;

export const Header = () =>
  <HeaderContainer>
    <Navigation>
      <section>
        <img className='github-icon' src={ process.env.PUBLIC_URL + '/img/github-icon.png' } alt='logo' />
        <small className='navigation-title'>DaHoon06</small>
      </section>
      <section>
        <ul>
          <li className='navigation-items'>
            <a>HOME</a>
          </li>
          <li className='navigation-items'>
            <a>CONTACT</a>
          </li>
          <li className='navigation-items'>
            <a>MANAGEMENT</a>
          </li>
          <li className='navigation-items'>
            <a>WRITE</a>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li className='navigation-items'>side</li>
          <li className='navigation-items'>side</li>
        </ul>
      </section>
    </Navigation>
  </HeaderContainer>;