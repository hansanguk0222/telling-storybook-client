import { useRecorder } from "./util";
import React, { useState } from "react";
import styled from "styled-components";
import { calcRem } from "@/styles/theme";
import { PaddingWrapper } from "@/components/Common/PaddingWrapper";
import { TwoWrapper } from "@/components/Common/TwoWrapper";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { createAsmrAtom, createAsmrSelector } from "@/recoils/Asmr";
const Title = styled.input`
  /* width: 685px; */
  font-size: ${calcRem(20)};
  padding: ${calcRem(5)};
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid "#FAFAFA";
  background: none;
  flex: 1;
`;

const Guideleft = styled.p`
  width: ${calcRem(150)};
  font-size: ${calcRem(20)};
  font-weight: 500;
  text-align: right;
  margin-right: ${calcRem(15)};
`;

const GuideRight = styled.p`
  font-size: ${calcRem(20)};
  font-weight: 400;
`;

const ReactQuillWrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const BottomButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding-top: 30px;
`;

const CancelButton = styled.a`
  padding: 10px 15px;
  border: none;
  background: #cb9ffd;
  border-radius: 5px;
  margin-right: 10px;
  text-decoration: none;
  color: black;
  font-size: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  border: none;
  background: #a9e1ed;
  border-radius: 5px;
  font-size: 20px;
`;

const AudioButton = styled.button`
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
  background: #fdfa87;
  &:nth-child(1) {
    margin-right: 20px;
  }
`;

const CenterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CenterButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Audio = styled.audio`
  margin-bottom: 20px;
`;

const Timer = styled.div`
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const BottomRightContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${calcRem(35)};
  align-items: center;
  justify-content: flex-end;
`;

export const CreateASMR = () => {
  const [title, setTitle] = useState("");
  const fetchResult = useRecoilValueLoadable(createAsmrSelector);
  const [asmr, setAsmr] = useRecoilState(createAsmrAtom);

  const {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    time,
    asmrData,
  } = useRecorder();

  const onClickSubmitButton = () => {
    setAsmr({
      userId: Number(localStorage.getItem("userId")),
      asmrData,
      title,
    });
  };

  return (
    <>
      <PaddingWrapper>
        <TwoWrapper>
          <Guideleft>현재 날짜</Guideleft>
          <GuideRight>{`${new Date().getFullYear()}-${(
            "0" +
            (new Date().getMonth() + 1)
          ).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`}</GuideRight>
        </TwoWrapper>
        <TwoWrapper>
          <Guideleft>게시판 종류</Guideleft>
          <GuideRight>ASMR</GuideRight>
        </TwoWrapper>
        <TwoWrapper>
          <Guideleft>제목</Guideleft>
          <Title
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </TwoWrapper>
        <BottomButtonBox>
          <CenterContainer>
            <Timer>{time}</Timer>
            <Audio src={audioURL} controls />
            <CenterButtonWrapper>
              <AudioButton onClick={startRecording} disabled={isRecording}>
                녹음
              </AudioButton>
              <AudioButton onClick={stopRecording} disabled={!isRecording}>
                중지
              </AudioButton>
            </CenterButtonWrapper>
          </CenterContainer>
        </BottomButtonBox>
        <BottomRightContainer>
          <CancelButton href="/asmrs">취소</CancelButton>
          <SubmitButton onClick={onClickSubmitButton}>제출</SubmitButton>
        </BottomRightContainer>
      </PaddingWrapper>
    </>
  );
};
