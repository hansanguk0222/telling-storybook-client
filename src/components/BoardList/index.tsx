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

const Container = styled.div`
  padding-top: 600px;
  width: 100%;
  height: 100%;
  background: white;
`;

const BoardListItem = styled.div`
  display: flex;
  width: 100%;
`;

const NicknameBox = styled.div``;

const TitleBox = styled.div``;

const IdBox = styled.div``;

const DateBox = styled.div``;

const ViewBox = styled.div``;

const PageIdxButtonBox = styled.div`
  display: flex;
`;

const PageIdxButton = styled.div``;

export const BoardList: React.FC<{ boardType: string }> = ({ boardType }) => {
  const [boardListType, setBoardListType] = useRecoilState(boardListTypeAtom);
  const [boardListState, setBoardListState] = useRecoilState(boardListAtom);
  const [divideBoardList, setDivideBoardList] = useState<IBoard[][]>([]);
  const [showIdx, setShowIdx] = useState<number>(1);
  const fetchResult = useRecoilValueLoadable(boradListSelector);

  useEffect(() => {
    if (fetchResult.state === "hasValue" && fetchResult.contents) {
      console.log(fetchResult);
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
        console.log(boardList);
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
          <div>ㅗㅑ</div>
          <Container>
            {divideBoardList[showIdx - 1].map((item, idx) => (
              <BoardListItem key={idx}>
                <IdBox>{item._id}</IdBox>
                <TitleBox>{item.boardTitle}</TitleBox>
                <TitleBox>{item.boardTitle}</TitleBox>
                <DateBox>{item.createdAt}</DateBox>
                <ViewBox>{item.boardViews}</ViewBox>
              </BoardListItem>
            ))}
            <PageIdxButtonBox>
              {/* {divideBoardList.map((item, idx) => (
                <PageIdxButton onClick={() => onClickPageButton(idx)}>
                  {idx}
                </PageIdxButton>
              ))} */}
            </PageIdxButtonBox>
          </Container>
        </>
      )}
    </>
  );
};
