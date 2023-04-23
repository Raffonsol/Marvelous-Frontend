import './ConfirmationModal.css';

const ConfirmationModal = (props) => {
  if (!props.show) {
      return '';
  }
  return (
    <div className='modalOverlay' onClick={props.onOverlayClick}>
      <div
        className='ConfirmationModal'
        tabIndex={0}
      >
        <span className='label'>{props.label}</span>
        
        <div className='checkboxContainer'>
          <input type='checkbox' className='checkbox' onChange={props.onCheckboxChange} />{props.checkBoxLabel}
          <div className='buttonContainer'>
            <button className='button' {...props.yesButton}>{props.yesButton.value}</button>
            <button className='button' {...props.noButton}>{props.noButton.value}</button>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default ConfirmationModal;
