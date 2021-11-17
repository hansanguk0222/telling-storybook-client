import {
  commentBoardIdAtom,
  commentBoardIdSelector,
  createCommentAtom,
  createCommentSelector,
} from "@/recoils/Comment";
import {
  createReCommentAtom,
  createReCommentSelector,
  reCommentBoardIdAtom,
  reCommentBoardIdSelector,
} from "@/recoils/ReComment";
import { IComment, IReComment } from "@/types";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  z-index: -9999;
`;

const CommentBoxWrapper = styled.div`
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CommentBox = styled.div`
  font-size: 20px;
`;

const CancelButton = styled.button`
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

const CreateCommentButton = styled.button`
  border: none;
  font-size: 15px;
  background: #cff0cc;
  padding: 10px 15px;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 5px 10px;
`;

const LeftBox = styled.div`
  font-size: 20px;
`;
const RightBox = styled.div`
  font-size: 20px;
  width: 100%;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
`;

const WriterBox = styled.div`
  font-size: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
`;

const InnerWraper = styled.div`
  width: 100%;
  display: flex;
`;

const ButtonRightSideWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CommentList: React.FC<{ boardId: number }> = ({ boardId }) => {
  const [commentValues, setCommentValues] = useState<IComment[]>([]);
  const [reCommentValues, setReCommentValues] = useState<IReComment[]>([]);
  const [commentBoardId, setCommentBoardId] =
    useRecoilState(commentBoardIdAtom);
  const [reCommentBoardId, setRecommnetBoardId] =
    useRecoilState(reCommentBoardIdAtom);
  const [createComment, setCreateComment] = useRecoilState(createCommentAtom);
  const [createReComment, setCreateRecomment] =
    useRecoilState(createReCommentAtom);
  const [commentContent, setCommentContent] = useState("");
  const [reCommentContents, setReCommentContents] = useState<
    {
      recommentId: number;
      commentId: number;
      value: string;
      showInputBox: boolean;
    }[]
  >([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const fetchResultCommentBoardId = useRecoilValueLoadable(
    commentBoardIdSelector
  );
  const fetchResultRecommentBoardId = useRecoilValueLoadable(
    reCommentBoardIdSelector
  );
  const fetchResultCreateComment = useRecoilValueLoadable(
    createCommentSelector
  );
  const fetchResultCreateReComment = useRecoilValueLoadable(
    createReCommentSelector
  );

  useEffect(() => {
    if (
      fetchResultCommentBoardId.state === "hasValue" &&
      fetchResultCommentBoardId.contents
    ) {
      const { comments } = fetchResultCommentBoardId.contents as {
        comments: IComment[];
      };
      setCommentValues(comments);
      setCommentContent("");
    }
  }, [fetchResultCommentBoardId]);

  useEffect(() => {
    if (
      fetchResultRecommentBoardId.state === "hasValue" &&
      fetchResultRecommentBoardId.contents
    ) {
      const { reComments } = fetchResultRecommentBoardId.contents as {
        reComments: IReComment[];
      };
      setReCommentValues(reComments);
    }
  }, [fetchResultRecommentBoardId]);

  useEffect(() => {
    console.log(reCommentValues);
  }, [reCommentValues]);

  useEffect(() => {
    if (
      fetchResultCreateComment.state === "hasValue" &&
      fetchResultCreateComment.contents
    ) {
      const { comment } = fetchResultCreateComment.contents as {
        comment: IComment;
      };
      setCommentValues([...commentValues, comment]);
      setCommentContent("");
    }
  }, [fetchResultCreateComment]);

  useEffect(() => {
    if (
      fetchResultCreateReComment.state === "hasValue" &&
      fetchResultCreateReComment.contents
    ) {
      const { reComment } = fetchResultCreateReComment.contents as {
        reComment: IReComment;
      };
      setReCommentValues([...reCommentValues, reComment]);
      setReCommentContents((reCommentContents) =>
        reCommentContents.map((reCommentContent) => {
          if (reCommentContent.commentId === reComment.commentId) {
            if (reCommentContent.commentId === 0) {
              return {
                ...reCommentContent,
                showInputBox: false,
                value: "",
                recommentId: reComment._id,
              };
            }
            return { ...reCommentContent, showInputBox: false, value: "" };
          }
          return reCommentContent;
        })
      );
    }
  }, [fetchResultCreateReComment]);

  useEffect(() => {
    setCommentBoardId({ boardId });
    setRecommnetBoardId({ boardId });
  }, []);

  const onClickShowCommentBoxButton = () => {
    setShowInputBox(true);
  };

  const onClickSubmitComment = () => {
    setCreateComment({
      userId: Number(localStorage.getItem("userId")),
      commentContent,
      boardId,
    });
    setShowInputBox(false);
  };

  const onClickSubmitReComment = (
    commentId: number,
    reCommentContent: string
  ) => {
    setCreateRecomment({
      userId: Number(localStorage.getItem("userId")),
      commentId,
      reCommentContent,
      boardId,
    });
    setShowInputBox(false);
  };

  const onClickCancelComment = () => {
    setCommentContent("");
    setShowInputBox(false);
  };

  const onClickShownRecommentBoxButton = (commentId: number) => {
    setReCommentContents([
      ...reCommentContents,
      { commentId, showInputBox: true, recommentId: 0, value: "" },
    ]);
  };

  const onClickCancelRecommentBoxButton = (commentId: number) => {
    setReCommentContents((reCommentContents) =>
      reCommentContents.filter(
        (reCommentContent) => reCommentContent.commentId !== commentId
      )
    );
  };

  const onChangeRecomment = (reCommentId: number, commentId: number, value) => {
    setReCommentContents((recomments) =>
      recomments.map((recomment) => {
        if (
          recomment.recommentId === reCommentId &&
          recomment.commentId === commentId
        ) {
          return { ...recomment, value };
        }
        return recomment;
      })
    );
  };

  return (
    <Container>
      <Wrapper>
        {showInputBox ? (
          <CommentBoxWrapper>
            <Input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <SubmitButton onClick={onClickSubmitComment}>작성</SubmitButton>
            <CancelButton onClick={onClickCancelComment}>취소</CancelButton>
          </CommentBoxWrapper>
        ) : (
          <ButtonRightSideWrapper>
            <CreateCommentButton onClick={onClickShowCommentBoxButton}>
              댓글 작성
            </CreateCommentButton>
          </ButtonRightSideWrapper>
        )}
      </Wrapper>
      {commentValues.map((comment) => (
        <Wrapper key={comment._id}>
          {comment.commentContent}
          {reCommentValues
            .filter((reComment) => reComment.commentId === comment._id)
            .map((item) => (
              <InnerWraper>
                <LeftBox>ㄴ</LeftBox>
                <RightBox>
                  <CommentBox>{item.reCommentContent}</CommentBox>
                  <WriterBox>{item.userId}</WriterBox>
                </RightBox>
              </InnerWraper>
            ))}
          {!reCommentContents ||
          reCommentContents
            .filter((item) => item.commentId === comment._id)
            .every((item) => !item.showInputBox) ? (
            <ButtonRightSideWrapper>
              <CreateCommentButton
                onClick={() => onClickShownRecommentBoxButton(comment._id)}
              >
                대댓글 작성
              </CreateCommentButton>
            </ButtonRightSideWrapper>
          ) : (
            <CommentBoxWrapper>
              <Input
                value={
                  reCommentContents.find(
                    (item) =>
                      item.commentId === comment._id && item.showInputBox
                  ).value
                }
                onChange={(e) =>
                  onChangeRecomment(0, comment._id, e.target.value)
                }
              />
              <ButtonBox>
                <CancelButton
                  onClick={() => onClickCancelRecommentBoxButton(comment._id)}
                >
                  취소
                </CancelButton>
                <SubmitButton
                  onClick={() =>
                    onClickSubmitReComment(
                      comment._id,
                      reCommentContents.find(
                        (item) =>
                          item.commentId === comment._id &&
                          item.recommentId === 0
                      ).value
                    )
                  }
                >
                  작성
                </SubmitButton>
              </ButtonBox>
            </CommentBoxWrapper>
          )}
        </Wrapper>
      ))}
    </Container>
  );
};
