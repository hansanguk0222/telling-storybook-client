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
import { IBoard } from "@/types";
import { getBoardKeyType } from "@/utils";
import { PaddingWrapper } from "../Common/PaddingWrapper";

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

export const BoardList: React.FC<{ boardType: string }> = ({ boardType }) => {
  const [boardListType, setBoardListType] = useRecoilState(boardListTypeAtom);
  const [boardListState, setBoardListState] = useRecoilState(boardListAtom);
  const [divideBoardList, setDivideBoardList] = useState<IBoard[][]>([]);
  const [showIdx, setShowIdx] = useState<number>(1);
  const fetchResult = useRecoilValueLoadable(boradListSelector);

  useEffect(() => {
    if (fetchResult.state === "hasValue" && fetchResult.contents) {
      const { boardList } = fetchResult.contents as { boardList: IBoard[] };
      setBoardListState({ boardList });
    }
  }, [fetchResult]);

  useEffect(() => {
    setBoardListType({ boardType });
  }, []);

  useEffect(() => {
    if (boardListState.boardList.length !== 0) {
      const { boardList } = boardListState;
      if (boardList.length !== 0) {
        const newDivideBoardList = [];
        for (let i = 0; i < boardList.length; i += 20) {
          newDivideBoardList.push(boardList.slice(i, i + 20));
        }
        setDivideBoardList(newDivideBoardList);
      }
    }
  }, [boardListState]);

  const onClickPageButton = (idx: number) => setShowIdx(idx);

  return (
    <>
      {divideBoardList.length !== 0 && (
        <>
          <SeperateBox />
          <Container>
            <ThemeBox>
              <IdBox>글 번호</IdBox>
              <TitleBox>글 제목</TitleBox>
              <NicknameBox>작성자</NicknameBox>
              <DateBox>작성 날짜</DateBox>
              <ViewBox>조회수</ViewBox>
            </ThemeBox>
            {divideBoardList[showIdx - 1].map((item, idx) => (
              <BoardListItem key={idx}>
                <IdBox>{item._id}</IdBox>
                <TitleBox href={`${getBoardKeyType(boardType)}/${item._id}`}>
                  {item.boardTitle}
                </TitleBox>
                <NicknameBox>{item.userId}</NicknameBox>
                <DateBox>{item.createdAt}</DateBox>
                <ViewBox>{item.boardViews}</ViewBox>
              </BoardListItem>
            ))}
            <PageIdxButtonBox>
              {divideBoardList.map((item, idx) => (
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
