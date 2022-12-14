import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Header } from '../../components/Common/Menubar';
import { useState } from 'react';
import { ClassList } from '../../components/List/ClassList';
import { NoticeCard } from '../../components/Card/NoticeCard';

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1500px;
    display: flex;
    flex-direction: row;
`

const MenuBox = styled.div`
    width: 30%;
    height: 100%;
    /* background-color: gray; */
    padding: 30px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    border-right-style: solid;
`;

const Img = styled.img`
    width: 80%;
    margin: 40px auto 40px;
`;

const Text = styled.p`
    margin: 20px auto;
    font-size: 30px;
    font-weight: 700;
`;

const LinkBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`;

const LinkButton = styled.button`
    border: none;
    background-color: rgba(255, 255, 255, 0);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: ${props => props.margin}px;
`;

const SubBox = styled.div`
    background-color: #D9D9D9;
    width: 100%;
    margin-bottom: 20px;
    height: 100%;
`;

const SubText = styled.p`
    width: 100%;
    font-size: 16px;
    margin: 10px;
`;

const ContentWrapper = styled.div`
    display: block;
    width: 70%;
`;
const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 120px;
    box-shadow: 0px 2px rgba(0, 0, 0, 1);
`;

const TitleText = styled.div`
    margin: 40px;
    font-size: 40px;
    font-weight: 700;
`
const ClassInfoBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    margin-top: 30px;
`
const ClassInfo = styled.div`
    font-size: 20px;
    font-family: "NOTO SANS KR";
    height: 24px;
    padding: 5px 10px;
    border: 2px solid ${props => props.type === 'ONE' ? '#D21D1D' :'#B0A4FF'};
    margin: 10px 5px;
`

const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 50px;
`;

const ApplyClassTitle = styled.div`
    font-size: 30px;
    width: 100%;
    font-family: "NOTO SANS KR";
    font-weight: bold;
    margin-top: 30px;
    margin-left: 30px;
`;

const MyPage = ({ history }) => {

    const userId = useSelector((store) => store.userReducer.userId);
    const [user, setUser] = useState([]);
    const [writePost, setWritePost] = useState([]);
    const [applyPost, setApplyPost] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [notification, setNotification] = useState([]);
    const [contentMode, setContentMode] = useState('?????? ??????');

    const List = notification.map((noti, index) => {
        return <NoticeCard data={noti} key={index} />
    })
    useEffect(() => {
        let body = {
            _id: userId
        }
        axios.post("/api/users/getUserInfo", body).then((response) => {
            console.log(response.data)
            if(response.data.success) {
                setUser(response.data.user);
                setWritePost(response.data.writer); // ????????? ?????????
                setApplyPost(response.data.applicant);  // ????????? ?????????
                setFavorites(response.data.favorites);
            } else {
                console.log("?????? ??? ????????????")
            }
        })
        axios.post("/api/users/getNotifications", body).then((response) => {
            // console.log(response.data.result)
            if(response.data.success) {
                setNotification(response.data.result)
            }
        })
    },[])
    return (
        <>
        <Header />
        <PageContainer>
            <MenuBox>
                <Img src={require("../../assets/icons/my.svg").default} />
                <Text>{user.name}</Text>
                <LinkBox>
                    <LinkButton onClick={() => setContentMode('?????? ??????')} margin={30}>?????? ??????</LinkButton>
                    <LinkButton margin={15}>?????? ?????????</LinkButton>
                    <SubBox>
                        <SubText onClick={() => setContentMode('??? ??????')}>??? ??? ??????</SubText>
                        <SubText onClick={() => setContentMode('??????')}>??? ??????</SubText>
                    </SubBox>
                    <LinkButton>?????? ?????? ??????</LinkButton>
                </LinkBox> 
            </MenuBox>
            <ContentWrapper>
            <TitleBox>
                <TitleText>{contentMode}</TitleText>
            </TitleBox>
            {(contentMode === '?????? ??????') &&
            <>
                {/* <ClassInfoBox>
                    <ClassInfo type={'ONE'}>????????? ?????????</ClassInfo>
                    <ClassInfo type={'TWO'}>?????? ????????? ?????????</ClassInfo>
                </ClassInfoBox> */}
                <ApplyClassTitle>????????? ?????????</ApplyClassTitle>
                <ClassList data={applyPost} />
                <ApplyClassTitle>?????? ????????? ?????????</ApplyClassTitle>
                <ClassList data={writePost} />
                
            </>
            }
            {(contentMode === '??? ??????') &&
                <>
                <ClassList data={favorites} />
                </>
            }
            {(contentMode === '??????') &&
                <NoticeList>
                    {List}
                </NoticeList>
            }
            </ContentWrapper>
        </PageContainer>
        </>
    )
}
export default MyPage;