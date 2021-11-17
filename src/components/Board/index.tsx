import { boardIdAtom, boardIdSelector } from "@/recoils/Board";
import { IBoard } from "@/types";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { prettyDate } from "@/utils";
import styled from "styled-components";
import { CommentList } from "../CommentList";

const Container = styled.div`
  margin-top: 200px;
  width: 100%;
  height: 100%;
  padding: 20px 20%;
  background: white;
`;
const BoardInfoBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const BoardInfo = styled.div`
  width: 80%;
  display: flex;
  font-size: 20px;
  padding: 5px 0px;
`;

const BoardInfoContent = styled.div`
  padding-left: 15px;
  background: white;
  display: flex;
  justify-content: center;
`;

const BoardInfoName = styled.div`
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding-left: 10px;
  margin-right: 10px;
  font-size: 20px;
  padding-right: 10px;
`;

const BoardContentBox = styled.div`
  overflow-y: scroll;
  height: 600px;
  background: white;
`;

export const Board: React.FC<{ _id: number }> = ({ _id }) => {
  const [boardValue, setBoardValue] = useState<IBoard | null>(null);
  const [boardId, setBoardId] = useRecoilState(boardIdAtom);
  const fetchResult = useRecoilValueLoadable(boardIdSelector);

  useEffect(() => {
    console.log(fetchResult);
    if (fetchResult.state === "hasValue" && fetchResult.contents) {
      const { board } = fetchResult.contents as { board: IBoard };
      setBoardValue(board);
    }
  }, [fetchResult]);

  useEffect(() => {
    setBoardId({ _id });
  }, []);

  return (
    <>
      {boardValue && (
        <Container>
          <BoardInfoBox>
            <BoardInfo>
              <BoardInfoName>날짜</BoardInfoName>
              <BoardInfoContent>
                {prettyDate(boardValue.createdAt)}
              </BoardInfoContent>
            </BoardInfo>
            <BoardInfo>
              <BoardInfoName>작성자 </BoardInfoName>
              {boardValue.userId}
            </BoardInfo>
          </BoardInfoBox>
          <BoardInfoBox>
            <BoardInfo>
              <BoardInfoName>조회수</BoardInfoName>
              <BoardInfoContent> {boardValue.boardViews}</BoardInfoContent>
            </BoardInfo>
            <BoardInfo>
              <BoardInfoName>보드 타입</BoardInfoName>
              <BoardInfoContent> {boardValue.boardType}</BoardInfoContent>
            </BoardInfo>
          </BoardInfoBox>
          <BoardInfoBox>
            <BoardInfo>
              <BoardInfoName>제목</BoardInfoName>
              <BoardInfoContent> {boardValue.boardTitle}</BoardInfoContent>
            </BoardInfo>
          </BoardInfoBox>
          <BoardContentBox
            dangerouslySetInnerHTML={{ __html: boardValue.boardContent }}
          />
          <CommentList boardId={_id} />
        </Container>
      )}
    </>
  );
};
