import { IAsmr, IBoard } from "@/types";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { prettyDate } from "@/utils";
import styled from "styled-components";
import {
  asmrIdAtom,
  asmrIdSelector,
  asmrUrlAtom,
  asmrUrlSelector,
} from "@/recoils/Asmr";

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

const Audio = styled.audio`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Asmr: React.FC<{ _id: number }> = ({ _id }) => {
  const [asmrValue, setAsmrValue] = useState<IAsmr>(null);
  const [asmrUrl, setAsmrUrl] = useState<string>("");
  const [asmrId, setAsmrId] = useRecoilState(asmrIdAtom);
  const [asmrAtomId, setAsmrAtomId] = useRecoilState(asmrUrlAtom);
  const fetchResultGetAsmrInfo = useRecoilValueLoadable(asmrIdSelector);
  const fetchResultGetAsmrUrl = useRecoilValueLoadable(asmrUrlSelector);

  useEffect(() => {
    console.log(fetchResultGetAsmrInfo);
    console.log(asmrId);
    if (
      fetchResultGetAsmrInfo.state === "hasValue" &&
      fetchResultGetAsmrInfo.contents
    ) {
      const { asmr } = fetchResultGetAsmrInfo.contents as { asmr: IAsmr };
      setAsmrValue(asmr);
      setAsmrAtomId({ url: asmr.asmrFileName });
    }
  }, [fetchResultGetAsmrInfo]);

  useEffect(() => {
    console.log(fetchResultGetAsmrUrl);
    if (
      fetchResultGetAsmrUrl.state === "hasValue" &&
      fetchResultGetAsmrUrl.contents
    ) {
      const asmrUrl = fetchResultGetAsmrUrl.contents as string;
      setAsmrUrl(asmrUrl);
    }
  }, [fetchResultGetAsmrUrl]);

  useEffect(() => {
    console.log(_id);
    setAsmrId({ _id });
  }, []);

  return (
    <>
      {asmrUrl !== "" && (
        <Container>
          <BoardInfoBox>
            <BoardInfo>
              <BoardInfoName>날짜</BoardInfoName>
              <BoardInfoContent>
                {prettyDate(asmrValue.createdAt)}
              </BoardInfoContent>
            </BoardInfo>
            <BoardInfo>
              <BoardInfoName>작성자 </BoardInfoName>
              {asmrValue.userId}
            </BoardInfo>
          </BoardInfoBox>
          <BoardInfoBox>
            <BoardInfo>
              <BoardInfoName>조회수</BoardInfoName>
              <BoardInfoContent> {asmrValue.asmrViews}</BoardInfoContent>
            </BoardInfo>
          </BoardInfoBox>
          <BoardInfoBox>
            <BoardInfo>
              <BoardInfoName>제목</BoardInfoName>
              <BoardInfoContent> {asmrValue.title}</BoardInfoContent>
            </BoardInfo>
          </BoardInfoBox>
          <CenterBox>
            <Audio src={asmrUrl} controls />
          </CenterBox>
        </Container>
      )}
    </>
  );
};
