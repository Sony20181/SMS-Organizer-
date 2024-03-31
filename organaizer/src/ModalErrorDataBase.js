export const ModalErrorDataBase = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    const closeModal = () => {
      onClose();
    };
  
    return (
      <div className="modalErrorTime">
        <div className="modalErrorTime-content">
          <p>Нет подключения к серверу, попробуйте позже.</p>
          <button className="modalErrorTime-button" onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    );
  };