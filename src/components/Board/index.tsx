import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { BOARD } from "@/utils";
import { PaddingWrapper } from "@/components/Common/PaddingWrapper";
import { calcRem } from "@/styles/theme";
import { TwoWrapper } from "@/components/Common/TwoWrapper";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "@/recoils/Auth";

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
`;

const CancelButton = styled.a`
  padding: 10px 15px;
  border: none;
  background: #cb9ffd;
  border-radius: 5px;
  margin-right: 10px;
  text-decoration: none;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  border: none;
  background: #a9e1ed;
  border-radius: 5px;
`;

export const Board: React.FC<{ boardType: string }> = ({ boardType }) => {
  //유저 정보를 전역 상태에서 빼오는 로직이 필요
  const [boardContent, setBoardContent] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [totalReadingTime, setTotalReadingTime] = useState("");

  return (
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
        <GuideRight>{boardType}</GuideRight>
      </TwoWrapper>
      <TwoWrapper>
        <Guideleft>독서 시간</Guideleft>
        <Title
          value={totalReadingTime}
          onChange={(e) => setTotalReadingTime(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
      </TwoWrapper>
      <TwoWrapper>
        <Guideleft>제목</Guideleft>
        <Title
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
      </TwoWrapper>
      <ReactQuillWrapper>
        <Guideleft>내용</Guideleft>
        <ReactQuill
          style={{ width: "100%", height: "600px", flex: 1, margin: 0 }}
          theme="snow"
          modules={BOARD.modules}
          formats={BOARD.formats}
          value={boardContent}
          onChange={(content, delta, source, editor) =>
            setBoardContent(editor.getHTML())
          }
        />
      </ReactQuillWrapper>
      <BottomButtonBox>
        <CancelButton>취소</CancelButton>
        <SubmitButton>제출</SubmitButton>
      </BottomButtonBox>
    </PaddingWrapper>
  );
};
