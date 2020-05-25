import { DropzoneRootProps } from "react-dropzone";
import styled from "styled-components";

const getColor = ({
  isDragAccept,
  isDragReject,
  isDragActive,
}: DropzoneRootProps) => {
  if (isDragAccept) return "#00e676";
  if (isDragReject) return "#ff1744";
  if (isDragActive) return "#2196f3";
  return "#eeeeee";
};

export const Container = styled.div`
  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-width: 0.2rem;
    border-radius: 0.2rem;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: var(--dark);
    outline: none;
    transition: border 0.24s ease-in-out;
  }

  .thumb-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 1.6rem;

    .thumb {
      display: inline-flex;
      border-radius: 0.2rem;
      border: 0.1rem solid var(--grey);
      margin-bottom: 0.8rem;
      margin-right: 0.8rem;
      width: 10rem;
      height: 10rem;
      padding: 0.4rem;
      box-sizing: border-box;

      .thumb-inner {
        display: flex;
        min-width: 0;
        overflow: hidden;
        position: relative;

        .thumb-img {
          display: block;
          width: auto;
          height: 100%;
          transition: all 0.3s ease-in-out;
        }

        .del-img-btn {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          margin-right: auto;
          margin-left: auto;
          opacity: 0;
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          .del-img-btn {
            opacity: 1;
          }
        }
      }
    }
  }
`;
