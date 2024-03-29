export const ModalErrorTimeInterval = ({ isOpen, onClose,old_event,oldStartTime, oldEndTime,new_event,eventStartTime,eventEndTime }) => {
    if (!isOpen) {
      return null;
    }
  
    const closeModal = () => {
      onClose();
    };
  
    return (
      <div className="modalErrorTime">
        <div className="modalErrorTime-content">
          <p>Время ваших мероприятий пересекается:</p>
          <p><strong>Название:</strong> {old_event}</p>
          <p><strong>Время:</strong>{` ${oldStartTime} - ${oldEndTime}`}</p>
          <p><strong>Название:</strong>  {new_event}</p>
          <p><strong>Время:</strong>{` ${eventStartTime} - ${eventEndTime} `}</p>
          <p>Пожалуйста,выберите другое время.</p>
          <button className="modalErrorTime-button" onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    );
  };