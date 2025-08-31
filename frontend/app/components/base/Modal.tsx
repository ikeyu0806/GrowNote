// Modal.tsx
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* モーダル本体 */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg transform transition-transform duration-200 scale-100">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* コンテンツ */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
