import Modal from "react-modal";

function ConfirmationModal({
  confirmationCallback,
  title,
  message,
  isOpen,
  setIsOpen,
}) {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel={title}
      className="bg-white p-4 rounded-lg w-96 m-auto mt-20"
      appElement={document.getElementById("root")}
    >
      <h2 className="text-lg font-semibold border-b mb-4 bg-gray-100 rounded-t-lg p-2">{title}</h2>
      <p className="p-2">{message}</p>

      <div className="flex p-2 gap-2">
        <button
          onClick={() => {
            confirmationCallback();
            setIsOpen(false);
          }}
          className="bg-red-300 hover:bg-red-400 transition-all"
        >
          Confirm
        </button>
        <button onClick={() => setIsOpen(false)} className="bg-gray-200 hover:bg-gray-300 transition-all">Cancel</button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
