import React, { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import {
  boardListAtom,
  boardListTypeAtom,
  boradListSelector,
} from "@/recoils/Board";
import { IAsmr, IBoard } from "@/types";
import { getBoardKeyType } from "@/utils";
import { PaddingWrapper } from "../Common/PaddingWrapper";
import { asmrListAtom, asmrListSelector } from "@/recoils/Asmr";

const Container = styled.div`
  height: 100%;
  padding: 20px 20%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardListItem = styled.div`
  display: flex;
  width: 800px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const NicknameBox = styled.div`
  width: 100px;
  border-right: 1px solid #ccc;
  padding: 5px 0px 5px 10px;
`;

const TitleBox = styled.a`
  display: block;
  text-decoration: none;
  width: 300px;
  border-right: 1px solid #ccc;
  padding: 5px 0px 5px 10px;
`;

const IdBox = styled.div`
  width: 100px;
  border-right: 1px solid #ccc;
  padding: 5px 0px 5px 10px;
`;

const DateBox = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 5px 0px 5px 10px;
`;

const ViewBox = styled.div`
  width: 100px;
  border-right: 1px solid #ccc;
  padding: 5px 0px 5px 10px;
`;

const PageIdxButtonBox = styled.div`
  display: flex;
  padding-top: 20px;
`;

const ThemeBox = styled.div`
  display: flex;
  width: 800px;
  border: 1px solid #ccc;
`;

const SeperateBox = styled.div`
  width: 100%;
  height: 360px;
  @media only screen and (min-width: 768px) {
    height: 480px;
  }
`;

const PageIdxButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const AsmrList = () => {
  const [asmrListState, setAsmrList] = useRecoilState(asmrListAtom);
  const [divideAsmrListState, setDivideAsmrList] = useState<IAsmr[][]>([]);
  const [showIdx, setShowIdx] = useState<number>(1);
  const fetchResult = useRecoilValueLoadable(asmrListSelector);

  useEffect(() => {
    console.log(fetchResult);
    if (fetchResult.state === "hasValue" && fetchResult.contents) {
      const { asmrList } = fetchResult.contents as { asmrList: IAsmr[] };
      setAsmrList({ asmrList });
    }
  }, [fetchResult]);

  useEffect(() => {
    if (asmrListState.asmrList.length !== 0) {
      const { asmrList } = asmrListState;
      if (asmrList.length !== 0) {
        const newDivideAsmrList = [];
        for (let i = 0; i < asmrList.length; i += 20) {
          newDivideAsmrList.push(asmrList.slice(i, i + 20));
        }
        setDivideAsmrList(newDivideAsmrList);
      }
    }
  }, [asmrListState]);

  const onClickPageButton = (idx: number) => setShowIdx(idx);

  return (
    <>
      {divideAsmrListState.length !== 0 && (
        <>
          <SeperateBox />
          <Container>
            <ThemeBox>
              <IdBox>asmr 번호</IdBox>
              <TitleBox>asmr 제목</TitleBox>
              <NicknameBox>작성자</NicknameBox>
              <DateBox>작성 날짜</DateBox>
              <ViewBox>조회수</ViewBox>
            </ThemeBox>
            {divideAsmrListState[showIdx - 1].map((item, idx) => (
              <BoardListItem key={idx}>
                <IdBox>{item._id}</IdBox>
                <TitleBox href={`asmrs/${item._id}`}>{item.title}</TitleBox>
                <NicknameBox>{item.userId}</NicknameBox>
                <DateBox>{item.createdAt}</DateBox>
                <ViewBox>{item.asmrViews}</ViewBox>
              </BoardListItem>
            ))}
            <PageIdxButtonBox>
              {divideAsmrListState.map((item, idx) => (
                <PageIdxButton onClick={() => onClickPageButton(idx + 1)}>
                  {idx + 1}
                </PageIdxButton>
              ))}
            </PageIdxButtonBox>
          </Container>
        </>
      )}
    </>
  );
};
