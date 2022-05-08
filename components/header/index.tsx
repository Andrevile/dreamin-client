import { useEffect, useState } from 'react';
import * as S from './Header.style';
import Image from 'next/image';

const Header = ({ setModalVisible }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tabNum, setTabNum] = useState(1);

  useEffect(() => {
    console.log(tabNum);
  }, [tabNum]);

  return (
    <S.Wrapper>
      <S.ButtonWrapper>
        <div style={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/')}>
          <Image src={'/images/logo.svg'} width={'112px'} height={'20px'} />
        </div>
        <S.MenuTab>
          <S.NavButtons onClick={() => setTabNum(1)}>커뮤니티</S.NavButtons>
          <S.NavButtons onClick={() => setTabNum(2)}>메뉴</S.NavButtons>
          <S.NavButtons onClick={() => setTabNum(3)}>메뉴</S.NavButtons>
          <S.Line tabNum={tabNum}></S.Line>
        </S.MenuTab>
        {isLoggedIn ? (
          <S.AfterLogin>
            <div>
              <Image src={'/images/icon-search.svg'} width={'24px'} height={'24px'} alt={'search'} />
            </div>
            <S.SearchBar placeholder="검색어를 입력해주세요" />
            <Image src={'/images/icon-notice.svg'} width={'24px'} height={'24px'} alt={'notice'} />
            <Image src={'/images/icon-profile.svg'} width={'32px'} height={'32px'} alt={'profile'} />
          </S.AfterLogin>
        ) : (
          <S.BeforeLogin>
            <S.Login
              onClick={() => {
                setIsLoggedIn(true);
                setModalVisible();
              }}
            >
              로그인
            </S.Login>
            <S.SignUp>회원가입</S.SignUp>
          </S.BeforeLogin>
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default Header;
