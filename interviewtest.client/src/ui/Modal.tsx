"use client";

import { X } from "lucide-react";
import {
  cloneElement,
  createContext,
  HTMLProps,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalPropsType {
  children: ReactNode;
}

function Modal({ children }: ModalPropsType) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenPropsType {
  children: ReactElement<HTMLProps<HTMLElement>>;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenPropsType) {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("Modal.Open must be used within a Modal component.");
  }
  const { open } = context;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowPropsType {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}

function Window({ children, name }: WindowPropsType) {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("Modal.Window must be used within a Modal component.");
  }
  const { openName, close } = context;

  const ref = useOutsideClick<HTMLDivElement>(close, true);

  useEffect(() => {
    if (name === openName) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openName, name]);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-gray-100 p-4 shadow-md transition-all duration-500 max-h-[85vh] flex flex-col min-w-[20vw]"
        ref={ref}
      >
        <button
          className="absolute border-none bg-none p-1 cursor-pointer left-auto right-5 top-5 bg-gray-100 rounded-full"
          onClick={close}
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <div className="overflow-y-auto flex-grow p-4">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
