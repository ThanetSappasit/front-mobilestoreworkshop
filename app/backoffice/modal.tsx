'use client'
interface ModalProps{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ title, children, isOpen, onClose }: ModalProps) {
  return (
    isOpen && (
      <div className="fixed inset-0  flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
            {title}
            <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h2>
          <div className="mt-4 p-2">
            {children}
          </div>
        </div>
      </div>
    )
  )
}
