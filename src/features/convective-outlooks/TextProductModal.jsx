import { Modal } from "react-daisyui";
import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";
import { useOutlookTextProductByDayQuery } from "services/convective-outlook-text-products";

export const TextProductModal = ({ isOpen, closeHandler, outlookDay }) => {
  const { data: outlookText } = useOutlookTextProductByDayQuery(outlookDay);

  return (
    <Modal open={isOpen} onClick={closeHandler} responsive>
      <div className="flex items-center mb-4">
        <CloseIcon
          onClick={closeHandler}
          size={30}
          className="mr-2 hover:fill-red-600"
        />
        <span>CLOSE</span>
      </div>
      <Modal.Body>
        {outlookText ? (
          <pre className="whitespace-break-spaces">{outlookText}</pre>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
