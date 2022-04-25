import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 550px;
  padding: 30px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
`;

const Modal = (showModal: boolean) => {
    const [isModal, setIsModal] = useState(true);

    if (showModal) setIsModal(showModal);

    return (
        <ModalContainer>
            <ModalBody>

            </ModalBody>
        </ModalContainer> && { isModal }
    )
}

export default Modal;
