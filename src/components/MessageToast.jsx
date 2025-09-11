
import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const MessageToast = () => {
  const { toast } = useContext(CarritoContext);

  if (!toast) return null;

  return (
    <div className="toast">
      {toast}
    </div>
  );
};

export default MessageToast;
