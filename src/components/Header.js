import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Overlay = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
`;

const Container = styled.div`
position:relative;
margin-bottom:3.5rem;
 ${props => props.isNavi ? `
    display:flex;
    align-items:center;
    @media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
        height:70px;
    }
 ` : `
    text-align:center;
 `}

`;

const HeaderTitle = styled.div`
font-size:3rem;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    font-size:1.5rem;
}
`;

const Navi = styled.div`
width:200px;
position:absolute;
top:15px;
right:20px;
z-index:1;
`;

const Menu = styled.div`
position:absolute;
top:8px;
right:12px;
width:50px;
height:50px;
`;

const DesktopProfile = styled.div`
position:absolute;
top:15px;
right:20px;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    display:none;
}
`;

const MobileProfile = styled.div`
display:none;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    display:inherit;
}
`;

const Header = ({title = "미정", isNavi = false}) => {
    const [isNaviOn, setIsNaviOn] = useState(false);

    const onLogout = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        localStorage.removeItem('thumbnail')
    }
    return (
        <Container className="p-4 mb-10 bg-indigo-500 border-b-4 border-indigo-700 shadow-xl" isNavi={isNavi}>
          <HeaderTitle className="font-bold text-white"><Link to={process.env.PUBLIC_URL}>{title}</Link></HeaderTitle>
            {isNavi ? (<>
                <DesktopProfile className="border-4 border-indigo-200 p-2 text-sm text-gray-800 text-right bg-white" >
                <div className="font-bold">{localStorage.getItem('username')}</div>
                <div className="grid grid-cols-2 gap-3" >
                <a className="bg-indigo-200 p-1" href={process.env.PUBLIC_URL + "/profile/modify"}>정보수정</a>
                <a className="bg-indigo-200 p-1" href={process.env.PUBLIC_URL + "/auth/login"} onClick={onLogout}>로그아웃</a>
                </div>
            </DesktopProfile>
            <MobileProfile>
            {isNaviOn ? (
                <>
                <Navi className="px-6 py-3 bg-white border-2 text-center">
                    <div className="text-right mb-1"><span className="px-1 bg-gray-400 rounded cursor-pointer" onClick={()=>{setIsNaviOn(!isNaviOn)}}>&times;</span></div>
                    <h4 className="p-1 border" >{localStorage.getItem('username')}</h4>
                    <ul >
                        <li className="p-1 bg-gray-200 border" ><a href={process.env.PUBLIC_URL + "/profile/modify"}>정보수정</a></li>
                        <li className="p-1 bg-gray-200 border" onClick={onLogout}><a href={process.env.PUBLIC_URL + "/auth/login"} >로그아웃</a></li>
                    </ul>
                </Navi>
                <Overlay className="overlay" onClick={()=>{setIsNaviOn(!isNaviOn)}}/>
                </>
                ) : (
                <Menu className="bg-white border" onClick={()=>{setIsNaviOn(!isNaviOn)}}>
                    <svg className="m-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </Menu>)
            }
            </MobileProfile>
            </>) : null}
        </Container>
    )
}

export default Header;