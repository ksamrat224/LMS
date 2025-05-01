import Button from "./Button";
interface ModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function Modal({isModelOpen, onConfirm, onClose}: ModalProps) {
  return (
    <div className={`w-screen h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50 ${isModelOpen ? 'block' : 'hidden'}`}>
      <div className="w-[500px] bg-white p-6 flex flex-col justify-between rounded-lg shadow-lg">
        <div className="text w-full">
          <h1 className="text-xl font-bold text-gray-800">Delete Book</h1>
          <p className="text-gray-600 mt-2">
            Are you sure you want to delete this book? This action cannot be
            undone.
          </p>
        </div>

        {/* Modal Buttons */}
        <div className="button w-full flex justify-center items-center gap-2 mt-6">
          <div className="mr-60">
            <Button
              bgColor="px-4 py-2 bg-green-500 text-gray-800 rounded hover:bg-green-600"
              type="button"
              label="Cancel"
              onClick={onClose}
            />
          </div>
          <Button
            bgColor="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            type="button"
            label="Delete"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
