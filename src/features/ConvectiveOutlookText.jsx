import { Modal } from "react-daisyui";
import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";
import { useOutlookTextProductByDayQuery } from "services/convective-outlook-text-products";

export const TextProduct = ({ day }) => {
  const { data } = useOutlookTextProductByDayQuery(day);

  return (
    <section
      id="convective-outlook-text-product"
      className="bg-neutral-200 text-black px-6 py-8 rounded-lg mb-6 mx-auto sm:max-w-min"
    >
      <pre className="whitespace-break-spaces sm:whitespace-pre text-sm mx-auto">
        {data ? data : null}
      </pre>
    </section>
  );
};
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
        ) : (
          <pre className="whitespace-break-spaces">
            Convective Outlook report not available...
          </pre>
        )}
      </Modal.Body>
    </Modal>
  );
};
