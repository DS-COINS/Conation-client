import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Header } from '../../components/Common/Menubar';
import { Field, Formik } from "formik";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    max-width: 1500px;
`;

const Text = styled.p`
    font-size: 36px;
`

const Toast = styled.p`
  font-size: 20px !important;
  color: #000 !important;
`;

const WriteContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
`

const Title = styled.div`
    margin-right: 20px;
    font-size: 30px;
    width: 30%;
`
const Input = styled.input`
    width: 70%;
    line-height: normal;
    padding: 0.8em 0.5em;
    font-family: "NOTO SANS KR";
    border: 2px solid #981B45;
    font-size: 24px;
    border-radius: 6px;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-bottom: 30px;
`

const Textarea = styled.textarea`
    width: 70%;
    height: 200px;
    line-height: normal;
    padding: 0.8em 0.5em;
    font-family: "NOTO SANS KR";
    border: 2px solid #981B45;
    font-size: 24px;
    border-radius: 6px;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-bottom: 30px;
`

const Select = styled.select`
    margin-bottom: 30px;
    height: 50px;
    width: 200px;
    font-size: 20px;
    padding-left: 10px;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
`
const Button = styled.button`
    background: none;
    outline: none;
    border: none;
    right: 0px;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 24px;
    font-family: 'NOTO SANS KR';
    bottom: -10vh;
    color: #fff;
    background-color: #981b45;
`

const ClassWritePage = ({ history }) => {
    const userId = useSelector((store) => store.userReducer.userId);
    const navigate = useNavigate();
    const submit = async (values) => {
        const value = values || {};
        console.log("??")
        
        const frm = new FormData();
        const photoFile = document.getElementById("image");

        frm.append("image", photoFile.files[0]);
        frm.append("title", value.name);
        frm.append("placetype", value.place === 'offline' ? true : false);
        frm.append("category", value.category);
        frm.append("content", value.content);
        frm.append("writer", userId);

        axios.post("/api/class/post", frm, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then((response) => {
          console.log(response);
          alert("??? ????????? ?????????????????????!");
          navigate("/");
        });
      };
    return (
        <>
            <Header />
            <PageContainer>
            <Text>?????? ?????? ??????</Text>
            <Formik
              initialValues={{
                store: "",
                writer: "",
                content: "",
              }}
              onSubmit={(data) => submit(data)}
            >
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <WriteContainer>
                    <Title>??????</Title>
                    <Input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </WriteContainer>
                  <WriteContainer>
                    <Title>?????????/????????????</Title>
                    <Select
                        name="place"
                        value={values.place}
                        onChange={handleChange}
                    >
                        <option value="online">?????????</option>
                        <option value="offline">????????????</option>
                    </Select>
                  </WriteContainer>
                  <WriteContainer>
                    <Title>????????????</Title>
                    <Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                    >
                        <option value="??????">??????</option>
                        <option value="?????????">?????????</option>
                        <option value="???????????????">???????????????</option>
                        <option value="??????????????????">?????????/?????????</option>
                        <option value="????????????">??????/??????</option>
                        <option value="???????????????">??????/?????????</option>
                        <option value="?????????">?????????</option>
                        <option value="????????????">??????/??????</option>
                        <option value="???????????????">??????/?????????</option>
                        <option value="??????">??????</option>
                    </Select>
                  </WriteContainer>
                  <WriteContainer>
                    <Title>??????</Title>
                    <Textarea
                      type="text"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                    />
                  </WriteContainer>
                  <WriteContainer>
                    <Title>??????</Title>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      alt="??????"
                    />
                  </WriteContainer>
                  <ButtonWrapper>
                  <Button
                    type="submit"
                  >
                    <div>????????????</div>
                  </Button>
                  </ButtonWrapper>
                </form>
              )}
            </Formik>
            </PageContainer>
        </>
    )
}

export default ClassWritePage