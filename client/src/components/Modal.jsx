import React, { Children, useState, useEffect, useRef } from "react";
import styled from "styled-components";
// 아이콘 추가
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/ModalSlice";

const DialogBox = styled.div``;

const FormContainer = styled.div``;

const CloseButton = styled.button`
  position: absolute;
  right: 3%;
  top: 5%;
  border: none;
  background-color: inherit;
  font-size: 1rem;
  cursor: pointer;
`;

function ModalContainer({ children }) {
  const modalOpen = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();

  if (modalOpen) {
    return createPortal(
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => dispatch(closeModal())}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            top: "15%",
            left: "50%",
            right: "50%",
            transform: "translate(-50%)",
            width: "50%",
            height: "70%",
            padding: "2rem",
            zIndex: 100,
          },
        }}
      >
        <DialogBox>
          <CloseButton
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <IoClose size={25} />
          </CloseButton>
          <FormContainer>{children}</FormContainer>
        </DialogBox>
      </Modal>,
      document.getElementById("modal")
    );
  }
}

export default ModalContainer;
