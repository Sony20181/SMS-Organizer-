export const ModalErrorTime = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    const closeModal = () => {
      onClose();
    };
  
    return (
      <div className="modalErrorTime">
        <div className="modalErrorTime-content">
          <p>Время начала мероприятия должно быть раньше времени окончания!</p>
          <button className="modalErrorTime-button" onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    );
  };